import React from 'react';
import { MapPin, Globe, Compass, Sun, Wind } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const DESTINATIONS = [
    { country: 'Japan', cities: ['Tokyo', 'Kyoto', 'Osaka', 'Hokkaido'], desc: 'Experience the perfect blend of tradition and futurism. Visit ancient temples, neon-lit streets, and enjoy world-class cuisine.', bg: 'bg-indigo-50/50 text-indigo-700' },
    { country: 'France', cities: ['Paris', 'Nice', 'Lyon', 'Bordeaux'], desc: 'The heart of art, fashion, and gastronomy. From the Eiffel Tower to the vineyards of Bordeaux.', bg: 'bg-rose-50/50 text-rose-700' },
    { country: 'Italy', cities: ['Rome', 'Venice', 'Florence', 'Milan'], desc: 'A journey through history. Explore the Colosseum, ride gondolas in Venice, and taste authentic pizza and pasta.', bg: 'bg-emerald-50/50 text-emerald-700' },
    { country: 'Thailand', cities: ['Bangkok', 'Phuket', 'Chiang Mai', 'Krabi'], desc: 'Golden temples, bustling markets, and pristine beaches. A paradise for backpackers and luxury travelers alike.', bg: 'bg-amber-50/50 text-amber-700' },
    { country: 'USA', cities: ['New York', 'Los Angeles', 'Las Vegas', 'Miami'], desc: 'From the hustle of NYC to the entertainment capital of the world. Experience diverse cultures and landscapes.', bg: 'bg-blue-50/50 text-blue-700' },
    { country: 'Spain', cities: ['Barcelona', 'Madrid', 'Seville', 'Valencia'], desc: 'Vibrant culture, stunning architecture, and delicious tapas. Don\'t miss the Sagrada Familia.', bg: 'bg-orange-50/50 text-orange-700' },
    { country: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'], desc: 'Discover the Great Barrier Reef, iconic Opera House, and vast outback landscapes in the Land Down Under.', bg: 'bg-teal-50/50 text-teal-700' },
    { country: 'Greece', cities: ['Athens', 'Santorini', 'Mykonos', 'Crete'], desc: 'Step back into ancient mythology, relax on stunning Mediterranean beaches, and enjoy fresh, vibrant cuisine.', bg: 'bg-cyan-50/50 text-cyan-700' },
    { country: 'Mexico', cities: ['Cancun', 'Mexico City', 'Tulum', 'Oaxaca'], desc: 'Rich history, vibrant festivals, ancient Mayan ruins, and some of the world\'s most beautiful beaches.', bg: 'bg-fuchsia-50/50 text-fuchsia-700' },
];

const Destinations: React.FC = () => {
  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Top Travel Destinations - AriaTrip AI" 
        description="Explore top travel destinations around the world. Get AI-generated itineraries for Japan, France, Italy, Thailand, USA, Spain, Australia, Greece, and Mexico." 
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">Explore Our Top Travel Destinations</h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Discover AI-generated itineraries for the world's most amazing places. Whether you're looking for a relaxing beach getaway, an adventurous mountain trek, or a deep dive into historical cultures, AriaTrip AI has you covered. Our intelligent algorithms analyze millions of data points to bring you the most optimized, enjoyable, and unforgettable travel experiences across the globe.
            </p>
        </div>

        {/* SEO Content Section */}
        <div className="mb-16 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-white/60 prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose These Destinations?</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Choosing the right destination is the first and most crucial step in planning any trip. The world is vast, and every country offers a unique blend of culture, history, gastronomy, and natural beauty. Our curated list of popular destinations is based on global travel trends, user preferences, and the sheer volume of incredible experiences each location provides. 
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                When you use AriaTrip AI to plan your journey to these countries, you're not just getting a generic list of tourist traps. Our AI delves deep into the nuances of each city, understanding the geographical layout, the best times to visit specific attractions, and the hidden gems that only locals know about. For instance, planning a trip to Japan requires balancing the high-tech, fast-paced environment of Tokyo with the serene, historical atmosphere of Kyoto. Our AI perfectly calculates the transit times and suggests the optimal route to ensure you experience both without feeling rushed.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-slate-50 p-6 rounded-2xl">
                    <Globe className="w-8 h-8 text-indigo-500 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Global Coverage</h3>
                    <p className="text-slate-600">From the bustling streets of New York to the tranquil beaches of Thailand, our AI understands the unique logistics of over 190 countries.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                    <Compass className="w-8 h-8 text-purple-500 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Routing</h3>
                    <p className="text-slate-600">We don't just tell you where to go; we tell you the best order to visit them, minimizing travel time and maximizing your enjoyment.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                    <Sun className="w-8 h-8 text-amber-500 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Seasonal Insights</h3>
                    <p className="text-slate-600">Our itineraries adapt to the season. We won't send you to an outdoor market during monsoon season or a ski resort in the middle of summer.</p>
                </div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DESTINATIONS.map((dest) => (
                <div key={dest.country} className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-sm hover:shadow-xl transition overflow-hidden border border-white/60 group flex flex-col">
                    <div className={`h-2 ${dest.bg.split(' ')[0].replace('text', 'bg').replace('50/50', '500')}`}></div>
                    <div className="p-8 flex-1 flex flex-col">
                        <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition">{dest.country}</h2>
                        <p className="text-slate-500 mb-6 text-sm leading-relaxed flex-1">{dest.desc}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                            {dest.cities.map(city => (
                                <span key={city} className={`text-xs px-2.5 py-1 rounded-md flex items-center gap-1 font-bold ${dest.bg}`}>
                                    <MapPin className="w-3 h-3" /> {city}
                                </span>
                            ))}
                        </div>

                        <Link 
                            to="/" 
                            state={{ autoFillDestination: dest.country }}
                            className="block text-center w-full py-3 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-900 hover:text-white font-bold transition mt-auto"
                        >
                            Plan Trip to {dest.country}
                        </Link>
                    </div>
                </div>
            ))}
        </div>

        {/* Additional SEO Content Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-sm border border-white/60 prose prose-slate max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How AI is Revolutionizing Travel Planning</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                The days of spending weeks researching destinations, reading outdated guidebooks, and struggling to piece together a coherent itinerary are over. Artificial Intelligence has fundamentally changed how we approach travel. By processing vast amounts of information—including flight schedules, hotel availability, local weather patterns, and millions of user reviews—AI can generate a highly personalized travel plan in a matter of seconds.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                AriaTrip AI goes beyond simple recommendations. It acts as your personal, 24/7 travel concierge. It understands context. If you specify that you are traveling with young children, the AI will prioritize family-friendly activities, ensure transit times are manageable, and suggest restaurants with kid-friendly menus. If you are a solo backpacker on a tight budget, it will find the best hostels, free walking tours, and cheap local eats. This level of hyper-personalization was previously only available through expensive, high-end travel agents.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Furthermore, our AI is dynamic. Travel is unpredictable—flights get delayed, attractions close unexpectedly, and weather changes. With AriaTrip AI, you can adjust your itinerary on the fly. Simply tell the AI chatbot about the change in plans, and it will instantly recalculate your route, suggesting alternative activities nearby. This flexibility ensures that your vacation remains stress-free, allowing you to focus on what truly matters: creating beautiful memories.
            </p>
            
            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">How to Choose Your Perfect Destination</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                With so many incredible places to visit, narrowing down your options can be the hardest part of travel planning. Here are a few key factors to consider when selecting your next getaway:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-lg text-slate-600 mb-8">
                <li><strong>Define Your Travel Style:</strong> Are you looking for a relaxing beach vacation, an action-packed adventure, a deep dive into history and culture, or a culinary tour? Identifying your primary goal will immediately eliminate dozens of options and highlight the best contenders.</li>
                <li><strong>Consider the Season and Weather:</strong> The time of year you plan to travel drastically impacts your experience. Research the optimal seasons for your shortlisted destinations. Avoid monsoon seasons in Southeast Asia if you want beach days, and embrace the European winter if you love Christmas markets and skiing.</li>
                <li><strong>Set a Realistic Budget:</strong> Your budget is the ultimate deciding factor. While flights to Asia might be expensive, the daily cost of living (food, accommodation, transport) is often much lower than in Western Europe or North America. Calculate the total estimated cost, not just the airfare.</li>
                <li><strong>Evaluate Travel Time and Jet Lag:</strong> If you only have a week off, spending two full days in transit and battling severe jet lag might not be worth it. Choose destinations closer to home for shorter trips, and save the long-haul flights for extended vacations.</li>
                <li><strong>Check Visa and Entry Requirements:</strong> Always verify the visa requirements for your passport before booking anything. Some countries require lengthy application processes, while others offer visa-on-arrival or visa-free entry.</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">Popular Travel Styles Explained</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Understanding your preferred travel style helps AriaTrip AI generate the most relevant and enjoyable itinerary for you. Here is a breakdown of common travel styles:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">The Cultural Explorer</h3>
                    <p className="text-slate-600">You travel to learn. Your ideal itinerary is packed with museums, historical landmarks, ancient ruins, and local art galleries. You prefer staying in historic districts and taking guided walking tours to understand the deep context of a city.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">The Culinary Enthusiast</h3>
                    <p className="text-slate-600">Your trip revolves around food. You plan your days based on restaurant reservations, street food markets, and cooking classes. You are eager to try local delicacies and understand the culture through its gastronomy.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">The Adventure Seeker</h3>
                    <p className="text-slate-600">You crave adrenaline and the great outdoors. Your itinerary includes hiking, scuba diving, zip-lining, or skiing. You prefer national parks and rugged landscapes over crowded city centers.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">The Relaxation Specialist</h3>
                    <p className="text-slate-600">You travel to unwind and de-stress. Your perfect trip involves luxury resorts, pristine beaches, spa treatments, and minimal scheduled activities. You want to disconnect from daily life and recharge your batteries.</p>
                </div>
            </div>
        </div>

        <div className="mt-16 bg-gradient-to-br from-slate-900 to-indigo-900 p-10 rounded-3xl shadow-xl text-center border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Wind className="w-32 h-32 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white relative z-10">Don't see your dream destination?</h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg relative z-10">
                AriaTrip AI's knowledge base spans the entire globe, supporting over 190 countries and thousands of cities. Whether you want to explore the bustling markets of Marrakech, hike the trails of Patagonia, or relax in a secluded cabin in the Swiss Alps, our AI can build the perfect itinerary for you. Just type your destination on our home page and let the algorithms do the rest.
            </p>
            <Link to="/" className="inline-block bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-indigo-50 transition shadow-lg relative z-10">
                Start Planning Your Custom Trip Now
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
