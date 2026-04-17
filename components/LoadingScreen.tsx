import React, { useEffect, useState } from 'react';
import { Loader2, PlayCircle, CheckCircle, Cpu, Zap } from 'lucide-react';
import { MOCK_AD_VIDEOS } from '../constants';
import { UserPreferences } from '../types';

interface Props {
  onAdComplete: () => void;
  isAiReady: boolean;
  preferences?: UserPreferences | null;
}

const LoadingScreen: React.FC<Props> = ({ onAdComplete, isAiReady }) => {
  const [adFinished, setAdFinished] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);
  const [progress, setProgress] = useState(0);

  // We no longer use the Pro model, so it's never complex
  const isComplex = false;

  useEffect(() => {
    const devMode = localStorage.getItem('tripgenie_dev_mode') === 'true';
    setIsDevMode(devMode);
    if (devMode) {
        setAdFinished(true);
        setProgress(100);
        return;
    }
    
    // Progress bar logic
    const startTime = Date.now();
    const targetTime = 30000; // 30 seconds
    
    const interval = setInterval(() => {
        if (isAiReady) {
            setProgress(100);
            setAdFinished(true);
            clearInterval(interval);
            return;
        }
        
        const elapsed = Date.now() - startTime;
        let newProgress = 0;
        
        if (elapsed < targetTime) {
            // Linear progress up to 90% over 30 seconds
            newProgress = (elapsed / targetTime) * 90;
        } else {
            // Asymptotically approach 99% after 30 seconds
            const extraTime = elapsed - targetTime;
            newProgress = 90 + (9 * (1 - Math.exp(-extraTime / 10000)));
        }
        
        setProgress(Math.min(99, newProgress));
    }, 100);

    return () => clearInterval(interval);
  }, [isAiReady]);

  useEffect(() => {
      if (isDevMode && isAiReady) onAdComplete();
  }, [isDevMode, isAiReady, onAdComplete]);

  const handleContinue = () => {
      if (adFinished && isAiReady) onAdComplete();
  };

  if (isDevMode) {
      return (
          <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[5000]">
               <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
               <h2 className="text-xl font-bold text-slate-800">Dev Mode: Generating Plan...</h2>
          </div>
      );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[5000] overflow-hidden">
      <div className="w-full h-full absolute inset-0 opacity-40 pointer-events-none">
           <video src={MOCK_AD_VIDEOS[0]} autoPlay muted loop playsInline className="w-full h-full object-cover blur-sm" />
      </div>

      <div className="relative z-10 w-full max-w-lg p-6">
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20">
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded">AD</span>
                    <span className="text-xs text-slate-300">Sponsored Video</span>
                </div>
            </div>

            <div className="relative aspect-video bg-black">
                 <video src={MOCK_AD_VIDEOS[0]} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </div>

            <div className="p-8 text-center space-y-6">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">AriaTrip AI is generating...</h2>
                    
                    {/* Model Indicator */}
                    <div className="mt-3 flex justify-center">
                        {isComplex ? (
                            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-[11px] font-black border border-purple-200 uppercase tracking-wider">
                                <Cpu className="w-3.5 h-3.5" /> PRO ENGINE ENGAGED
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-[11px] font-black border border-blue-200 uppercase tracking-wider">
                                <Zap className="w-3.5 h-3.5" /> TURBO ENGINE ENGAGED
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 border border-slate-100">
                    <div className="flex items-center gap-3 w-full justify-center">
                        {isAiReady ? (
                            <CheckCircle className="w-6 h-6 text-emerald-600" />
                        ) : (
                            <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                        )}
                        <span className={`text-base font-bold ${isAiReady ? 'text-emerald-700' : 'text-slate-600'}`}>
                            {isAiReady ? "Trip Generation Complete!" : "AI Processing..."}
                        </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                        <div 
                            className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                        {Math.floor(progress)}%
                    </div>
                </div>

                <button
                    onClick={handleContinue}
                    disabled={!isAiReady}
                    className={`w-full py-5 rounded-[1.5rem] font-black text-lg shadow-xl transition-all transform flex items-center justify-center gap-3
                        ${isAiReady 
                            ? 'bg-slate-900 text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98] cursor-pointer' 
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-80'
                        }
                    `}
                >
                    {isAiReady ? (
                        <>View My Plan <PlayCircle className="w-6 h-6" /></>
                    ) : (
                        <>Finalizing details...</>
                    )}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;