

export type Language = 
  | 'English' 
  | '中文' 
  | '日本語' 
  | 'Hindi' 
  | 'Spanish' 
  | 'Arabic' 
  | 'French' 
  | 'Portuguese' 
  | 'Russian' 
  | 'Indonesian' 
  | 'Korean' 
  | 'Thai';

export interface UserPreferences {
  destination: string;
  departFrom?: string;
  duration: string;
  layover?: string;
  hotel?: string;
  style?: string[];
  constraints?: string;
  language: Language;
  budget?: 'Economy' | 'Standard' | 'Luxury';
  pacing?: 'Relaxed' | 'Balanced' | 'Intensive';
  transportMode?: 'Public Transport' | 'Self-Driving' | 'Taxi/Ride-hailing' | 'Walking'; // New Field
}

export interface Activity {
  place_name: string;
  action: string;
  latitude: number;
  longitude: number;
  transport_tip?: string;
  type: 'sightseeing' | 'food' | 'transport' | 'hotel' | 'other';
  cost_estimate?: string;
  description?: string;
}

export interface HotelSuggestion {
  name: string;
  description: string;
  price_range: string;
}

export interface DayPlan {
  day_number: number;
  theme: string;
  activities: Activity[];
}

export interface TripPlan {
  trip_summary: string;
  estimated_budget: string;
  budget_breakdown: string; // New field for hidden cost explanation
  suggested_dates?: string;
  date_reasoning?: string;
  suggested_hotels?: HotelSuggestion[];
  warnings: string[];
  packing_list: string[];
  weather_forecast: string;
  transport_advice: string;
  days: DayPlan[];
}

export enum AppState {
  LANDING,
  LOADING,
  DASHBOARD,
}

// Chat Types
export interface ChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
    isPlanUpdate?: boolean;
}

export interface ChatResponse {
    intent: 'chat' | 'modify';
    answer: string;
    modified_plan?: TripPlan;
}