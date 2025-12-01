import React from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const DESTINATIONS = [
    { country: 'Japan', cities: ['Tokyo', 'Kyoto', 'Osaka', 'Hokkaido'], desc: 'Experience the perfect blend of tradition and futurism. Visit ancient temples, neon-lit streets, and enjoy world-class cuisine.' },
    { country: 'France', cities: ['Paris', 'Nice', 'Lyon', 'Bordeaux'], desc: 'The heart of art, fashion, and gastronomy. From the Eiffel Tower to the vineyards of Bordeaux.' },
    { country: 'Italy', cities: ['Rome', 'Venice', 'Florence', 'Milan'], desc: 'A journey through history. Explore the Colosseum, ride gondolas in Venice, and taste authentic pizza and pasta.' },
    { country: 'Thailand', cities: ['Bangkok', 'Phuket', 'Chiang Mai', 'Krabi'], desc: 'Golden temples, bustling markets, and pristine beaches. A paradise for backpackers and luxury travelers alike.' },
    { country: 'USA', cities: ['New York', 'Los Angeles', 'Las Vegas', 'Miami'], desc: 'From the hustle of NYC to the entertainment capital of the world. Experience diverse cultures and landscapes.' },
    { country: 'Spain', cities: ['Barcelona', 'Madrid', 'Seville', 'Valencia'], desc: 'Vibrant culture, stunning architecture, and delicious tapas. Don\'t miss the Sagrada Familia.' },
];

const Destinations: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h1>
            <p className="text-xl text-gray-600">Discover AI-generated itineraries for the world's most amazing places.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.map((dest) => (
                <div key={dest.country} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
                    <div className="bg-indigo-600 h-2"></div>
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{dest.country}</h2>
                        <p className="text-gray-600 mb-4 text-sm">{dest.desc}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                            {dest.cities.map(city => (
                                <span key={city} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {city}
                                </span>
                            ))}
                        </div>

                        <Link to="/" className="block text-center w-full py-2 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-semibold transition">
                            Plan Trip to {dest.country}
                        </Link>
                    </div>
                </div>
            ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-2xl shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Don't see your destination?</h2>
            <p className="text-gray-600 mb-6">TripGenie supports over 190 countries. Just type your destination on our home page and let the AI do the rest.</p>
            <Link to="/" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
                Start Planning Now
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Destinations;