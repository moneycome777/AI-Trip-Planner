

import React, { useState, useEffect } from 'react';
import { TripPlan, Activity, UserPreferences } from '../types';
import { Train, AlertTriangle, CloudSun, Backpack, SplitSquareHorizontal, Calendar, Info, BedDouble, Wallet, Download, Home, MousePointerClick, PiggyBank, FileSpreadsheet, FileText, X, Ticket, Video, Camera, ChevronLeft, ChevronRight, Flame, Clock, ShoppingBag } from 'lucide-react';
import AdUnlockModal from './AdUnlockModal';
import AffiliateTools from './AffiliateTools';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { fetchImagesForQuery } from '../services/unsplashService';
import { AFFILIATE_LINKS } from '../constants';
import EzoicAd from './EzoicAd';

// Image Carousel Component
const ImageCarousel = ({ images, alt }: { images: string[], alt: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-5 shadow-md group border border-white/50">
            <img 
                src={images[currentIndex]} 
                alt={`${alt} - ${currentIndex + 1}`} 
                className="w-full h-full object-cover transition-opacity duration-500"
                referrerPolicy="no-referrer"
            />
            
            {images.length > 1 && (
                <>
                    <button 
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/30 px-2 py-1 rounded-full backdrop-blur-sm">
                        {images.map((_, idx) => (
                            <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-110' : 'bg-white/50'}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

interface Props {
  tripPlan: TripPlan;
  preferences: UserPreferences;
  onDayClick: (day: number | undefined) => void;
  onNewTrip: () => void;
  onShowMap: () => void;
  onCompare: () => void;
  onPlaceClick: (activity: Activity) => void;
  isExample?: boolean;
}

const ActivityCard: React.FC<{ activity: Activity, index: number, onClick: () => void, dayColor: string, isLast: boolean }> = ({ activity, index, onClick, dayColor, isLast }) => {
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
            title="Click to view details, social media links and more"
        >
            <div className="flex justify-between items-start mb-1">
                <h4 className={`font-bold text-sm ${isHotel ? 'text-indigo-900' : 'text-slate-800'}`}>{activity.place_name}</h4>
                <span className="text-[10px] font-semibold bg-white/80 text-slate-500 px-2 py-0.5 rounded-full capitalize border border-slate-200 shadow-sm">{activity.type}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-2">{activity.action}</p>
            
            {(activity.transport_tip || activity.cost_estimate) && (
                <div className="flex flex-wrap gap-2 text-[10px] font-medium opacity-80 mb-3">
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

            {/* Social & Booking Links */}
            <div className="flex flex-wrap gap-2 mt-2" onClick={(e) => e.stopPropagation()}>
                <a href={`${AFFILIATE_LINKS.KLOOK}&query=${encodeURIComponent(activity.place_name)}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded-full hover:bg-orange-100 transition border border-orange-100">
                    <Ticket className="w-3 h-3" /> {activity.cost_estimate ? `Find Tickets (est. ${activity.cost_estimate})` : 'Klook Deals'}
                </a>
                <a href={`https://www.tiktok.com/search?q=${encodeURIComponent(activity.place_name)}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-full hover:bg-slate-200 transition">
                    <Video className="w-3 h-3" /> TikTok
                </a>
                <a href={`https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(activity.place_name)}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] font-bold bg-pink-50 text-pink-600 px-2 py-1 rounded-full hover:bg-pink-100 transition">
                    <Camera className="w-3 h-3" /> Instagram
                </a>
            </div>

            {/* Hover visual cue */}
            <div className="absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <MousePointerClick className="w-4 h-4 text-indigo-300" />
            </div>
        </div>

        {/* Travel Time to Next */}
        {!isLast && activity.travel_time_to_next && (
            <div className="absolute left-3 bottom-[-14px] translate-x-[-50%] z-20 flex flex-col items-center">
                <div className="bg-white text-indigo-600 text-[9px] font-black px-2 py-0.5 rounded-full border border-indigo-100 shadow-sm flex items-center gap-1 whitespace-nowrap animate-pulse">
                    <Clock className="w-2.5 h-2.5" /> {activity.travel_time_to_next}
                </div>
            </div>
        )}
    </div>
  );
};

type Tab = 'schedule' | 'info' | 'survival' | 'budget' | 'booking';

const Itinerary: React.FC<Props> = ({ tripPlan, preferences, onDayClick, onNewTrip, onShowMap, onCompare, onPlaceClick, isExample = false }) => {
  const [activeTab, setActiveTab] = useState<Tab>('schedule');
  const [showExportAd, setShowExportAd] = useState(false);
  const [showFormatSelection, setShowFormatSelection] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  const [dayImages, setDayImages] = useState<Record<number, string[]>>({});
  const [hotelImages, setHotelImages] = useState<Record<string, string[]>>({});
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  
  // Day Colors for Map Mapping
  const DAY_COLORS = ['#3B82F6', '#F59E0B', '#10B981', '#EC4899', '#8B5CF6', '#EF4444', '#06B6D4'];

  useEffect(() => {
    const devMode = localStorage.getItem('tripgenie_dev_mode') === 'true';
    setIsDevMode(devMode);

    // Fetch Unsplash images for each day and hotels
    const fetchImages = async () => {
      const newImages: Record<number, string[]> = {};
      const newHotelImages: Record<string, string[]> = {};

      const dayPromises = tripPlan.days.map(async (day) => {
        const query = day.activities.length > 0 ? `${day.activities[0].place_name}` : `${day.theme}`;
        const urls = await fetchImagesForQuery(query);
        if (urls && urls.length > 0) {
          newImages[day.day_number] = urls;
        }
      });

      const hotelPromises = (tripPlan.suggested_hotels || []).map(async (hotel) => {
        const urls = await fetchImagesForQuery(`${hotel.name} hotel`);
        if (urls && urls.length > 0) {
          newHotelImages[hotel.name] = urls;
        }
      });

      await Promise.all([...dayPromises, ...hotelPromises]);

      setDayImages(newImages);
      setHotelImages(newHotelImages);
    };

    fetchImages();
  }, [tripPlan]);

  // Scroll to top when tab changes
  useEffect(() => {
      if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }, [activeTab]);

  const handleExportClick = () => {
      if (isDevMode || isExample) {
          setShowFormatSelection(true);
      } else {
          setShowExportAd(true);
      }
  };

  const handleExportReward = () => {
      setShowExportAd(false);
      setShowFormatSelection(true);
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
      link.setAttribute('download', `AriaTrip_Plan.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowFormatSelection(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(79, 70, 229); // Indigo 600
    doc.text("AriaTrip AI - Itinerary", 14, 20);
    
    doc.setFontSize(12);
    doc.setTextColor(50, 50, 50);
    doc.text(tripPlan.trip_summary, 14, 30, { maxWidth: 180 });
    
    doc.setFontSize(11);
    doc.setTextColor(16, 185, 129); // Emerald 500
    doc.text(`Estimated Budget: ${tripPlan.estimated_budget}`, 14, 45);

    const tableRows: any[] = [];
    tripPlan.days.forEach(day => {
        // Section Header for Day
        tableRows.push([{ content: `Day ${day.day_number}: ${day.theme}`, colSpan: 4, styles: { fillColor: [243, 244, 246], fontStyle: 'bold', textColor: [31, 41, 55] } }]);
        
        day.activities.forEach((act) => {
            tableRows.push([
                act.place_name,
                act.action,
                act.type,
                act.cost_estimate || '-'
            ]);
        });
    });

    autoTable(doc, {
        startY: 55,
        head: [['Place', 'Activity', 'Type', 'Cost']],
        body: tableRows,
        theme: 'grid',
        headStyles: { fillColor: [79, 70, 229], textColor: 255 },
        styles: { fontSize: 10, cellPadding: 3 },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 40 },
            1: { cellWidth: 'auto' },
            2: { cellWidth: 25 },
            3: { cellWidth: 30 }
        }
    });

    doc.save('AriaTrip_Plan.pdf');
    setShowFormatSelection(false);
  };

  return (
    <div className="flex flex-col h-full bg-white/40 relative">
      
      {/* Ad Modal for Export */}
      {showExportAd && (
          <AdUnlockModal 
            duration={10} 
            onClose={() => setShowExportAd(false)} 
            onReward={handleExportReward}
            title="Unlock Downloads"
            message="Watch a short ad to unlock PDF and Excel export options."
          />
      )}

      {/* Format Selection Modal */}
      {showFormatSelection && (
          <div className="fixed inset-0 z-[3000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
              <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-white/50 relative">
                   <button 
                      onClick={() => setShowFormatSelection(false)} 
                      className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full"
                    >
                       <X className="w-4 h-4" />
                   </button>
                   
                   <h3 className="text-xl font-bold text-slate-900 mb-2">Choose Format</h3>
                   <p className="text-sm text-slate-500 mb-6">Select how you want to save your itinerary.</p>
                   
                   <div className="space-y-3">
                       <button 
                          onClick={generateCSV}
                          className="w-full flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl hover:bg-emerald-100 transition group"
                       >
                           <div className="flex items-center gap-3">
                               <div className="bg-emerald-200 p-2 rounded-lg text-emerald-800 group-hover:scale-110 transition">
                                   <FileSpreadsheet className="w-5 h-5" />
                               </div>
                               <div className="text-left">
                                   <span className="block font-bold text-emerald-900">Excel / CSV</span>
                                   <span className="block text-xs text-emerald-700">Best for editing</span>
                               </div>
                           </div>
                           <Download className="w-4 h-4 text-emerald-400" />
                       </button>

                       <button 
                          onClick={generatePDF}
                          className="w-full flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-xl hover:bg-indigo-100 transition group"
                       >
                           <div className="flex items-center gap-3">
                               <div className="bg-indigo-200 p-2 rounded-lg text-indigo-800 group-hover:scale-110 transition">
                                   <FileText className="w-5 h-5" />
                               </div>
                               <div className="text-left">
                                   <span className="block font-bold text-indigo-900">PDF Document</span>
                                   <span className="block text-xs text-indigo-700">Best for sharing</span>
                               </div>
                           </div>
                           <Download className="w-4 h-4 text-indigo-400" />
                       </button>
                   </div>
              </div>
          </div>
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
             <button 
                onClick={() => setActiveTab('budget')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeTab === 'budget' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Wallet className="w-3.5 h-3.5" /> Budget
            </button>
            <button 
                onClick={() => setActiveTab('booking')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${activeTab === 'booking' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <ShoppingBag className="w-3.5 h-3.5" /> Book
            </button>
        </div>
      </div>

      {/* Content Area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden p-5 space-y-6 pb-32">
        
        {/* TAB 1: DAILY SCHEDULE */}
        {activeTab === 'schedule' && (
            <>  
                {/* Helper Banner */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-lg p-3 flex items-center gap-3 mb-2 animate-fadeIn">
                     <div className="bg-white p-1.5 rounded-full shadow-sm">
                        <MousePointerClick className="w-4 h-4 text-indigo-600" />
                     </div>
                     <p className="text-xs text-indigo-800 font-medium leading-tight">
                         <strong>Pro Tip:</strong> Click on any activity card below to view details, TikToks, and booking links.
                     </p>
                </div>

                <div className="flex justify-end gap-2 mb-2">
                    <button 
                        onClick={handleExportClick}
                        className="flex items-center gap-1 px-3 py-1.5 bg-white/60 hover:bg-white text-slate-600 border border-white/50 rounded-lg text-xs font-bold transition shadow-sm"
                    >
                        <Download className="w-3 h-3" /> Export
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
                    const images = dayImages[day.day_number];

                    return (
                        <div key={day.day_number} className="relative mb-8 bg-white/40 rounded-2xl p-2 border border-white/50 shadow-sm">
                             {/* Day Header Stick */}
                            <div 
                                className="sticky top-0 bg-white/95 backdrop-blur-md py-3 cursor-pointer z-10 border-b border-slate-100 mb-4 flex items-center justify-between rounded-xl shadow-sm px-3"
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
                                    className="text-xs text-indigo-600 font-bold bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
                                >
                                    View on Map
                                </button>
                            </div>

                            {/* Carousel Image for the Day */}
                            {images ? (
                                <ImageCarousel images={images} alt={day.theme} />
                            ) : (
                                <div className="w-full h-56 rounded-2xl bg-slate-200 animate-pulse mb-5 flex items-center justify-center text-slate-400 text-xs font-medium shadow-sm">
                                    Loading visuals...
                                </div>
                            )}

                            {/* Activities */}
                            <div className="">
                                {day.activities.map((act, actIdx) => (
                                    <ActivityCard 
                                        key={actIdx} 
                                        activity={act} 
                                        index={actIdx} 
                                        dayColor={dayColor}
                                        isLast={actIdx === day.activities.length - 1}
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
                        <div key={idx} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-white/60 relative">
                            {idx === 0 && (
                                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1 z-10">
                                    <Flame className="w-3 h-3" /> Top AI Pick
                                </span>
                            )}
                            {hotelImages[hotel.name] && hotelImages[hotel.name].length > 0 && (
                                <ImageCarousel images={hotelImages[hotel.name]} alt={hotel.name} />
                            )}
                            <div className="flex justify-between items-start mb-1 mt-2">
                                <span className="font-bold text-slate-900 text-sm">{hotel.name}</span>
                                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-md">{hotel.price_range}</span>
                            </div>
                            <p className="text-xs text-slate-500 mb-3">{hotel.description}</p>
                            <a 
                                href={`https://www.agoda.com/search?textToSearch=${encodeURIComponent(hotel.name)}`}
                                target="_blank"
                                rel="noreferrer"
                                className="block w-full text-center py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition shadow-sm"
                            >
                                Check Availability on Agoda
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

                {/* Flight Delay - AirHelp */}
                <div className="bg-blue-600 rounded-2xl p-5 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-blue-200" />
                        <h4 className="font-bold text-sm uppercase">Flight Delayed?</h4>
                    </div>
                    <p className="text-xs text-blue-100 mb-4">Get up to €600 in compensation if your flight was delayed or cancelled.</p>
                    <a 
                        href={AFFILIATE_LINKS.AIRHELP} 
                        target="_blank" 
                        rel="noreferrer"
                        className="block w-full text-center py-2 bg-white text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-50 transition"
                    >
                        Check Compensation Now
                    </a>
                </div>
            </div>
        )}

        {/* TAB 4: BUDGET BREAKDOWN */}
        {activeTab === 'budget' && (
            <div className="space-y-5 animate-fadeIn">
                <div className="bg-emerald-50/80 backdrop-blur-sm p-6 rounded-2xl border border-emerald-100 shadow-sm text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
                        <PiggyBank className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-emerald-900 text-sm uppercase tracking-wide mb-1">Total Estimated Budget</h3>
                    <p className="text-2xl font-black text-emerald-800">{tripPlan.estimated_budget}</p>
                    <p className="text-xs text-emerald-600 mt-2 font-medium">(Excluding Flights & Accommodation)</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/60 shadow-sm">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4 text-sm uppercase tracking-wide">
                        <Wallet className="w-4 h-4 text-indigo-500" /> Hidden Costs & Buffer Explanation
                    </h3>
                    <div className="prose prose-sm prose-slate">
                        <p className="text-sm text-slate-600 leading-relaxed">
                            {tripPlan.budget_breakdown || "This budget includes all itemized activities listed in the plan, plus a sensible buffer for unlisted expenses such as bottled water, random street snacks, restroom fees, and short-distance public transport rides (metro/bus) between locations."}
                        </p>
                    </div>
                </div>
            </div>
        )}

        {/* TAB 5: BOOKING TOOLS */}
        {activeTab === 'booking' && (
            <AffiliateTools 
                transportMode={preferences.transportMode} 
                destination={preferences.destination} 
            />
        )}

        <EzoicAd id={101} />
      </div>
    </div>
  );
};

export default Itinerary;