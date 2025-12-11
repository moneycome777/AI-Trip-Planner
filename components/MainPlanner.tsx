
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

  // Load cached plan on mount
  useEffect(() => {
    const cachedPlan = localStorage.getItem(CACHE_KEY_PLAN);
    const cachedPrefs = localStorage.getItem(CACHE_KEY_PREFS);

    if (cachedPlan && cachedPrefs) {
        try {
            const parsedPlan = JSON.parse(cachedPlan);
            const parsedPrefs = JSON.parse(cachedPrefs);
            
            // Check if we should auto-load (only on initial mount)
            // But we always want to know the destination for the Resume button
            setSavedTripDest(parsedPrefs.destination);

            setTripPlan(parsedPlan);
            setPreferences(parsedPrefs);
            setAppState(AppState.DASHBOARD);
            setIsAiReady(true);
            setShowNavbar(false); // Hide Navbar for dashboard view
        } catch (e) {
            console.error("Failed to parse cached plan", e);
            localStorage.removeItem(CACHE_KEY_PLAN);
            localStorage.removeItem(CACHE_KEY_PREFS);
        }
    }
  }, [setShowNavbar]);

  const handlePreferencesSubmit = async (prefs: UserPreferences) => {
    setPreferences(prefs);
    setAppState(AppState.LOADING);
    setShowNavbar(false); // Hide Navbar when loading starts
    setIsAiReady(false);
    setTripPlan(null);
    
    try {
      const plan = await generateTripPlan(prefs);
      setTripPlan(plan);
      setIsAiReady(true);

      // Save to cache
      localStorage.setItem(CACHE_KEY_PLAN, JSON.stringify(plan));
      localStorage.setItem(CACHE_KEY_PREFS, JSON.stringify(prefs));
      setSavedTripDest(prefs.destination);

    } catch (error: any) {
      console.error("Failed to generate trip", error);
      
      // Determine the error message
      let msg = "We couldn't generate a trip right now.";
      if (error.message.includes("API Key is missing")) {
          msg = "Configuration Error: API Key is missing. Please check your environment variables.";
      } else if (error.message.includes("Quota Exceeded")) {
          msg = "Traffic Limit: You have hit the free tier limit. Please wait 1 minute and try again.";
      } else if (error.message.includes("Model not found")) {
          msg = "System Error: The AI Model is currently unavailable. Please check the code configuration.";
      }

      alert(msg);
      setAppState(AppState.LANDING);
      setShowNavbar(true); // Show Navbar again on error
    }
  };

  const handleAdComplete = () => {
      if (tripPlan) {
          setAppState(AppState.DASHBOARD);
          // Navbar remains hidden in Dashboard
      }
  };

  const handleReset = () => {
    // When clicking "New Trip", we DO NOT clear the cache immediately.
    // This allows the user to click "Resume" on the home screen if they changed their mind.
    // The cache is only overwritten when a NEW plan is successfully generated.
    
    setTripPlan(null);
    setPreferences(null);
    setAppState(AppState.LANDING);
    setShowNavbar(true); // Show Navbar when returning home
    setIsAiReady(false);

    // Refresh saved dest from cache to be sure
    const cachedPrefs = localStorage.getItem(CACHE_KEY_PREFS);
    if (cachedPrefs) {
        try {
            const p = JSON.parse(cachedPrefs);
            setSavedTripDest(p.destination);
        } catch(e) {}
    }
  };

  const handleResume = () => {
    const cachedPlan = localStorage.getItem(CACHE_KEY_PLAN);
    const cachedPrefs = localStorage.getItem(CACHE_KEY_PREFS);
    
    if (cachedPlan && cachedPrefs) {
        try {
            setTripPlan(JSON.parse(cachedPlan));
            setPreferences(JSON.parse(cachedPrefs));
            setAppState(AppState.DASHBOARD);
            setShowNavbar(false);
        } catch (e) {
            console.error("Failed to resume plan", e);
        }
    }
  };

  return (
    // Transparent wrapper to allow App.tsx global background to show
    <div className="w-full min-h-full relative flex flex-col">
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
