

import { TripPlan } from "./types";

export const TRAVEL_STYLES = [
  "Foodie",
  "Instagrammable",
  "Nature",
  "Shopping",
  "Low Budget",
  "Couple",
  "Luxury",
  "History",
  "Relaxing",
  "Adventure",
  "Cultural",
  "Nightlife",
  "Solo",
  "Family Friendly",
  "Romantic",
  "Backpacking",
  "Art & Design",
  "Beach Lover",
  "Road Trip",
  "Hiking",
  "Wildlife",
  "Eco Travel",
  "Wellness & Spa",
  "Festival & Events",
  "Photography",
  "Urban Explorer",
  "Snow & Ski",
  "Cruise",
  "Local Experiences",
  "Food & Wine",
  "Off-the-Beaten-Path",
  "Pilgrimage / Spiritual",
  "Theme Parks",
  "Island Hopping",
  "Sports & Activities",
  "Workcation / Remote Work",
  "Short Weekend Trip",
  "Bucket List Travel"
];

export const BUDGET_LEVELS = [
  "Economy",
  "Standard",
  "Luxury"
];

export const PACING_STYLES = [
  "Relaxed",
  "Balanced",
  "Intensive"
];

export const TRANSPORT_MODES = [
  "Public Transport",
  "Self-Driving",
  "Taxi/Ride-hailing",
  "Walking"
];

export const MOCK_AD_VIDEOS = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
];

// Fallback logic if AI fails (basic structure)
export const EMPTY_TRIP: any = {
  trip_summary: "We couldn't generate a trip at this moment.",
  warnings: [],
  packing_list: [],
  days: []
};

// Storage Keys
export const CACHE_KEY_PLAN = 'tripgenie_cached_plan';
export const CACHE_KEY_PREFS = 'tripgenie_cached_prefs';

// Affiliate Links (Placeholders - User should replace with their actual links)
export const AFFILIATE_LINKS = {
  KLOOK: "https://www.klook.com/en-US/?aid=517346", // Example AID
  AIRALO: "https://airalo.tp.st/NTE3MzQ2",
  YESIM: "https://yesim.tp.st/NTE3MzQ2",
  SAILY: "https://saily.tp.st/NTE3MzQ2",
  LOCALRENT: "https://localrent.tp.st/NTE3MzQ2",
  GETRENTACAR: "https://getrentacar.tp.st/NTE3MzQ2",
  AIRHELP: "https://airhelp.tp.st/NTE3MzQ2"
};

// Map Colors Palette
export const DAY_COLORS = [
    '#3B82F6', // Blue
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#EC4899', // Pink
    '#8B5CF6', // Violet
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#F97316', // Orange
    '#6366F1'  // Indigo
];

// Comprehensive Mock Data for Testing
export const MOCK_TRIP_PLAN: TripPlan = {
  trip_summary: "MOCK PLAN: A 3-Day Highlights of Tokyo",
  estimated_budget: "50,000 JPY (~$350 USD)",
  budget_breakdown: "This estimate includes the itemized costs below plus a buffer of approx. 15,000 JPY for unlisted street snacks, bottled water, random vending machines, and short-distance metro rides between attractions.",
  suggested_dates: "April 10 - April 13",
  date_reasoning: "Perfect spring weather and post-cherry blossom crowds are lower.",
  suggested_hotels: [
    { name: "Hotel Gracery Shinjuku", description: "Famous Godzilla hotel in the heart of Kabukicho.", price_range: "$120-150/night" },
    { name: "The Millennials Shibuya", description: "High-tech capsule hotel with social vibes.", price_range: "$60-80/night" }
  ],
  warnings: ["Beware of touts in Kabukicho/Roppongi.", "Don't tip in Japan, it's considered rude."],
  packing_list: ["Universal Power Adapter", "Comfortable Walking Shoes", "Coin Purse (Cash is King)"],
  weather_forecast: "Sunny with mild breeze. Highs of 18°C, Lows of 10°C.",
  transport_advice: "Get a Suica/Pasmo card on Apple Wallet. Trains are the fastest way around.",
  days: [
    {
      day_number: 1,
      theme: "Arrival & Neon Lights",
      activities: [
        {
          place_name: "Haneda Airport",
          action: "Arrival & Pick up Pocket WiFi",
          latitude: 35.5494,
          longitude: 139.7798,
          type: "transport",
          transport_tip: "Take Keikyu Line to Shinagawa",
          travel_time_to_next: "45 mins"
        },
        {
          place_name: "Shibuya Crossing",
          action: "Walk the famous scramble crossing",
          latitude: 35.6595,
          longitude: 139.7004,
          type: "sightseeing",
          description: "The busiest pedestrian crossing in the world.",
          travel_time_to_next: "10 mins"
        },
        {
          place_name: "Ichiran Ramen",
          action: "Dinner in a solo booth",
          latitude: 35.6604,
          longitude: 139.6995,
          type: "food",
          cost_estimate: "1200 JPY"
        }
      ]
    },
    {
      day_number: 2,
      theme: "Old & New Tokyo",
      activities: [
        {
          place_name: "Senso-ji Temple",
          action: "Morning prayers and fortune telling",
          latitude: 35.7148,
          longitude: 139.7967,
          type: "sightseeing",
          transport_tip: "Ginza Line to Asakusa",
          travel_time_to_next: "5 mins"
        },
        {
          place_name: "Nakamise Shopping Street",
          action: "Snack on street food",
          latitude: 35.7138,
          longitude: 139.7963,
          type: "food",
          cost_estimate: "1500 JPY",
          travel_time_to_next: "15 mins"
        },
        {
          place_name: "Tokyo Skytree",
          action: "Sunset views from the top",
          latitude: 35.7100,
          longitude: 139.8107,
          type: "sightseeing",
          cost_estimate: "3000 JPY"
        }
      ]
    },
    {
      day_number: 3,
      theme: "Pop Culture & Fashion",
      activities: [
        {
          place_name: "Harajuku Takeshita Street",
          action: "Shop for kawaii fashion",
          latitude: 35.6715,
          longitude: 139.7031,
          type: "sightseeing",
          travel_time_to_next: "10 mins"
        },
        {
          place_name: "Meiji Shrine",
          action: "Peaceful forest walk",
          latitude: 35.6764,
          longitude: 139.6993,
          type: "sightseeing"
        }
      ]
    }
  ]
};