
import React from 'react';
import { Smartphone, Car, PlaneTakeoff, ShieldCheck, ExternalLink, Info } from 'lucide-react';
import { AFFILIATE_LINKS } from '../constants';

interface AffiliateToolsProps {
  transportMode?: string;
  destination: string;
}

const AffiliateTools: React.FC<AffiliateToolsProps> = ({ transportMode, destination }) => {
  const isSelfDriving = transportMode === 'Self-Driving' || transportMode === 'Taxi/Ride-hailing';

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Flight Compensation - AirHelp */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
          <PlaneTakeoff className="w-24 h-24" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-blue-200" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Flight Protection</span>
          </div>
          <h3 className="text-lg font-black mb-1">Flight Delayed or Cancelled?</h3>
          <p className="text-xs text-blue-100 mb-4 leading-relaxed">
            Don't ask the AI for compensation rules. Get a **guaranteed check** and claim up to **€600** per passenger with AirHelp.
          </p>
          <a 
            href={AFFILIATE_LINKS.AIRHELP} 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-4 py-2 rounded-xl text-xs font-black hover:bg-blue-50 transition shadow-md"
          >
            Check My Compensation <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* eSIM Section */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Smartphone className="w-5 h-5 text-indigo-600" />
          <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Stay Connected in {destination}</h3>
        </div>
        <p className="text-xs text-slate-500 mb-4">Get an instant eSIM for your trip. No physical SIM cards needed.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <a href={AFFILIATE_LINKS.AIRALO} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition border border-slate-100 group">
            <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-700">Airalo</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <a href={AFFILIATE_LINKS.YESIM} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition border border-slate-100 group">
            <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-700">Yesim</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
          <a href={AFFILIATE_LINKS.SAILY} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-indigo-50 transition border border-slate-100 group">
            <span className="text-xs font-bold text-slate-700 group-hover:text-indigo-700">Saily</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Car Rental - Conditional */}
      {isSelfDriving && (
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Car className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-emerald-800 text-sm uppercase tracking-wide">Rent a Car for {destination}</h3>
          </div>
          <p className="text-xs text-emerald-700 mb-4">Since you chose **{transportMode}**, we recommend booking your vehicle in advance.</p>
          <div className="grid grid-cols-1 gap-2">
            <a href={AFFILIATE_LINKS.LOCALRENT} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-emerald-100 transition border border-emerald-200 group shadow-sm">
              <div>
                <span className="block text-xs font-black text-emerald-900">Localrent.com</span>
                <span className="text-[10px] text-emerald-600">Best for local car rentals</span>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-400" />
            </a>
            <a href={AFFILIATE_LINKS.GETRENTACAR} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-white rounded-xl hover:bg-emerald-100 transition border border-emerald-200 group shadow-sm">
              <div>
                <span className="block text-xs font-black text-emerald-900">GetRentACar</span>
                <span className="text-[10px] text-emerald-600">Global car rental marketplace</span>
              </div>
              <ExternalLink className="w-4 h-4 text-emerald-400" />
            </a>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="flex gap-2 p-3 bg-slate-100 rounded-xl border border-slate-200">
        <Info className="w-4 h-4 text-slate-400 shrink-0" />
        <p className="text-[10px] text-slate-500 leading-tight">
          AriaTrip AI partners with these trusted providers to help you book your trip. We may earn a small commission at no extra cost to you.
        </p>
      </div>
    </div>
  );
};

export default AffiliateTools;
