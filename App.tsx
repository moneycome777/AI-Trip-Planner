import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPlanner from './components/MainPlanner';
import About from './pages/About';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import Privacy from './pages/Privacy';
import SecurityGuard from './components/SecurityGuard';

const App: React.FC = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const location = useLocation();
  
  // Reset Dev Mode on Page Refresh (Session start)
  useEffect(() => {
    localStorage.removeItem('tripgenie_dev_mode');
    console.log("Dev mode reset");
  }, []);

  // SEO: Dynamic Title Updating
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
    <div className="h-screen w-screen overflow-hidden font-sans select-none flex flex-col relative text-slate-800">
      <SecurityGuard />
      
      {/* GLOBAL COLORFUL BACKGROUND - Applies to ALL pages */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 animate-gradient-xy">
         <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-blue-200/40 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute top-[40%] right-[-10%] w-[60vh] h-[60vh] bg-purple-200/40 rounded-full blur-[100px] animate-pulse delay-1000"></div>
         <div className="absolute bottom-[-10%] left-[20%] w-[50vh] h-[50vh] bg-rose-200/40 rounded-full blur-[100px] animate-pulse delay-2000"></div>
      </div>
      
      {/* Navbar (Conditionally rendered) */}
      {showNavbar && (
        <div className="flex-shrink-0 z-[100]">
            <Navbar />
        </div>
      )}

      {/* Main Content Area 
          - Added padding-top only if navbar is shown to push content below it.
          - If navbar is hidden (Dashboard), we remove padding so it uses full height.
      */}
      <div className={`flex-1 w-full relative overflow-y-auto overflow-x-hidden flex flex-col z-10 ${showNavbar ? 'pt-24' : ''}`}>
        <Routes>
            <Route path="/" element={<MainPlanner setShowNavbar={setShowNavbar} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;