import React from 'react';
import { Zap, Shield, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About TripGenie AI</h1>
        
        <div className="prose prose-indigo text-gray-600 space-y-6">
          <p className="text-lg leading-relaxed">
            TripGenie is a cutting-edge travel technology platform designed to eliminate the stress of itinerary planning. Born from the frustration of having 20 browser tabs open just to plan a weekend getaway, we built a solution that does the heavy lifting for you.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8">Our Mission</h2>
          <p>
            To make travel planning instant, personalized, and accessible to everyone. We believe that technology should handle the logistics so you can focus on the experience.
          </p>

          <h2 className="text-xl font-bold text-gray-800 mt-8">How We Use AI</h2>
          <p>
            TripGenie utilizes Google's Gemini 2.5 Flash model, a state-of-the-art Large Language Model (LLM). Unlike basic search engines, our AI understands context. When you say "romantic trip to Paris on a budget," it understands the nuance of "romantic" (views, ambiance) and "budget" (affordable bistros, free parks) simultaneously.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="font-bold">Fast</h3>
              <p className="text-sm">Plans generated in under 30 seconds.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold">Global</h3>
              <p className="text-sm">Support for 100+ countries & 12 languages.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold">Secure</h3>
              <p className="text-sm">No login required. We don't track you.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;