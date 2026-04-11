
import React, { useState, useEffect } from 'react';
import { TripPlan, UserPreferences, Activity, ChatMessage } from '../types';
import Itinerary from './Itinerary';
import Map from './Map';
import ChatAssistant from './ChatAssistant';
import { chatWithAI } from '../services/geminiService';
import ComparisonModal from './ComparisonModal';
import PlaceDetailsModal from './PlaceDetailsModal';
import AdUnlockModal from './AdUnlockModal'; 
import { X, Plane, Building2, Ticket, ExternalLink } from 'lucide-react';
import { CACHE_KEY_PLAN } from '../constants';

interface Props {
  initialPlan: TripPlan;
  preferences: UserPreferences;
  onNewTrip: () => void;
  isExample?: boolean;
}

const Dashboard: React.FC<Props> = ({ initialPlan, preferences, onNewTrip, isExample = false }) => {
  const [plan, setPlan] = useState<TripPlan>(initialPlan);
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
  const [isUpdating, setIsUpdating] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [showComparison, setShowComparison] = useState(false);
  const [showCompareConfirm, setShowCompareConfirm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [isDevMode, setIsDevMode] = useState(false);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Monetization / Limits State
  const [modCount, setModCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'CHAT' | 'COMPARE', payload?: string } | null>(null);

  // Constants
  const FREE_MODIFICATION_LIMIT = 3; 
  const FREE_COMPARE_LIMIT = 1;

  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    setIsDevMode(localStorage.getItem('tripgenie_dev_mode') === 'true');
  }, []);

  // --- Logic for Chat & Modifications ---
  const executeChat = async (userMessage: string) => {
    // 1. Add User Message
    const userMsgObj: ChatMessage = { id: Date.now().toString(), role: 'user', text: userMessage };
    setMessages(prev => [...prev, userMsgObj]);
    
    if (isExample) {
        setIsUpdating(true);
        setTimeout(() => {
            const aiMsgObj: ChatMessage = { 
                id: (Date.now() + 1).toString(), 
                role: 'model', 
                text: "This is just a demo to show you how the interface works! To use the AI assistant to actually modify plans, please go back and generate a new trip.",
                isPlanUpdate: false
            };
            setMessages(prev => [...prev, aiMsgObj]);
            setIsUpdating(false);
        }, 1000);
        return;
    }

    setIsUpdating(true);
    try {
      // 2. Call AI
      const response = await chatWithAI(plan, userMessage);
      
      // 3. Handle Response
      const aiMsgObj: ChatMessage = { 
          id: (Date.now() + 1).toString(), 
          role: 'model', 
          text: response.answer,
          isPlanUpdate: response.intent === 'modify'
      };
      setMessages(prev => [...prev, aiMsgObj]);

      // 4. Update Plan if intent was 'modify'
      if (response.intent === 'modify' && response.modified_plan) {
          setPlan(response.modified_plan);
          setModCount(prev => prev + 1);
          // Persist the modification to cache so it survives refresh/navigation
          if (!isExample) {
              localStorage.setItem(CACHE_KEY_PLAN, JSON.stringify(response.modified_plan));
          }
      }
    } catch (e) {
      const errorMsg: ChatMessage = { id: Date.now().toString(), role: 'model', text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChatRequest = (message: string) => {
      // Check limits
      if (!isDevMode && modCount >= FREE_MODIFICATION_LIMIT) {
          setPendingAction({ type: 'CHAT', payload: message });
          setShowAd(true);
      } else {
          executeChat(message);
      }
  };

  // --- Logic for Comparison ---
  const handleCompareClick = () => {
      setShowCompareConfirm(true);
  };

  const handleCompareRequest = () => {
      setShowCompareConfirm(false);
      if (!isDevMode && !isExample && compareCount >= FREE_COMPARE_LIMIT) {
          setPendingAction({ type: 'COMPARE' });
          setShowAd(true);
      } else {
          setCompareCount(prev => prev + 1);
          setShowComparison(true);
      }
  };

  // --- Ad Reward Handler ---
  const handleAdReward = () => {
      setShowAd(false);
      
      if (pendingAction?.type === 'CHAT' && pendingAction.payload) {
          setModCount(0); // Reset count
          executeChat(pendingAction.payload);
      } else if (pendingAction?.type === 'COMPARE') {
          setCompareCount(prev => prev + 1);
          setShowComparison(true);
      }
      setPendingAction(null);
  };

  const handleDayClick = (day: number | undefined) => {
      setSelectedDay(day);
      if (window.innerWidth < 1024) {
          setMobileView('map');
      }
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative">
      
      {showAd && (
          <AdUnlockModal 
            duration={15}
            onClose={() => setShowAd(false)}
            onReward={handleAdReward}
            title={pendingAction?.type === 'CHAT' ? "Refill AI Credits" : "Unlock Comparison"}
            message={pendingAction?.type === 'CHAT' 
                ? "You've used your free AI interactions. Watch an ad to continue chatting." 
                : "Watch a short ad to compare your trip."}
          />
      )}

      {/* Left Panel */}
      <div 
        className={`${mobileView === 'list' ? 'block' : 'hidden'} lg:block h-full border-r border-slate-200 relative bg-white flex flex-col z-20 shadow-xl lg:shadow-none transition-all duration-300 ease-in-out`}
        style={{ width: window.innerWidth >= 1024 ? (isMapExpanded ? '0%' : '50%') : '100%', opacity: isMapExpanded ? 0 : 1, overflow: isMapExpanded ? 'hidden' : 'visible' }}
      >
        <Itinerary 
            tripPlan={plan} 
            onDayClick={handleDayClick} 
            onNewTrip={onNewTrip} 
            onShowMap={() => setMobileView('map')}
            onCompare={handleCompareClick} 
            onPlaceClick={(activity) => setSelectedActivity(activity)}
            isExample={isExample}
        />
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 lg:bottom-8 w-max">
            <button 
                onClick={() => setShowBookingModal(true)}
                className="bg-slate-900 text-white font-bold py-3 px-8 rounded-full shadow-xl hover:scale-105 transition transform flex items-center gap-2 border border-slate-700"
            >
                Ready to Book? 🎒
            </button>
        </div>
      </div>

      {/* Right Panel - Map */}
      <div 
        className={`${mobileView === 'map' ? 'flex' : 'hidden'} lg:flex h-full relative z-10 bg-slate-50 flex-col overflow-hidden transition-all duration-300 ease-in-out`}
        style={{ width: window.innerWidth >= 1024 ? (isMapExpanded ? '100%' : '50%') : '100%' }}
      >
        {/* Map Expand Toggle (Desktop Only) */}
        <button
          onClick={() => setIsMapExpanded(!isMapExpanded)}
          className="hidden lg:flex absolute top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          title={isMapExpanded ? "Show Itinerary" : "Expand Map"}
        >
          {isMapExpanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          )}
        </button>
        <Map 
            tripPlan={plan} 
            selectedDay={selectedDay} 
            onBackToList={() => setMobileView('list')}
            onClearSelection={() => setSelectedDay(undefined)}
        />
      </div>

      {/* Chat Overlay */}
      <ChatAssistant 
        messages={messages} 
        onSendMessage={handleChatRequest} 
        isUpdating={isUpdating} 
        isExample={isExample}
      />

      {showBookingModal && (
          <div className="fixed inset-0 z-[4000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
              <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-white/50 relative">
                  <button onClick={() => setShowBookingModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full transition">
                      <X className="w-4 h-4" />
                  </button>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Book Your Trip</h3>
                  <p className="text-sm text-slate-500 mb-6">Complete your itinerary by booking your flights, hotels, and activities.</p>

                  <div className="space-y-3">
                      <a href={`https://www.skyscanner.com/transport/flights-from/anywhere/to/${encodeURIComponent(preferences.destination)}`} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition group">
                          <div className="flex items-center gap-3">
                              <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Plane className="w-5 h-5" /></div>
                              <div className="text-left">
                                  <div className="font-bold text-slate-800 group-hover:text-blue-700">Flights to {preferences.destination}</div>
                                  <div className="text-xs text-slate-500">via Skyscanner</div>
                              </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                      </a>
                      <a href={`https://www.agoda.com/search?textToSearch=${encodeURIComponent(preferences.destination)}`} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-rose-50 hover:border-rose-200 transition group">
                          <div className="flex items-center gap-3">
                              <div className="bg-rose-100 p-2 rounded-xl text-rose-600"><Building2 className="w-5 h-5" /></div>
                              <div className="text-left">
                                  <div className="font-bold text-slate-800 group-hover:text-rose-700">Hotels in {preferences.destination}</div>
                                  <div className="text-xs text-slate-500">via Agoda</div>
                              </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-rose-500" />
                      </a>
                      <a href={`https://www.klook.com/en-US/search/result/?query=${encodeURIComponent(preferences.destination)}`} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 transition group">
                          <div className="flex items-center gap-3">
                              <div className="bg-orange-100 p-2 rounded-xl text-orange-600"><Ticket className="w-5 h-5" /></div>
                              <div className="text-left">
                                  <div className="font-bold text-slate-800 group-hover:text-orange-700">Activities & Passes</div>
                                  <div className="text-xs text-slate-500">via Klook</div>
                              </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-orange-500" />
                      </a>
                  </div>
              </div>
          </div>
      )}

      {showCompareConfirm && (
          <div className="fixed inset-0 z-[3000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
              <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl border border-white/50 relative">
                   <button 
                      onClick={() => setShowCompareConfirm(false)} 
                      className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full transition"
                    >
                       <X className="w-4 h-4" />
                   </button>
                   
                   <h3 className="text-xl font-bold text-slate-900 mb-2">Compare Itinerary?</h3>
                   <p className="text-sm text-slate-500 mb-6">This will compare your current AI-generated itinerary with a traditional travel agency's group tour. Do you want to proceed?</p>
                   
                   <div className="flex justify-end gap-3">
                       <button 
                          onClick={() => setShowCompareConfirm(false)}
                          className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                       >
                           Cancel
                       </button>
                       <button 
                          onClick={handleCompareRequest}
                          className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
                       >
                           Yes, Compare
                       </button>
                   </div>
              </div>
          </div>
      )}

      {showComparison && (
          <ComparisonModal 
            currentPlan={plan} 
            preferences={preferences} 
            onClose={() => setShowComparison(false)} 
            isExample={isExample}
          />
      )}

      {selectedActivity && (
          <PlaceDetailsModal 
            activity={selectedActivity} 
            onClose={() => setSelectedActivity(null)} 
          />
      )}
    </div>
  );
};

export default Dashboard;
