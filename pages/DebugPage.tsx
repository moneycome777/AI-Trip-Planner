import React, { useState } from 'react';
import { Bug, AlertCircle, FileJson, Zap, XCircle } from 'lucide-react';
import { simulateError } from '../services/geminiService';

const CrashyComponent: React.FC = () => {
  throw new Error("SIMULATED RENDER CRASH: Caught by ErrorBoundary.");
};

const DebugPage: React.FC = () => {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    return <CrashyComponent />;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 p-8 text-white text-center">
            <Bug className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
            <h1 className="text-3xl font-bold">System Quality Assurance</h1>
            <p className="text-slate-400 mt-2">Test all error reporting and alert systems.</p>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <button 
                onClick={() => simulateError('quota')}
                className="flex items-center gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-100 hover:bg-amber-100 transition text-left"
              >
                <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-amber-900">429 Quota Alert</h3>
                  <p className="text-xs text-amber-700">Simulate API rate limit hit. Triggers email.</p>
                </div>
              </button>

              <button 
                onClick={() => simulateError('json')}
                className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 border border-blue-100 hover:bg-blue-100 transition text-left"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shrink-0">
                  <FileJson className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900">JSON Parse Error</h3>
                  <p className="text-xs text-blue-700">Simulate malformed AI response. Triggers email.</p>
                </div>
              </button>

              <button 
                onClick={() => setShouldCrash(true)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-rose-50 border border-rose-100 hover:bg-rose-100 transition text-left"
              >
                <div className="w-12 h-12 bg-rose-500 rounded-xl flex items-center justify-center text-white shrink-0">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-rose-900">React Component Crash</h3>
                  <p className="text-xs text-rose-700">Triggers ErrorBoundary & Critical Alert email.</p>
                </div>
              </button>

              <button 
                onClick={() => simulateError('rejection')}
                className="flex items-center gap-4 p-4 rounded-2xl bg-purple-50 border border-purple-100 hover:bg-purple-100 transition text-left"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white shrink-0">
                  <XCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-900">Promise Rejection</h3>
                  <p className="text-xs text-purple-700">Triggers global window listener email.</p>
                </div>
              </button>

            </div>

            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2">Instructions</h4>
              <ul className="text-sm text-slate-600 list-disc list-inside space-y-2">
                <li>Click a button to trigger a specific error type.</li>
                <li>Open <b>Chrome DevTools (Console)</b> to see the debug logs.</li>
                <li>Check your <b>email inbox</b> for the automated reports.</li>
                <li>Note: React Crash will reload the app after showing the boundary.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
