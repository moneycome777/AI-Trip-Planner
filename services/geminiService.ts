
import { GoogleGenAI, Type } from "@google/genai";
import { TripPlan, UserPreferences, ChatResponse } from "../types";
import { MOCK_TRIP_PLAN } from "../constants";
import emailjs from '@emailjs/browser';

// --- CONFIGURATION ---
const MODEL_FLASH = "gemini-3-flash-preview";

// --- SCHEMAS ---
const tripSchema = {
  type: Type.OBJECT,
  properties: {
    trip_summary: { type: Type.STRING, description: "A catchy summary of the trip" },
    estimated_budget: { type: Type.STRING, description: "Total estimated cost for the trip (Food, Transport, Tickets ONLY). EXCLUDE flights, accommodation, and shopping. Display in two currencies." },
    budget_breakdown: { type: Type.STRING, description: "Detailed explanation of what the estimated_budget covers. Explicitly mention the buffer amount added for unlisted meals, snacks, bottled water, and casual transport." },
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
  required: ["trip_summary", "estimated_budget", "budget_breakdown", "days", "warnings", "packing_list", "transport_advice"]
};

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

// --- HELPER FOR SENDING QUOTA ALERTS ---
const sendQuotaAlert = async (error: any, context: string) => {
    // Using the same credentials as Contact form
    const SERVICE_ID = 'service_q2f5gav';
    const TEMPLATE_ID = 'template_s9guskd';
    const PUBLIC_KEY = 'k9Wtzi7pVLF6sI3cV';

    const templateParams = {
        name: "SYSTEM ALERT - QUOTA EXCEEDED",
        time: new Date().toLocaleString(),
        error_message: `API QUOTA HIT (${context}):\n${error.toString()}`,
        message: "The application has hit the Gemini API rate limit (429). Immediate attention required if this is frequent."
    };

    try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log(`Quota alert email sent for ${context}.`);
    } catch (err) {
        console.error("Failed to send quota alert email", err);
    }
};

// --- ACTIONS ---
export const generateTripPlan = async (prefs: UserPreferences): Promise<TripPlan> => {
  if (typeof window !== 'undefined' && localStorage.getItem('tripgenie_dev_mode') === 'true') {
      console.log("Dev Mode detected: Returning Mock Plan immediately.");
      return MOCK_TRIP_PLAN; // Instant return
  }

  if (!process.env.API_KEY) {
    console.error("API Key is undefined. Check vite.config.ts and Vercel Environment Variables.");
    throw new Error("API Key is missing. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

  const prompt = `
    Act as an expert local travel planner (AriaTrip AI).
    
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
    - Transport Preference: ${prefs.transportMode || "Public Transport"}

    Generate a detailed day-by-day itinerary.
    
    CRITICAL INSTRUCTIONS:
    1. **EXECUTABLE PLAN**: Do NOT create "Special Forces" (impossible) schedules. 
       - If Pacing is "Relaxed": Max 3 activities per day. Start day at 10 AM.
       - If Pacing is "Balanced": Max 4-5 activities.
       - If Pacing is "Intensive": Packed schedule is allowed (early start).
    2. **GEOSPATIAL CLUSTERING**: Group activities by neighborhood. Do NOT make the user travel back and forth across the city in one day. Ensure logical flow (Point A -> Point B -> Point C).
    3. **BUDGET RULES**:
       - If Budget is "Economy": Hotels MUST be Hostels, Capsules, or Budget Guesthouses. Food MUST be street food or cheap eats. Avoid expensive transport (use bus/metro/walking).
       - If Budget is "Standard": Mid-range hotels, mix of restaurant and street food.
       - If Budget is "Luxury": 5-star hotels, fine dining, private drivers.
    4. **TRANSPORT RULES**:
       - If Transport is "Self-Driving": Suggest parking lots near attractions.
       - If Transport is "Public Transport": Suggest nearest train/bus stations.
       - If Transport is "Taxi/Ride-hailing": Mention Grab/Uber availability.
    5. **LANGUAGE**: ALL output fields MUST be written in ${prefs.language}.
    6. **MULTI-DESTINATION**: If multiple cities, organize logically. Include inter-city transport.
    7. If "Layover" is specified, incorporate it.
    8. If user provided duration but NOT dates, suggest BEST dates in "suggested_dates" and explain why in "date_reasoning".
    9. If no hotel specified, provide 3 recommendations in "suggested_hotels" matching the ${prefs.budget} budget.
    10. Provide valid Lat/Long for every activity.
    11. **CURRENCY**: All costs (estimated_budget, cost_estimate, hotel price_range) MUST be displayed in TWO currencies:
        1. The local currency of the Destination.
        2. The currency of the 'Depart From' country (default to USD if not specified).
        Format: "Local Amount (~Home Amount)". Example: "10,000 JPY (~$70 USD)".
    12. **BUDGET CALCULATION**: 
        - The 'estimated_budget' should be a REALISTIC total for the trip excluding Shopping and Accommodation.
        - It MUST include the sum of all itemized 'cost_estimate' fields.
        - PLUS, it MUST include a realistic buffer for unlisted expenses (e.g., bottled water, snacks, random taxi rides, restroom fees).
        - You MUST explain what is included in this buffer in the 'budget_breakdown' field.
    13. **JSON FORMATTING**: Ensure the output is perfectly valid JSON. Do NOT include unescaped newlines or quotes within strings. Use \\n for newlines if needed.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_FLASH,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: tripSchema,
        temperature: 0.3,
        maxOutputTokens: 8192,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    try {
        let cleanedText = text.trim();
        if (cleanedText.startsWith('```')) {
            cleanedText = cleanedText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
        }
        // Also replace unescaped newlines in strings if possible, but standard JSON.parse will handle valid JSON.
        // The prompt instruction should prevent unescaped newlines.
        return JSON.parse(cleanedText) as TripPlan;
    } catch (e) {
        console.error("JSON Parse Error in generateTripPlan. Raw text:", text);
        throw new Error("Failed to parse AI response as JSON.");
    }
  } catch (error: any) {
      console.error("Gemini API Error:", error);
    
    // FALLBACK TO MOCK DATA ON QUOTA ERROR (429) OR MODEL ERROR (404) OR GENERAL ERROR FOR DEV
    if (error.toString().includes("429") || error.toString().includes("Quota") || error.toString().includes("404")) {
        console.warn("API Quota Limit hit or Model unavailable. Returning MOCK data for testing purposes.");
        
        // Trigger Email Alert
        sendQuotaAlert(error, "generateTripPlan");

        return MOCK_TRIP_PLAN;
    }

    throw error;
  }
};

