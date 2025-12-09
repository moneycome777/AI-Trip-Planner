import React, { useState, useRef, useEffect } from 'react';
import { TripPlan, UserPreferences, Activity, ChatMessage } from '../types';
import Itinerary from './Itinerary';
import Map from './Map';
import ChatAssistant from './ChatAssistant';
import { chatWithAI } from '../services/geminiService';
import ComparisonModal from './ComparisonModal';
import PlaceDetailsModal from './PlaceDetailsModal';
import AdUnlockModal from './AdUnlockModal'; 
import { GripVertical } from 'lucide-react';

interface Props {
  initialPlan: TripPlan;
  preferences: UserPreferences;
  onNewTrip: () => void;
}

const Dashboard: React.FC<Props> = ({ initialPlan, preferences, onNewTrip }) => {
  const [plan, setPlan] = useState<TripPlan>(initialPlan);
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
  const [isUpdating, setIsUpdating] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [showComparison, setShowComparison] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Monetization / Limits State
  const [modCount, setModCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);
  const [showAd, setShowAd] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'CHAT' | 'COMPARE', payload?: string } | null>(null);

  // Constants
  const FREE_MODIFICATION_LIMIT = 4; // Increased for chat interactions
  const FREE_COMPARE_LIMIT = 1;

  // Resizable panel state
  const [leftPanelWidth, setLeftPanelWidth] = useState(35); 
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      if (newWidth > 20 && newWidth < 80) {
        setLeftPanelWidth(newWidth);
      }
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // --- Logic for Chat & Modifications ---
  const executeChat = async (userMessage: string) => {
    // 1. Add User Message
    const userMsgObj: ChatMessage = { id: Date.now().toString(), role: 'user', text: userMessage };
    setMessages(prev => [...prev, userMsgObj]);
    
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
      if (modCount >= FREE_MODIFICATION_LIMIT) {
          setPendingAction({ type: 'CHAT', payload: message });
          setShowAd(true);
      } else {
          executeChat(message);
      }
  };

  // --- Logic for Comparison ---
  const handleCompareRequest = () => {
      if (compareCount >= FREE_COMPARE_LIMIT) {
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

  const handleBookTrip = () => {
    // Simplified logic for brevity, same as previous
    const sanitizeCity = (input: string) => input ? input.split(',')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') : "everywhere";
    const origin = sanitizeCity(preferences.departFrom);
    const dest = sanitizeCity(preferences.destination);
    const url = `https://www.skyscanner.com/transport/flights/${origin}/${dest}`;
    window.open(url, '_blank');
  };

  const handleDayClick = (day: number | undefined) => {
      setSelectedDay(day);
      if (window.innerWidth < 1024) {
          setMobileView('map');
      }
  };

  return (
    <div ref={containerRef} className="flex h-full w-full relative overflow-hidden">
      
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
        className={`${mobileView === 'list' ? 'block' : 'hidden'} lg:block h-full border-r border-gray-200 relative bg-white flex flex-col z-20 shadow-xl lg:shadow-none transition-all duration-75 ease-linear`}
        style={{ width: window.innerWidth >= 1024 ? `${leftPanelWidth}%` : '100%' }}
      >
        <Itinerary 
            tripPlan={plan} 
            onDayClick={handleDayClick} 
            onNewTrip={onNewTrip} 
            onShowMap={() => setMobileView('map')}
            onCompare={handleCompareRequest} 
            onPlaceClick={(activity) => setSelectedActivity(activity)}
        />
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-30 lg:bottom-8 w-max">
            <button 
                onClick={handleBookTrip}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition transform flex items-center gap-2 ring-2 ring-white"
            >
                Book Flights ✈️
            </button>
        </div>
      </div>

      {/* Resize Handle */}
      <div 
        className="hidden lg:flex w-5 hover:w-6 cursor-col-resize items-center justify-center bg-gray-100 border-l border-r border-gray-300 absolute top-0 bottom-0 z-50 group transition-all shadow-md hover:bg-indigo-50"
        style={{ left: `${leftPanelWidth}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
      >
        <div className="h-8 w-1 flex flex-col justify-center gap-0.5">
             <GripVertical className="w-4 h-4 text-gray-400 group-hover:text-indigo-500" />
        </div>
      </div>

      {/* Right Panel */}
      <div 
        className={`${mobileView === 'map' ? 'block' : 'hidden'} lg:block h-full relative z-10 bg-gray-100`}
        style={{ width: window.innerWidth >= 1024 ? `${100 - leftPanelWidth}%` : '100%' }}
      >
        <Map 
            tripPlan={plan} 
            selectedDay={selectedDay} 
            onBackToList={() => setMobileView('list')}
        />
      </div>

      {/* Chat Overlay */}
      <ChatAssistant 
        messages={messages} 
        onSendMessage={handleChatRequest} 
        isUpdating={isUpdating} 
      />

      {showComparison && (
          <ComparisonModal 
            currentPlan={plan} 
            preferences={preferences} 
            onClose={() => setShowComparison(false)} 
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
