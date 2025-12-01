# TripGenie 🧞‍♂️

TripGenie is an AI-powered travel planner that generates map-based itineraries in seconds using Google Gemini 2.5.

## 🚀 How to Deploy

### Option 1: Vercel (Recommended)
1. Fork/Upload this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and import the project.
3. In **Environment Variables**, add:
   - Name: `API_KEY`
   - Value: `Your_Google_Gemini_API_Key`
4. Click **Deploy**.

### Option 2: Run Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory:
   ```
   API_KEY=your_actual_api_key_here
   ```
   *(Note: Do not commit .env to GitHub)*
3. Start the server:
   ```bash
   npm run dev
   ```

## ⚠️ Security Note
This is a client-side MVP. The API Key is embedded in the frontend build. For a production enterprise application, move the `geminiService.ts` logic to a backend server (Node.js/Python) to keep your API key hidden.
