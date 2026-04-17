
import React, { useState, useEffect } from 'react';
import { X, Plane, Calendar, Users, Briefcase } from 'lucide-react';
import { UserPreferences } from '../types';
import { AIRPORT_MAPPING } from '../constants';

interface Props {
  preferences: UserPreferences;
  onClose: () => void;
}

const FlightBookingModal: React.FC<Props> = ({ preferences, onClose }) => {
  // Extract initial destination/origin from preferences
  // Take first item if multiple destinations
  const initialDest = preferences.destination ? preferences.destination.split(',')[0].trim() : '';
  const initialOrigin = preferences.departFrom || '';

  const [origin, setOrigin] = useState(initialOrigin);
  const [destination, setDestination] = useState(initialDest);
  
  // Codes
  const [originCode, setOriginCode] = useState('');
  const [destCode, setDestCode] = useState('');

  // Dates
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // Passengers
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [cabinClass, setCabinClass] = useState('economy');

  // Auto-resolve codes on mount or when text changes
  useEffect(() => {
    resolveCode(origin, setOriginCode);
  }, [origin]);

  useEffect(() => {
    resolveCode(destination, setDestCode);
  }, [destination]);

  const resolveCode = (place: string, setCode: (code: string) => void) => {
    if (!place) return;
    const lower = place.toLowerCase().trim();
    
    // Defensive check to avoid Object.keys(undefined)
    const mapping = AIRPORT_MAPPING || {};

    // 1. Direct match in mapping
    if (mapping[lower]) {
        setCode(mapping[lower]);
        return;
    }
    // 2. Partial match check (e.g. "tokyo, japan" -> matches "tokyo")
    const keyMatch = Object.keys(mapping).find(k => lower.includes(k));
    if (keyMatch) {
        setCode(mapping[keyMatch]);
        return;
    }
    // 3. Fallback: If input looks like a code (3 letters), use it
    if (lower.length === 3) {
        setCode(lower.toUpperCase());
    }
  };

  // Convert YYYY-MM-DD to YYMMDD
  const formatSkyscannerDate = (isoDate: string): string => {
      if (!isoDate) return '';
      const [year, month, day] = isoDate.split('-');
      if (!year || !month || !day) return '';
      return `${year.slice(2)}${month}${day}`; // 2026-03-02 -> 260302
  };

  const handleSearch = () => {
      if (!originCode || !destCode || !departDate || !returnDate) {
          // Use a custom modal or just return if fields are missing
          // To follow iframe restrictions, we avoid window.alert
          return;
      }

      const dep = formatSkyscannerDate(departDate);
      const ret = formatSkyscannerDate(returnDate);

      // Base URL Construction
      // https://www.skyscanner.com.my/transport/flights/kulm/hnd/260302/260308/?...
      const baseUrl = `https://www.skyscanner.com.my/transport/flights/${originCode.toLowerCase()}/${destCode.toLowerCase()}/${dep}/${ret}/`;

      const params = new URLSearchParams();
      params.append('adultsv2', adults.toString());
      params.append('cabinclass', cabinClass);
      params.append('childrenv2', children > 0 ? children.toString() : '');
      params.append('ref', 'home');
      params.append('rtn', '1');
      params.append('preferdirects', 'false');
      params.append('outboundaltsenabled', 'false');
      params.append('inboundaltsenabled', 'false');

      const fullUrl = `${baseUrl}?${params.toString()}`;
      window.open(fullUrl, '_blank');
      onClose();
  };

  return (
    <div className="fixed inset-0 z-[5000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
        <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-white/50 overflow-hidden relative">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-500/20 p-2 rounded-xl">
                        <Plane className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="font-black text-xl tracking-tight">Book Your Flight</h2>
                        <p className="text-xs text-slate-400">Comparing best prices on Skyscanner</p>
                    </div>
                </div>
                <button onClick={onClose} className="hover:bg-slate-800 p-2 rounded-full transition text-slate-400 hover:text-white">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="p-8 space-y-6">
                
                {/* Route Section */}
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-6">
                        {/* Origin */}
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Departure City</label>
                            <input 
                                type="text"
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                placeholder="e.g. Kuala Lumpur"
                            />
                            <div className="flex items-center gap-2 px-1">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Code:</span>
                                <input 
                                    type="text" 
                                    className={`w-16 p-1.5 text-xs text-center font-mono font-black border rounded-lg uppercase ${originCode ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-red-50 text-red-500 border-red-200'}`}
                                    value={originCode}
                                    onChange={(e) => setOriginCode(e.target.value.toUpperCase())}
                                    placeholder="???"
                                    maxLength={4}
                                />
                            </div>
                        </div>

                        {/* Destination */}
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Destination</label>
                            <input 
                                type="text"
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                placeholder="e.g. Tokyo"
                            />
                            <div className="flex items-center gap-2 px-1">
                                <span className="text-[10px] text-slate-400 font-bold uppercase">Code:</span>
                                <input 
                                    type="text" 
                                    className={`w-16 p-1.5 text-xs text-center font-mono font-black border rounded-lg uppercase ${destCode ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-red-50 text-red-500 border-red-200'}`}
                                    value={destCode}
                                    onChange={(e) => setDestCode(e.target.value.toUpperCase())}
                                    placeholder="???"
                                    maxLength={4}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dates Section */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Calendar className="w-3 h-3"/> Depart Date</label>
                        <input 
                            type="date"
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            value={departDate}
                            onChange={(e) => setDepartDate(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Calendar className="w-3 h-3"/> Return Date</label>
                        <input 
                            type="date"
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            value={returnDate}
                            min={departDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Passengers & Class */}
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                     <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Users className="w-3 h-3"/> Passengers</label>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-100">
                                <span className="text-xs font-bold text-slate-600">Adults</span>
                                <input type="number" min="1" max="9" value={adults} onChange={(e) => setAdults(parseInt(e.target.value))} className="w-10 text-center font-bold text-sm bg-transparent outline-none" />
                            </div>
                            <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-100">
                                <span className="text-xs font-bold text-slate-600">Kids</span>
                                <input type="number" min="0" max="9" value={children} onChange={(e) => setChildren(parseInt(e.target.value))} className="w-10 text-center font-bold text-sm bg-transparent outline-none" />
                            </div>
                        </div>
                     </div>
                     
                     <div className="pt-4 border-t border-slate-200">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1"><Briefcase className="w-3 h-3"/> Cabin Class</label>
                        <div className="flex flex-wrap gap-2">
                            {['economy', 'premiumeconomy', 'business', 'first'].map((cls) => (
                                <button
                                    key={cls}
                                    onClick={() => setCabinClass(cls)}
                                    className={`px-4 py-2 text-xs font-black rounded-xl capitalize border transition-all ${cabinClass === cls ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200 scale-105' : 'bg-white text-slate-400 border-slate-200 hover:border-indigo-300 hover:text-indigo-500'}`}
                                >
                                    {cls === 'premiumeconomy' ? 'Prem. Econ' : cls}
                                </button>
                            ))}
                        </div>
                     </div>
                </div>

                <div className="pt-2">
                    <button 
                        onClick={handleSearch}
                        disabled={!originCode || !destCode || !departDate}
                        className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black py-5 rounded-3xl shadow-2xl transition-all flex items-center justify-center gap-3 group"
                    >
                        <Plane className={`w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${!originCode || !destCode || !departDate ? '' : 'text-indigo-400'}`} />
                        FIND CHEAPEST FLIGHTS
                    </button>
                    <p className="text-[10px] text-center text-slate-400 mt-4 font-bold">You will be redirected to Skyscanner.com.my for secure booking.</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FlightBookingModal;
