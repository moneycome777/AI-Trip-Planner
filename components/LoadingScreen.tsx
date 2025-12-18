
import React, { useEffect, useState } from 'react';
import { Loader2, PlayCircle, CheckCircle, Cpu, Zap } from 'lucide-react';
import { MOCK_AD_VIDEOS } from '../constants';
import { UserPreferences } from '../types';
import { isComplexRequest } from '../services/geminiService';

interface Props {
  onAdComplete: () => void;
  isAiReady: boolean;
  preferences?: UserPreferences | null;
}

const LoadingScreen: React.FC<Props> = ({ onAdComplete, isAiReady, preferences }) => {
  const [adFinished, setAdFinished] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  // Determine if we used the Pro model using the shared utility
  const isComplex = preferences ? isComplexRequest(preferences) : false;

  useEffect(() => {
    const devMode = localStorage.getItem('tripgenie_dev_mode') === 'true';
    setIsDevMode(devMode);
    if (devMode) {
        setAdFinished(true);
        return;
    }
    const timer = setTimeout(() => setAdFinished(true), 10000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
      if (isDevMode && isAiReady) onAdComplete();
  }, [isDevMode, isAiReady, onAdComplete]);

  const handleContinue = () => {
      if (adFinished && isAiReady) onAdComplete();
  };

  if (isDevMode) {
      return (
          <div className="h-screen w-screen bg-white flex flex-col items-center justify-center z-50 absolute top-0 left-0">
               <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
               <h2 className="text-xl font-bold text-slate-800">Dev Mode: Generating Plan...</h2>
          </div>
      );
  }

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center z-50 absolute top-0 left-0">
      <div className="w-full h-full absolute inset-0 opacity-40">
           <video src={MOCK_AD_VIDEOS[0]} autoPlay muted loop playsInline className="w-full h-full object-cover blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-lg p-6">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded">AD</span>
                    <span className="text-xs text-slate-300">Sponsored Video</span>
                </div>
            </div>

            <div className="relative aspect-video bg-black">
                 <video src={MOCK_AD_VIDEOS[0]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </div>

            <div className="p-6 text-center space-y-4">
                <div>
                    <h2 className="text-xl font-bold text-slate-800">AriaTrip AI is generating...</h2>
                    
                    {/* Model Indicator */}
                    <div className="mt-2 flex justify-center">
                        {isComplex ? (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-[10px] font-bold border border-purple-200">
                                <Cpu className="w-3 h-3" /> PRO ENGINE ENGAGED
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold border border-blue-200">
                                <Zap className="w-3 h-3" /> TURBO ENGINE ENGAGED
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-indigo-50 rounded-lg p-3 flex items-center justify-center gap-3">
                    {isAiReady ? (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                        <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                    )}
                    <span className={`text-sm font-bold ${isAiReady ? 'text-emerald-700' : 'text-indigo-700'}`}>
                        {isAiReady ? "Trip Generation Complete!" : "AI Processing..."}
                    </span>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!adFinished || !isAiReady}
                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform flex items-center justify-center gap-2
                        ${(adFinished && isAiReady) 
                            ? 'bg-slate-900 text-white hover:bg-black hover:scale-[1.02] cursor-pointer' 
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }
                    `}
                >
                    {(adFinished && isAiReady) ? (
                        <>View My Plan <PlayCircle className="w-5 h-5" /></>
                    ) : (
                        <>{!adFinished ? "Please Wait..." : "Finalizing details..."}</>
                    )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