export const chatWithAI = async (currentPlan: TripPlan, userMessage: string): Promise<ChatResponse> => {
    if (!process.env.API_KEY) {
        throw new Error("API Key is missing.");
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

    const prompt = `
    You are AriaTrip AI, an intelligent travel assistant.
    Current Trip Plan (JSON): ${JSON.stringify(currentPlan)}
    
    User Message: "${userMessage}"

    Task:
    1. Analyze the user's message.
    2. Decide if the user is asking a general question ("chat") OR if they want to update the plan ("modify").
    3. If modifying, ensure the new plan maintains logical routing (Geospatial Clustering).
    4. Maintain the dual-currency format for any new costs mentioned.
    5. **JSON FORMATTING**: Ensure the output is perfectly valid JSON. Do NOT include unescaped newlines or quotes within strings. Use \\n for newlines if needed.

    Output JSON structure:
    {
        "intent": "chat" | "modify",
        "answer": "Your response text here",
        "modified_plan": (Required ONLY if intent is 'modify') The full updated trip plan JSON.
    }
    `;

    try {
        const response = await ai.models.generateContent({
            model: MODEL_FLASH,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: chatSchema,
                temperature: 0.5,
                maxOutputTokens: 8192,
            },
        });

        const text = response.text;
        if (!text) throw new Error("No response from AI");
        
        try {
            let cleanedText = text.trim();
            if (cleanedText.startsWith('```')) {
                cleanedText = cleanedText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
            }
            return JSON.parse(cleanedText) as ChatResponse;
        } catch (e) {
            console.error("JSON Parse Error in chatWithAI. Raw text:", text);
            throw new Error("Failed to parse AI response as JSON.");
        }
    } catch (error: any) {
        console.error("Gemini Chat Error:", error);
        
        // Trigger Email Alert if it's a quota issue
        if (error.toString().includes("429") || error.toString().includes("Quota")) {
            sendQuotaAlert(error, "chatWithAI");
        }

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
    CURRENCY: Show costs in Destination currency AND 'Depart From' currency (${prefs.departFrom || "USD"}).
    Format: "Local (~Depart)".
    Include a 'budget_breakdown' explaining the group tour fees.
    **JSON FORMATTING**: Ensure the output is perfectly valid JSON. Do NOT include unescaped newlines or quotes within strings. Use \\n for newlines if needed.
    `;
    try {
        const response = await ai.models.generateContent({
            model: MODEL_FLASH,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: tripSchema,
                temperature: 0.2,
                maxOutputTokens: 8192,
            },
        });
        
        const text = response.text;
        if (!text) throw new Error("No response from AI");
        
        try {
            let cleanedText = text.trim();
            if (cleanedText.startsWith('```')) {
                cleanedText = cleanedText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
            }
            return JSON.parse(cleanedText) as TripPlan;
        } catch (e) {
            console.error("JSON Parse Error in generateStandardTour. Raw text:", text);
            throw new Error("Failed to parse AI response as JSON.");
        }
    } catch (error : any) {
        console.error("Gemini API Error:", error);
        // Fallback for standard tour as well if quota hit
        if (error.toString().includes("429") || error.toString().includes("Quota")) {
             sendQuotaAlert(error, "generateStandardTour");
             return MOCK_TRIP_PLAN;
        }
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
