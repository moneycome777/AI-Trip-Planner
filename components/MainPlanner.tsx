import React, { useState } from 'react';
import { AppState, TripPlan, UserPreferences } from '../types';
import PreferencesForm from './PreferencesForm';
import LoadingScreen from './LoadingScreen';
import Dashboard from './Dashboard';
import { generateTripPlan } from '../services/geminiService';

const MainPlanner: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LANDING);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [isAiReady, setIsAiReady] = useState(false);

  const handlePreferencesSubmit = async (prefs: UserPreferences) => {
    setPreferences(prefs);
    setAppState(AppState.LOADING);
    setIsAiReady(false);
    setTripPlan(null);
    
    try {
      const plan = await generateTripPlan(prefs);
      setTripPlan(plan);
      setIsAiReady(true);
    } catch (error) {
      console.error("Failed to generate trip", error);
      alert("We couldn't generate a trip right now. Please check your API Key configuration.");
      setAppState(AppState.LANDING);
    }
  };

  const handleAdComplete = () => {
      if (tripPlan) {
          setAppState(AppState.DASHBOARD);
      }
  };

  const handleReset = () => {
    setTripPlan(null);
    setPreferences(null);
    setAppState(AppState.LANDING);
    setIsAiReady(false);
  };

  return (
    <div className="w-full h-full relative flex flex-col bg-gray-50 overflow-hidden">
      {appState === AppState.LANDING && (
        <PreferencesForm 
            onSubmit={handlePreferencesSubmit} 
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