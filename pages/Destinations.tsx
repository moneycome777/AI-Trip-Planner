import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const DESTINATIONS = [
    { country: 'Japan', cities: ['Tokyo', 'Kyoto', 'Osaka', 'Hokkaido'], desc: 'Experience the perfect blend of tradition and futurism. Visit ancient temples, neon-lit streets, and enjoy world-class cuisine.', bg: 'bg-indigo-50/50 text-indigo-700' },
    { country: 'France', cities: ['Paris', 'Nice', 'Lyon', 'Bordeaux'], desc: 'The heart of art, fashion, and gastronomy. From the Eiffel Tower to the vineyards of Bordeaux.', bg: 'bg-rose-50/50 text-rose-700' },
    { country: 'Italy', cities: ['Rome', 'Venice', 'Florence', 'Milan'], desc: 'A journey through history. Explore the Colosseum, ride gondolas in Venice, and taste authentic pizza and pasta.', bg: 'bg-emerald-50/50 text-emerald-700' },
    { country: 'Thailand', cities: ['Bangkok', 'Phuket', 'Chiang Mai', 'Krabi'], desc: 'Golden temples, bustling markets, and pristine beaches. A paradise for backpackers and luxury travelers alike.', bg: 'bg-amber-50/50 text-amber-700' },
    { country: 'USA', cities: ['New York', 'Los Angeles', 'Las Vegas', 'Miami'], desc: 'From the hustle of NYC to the entertainment capital of the world. Experience diverse cultures and landscapes.', bg: 'bg-blue-50/50 text-blue-700' },
    { country: 'Spain', cities: ['Barcelona', 'Madrid', 'Seville', 'Valencia'], desc: 'Vibrant culture, stunning architecture, and delicious tapas. Don\'t miss the Sagrada Familia.', bg: 'bg-orange-50/50 text-orange-700' },
];

const Destinations: React.FC = () => {
  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">Popular Destinations</h1>
            <p className="text-xl text-slate-600">Discover AI-generated itineraries for the world's most amazing places.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.map((dest) => (
                <div key={dest.country} className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-sm hover:shadow-xl transition overflow-hidden border border-white/60 group">
                    <div className={`h-2 ${dest.bg.split(' ')[0].replace('text', 'bg').replace('50/50', '500')}`}></div>
                    <div className="p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition">{dest.country}</h2>
                        <p className="text-slate-500 mb-6 text-sm leading-relaxed">{dest.desc}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                            {dest.cities.map(city => (
                                <span key={city} className={`text-xs px-2.5 py-1 rounded-md flex items-center gap-1 font-bold ${dest.bg}`}>
                                    <MapPin className="w-3 h-3" /> {city}
                                </span>
                            ))}
                        </div>

                        <Link to="/" className="block text-center w-full py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-900 hover:text-white font-bold transition">
                            Plan Trip to {dest.country}
                        </Link>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-16 bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-sm text-center border border-white/60">
            <h2 className="text-2xl font-bold mb-4 text-slate-900">Don't see your destination?</h2>
            <p className="text-slate-600 mb-8 max-w-lg mx-auto">AriaTrip AI supports over 190 countries. Just type your destination on our home page and let the algorithms do the rest.</p>
            <Link to="/" className="inline-block bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                Start Planning Now
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Destinations;