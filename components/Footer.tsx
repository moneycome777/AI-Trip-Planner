
import React from 'react';
import { Link } from 'react-router-dom';
import { KNOWLEDGE_DATA } from '../pages/KnowledgeBase';
import { Sparkles, MapPin, Shield, Mail } from 'lucide-react';

const Footer: React.FC = () => {
    // We'll show all articles in a organized way
    const articles = Object.entries(KNOWLEDGE_DATA);
    
    return (
        <footer className="w-full bg-white border-t border-slate-200 mt-auto z-20">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                {/* Brand & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-indigo-400" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-900">AriaTrip AI</span>
                        </div>
                        <p className="text-slate-500 max-w-md leading-relaxed text-lg">
                            The world's most advanced AI travel planner. We use military-grade geospatial optimization 
                            to create logical, map-based itineraries that save you hours of research. 
                            Free, private, and registration-free.
                        </p>
                        <div className="flex gap-6">
                            <Link to="/about" className="text-slate-400 hover:text-slate-900 transition font-bold text-sm uppercase tracking-widest">About</Link>
                            <Link to="/contact" className="text-slate-400 hover:text-slate-900 transition font-bold text-sm uppercase tracking-widest">Contact</Link>
                            <Link to="/privacy" className="text-slate-400 hover:text-slate-900 transition font-bold text-sm uppercase tracking-widest">Privacy</Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-slate-900 font-black uppercase text-xs tracking-[0.2em] mb-6">Core Values</h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-slate-600">
                                <Shield className="w-5 h-5 text-indigo-500" />
                                <span className="text-sm font-medium">Privacy First (No Login)</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                                <MapPin className="w-5 h-5 text-indigo-500" />
                                <span className="text-sm font-medium">Geospatial Optimization</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                                <Mail className="w-5 h-5 text-indigo-500" />
                                <span className="text-sm font-medium">Verified Social Proof</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-slate-900 font-black uppercase text-xs tracking-[0.2em] mb-6">Fast Track</h4>
                        <Link to="/" className="block p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-indigo-50 hover:border-indigo-100 transition group">
                            <span className="text-sm font-bold block text-slate-900">New Trip Plan</span>
                            <span className="text-xs text-slate-500 group-hover:text-indigo-600">Start from scratch in 30s</span>
                        </Link>
                    </div>
                </div>

                {/* Knowledge Hub - The Low Value Content Fix */}
                <div className="pt-16 border-t border-slate-100">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-8 h-1 h-px bg-indigo-500"></div>
                        <h3 className="text-xl font-black text-slate-900">Travel Intelligence Hub</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map(([slug, content]) => (
                            <Link 
                                key={slug} 
                                to={`/${slug}`} 
                                className="group p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-50 transition-all duration-300"
                            >
                                <h4 className="text-base font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                    {content.title}
                                </h4>
                                <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-4">
                                    {content.directAnswer}
                                </p>
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 flex items-center gap-2">
                                    Read Full Insight <div className="w-4 h-0.5 bg-indigo-500"></div>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-400 text-xs font-medium">
                        &copy; {new Date().getFullYear()} AriaTrip AI. Powered by military-grade geospatial intelligence.
                    </p>
                    <div className="flex gap-4">
                         <span className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">Global Travel Optimization Engine v4.2</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
