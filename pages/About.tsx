import React, { useState } from 'react';
import { Zap, Shield, Globe, MapPin, MessageSquare, ExternalLink, RefreshCw } from 'lucide-react';

type Lang = 'EN' | 'CN';

const About: React.FC = () => {
  const [lang, setLang] = useState<Lang>('EN');

  return (
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
        
        {/* Header with Toggle */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">About AriaTrip AI</h1>
            <div className="flex gap-2">
                <button 
                    onClick={() => setLang('EN')} 
                    className={`px-3 py-1 text-sm rounded-full font-bold transition ${lang === 'EN' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
                >
                    English
                </button>
                <button 
                    onClick={() => setLang('CN')} 
                    className={`px-3 py-1 text-sm rounded-full font-bold transition ${lang === 'CN' ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'}`}
                >
                    中文
                </button>
            </div>
        </div>
        
        <div className="prose prose-slate max-w-none text-slate-600 space-y-10">
          
          {/* INTRO */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
                {lang === 'CN' ? "AriaTrip AI 的秘密：科技如何为您带来真正的自由旅行？" : "AriaTrip AI's Secret: How Tech Brings True Freedom"}
            </h2>
            <p className="text-lg leading-relaxed">
                {lang === 'CN' 
                    ? "欢迎来到 AriaTrip AI！我们相信，旅行规划不应该是负担，而应是旅程愉悦的一部分。传统的 AI 规划工具通常缺乏灵活性和真实性，而 AriaTrip AI 的设计初衷，就是解决这些痛点，为您提供一个可信赖、可编辑、且富有灵感的智能规划平台。"
                    : "Welcome to AriaTrip AI! We believe planning shouldn't be a burden, but a joyful part of the journey. Traditional AI tools often lack flexibility and authenticity. AriaTrip AI was designed to solve these pain points, providing you with a trusted, editable, and inspiring intelligent planning platform."
                }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                  <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white p-2 rounded-full text-indigo-600 shadow-sm"><Zap className="w-5 h-5"/></div>
                      <h3 className="font-bold text-slate-900 text-lg">
                          {lang === 'CN' ? "1. 地理空间算法优化" : "1. Geospatial Optimization"}
                      </h3>
                  </div>
                  <p className="text-sm">
                      {lang === 'CN'
                        ? "拒绝无效奔波。我们的系统内置了尖端的地理空间优化算法，能精准计算每个兴趣点之间的最佳动线。我们承诺：您的精力只用在享受旅行，而不是浪费在路上。"
                        : "No more wasted travel time. Our system uses advanced geospatial algorithms to calculate the perfect route between points of interest. Spend your energy enjoying the trip, not stuck in transit."
                      }
                  </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
                  <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white p-2 rounded-full text-purple-600 shadow-sm"><Shield className="w-5 h-5"/></div>
                      <h3 className="font-bold text-slate-900 text-lg">
                          {lang === 'CN' ? "2. 本地专家视角" : "2. Local Expert Perspective"}
                      </h3>
                  </div>
                  <p className="text-sm">
                      {lang === 'CN'
                        ? "AriaTrip AI 的推荐引擎扮演着本地人专家的角色，过滤掉了常见的游客陷阱。我们为您筛选出富有地道风味的体验和“私藏行程”，让您的旅行更具深度。"
                        : "Acting as a local expert, our recommendation engine filters out tourist traps. We curate authentic experiences and 'hidden gems' to give your trip real depth."
                      }
                  </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-pink-50/50 p-6 rounded-2xl border border-pink-100">
                  <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white p-2 rounded-full text-pink-600 shadow-sm"><ExternalLink className="w-5 h-5"/></div>
                      <h3 className="font-bold text-slate-900 text-lg">
                          {lang === 'CN' ? "3. 实时社媒与地图直连" : "3. Real-Time Social Connect"}
                      </h3>
                  </div>
                  <p className="text-sm">
                      {lang === 'CN'
                        ? "为解决信息过时痛点，我们提供一键直链到 Instagram、TikTok 和 Google Maps。即时查看最新的用户评价和动态照片，让决策基于最真实的社交证明。"
                        : "To solve outdated info, we link directly to Instagram, TikTok, and Google Maps. Instantly see the latest reviews and photos, basing your decisions on real social proof."
                      }
                  </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                  <div className="flex items-center gap-3 mb-3">
                      <div className="bg-white p-2 rounded-full text-emerald-600 shadow-sm"><MessageSquare className="w-5 h-5"/></div>
                      <h3 className="font-bold text-slate-900 text-lg">
                          {lang === 'CN' ? "4. 智能聊天机器人" : "4. Smart Chatbot"}
                      </h3>
                  </div>
                  <p className="text-sm">
                      {lang === 'CN'
                        ? "旅行中总有意外。我们的 AI Chatbot 允许您通过自然语言指令（如“把今天的行程放慢”）来修改行程。AriaTrip AI 是一个随时响应您需求的互动式伴侣。"
                        : "Plans change. Our AI Chatbot allows you to modify your itinerary with natural language (e.g., 'Slow down today's pace'). AriaTrip AI is an interactive companion that responds instantly."
                      }
                  </p>
              </div>
          </div>

          <div className="mt-12 text-center p-8 bg-slate-900 text-white rounded-3xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">
                  {lang === 'CN' ? "选择 AriaTrip AI" : "Choose AriaTrip AI"}
              </h3>
              <p className="opacity-80 max-w-2xl mx-auto">
                  {lang === 'CN' 
                    ? "选择优雅、精准、且充满灵感的旅行规划新方式。" 
                    : "Choose a new way of travel planning that is elegant, precise, and full of inspiration."}
              </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;