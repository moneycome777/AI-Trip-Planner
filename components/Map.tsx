
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { TripPlan, DayPlan } from '../types';
import { ArrowLeft, Eye, EyeOff, MousePointerClick, Info } from 'lucide-react';
import { DAY_COLORS } from '../constants';

// Fix Leaflet default icon issue in React
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const createCustomIcon = (number: number, color: string) => {
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.3));">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3" fill="white"></circle>
    </svg>
    `;
    
    return L.divIcon({
        className: 'custom-icon',
        html: `<div style="position: relative; display: flex; justify-content: center;">
                 ${svg}
                 <span style="position: absolute; top: -6px; right: -6px; background: ${color}; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 10px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white;">${number}</span>
               </div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36]
    });
};

// Component to handle Map sizing issues
const MapResizer: React.FC = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

interface MapUpdaterProps {
    days: DayPlan[];
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ days }) => {
    const map = useMap();

    useEffect(() => {
        const bounds = L.latLngBounds([]);
        let hasPoints = false;

        days.forEach(day => {
            day.activities.forEach(act => {
                if (act.latitude && act.longitude) {
                    bounds.extend([act.latitude, act.longitude]);
                    hasPoints = true;
                }
            });
        });

        if (hasPoints) {
            // Add a slight delay to ensure container is ready
            setTimeout(() => {
                map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
            }, 300);
        }
    }, [days, map]);

    return null;
};

// Wrapper for Marker to handle map flying logic
const MarkerWithLogic: React.FC<{
    position: [number, number];
    icon: L.DivIcon;
    children: React.ReactNode;
}> = ({ position, icon, children }) => {
    const map = useMap();
    
    return (
        <Marker 
            position={position} 
            icon={icon}
            eventHandlers={{
                click: () => {
                    const currentZoom = map.getZoom();
                    const targetZoom = currentZoom < 14 ? 14 : currentZoom;
                    map.flyTo(position, targetZoom, { duration: 1.5 });
                }
            }}
        >
            {children}
        </Marker>
    );
};

interface Props {
  tripPlan: TripPlan;
  selectedDay?: number;
  onBackToList?: () => void;
}

const Map: React.FC<Props> = ({ tripPlan, selectedDay, onBackToList }) => {
  // State to track which days are visible in "Overview" mode
  const [visibleDays, setVisibleDays] = useState<number[]>([]);

  // Reset visible days when trip plan changes
  useEffect(() => {
      setVisibleDays(tripPlan.days.map(d => d.day_number));
  }, [tripPlan]);

  const toggleDayVisibility = (dayNum: number) => {
      setVisibleDays(prev => 
          prev.includes(dayNum) 
              ? prev.filter(d => d !== dayNum) 
              : [...prev, dayNum].sort((a,b) => a - b)
      );
  };

  // Determine which days to render:
  // 1. If sidebar selected a specific day -> Show ONLY that day
  // 2. If no specific day selected -> Show days based on checkbox/legend state
  const daysToRender = selectedDay 
    ? tripPlan.days.filter(d => d.day_number === selectedDay) 
    : tripPlan.days.filter(d => visibleDays.includes(d.day_number));

  return (
    <div className="h-full w-full relative z-0">
      {/* Mobile Back Button */}
      {onBackToList && (
        <button 
          onClick={onBackToList}
          className="lg:hidden absolute top-4 left-4 z-[1000] bg-white text-slate-800 p-2.5 rounded-full shadow-lg border border-slate-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

      {/* Interactive Legend for All Days View */}
      {!selectedDay && (
          <div className="absolute top-4 right-4 z-[1000] bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-200 max-h-64 overflow-y-auto hidden sm:block w-40">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 uppercase flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Route Filter
                  </h4>
              </div>
              <div className="space-y-2">
                  {tripPlan.days.map((day, idx) => {
                      const isVisible = visibleDays.includes(day.day_number);
                      const dayColor = DAY_COLORS[idx % DAY_COLORS.length];
                      
                      return (
                          <div 
                            key={day.day_number} 
                            onClick={() => toggleDayVisibility(day.day_number)}
                            className={`flex items-center justify-between cursor-pointer p-1.5 rounded-lg transition-all ${isVisible ? 'hover:bg-slate-50' : 'opacity-50 hover:opacity-80'}`}
                          >
                              <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: dayColor }}></div>
                                  <span className={`text-xs font-bold ${isVisible ? 'text-slate-700' : 'text-slate-400 decoration-slate-400'}`}>Day {day.day_number}</span>
                              </div>
                              {isVisible ? <Eye className="w-3 h-3 text-slate-400" /> : <EyeOff className="w-3 h-3 text-slate-300" />}
                          </div>
                      );
                  })}
              </div>
          </div>
      )}

      {/* User Guidance Overlay */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg border border-white/20 pointer-events-none flex items-center gap-3 text-xs font-medium whitespace-nowrap">
          <span className="flex items-center gap-1"><MousePointerClick className="w-3 h-3 text-indigo-300" /> Click Pin to Center</span>
          <span className="w-1 h-1 bg-white/30 rounded-full"></span>
          <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-indigo-300" /> Toggle Days in Legend</span>
      </div>

      <MapContainer 
        center={[0, 0]} 
        zoom={2} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <MapResizer />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        <MapUpdater days={daysToRender} />

        {daysToRender.map((day, dayIndex) => {
            // Determine color based on actual day number index from original plan to keep consistency
            const colorIndex = (day.day_number - 1) % DAY_COLORS.length;
            const dayColor = DAY_COLORS[colorIndex];
            
            const positions: [number, number][] = [];
            
            return (
                <React.Fragment key={day.day_number}>
                    {day.activities.map((act, actIndex) => {
                        if (!act.latitude || !act.longitude) return null;
                        const pos: [number, number] = [act.latitude, act.longitude];
                        positions.push(pos);

                        return (
                            <MarkerWithLogic 
                                key={`${day.day_number}-${actIndex}`}
                                position={pos}
                                icon={createCustomIcon(actIndex + 1, dayColor)}
                            >
                                <Popup>
                                    <div className="p-1">
                                        <div className="text-[10px] font-bold uppercase mb-1" style={{ color: dayColor }}>Day {day.day_number}</div>
                                        <div className="font-bold text-sm mb-0.5 text-slate-900">{act.place_name}</div>
                                        <div className="text-xs text-slate-500">{act.action}</div>
                                        <div className="mt-2 text-[10px] text-indigo-600 font-bold flex items-center gap-1">
                                            <Info className="w-3 h-3" /> View details in list
                                        </div>
                                    </div>
                                </Popup>
                            </MarkerWithLogic>
                        );
                    })}
                    
                    {positions.length > 1 && (
                        <Polyline 
                            positions={positions} 
                            pathOptions={{ 
                                color: dayColor,
                                weight: 4,
                                opacity: 0.8,
                                dashArray: selectedDay ? undefined : '10, 10',
                                lineCap: 'round'
                            }} 
                        />
                    )}
                </React.Fragment>
            );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
