import React, { useEffect, useState, useMemo } from 'react';
import { APIProvider, Map as GoogleMap, AdvancedMarker, Pin, useMap, useApiLoadingStatus } from '@vis.gl/react-google-maps';
import { TripPlan, DayPlan } from '../types';
import { ArrowLeft, Eye, EyeOff, MousePointerClick } from 'lucide-react';
import { DAY_COLORS } from '../constants';

// Component to handle bounds updating
const MapUpdater = ({ days }: { days: DayPlan[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || days.length === 0) return;

    const bounds = new window.google.maps.LatLngBounds();
    let hasPoints = false;

    days.forEach(day => {
      day.activities.forEach(act => {
        const lat = Number(act.latitude);
        const lng = Number(act.longitude);
        if (!isNaN(lat) && !isNaN(lng) && act.latitude != null && act.longitude != null) {
          bounds.extend({ lat, lng });
          hasPoints = true;
        }
      });
    });

    if (hasPoints) {
      map.fitBounds(bounds, { top: 50, bottom: 50, left: 50, right: 50 });
    }
  }, [days, map]);

  return null;
};

// Component to handle polylines
const PolylineRenderer = ({ days }: { days: DayPlan[] }) => {
  const map = useMap();
  const [polylines, setPolylines] = useState<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!map) return;

    // Clear old polylines
    polylines.forEach(p => p.setMap(null));
    const newPolylines: google.maps.Polyline[] = [];

    days.forEach(day => {
      const colorIndex = (day.day_number - 1) % DAY_COLORS.length;
      const dayColor = DAY_COLORS[colorIndex];
      const path: google.maps.LatLngLiteral[] = [];

      day.activities.forEach(act => {
        const lat = Number(act.latitude);
        const lng = Number(act.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          path.push({ lat, lng });
        }
      });

      if (path.length > 1) {
        const polyline = new window.google.maps.Polyline({
          path,
          geodesic: true,
          strokeColor: dayColor,
          strokeOpacity: 0.8,
          strokeWeight: 4,
          map
        });
        newPolylines.push(polyline);
      }
    });

    setPolylines(newPolylines);

    return () => {
      newPolylines.forEach(p => p.setMap(null));
    };
  }, [days, map]);

  return null;
};

const MapContent = ({ daysToRender }: { daysToRender: DayPlan[] }) => {
  const status = useApiLoadingStatus();

  if (status !== 'LOADED') {
    return (
      <div className="h-full w-full flex items-center justify-center bg-slate-100 text-slate-500 p-6 text-center">
        <div>
          {status === 'AUTH_FAILURE' ? (
            <>
              <p className="font-bold mb-2 text-red-500">Map Authentication Failed</p>
              <p className="text-sm">Your API key is restricted. Please ensure this URL is added to your Google Cloud Console.</p>
            </>
          ) : status === 'FAILED' ? (
            <>
              <p className="font-bold mb-2 text-red-500">Map Failed to Load</p>
              <p className="text-sm">Please check your network connection.</p>
            </>
          ) : (
            <p className="font-bold mb-2">Loading Map...</p>
          )}
        </div>
      </div>
    );
  }

  // Double check that marker library is loaded to prevent crash
  if (!window.google?.maps?.marker) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-slate-100 text-slate-500 p-6 text-center">
        <div>
          <p className="font-bold mb-2 text-red-500">Map Libraries Missing</p>
          <p className="text-sm">The required Google Maps libraries failed to load.</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      defaultZoom={3}
      defaultCenter={{ lat: 0, lng: 0 }}
      mapId="DEMO_MAP_ID"
      disableDefaultUI={true}
      zoomControl={true}
    >
      <MapUpdater days={daysToRender} />
      <PolylineRenderer days={daysToRender} />

      {daysToRender.map((day) => {
          const colorIndex = (day.day_number - 1) % DAY_COLORS.length;
          const dayColor = DAY_COLORS[colorIndex];
          
          return (
              <React.Fragment key={day.day_number}>
                  {day.activities.map((act, actIndex) => {
                      const lat = Number(act.latitude);
                      const lng = Number(act.longitude);
                      if (isNaN(lat) || isNaN(lng) || act.latitude == null || act.longitude == null) return null;

                      return (
                          <AdvancedMarker 
                              key={`${day.day_number}-${actIndex}`}
                              position={{ lat, lng }}
                              title={act.place_name}
                          >
                              <Pin background={dayColor} borderColor={'#ffffff'} glyphColor={'#ffffff'} />
                          </AdvancedMarker>
                      );
                  })}
              </React.Fragment>
          );
      })}
    </GoogleMap>
  );
};

interface Props {
  tripPlan: TripPlan;
  selectedDay?: number;
  onBackToList?: () => void;
}

const Map: React.FC<Props> = ({ tripPlan, selectedDay, onBackToList }) => {
  const [visibleDays, setVisibleDays] = useState<number[]>([]);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

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

  if (!apiKey) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-slate-100 text-slate-500 p-6 text-center">
        <div>
          <p className="font-bold mb-2">Google Maps API Key Missing</p>
          <p className="text-sm">Please add VITE_GOOGLE_MAPS_API_KEY to your environment variables.</p>
        </div>
      </div>
    );
  }

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
        <APIProvider apiKey={apiKey} libraries={['marker']}>
          <MapContent daysToRender={daysToRender} />
        </APIProvider>
      </div>
    </div>
  );
};

export default Map;
