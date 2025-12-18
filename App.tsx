
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPlanner from './components/MainPlanner';
import About from './pages/About';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import Privacy from './pages/Privacy';
import KnowledgeBase from './pages/KnowledgeBase';
import SecurityGuard from './components/SecurityGuard';

const App: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    localStorage.removeItem('tripgenie_dev_mode');
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'AriaTrip AI - Free Smart Travel Planner',
      '/about': 'About AriaTrip AI - How it Works',
      '/contact': 'Contact Us - AriaTrip Support',
      '/destinations': 'Popular Travel Destinations - Japan, Europe, Asia',
      '/privacy': 'Privacy Policy & Terms - AriaTrip AI',
      '/how-do-i-plan-a-trip': 'How do I plan a trip? - Ultimate Guide 2024',
      '/what-is-the-best-way-to-plan-a-trip': 'What is the best way to plan a trip? - AriaTrip AI',
      '/how-long-does-it-take-to-plan-a-trip': 'How long does it take to plan a trip? - Time Breakdown',
      '/what-should-i-plan-first-when-traveling': 'What should I plan first when traveling? - Step-by-Step',
      '/is-it-better-to-plan-a-trip-yourself-or-use-a-planner': 'Is it better to plan a trip yourself or use a planner?',
      '/what-is-an-ai-trip-planner': 'What is an AI trip planner? - AriaTrip AI',
      '/is-an-ai-trip-planner-accurate': 'Is an AI trip planner accurate? - Expert Breakdown',
      '/can-ai-create-a-travel-itinerary': 'Can AI create a travel itinerary? - Full Guide',
      '/best-ai-trip-planner': 'Best AI trip planner - AriaTrip vs Others',
      '/ai-trip-planner-vs-travel-agent': 'AI trip planner vs travel agent - Pros & Cons',
      // New Routes Meta
      '/how-many-days-in-tokyo': 'How many days do I need in Tokyo? - Expert Guide',
      '/best-itinerary-for-paris': 'Best itinerary for Paris - 4 Day Optimized Route',
      '/3-day-itinerary-london': '3 day itinerary for London - Landmarks & Culture',
      '/things-to-do-in-new-york': 'Things to do in New York City - Top Attractions',
      '/best-places-to-visit-in-japan': 'Best places to visit in Japan - 2024 Travel Guide',
      '/how-much-does-a-trip-to-singapore-cost': 'How much does a trip to Singapore cost? - Budgeting',
      '/how-to-plan-a-trip-on-a-budget': 'How to plan a trip on a budget - Pro Tips',
      '/is-switzerland-expensive-to-visit': 'Is Switzerland expensive to visit? - Cost Analysis',
      '/best-time-to-visit-kyoto': 'Best time to visit Kyoto - Seasons & Crowds',
      '/how-far-in-advance-to-plan-trip': 'How far in advance should I plan a trip? - Timing'
    };
    
    const title = titles[location.pathname] || 'AriaTrip AI - Elegant Travel Planner';
    document.title = title;
  }, [location]);

  return (
    <div className="h-screen w-screen overflow-hidden font-sans select-none flex flex-col relative text-slate-800">
      <SecurityGuard />
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 animate-gradient-xy">
         <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-blue-200/40 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute top-[40%] right-[-10%] w-[60vh] h-[60vh] bg-purple-200/40 rounded-full blur-[100px] animate-pulse delay-1000"></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[50vh] h-[50vh] bg-rose-200/40 rounded-full blur-[100px] animate-pulse delay-2000"></div>
      </div>
      
      {showNavbar && <div className="flex-shrink-0 z-[100]"><Navbar /></div>}

      <div className={`flex-1 w-full relative overflow-y-auto overflow-x-hidden flex flex-col z-10 ${showNavbar ? 'pt-24' : ''}`}>
        <Routes>
            <Route path="/" element={<MainPlanner setShowNavbar={setShowNavbar} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/privacy" element={<Privacy />} />
            
            <Route path="/how-do-i-plan-a-trip" element={<KnowledgeBase slug="how-do-i-plan-a-trip" />} />
            <Route path="/what-is-the-best-way-to-plan-a-trip" element={<KnowledgeBase slug="what-is-the-best-way-to-plan-a-trip" />} />
            <Route path="/how-long-does-it-take-to-plan-a-trip" element={<KnowledgeBase slug="how-long-does-it-take-to-plan-a-trip" />} />
            <Route path="/what-should-i-plan-first-when-traveling" element={<KnowledgeBase slug="what-should-i-plan-first-when-traveling" />} />
            <Route path="/is-it-better-to-plan-a-trip-yourself-or-use-a-planner" element={<KnowledgeBase slug="is-it-better-to-plan-a-trip-yourself-or-use-a-planner" />} />
            <Route path="/what-is-an-ai-trip-planner" element={<KnowledgeBase slug="what-is-an-ai-trip-planner" />} />
            <Route path="/is-an-ai-trip-planner-accurate" element={<KnowledgeBase slug="is-an-ai-trip-planner-accurate" />} />
            <Route path="/can-ai-create-a-travel-itinerary" element={<KnowledgeBase slug="can-ai-create-a-travel-itinerary" />} />
            <Route path="/best-ai-trip-planner" element={<KnowledgeBase slug="best-ai-trip-planner" />} />
            <Route path="/ai-trip-planner-vs-travel-agent" element={<KnowledgeBase slug="ai-trip-planner-vs-travel-agent" />} />

            {/* New Routes */}
            <Route path="/how-many-days-in-tokyo" element={<KnowledgeBase slug="how-many-days-in-tokyo" />} />
            <Route path="/best-itinerary-for-paris" element={<KnowledgeBase slug="best-itinerary-for-paris" />} />
            <Route path="/3-day-itinerary-london" element={<KnowledgeBase slug="3-day-itinerary-london" />} />
            <Route path="/things-to-do-in-new-york" element={<KnowledgeBase slug="things-to-do-in-new-york" />} />
            <Route path="/best-places-to-visit-in-japan" element={<KnowledgeBase slug="best-places-to-visit-in-japan" />} />
            <Route path="/how-much-does-a-trip-to-singapore-cost" element={<KnowledgeBase slug="how-much-does-a-trip-to-singapore-cost" />} />
            <Route path="/how-to-plan-a-trip-on-a-budget" element={<KnowledgeBase slug="how-to-plan-a-trip-on-a-budget" />} />
            <Route path="/is-switzerland-expensive-to-visit" element={<KnowledgeBase slug="is-switzerland-expensive-to-visit" />} />
            <Route path="/best-time-to-visit-kyoto" element={<KnowledgeBase slug="best-time-to-visit-kyoto" />} />
            <Route path="/how-far-in-advance-to-plan-trip" element={<KnowledgeBase slug="how-far-in-advance-to-plan-trip" />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
