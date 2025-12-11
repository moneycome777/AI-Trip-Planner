import React, { useState, useEffect } from 'react';
import { TripPlan, Activity } from '../types';
import { Train, AlertTriangle, CloudSun, Backpack, Lock, Map as MapIcon, Loader2, SplitSquareHorizontal, Hotel, Calendar, Info, BedDouble, Wallet, ArrowLeft, Download, Clock, Sun, Moon, Utensils, Home } from 'lucide-react';
import AdUnlockModal from './AdUnlockModal';

interface Props {
  tripPlan: TripPlan;
  onDayClick: (day: number | undefined) => void;
  onNewTrip: () => void;
  onShowMap: () => void;
  onCompare: () => void;
  onPlaceClick: (activity: Activity) => void;
}

const ActivityCard: React.FC<{ activity: Activity, index: number, onClick: () => void, dayColor: string }> = ({ activity, index, onClick, dayColor }) => {
  const isHotel = activity.type === 'hotel' || activity.place_name.toLowerCase().includes('hotel');
  
  return (
    <div className="relative pl-8 py-2 group">
        {/* Timeline Line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-200 group-last:bottom-auto group-last:h-6"></div>
        {/* Timeline Dot */}
        <div 
            className="absolute left-[5px] top-6 w-4 h-4 rounded-full border-2 border-white shadow-sm z-10 flex items-center justify-center text-[8px] font-bold text-white"
            style={{ backgroundColor: dayColor }}
        >
            {index + 1}
        </div>

        <div 
            onClick={onClick}
            className={`cursor-pointer bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white/50 shadow-sm hover:shadow-md transition-all hover:translate-x-1 relative overflow-hidden ${isHotel ? 'bg-indigo-50/50 border-indigo-100' : ''}`}
        >
            <div className="flex justify-between items-start mb-1">
                <h4 className={`font-bold text-sm ${isHotel ? 'text-indigo-900' : 'text-slate-800'}`}>{activity.place_name}</h4>
                <span className="text-[10px] font-semibold bg-white/80 text-slate-500 px-2 py-0.5 rounded-full capitalize border border-slate-200 shadow-sm">{activity.type}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-2">{activity.action}</p>
            
            {(activity.transport_tip || activity.cost_estimate) && (
                <div className="flex flex-wrap gap-2 text-[10px] font-medium opacity-80">
                    {activity.transport_tip && (
                        <span className="flex items-center gap-1 text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                            <Train className="w-3 h-3" /> {activity.transport_tip}
                        </span>
                    )}
                    {activity.cost_estimate && (
                        <span className="flex items-center gap-1 text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                            <Wallet className="w-3 h-3" /> {activity.cost_estimate}
                        </span>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};

type Tab = 'schedule' | 'info' | 'survival';

const Itinerary: React.FC<Props> = ({ tripPlan, onDayClick, onNewTrip, onShowMap, onCompare, onPlaceClick }) => {
  const [activeTab, setActiveTab] = useState<Tab>('schedule');
  const [unlockedDelay, setUnlockedDelay] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [showExportAd, setShowExportAd] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  
  // Day Colors for Map Mapping
  const DAY_COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6', '#EF4444', '#06B6D4'];

  useEffect(() => {
    const devMode = localStorage.getItem('tripgenie_dev_mode') === 'true';
    setIsDevMode(devMode);
    
    if (devMode) {
        setUnlockedDelay(true); // Auto unlock if dev mode
    }
  }, []);

  const handleUnlock = () => {
      // If dev mode, unlock immediately
      if (isDevMode) {
          setUnlockedDelay(true);
          return;
      }
      setIsUnlocking(true);
      setTimeout(() => {
          setIsUnlocking(false);
          setUnlockedDelay(true);
      }, 2000);
  };

  const handleExportClick = () => {
      if (isDevMode) {
          generateCSV();
      } else {
          setShowExportAd(true);
      }
  };

  const generateCSV = () => {
      const header = ['Day', 'Theme', 'Place', 'Action', 'Type', 'Cost Estimate'];
      const rows: string[][] = [];

      tripPlan.days.forEach(day => {
          day.activities.forEach(act => {
              rows.push([
                  `Day ${day.day_number}`,
                  day.theme,
                  `"${act.place_name}"`,
                  `"${act.action}"`,
                  act.type,
                  act.cost_estimate || ''
              ]);
          });
      });

      const csvContent = [
          header.join(','),
          ...rows.map(row => row.join(','))
      ].join('\n');

      const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `AriaTrip_Plan_${new Date().toISOString().slice(0,10)}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full bg-white/40 relative">
      
      {/* Ad Modal for Export */}
      {showExportAd && (
          <AdUnlockModal 
            duration={15} // Require 15 seconds watch time for excel download
            onClose={() => setShowExportAd(false)} 
            onReward={() => { setShowExportAd(false); generateCSV(); }}
            title="Unlock Download"
            message="Watch a full ad to download your complete itinerary as an Excel/CSV file."
          />
      )}

      {/* Simplified Header */}
      <div className="bg-white/80 backdrop-blur-md z-30 border-b border-white/50 flex-shrink-0 p-4">
        
        {/* Title Row */}
        <div className="flex items-start gap-3 mb-4">
            <button 
                onClick={onNewTrip}
                className="p-2 -ml-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition flex flex-col items-center"
                title="Back to Home / Plan New Trip"
            >
                <Home className="w-5 h-5" />
            </button>
            <div className="flex-1">
                <h2 className="font-bold text-slate-900 text-xl leading-tight">
                    {tripPlan.trip_summary}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md border border-indigo-100">
                        {tripPlan.days.length} Days
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-100">
                        {tripPlan.estimated_budget}
                    </span>
                </div>
            </div>
        </div>

        {/* Tab Bar */}
        <div className="flex bg-slate-100/80 p-1 rounded-xl">
            <button 
                onClick={() => setActiveTab('schedule')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeTab === 'schedule' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Calendar className="w-3.5 h-3.5" /> Plan
            </button>
            <button 
                onClick={() => setActiveTab('info')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeTab === 'info' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Info className="w-3.5 h-3.5" /> Info
            </button>
            <button 
                onClick={() => setActiveTab('survival')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeTab === 'survival' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Backpack className="w-3.5 h-3.5" /> Survival
            </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 space-y-6 pb-32">
        
        {/* TAB 1: DAILY SCHEDULE */}
        {activeTab === 'schedule' && (
            <>  
                <div className="flex justify-end gap-2 mb-2">
                    <button 
                        onClick={handleExportClick}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white/60 hover:bg-white text-slate-600 border border-white/50 rounded-lg text-xs font-bold transition shadow-sm"
                    >
                        <Download className="w-3 h-3" /> Excel
                    </button>
                    <button 
                        onClick={onCompare}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white/60 hover:bg-white text-slate-600 border border-white/50 rounded-lg text-xs font-bold transition shadow-sm"
                    >
                        <SplitSquareHorizontal className="w-3 h-3" /> Compare
                    </button>
                </div>

                {tripPlan.days.map((day, idx) => {
                    const dayColor = DAY_COLORS[idx % DAY_COLORS.length];
                    return (
                        <div key={day.day_number} className="relative">
                             {/* Day Header Stick */}
                            <div 
                                className="sticky top-0 bg-white/90 backdrop-blur-md py-3 cursor-pointer z-10 border-b border-white/50 mb-2 flex items-center justify-between rounded-b-xl shadow-sm px-2"
                                onClick={() => onDayClick(day.day_number)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-sm" style={{ backgroundColor: dayColor }}>
                                        {day.day_number}
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-800">{day.theme}</h3>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onShowMap(); onDayClick(day.day_number); }}
                                    className="text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1.5 rounded-full lg:hidden"
                                >
                                    Map
                                </button>
                            </div>

                            {/* Activities */}
                            <div className="">
                                {day.activities.map((act, actIdx) => (
                                    <ActivityCard 
                                        key={actIdx} 
                                        activity={act} 
                                        index={actIdx} 
                                        dayColor={dayColor}
                                        onClick={() => onPlaceClick(act)} 
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </>
        )}

        {/* TAB 2: TRIP INFO (HOTELS, WEATHER, DATES) */}
        {activeTab === 'info' && (
            <div className="space-y-5 animate-fadeIn">
                 {/* Suggested Dates */}
                 <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-white/60 shadow-sm">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3 text-sm uppercase tracking-wide">
                        <Calendar className="w-4 h-4 text-purple-500" /> Best Time to Visit
                    </h3>
                    <p className="text-lg font-bold text-slate-900 mb-1">{tripPlan.suggested_dates || "Flexible Dates"}</p>
                    <p className="text-sm text-slate-600 leading-relaxed italic">{tripPlan.date_reasoning}</p>
                 </div>

                 {/* Weather Forecast */}
                 <div className="bg-orange-50/80 backdrop-blur-sm p-5 rounded-2xl border border-orange-100 shadow-sm">
                    <h3 className="font-bold text-orange-800 flex items-center gap-2 mb-3 text-sm uppercase tracking-wide">
                        <CloudSun className="w-4 h-4" /> Local Forecast
                    </h3>
                    <p className="text-sm text-orange-900 leading-relaxed font-medium">
                        {tripPlan.weather_forecast}
                    </p>
                 </div>

                 {/* Hotels */}
                 <div className="space-y-3">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm uppercase tracking-wide px-1">
                        <BedDouble className="w-4 h-4 text-indigo-500" /> Recommended Stays
                    </h3>
                    {tripPlan.suggested_hotels?.map((hotel, idx) => (
                        <div key={idx} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/60">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-slate-900 text-sm">{hotel.name}</span>
                                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md">{hotel.price_range}</span>
                            </div>
                            <p className="text-xs text-slate-500 mb-3">{hotel.description}</p>
                            <a 
                                href={`https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotel.name)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-full text-center py-2 rounded-lg bg-indigo-50 text-indigo-600 text-xs font-bold hover:bg-indigo-100 transition"
                            >
                                Check Availability
                            </a>
                        </div>
                    ))}
                 </div>
            </div>
        )}

        {/* TAB 3: SURVIVAL KIT */}
        {activeTab === 'survival' && (
            <div className="space-y-5 animate-fadeIn">
                 {/* Warnings */}
                <div className="bg-rose-50/80 backdrop-blur-sm p-5 rounded-2xl border border-rose-100 shadow-sm">
                    <h3 className="font-bold text-rose-800 flex items-center gap-2 mb-3 text-sm uppercase">
                        <AlertTriangle className="w-4 h-4" /> Safety & Scams
                    </h3>
                    <ul className="list-disc list-inside text-sm text-rose-700 space-y-2">
                        {tripPlan.warnings.map((w, i) => <li key={i} className="leading-relaxed">{w}</li>)}
                    </ul>
                </div>

                {/* Packing */}
                <div className="bg-blue-50/80 backdrop-blur-sm p-5 rounded-2xl border border-blue-100 shadow-sm">
                    <h3 className="font-bold text-blue-800 flex items-center gap-2 mb-3 text-sm uppercase">
                        <Backpack className="w-4 h-4" /> Packing Essentials
                    </h3>
                    <ul className="list-disc list-inside text-sm text-blue-700 space-y-2">
                        {tripPlan.packing_list.map((w, i) => <li key={i} className="leading-relaxed">{w}</li>)}
                    </ul>
                </div>

                {/* Transport */}
                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-white/60">
                    <h4 className="font-bold flex items-center gap-2 text-slate-700 text-sm mb-2 uppercase"><Train className="w-4 h-4"/> Transport</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{tripPlan.transport_advice}</p>
                </div>

                {/* Locked Flight Delay Section */}
                <div className={`p-5 rounded-2xl border-2 border-dashed transition-all ${unlockedDelay ? 'bg-emerald-50/80 border-emerald-200' : 'bg-slate-50/80 border-slate-300'}`}>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Clock className="w-4 h-4" /> Flight Delay Plan
                        </h3>
                        {!unlockedDelay && <Lock className="w-4 h-4 text-slate-400" />}
                    </div>
                    {unlockedDelay ? (
                        <p className="text-sm text-emerald-800 animate-fadeIn leading-relaxed">
                            {tripPlan.flight_delay_backup || "If your flight is delayed, head to the airport lounge (2F) or book a pod at the Capsule Hotel in Terminal 1. Relax, your trip is still on!"}
                        </p>
                    ) : (
                        <div className="text-center py-2">
                            <p className="text-xs text-slate-500 mb-4">Unlock expert advice for delayed flights & missed connections.</p>
                            <button 
                                onClick={handleUnlock}
                                disabled={isUnlocking}
                                className="bg-slate-900 text-white text-xs px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 mx-auto disabled:opacity-70 shadow-lg shadow-slate-200"
                            >
                                {isUnlocking ? <><Loader2 className="w-3 h-3 animate-spin"/> Unlocking...</> : "Watch Ad to Unlock"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Itinerary;