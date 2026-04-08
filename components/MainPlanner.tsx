
import React, { useState, useEffect } from 'react';
import { AppState, TripPlan, UserPreferences } from '../types';
import PreferencesForm from './PreferencesForm';
import LoadingScreen from './LoadingScreen';
import Dashboard from './Dashboard';
import { generateTripPlan } from '../services/geminiService';
import { CACHE_KEY_PLAN, CACHE_KEY_PREFS } from '../constants';

interface Props {
  setShowNavbar: (show: boolean) => void;
}

const MainPlanner: React.FC<Props> = ({ setShowNavbar }) => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [isAiReady, setIsAiReady] = useState(false);
  const [savedTripDest, setSavedTripDest] = useState<string | null>(null);

  useEffect(() => {
    const cachedPlan = localStorage.getItem(CACHE_KEY_PLAN);
    const cachedPrefs = localStorage.getItem(CACHE_KEY_PREFS);
    if (cachedPlan && cachedPrefs) {
        try {
            const parsedPrefs = JSON.parse(cachedPrefs);
            setSavedTripDest(parsedPrefs.destination);
        } catch (e) {
            localStorage.removeItem(CACHE_KEY_PLAN);
            localStorage.removeItem(CACHE_KEY_PREFS);
        }
    }
  }, []);

  const handlePreferencesSubmit = async (prefs: UserPreferences) => {
    setPreferences(prefs);
    setAppState(AppState.LOADING);
    setShowNavbar(false); 
    setIsAiReady(false);
    setTripPlan(null);
    
    try {
      const plan = await generateTripPlan(prefs);
      setTripPlan(plan);
      setIsAiReady(true);
      localStorage.setItem(CACHE_KEY_PLAN, JSON.stringify(plan));
      localStorage.setItem(CACHE_KEY_PREFS, JSON.stringify(prefs));
      setSavedTripDest(prefs.destination);
    } catch (error: any) {
      console.error("Failed to generate trip", error);
      alert("We couldn't generate a trip right now. Please check your connection.");
      setShowNavbar(true);
      setAppState(AppState.LANDING);
    }
  };

  const handleAdComplete = () => {
      if (tripPlan) setAppState(AppState.DASHBOARD);
  };

  const handleReset = () => {
    setTripPlan(null);
    setPreferences(null);
    setAppState(AppState.LANDING);
    setShowNavbar(true); 
    setIsAiReady(false);
  };

  const handleResume = () => {
    const cachedPlan = localStorage.getItem(CACHE_KEY_PLAN);
    const cachedPrefs = localStorage.getItem(CACHE_KEY_PREFS);
    if (cachedPlan && cachedPrefs) {
        setTripPlan(JSON.parse(cachedPlan));
        setPreferences(JSON.parse(cachedPrefs));
        setAppState(AppState.DASHBOARD);
        setShowNavbar(false);
    }
  };

  return (
    <div className={`w-full relative flex flex-col ${appState === AppState.DASHBOARD ? 'h-full' : 'min-h-full'}`}>
      {appState === AppState.LANDING && (
        <PreferencesForm 
            onSubmit={handlePreferencesSubmit} 
            onResume={savedTripDest ? handleResume : undefined}
            savedTripDest={savedTripDest}
        />
      )}
      
      {appState === AppState.LOADING && (
        <LoadingScreen 
            isAiReady={isAiReady}
            onAdComplete={handleAdComplete}
            preferences={preferences}
        />
      )}
      
      {appState === AppState.DASHBOARD && tripPlan && preferences && (
        <Dashboard 
          initialPlan={tripPlan} 
          preferences={preferences} 
          onNewTrip={handleReset}
        />
      )}
    </div>
  );
};

export default MainPlanner;
