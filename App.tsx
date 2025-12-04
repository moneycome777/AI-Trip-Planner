import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MainPlanner from './components/MainPlanner';
import About from './pages/About';
import Contact from './pages/Contact';
import Destinations from './pages/Destinations';
import Privacy from './pages/Privacy';
import SecurityGuard from './components/SecurityGuard';

const App: React.FC = () => {
  return (
    <div className="h-screen w-screen overflow-hidden font-sans select-none flex flex-col bg-gray-50">
      <SecurityGuard />
      
      {/* Navbar stays at the top */}
      <div className="flex-shrink-0 z-50">
          <Navbar />
      </div>

      {/* Main Content Area - Fills remaining space */}
      {/* Changed overflow-hidden to overflow-y-auto to allow scrolling on static pages */}
      <div className="flex-1 w-full relative overflow-y-auto overflow-x-hidden flex flex-col">
        <Routes>
            <Route path="/" element={<MainPlanner />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/privacy" element={<Privacy />} />
            
            {/* Catch-all route: Redirects any unknown paths back to the planner */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;