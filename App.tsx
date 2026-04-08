
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPlanner from './components/MainPlanner';
import About from './pages/About';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import Privacy from './pages/Privacy';
import KnowledgeBase from './pages/KnowledgeBase';
import ExampleItineraryView from './pages/ExampleItineraryView';
import SecurityGuard from './components/SecurityGuard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 10);
    return () => clearTimeout(timer);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();
  
  useEffect(() => {
    localStorage.removeItem('tripgenie_dev_mode');
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'AriaTrip AI - Free Smart Travel Planner',
      '/about': 'About AriaTrip AI - How it Works',
      '/contact': 'Contact Us - AriaTrip Support',
      '/destinations': 'Popular Travel Destinations - Japan, Europe, Asia',
      '/privacy': 'Privacy Policy & Terms - AriaTrip AI'
    };
    
    const title = titles[location.pathname] || 'AriaTrip AI - Elegant Travel Planner';
    document.title = title;
  }, [location]);

  return (
    <div className={`w-full font-sans select-none flex flex-col relative text-slate-800 ${showNavbar ? 'min-h-full' : 'h-full overflow-hidden'}`}>
      <ScrollToTop />
      <SecurityGuard />
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 animate-gradient-xy">
         <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-blue-200/40 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute top-[40%] right-[-10%] w-[60vh] h-[60vh] bg-purple-200/40 rounded-full blur-[100px] animate-pulse delay-1000"></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[50vh] h-[50vh] bg-rose-200/40 rounded-full blur-[100px] animate-pulse delay-2000"></div>
      </div>
      
      {showNavbar && <div className="flex-shrink-0 z-[100]"><Navbar /></div>}

      <div className={`flex-1 w-full relative flex flex-col z-10 ${showNavbar ? 'pt-24' : 'h-full'}`}>
        <Routes>
            <Route path="/" element={<MainPlanner setShowNavbar={setShowNavbar} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/example/:slug" element={<ExampleItineraryView setShowNavbar={setShowNavbar} />} />
            
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
