import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-indigo-600 font-bold bg-indigo-50/50 rounded-full px-3 py-1' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-full px-3 py-1 transition';

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount === 5) {
        localStorage.setItem('tripgenie_dev_mode', 'true');
        alert("Developer Mode Enabled: Ads are now disabled.");
    }
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-[100] px-4 flex justify-center">
      <div className="max-w-7xl w-full bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm rounded-full px-6 py-3 flex justify-between items-center transition-all duration-300">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2" onClick={handleLogoClick}>
              <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 text-white p-1.5 rounded-lg shadow-sm">
                 <Plane className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg text-slate-800 tracking-tight">AriaTrip AI</span>
            </Link>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden sm:flex sm:space-x-2 items-center text-sm font-medium">
            <Link to="/" className={isActive('/')}>Plan Trip</Link>
            <Link to="/destinations" className={isActive('/destinations')}>Destinations</Link>
            <Link to="/about" className={isActive('/about')}>About</Link>
            <Link to="/contact" className={isActive('/contact')}>Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
      </div>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-xl p-4 sm:hidden flex flex-col space-y-2 animate-fadeIn z-[90]">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl bg-indigo-50 text-indigo-700 font-bold"
            >
              Plan Trip
            </Link>
            <Link 
              to="/destinations" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium"
            >
              Destinations
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-medium"
            >
              Contact
            </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;