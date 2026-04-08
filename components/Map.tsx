
import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { TripPlan, DayPlan } from '../types';
import { ArrowLeft, Eye, EyeOff, MousePointerClick } from 'lucide-react';
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

const MapResizer: React.FC<{ trigger?: any }> = ({ trigger }) => {
  const map = useMap();
  useEffect(() => {
    const resize = () => {
      map.invalidateSize();
    };
    
    resize();
    const timers = [100, 300, 600, 1000, 2000].map(delay => setTimeout(resize, delay));
    
    window.addEventListener('resize', resize);
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', resize);
    };
  }, [map, trigger]);
  return null;
};

interface MapUpdaterProps {
    days: DayPlan[];
}

const MapUpdater: React.FC<MapUpdaterProps> = ({ days }) => {
    const map = useMap();

    useEffect(() => {
        if (days.length === 0) return;
        const bounds = L.latLngBounds([]);
        let hasPoints = false;

        days.forEach(day => {
            day.activities.forEach(act => {
                const lat = Number(act.latitude);
                const lng = Number(act.longitude);
                if (
                    !isNaN(lat) && 
                    !isNaN(lng) && 
                    act.latitude != null && 
                    (act.latitude as any) !== '' &&
                    act.longitude != null && 
                    (act.longitude as any) !== ''
                ) {
                    bounds.extend([lat, lng]);
                    hasPoints = true;
                }
            });
        });

        if (hasPoints) {
            setTimeout(() => {
                map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5 });
            }, 100);
        }
    }, [days, map]);

    return null;
};

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
                    map.flyTo(position, Math.max(map.getZoom(), 14), { duration: 1.5 });
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
  const [visibleDays, setVisibleDays] = useState<number[]>([]);

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

  const daysToRender = useMemo(() => {
    return selectedDay 
      ? tripPlan.days.filter(d => d.day_number === selectedDay) 
      : tripPlan.days.filter(d => visibleDays.includes(d.day_number));
  }, [tripPlan, selectedDay, visibleDays]);

  return (
    <div className="h-full w-full relative flex flex-col overflow-hidden">
      {onBackToList && (
        <button 
          onClick={onBackToList}
          className="lg:hidden absolute top-4 left-4 z-[1000] bg-white text-slate-800 p-2.5 rounded-full shadow-lg border border-slate-200"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}

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
                            className={`flex items-center justify-between cursor-pointer p-1.5 rounded-lg transition-all ${isVisible ? 'hover:bg-slate-50' : 'opacity-50'}`}
                          >
                              <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dayColor }}></div>
                                  <span className="text-xs font-bold">Day {day.day_number}</span>
                              </div>
                              {isVisible ? <Eye className="w-3 h-3 text-slate-400" /> : <EyeOff className="w-3 h-3 text-slate-300" />}
                          </div>
                      );
                  })}
              </div>
          </div>
      )}

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-[1000] bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg border border-white/20 pointer-events-none flex items-center gap-3 text-xs font-medium whitespace-nowrap">
          <span className="flex items-center gap-1"><MousePointerClick className="w-3 h-3 text-indigo-300" /> Click Pin to Center</span>
      </div>

      <div className="flex-1 w-full min-h-0 relative">
          <MapContainer 
            center={[0, 0]} 
            zoom={2} 
            style={{ height: '100%', width: '100%', position: 'absolute', inset: 0 }}
            zoomControl={false}
          >
            <MapResizer trigger={selectedDay || daysToRender.length} />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            
            <MapUpdater days={daysToRender} />

            {daysToRender.map((day) => {
                const colorIndex = (day.day_number - 1) % DAY_COLORS.length;
                const dayColor = DAY_COLORS[colorIndex];
                const positions: [number, number][] = [];
                
                return (
                    <React.Fragment key={day.day_number}>
                        {day.activities.map((act, actIndex) => {
                            const lat = Number(act.latitude);
                            const lng = Number(act.longitude);
                            if (
                                isNaN(lat) || 
                                isNaN(lng) || 
                                act.latitude == null || 
                                (act.latitude as any) === '' ||
                                act.longitude == null || 
                                (act.longitude as any) === ''
                            ) return null;
                            const pos: [number, number] = [lat, lng];
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
                                        </div>
                                    </Popup>
                                </MarkerWithLogic>
                            );
                        })}
                        
                        {positions.length > 1 && (
                            <Polyline 
                                positions={positions} 
                                pathOptions={{ color: dayColor, weight: 4, opacity: 0.8, dashArray: selectedDay ? undefined : '10, 10' }} 
                            />
                        )}
                    </React.Fragment>
                );
            })}
          </MapContainer>
      </div>
    </div>
  );
};

export default Map;
