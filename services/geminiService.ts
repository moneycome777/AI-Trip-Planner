import { GoogleGenAI, Type } from "@google/genai";
import { TripPlan, UserPreferences, ChatResponse } from "../types";

// Define the response schema for Gemini (Trip Plan)
const tripSchema = {
  type: Type.OBJECT,
  properties: {
    trip_summary: { type: Type.STRING, description: "A catchy summary of the trip" },
    estimated_budget: { type: Type.STRING, description: "Total estimated cost for the trip excluding flights (e.g., $500 - $700 USD per person)" },
    suggested_dates: { type: Type.STRING, description: "Specific dates (e.g. 'April 5 - April 10') if user only gave duration, or user's dates." },
    date_reasoning: { type: Type.STRING, description: "Why these dates? (e.g. 'Cherry blossom season', 'Low crowds')" },
    suggested_hotels: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          price_range: { type: Type.STRING, description: "e.g. $100-150/night" }
        }
      },
      description: "Suggest 2-3 hotels if user didn't specify one."
    },
    warnings: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Safety or tourist trap warnings" },
    packing_list: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Essential items to pack" },
    weather_forecast: { type: Type.STRING, description: "Expected weather and clothing advice" },
    transport_advice: { type: Type.STRING, description: "Best way to get around (cards, apps, etc)" },
    flight_delay_backup: { type: Type.STRING, description: "A contingency plan if flights are delayed" },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day_number: { type: Type.INTEGER },
          theme: { type: Type.STRING },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                place_name: { type: Type.STRING },
                action: { type: Type.STRING, description: "What to do here" },
                description: { type: Type.STRING, description: "2 sentences describing why this place is interesting for the details view." },
                latitude: { type: Type.NUMBER },
                longitude: { type: Type.NUMBER },
                transport_tip: { type: Type.STRING },
                type: { type: Type.STRING, enum: ["sightseeing", "food", "transport", "hotel", "other"] },
                cost_estimate: { type: Type.STRING }
              },
              required: ["place_name", "action", "latitude", "longitude", "type"]
            }
          }
        },
        required: ["day_number", "theme", "activities"]
      }
    }
  },
  required: ["trip_summary", "estimated_budget", "days", "warnings", "packing_list", "transport_advice"]
};

// Define Schema for Hybrid Chat (Response can be text OR a modified plan)
const chatSchema = {
    type: Type.OBJECT,
    properties: {
        intent: { 
            type: Type.STRING, 
            enum: ["chat", "modify"],
            description: "Determine if the user is asking a general question ('chat') or wants to change the itinerary ('modify')." 
        },
        answer: { 
            type: Type.STRING, 
            description: "The text response to the user. If 'modify', explain what you changed." 
        },
        modified_plan: tripSchema // Embed the trip schema here
    },
    required: ["intent", "answer"]
};

export const generateTripPlan = async (prefs: UserPreferences): Promise<TripPlan> => {
  if (!process.env.API_KEY) {
    console.error("API Key is undefined. Check vite.config.ts and Vercel Environment Variables.");
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Act as an expert local travel planner (Voya AI).
    
    User Request:
    - Destinations: ${prefs.destination}
    - Depart From: ${prefs.departFrom || "Not specified"}
    - Duration/Dates: ${prefs.duration}
    - Layover: ${prefs.layover || "None"}
    - Hotel: ${prefs.hotel || "Not specified"}
    - Travel Style: ${prefs.style?.join(", ") || "Balanced"}
    - Constraints: ${prefs.constraints || "None"}
    - Language: ${prefs.language}
    - Budget Level: ${prefs.budget || "Standard"}
    - Pacing (Intensity): ${prefs.pacing || "Balanced"}

    Generate a detailed day-by-day itinerary.
    
    CRITICAL INSTRUCTIONS:
    1. **EXECUTABLE PLAN**: Do NOT create "Special Forces" (impossible) schedules. 
       - If Pacing is "Relaxed": Max 3 activities per day. Start day at 10 AM.
       - If Pacing is "Balanced": Max 4-5 activities.
       - If Pacing is "Intensive": Packed schedule is allowed (early start).
    2. **GEOSPATIAL CLUSTERING**: Group activities by neighborhood. Do NOT make the user travel back and forth across the city in one day. Ensure logical flow (Point A -> Point B -> Point C).
    3. **BUDGET**: Suggest food/activities that fit the "${prefs.budget || "Standard"}" budget.
    4. **LANGUAGE**: ALL output fields MUST be written in ${prefs.language}.
    5. **MULTI-DESTINATION**: If multiple cities, organize logically. Include inter-city transport.
    6. If "Layover" is specified, incorporate it.
    7. If user provided duration but NOT dates, suggest BEST dates in "suggested_dates" and explain why in "date_reasoning".
    8. If no hotel specified, provide 3 recommendations in "suggested_hotels" matching the ${prefs.budget} budget.
    9. Provide valid Lat/Long for every activity.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: tripSchema,
        temperature: 0.4,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as TripPlan;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const chatWithAI = async (currentPlan: TripPlan, userMessage: string): Promise<ChatResponse> => {
    if (!process.env.API_KEY) {
        throw new Error("API Key is missing.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
    You are Voya AI, an intelligent travel assistant.
    Current Trip Plan (JSON): ${JSON.stringify(currentPlan)}
    
    User Message: "${userMessage}"

    Task:
    1. Analyze the user's message.
    2. Decide if the user is asking a general question ("chat") OR if they want to update the plan ("modify").
    3. If modifying, ensure the new plan maintains logical routing (Geospatial Clustering).

    Output JSON structure:
    {
        "intent": "chat" | "modify",
        "answer": "Your response text here",
        "modified_plan": (Required ONLY if intent is 'modify') The full updated trip plan JSON.
    }
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: chatSchema,
                temperature: 0.5,
            },
        });

        const text = response.text;
        if (!text) throw new Error("No response from AI");
        return JSON.parse(text) as ChatResponse;

    } catch (error) {
        console.error("Gemini Chat Error:", error);
        throw error;
    }
};

export const generateStandardTour = async (prefs: UserPreferences): Promise<TripPlan> => {
    if (!process.env.API_KEY) {
        throw new Error("API Key is missing.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `
    Act as a traditional travel agency. 
    Create a "Standard Group Tour" itinerary for ${prefs.destination} for ${prefs.duration}.
    This should be the typical "Tourist Trap" itinerary.
    Language: ${prefs.language}.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: tripSchema,
                temperature: 0.3,
            },
        });

        const text = response.text;
        if (!text) throw new Error("No response from AI");
        return JSON.parse(text) as TripPlan;
    } catch (error) {
        console.error("Gemini API Error:", error);
        throw error;
    }
};

export const modifyTripPlan = async (currentPlan: TripPlan, userInstruction: string): Promise<TripPlan> => {
    const res = await chatWithAI(currentPlan, `Please modify the plan: ${userInstruction}`);
    if (res.intent === 'modify' && res.modified_plan) {
        return res.modified_plan;
    }
    return currentPlan;
};
