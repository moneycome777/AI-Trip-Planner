import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { TripPlan, DayPlan } from '../types';
import { ArrowLeft } from 'lucide-react';
import { DAY_COLORS } from '../constants'; // We will add this export next

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
            setTimeout(() => {
                map.flyToBounds(bounds, { padding: [50, 50] });
            }, 300);
        }
    }, [days, map]);

    return null;
};

interface Props {
  tripPlan: TripPlan;
  selectedDay?: number;
  onBackToList?: () => void;
}

const Map: React.FC<Props> = ({ tripPlan, selectedDay, onBackToList }) => {
  const daysToRender = selectedDay 
    ? tripPlan.days.filter(d => d.day_number === selectedDay) 
    : tripPlan.days;

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

      {/* Legend for All Days View */}
      {!selectedDay && (
          <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-slate-100 max-h-48 overflow-y-auto hidden sm:block">
              <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Route Legend</h4>
              <div className="space-y-1.5">
                  {tripPlan.days.map((day, idx) => (
                      <div key={day.day_number} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: DAY_COLORS[idx % DAY_COLORS.length] }}></div>
                          <span className="text-xs font-semibold text-slate-700">Day {day.day_number}</span>
                      </div>
                  ))}
              </div>
          </div>
      )}

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
                            <Marker 
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
                            </Marker>
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