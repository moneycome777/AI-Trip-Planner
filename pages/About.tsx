import React, { useState } from 'react';
import { Zap, Shield, MessageSquare, ExternalLink } from 'lucide-react';

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
            <p className="text-lg leading-relaxed mb-4">
                {lang === 'CN' 
                    ? "欢迎来到 AriaTrip AI！我们相信，旅行规划不应该是负担，而应是旅程愉悦的一部分。传统的 AI 规划工具通常缺乏灵活性和真实性，而 AriaTrip AI 的设计初衷，就是解决这些痛点，为您提供一个可信赖、可编辑、且富有灵感的智能规划平台。"
                    : "Welcome to AriaTrip AI! We believe planning shouldn't be a burden, but a joyful part of the journey. Traditional AI tools often lack flexibility and authenticity. AriaTrip AI was designed to solve these pain points, providing you with a trusted, editable, and inspiring intelligent planning platform."
                }
            </p>
            <p className="text-lg leading-relaxed mb-4">
                {lang === 'CN'
                    ? "在当今快节奏的世界里，时间是我们最宝贵的资产。然而，规划一次完美的旅行往往需要耗费数十个小时去查阅无数的博客、论坛和预订网站。AriaTrip AI 的诞生正是为了打破这一现状。我们利用最先进的人工智能技术，将海量的旅行数据转化为为您量身定制的专属行程。无论您是寻求刺激的冒险家、渴望放松的度假者，还是热衷于探索当地文化的深度游爱好者，AriaTrip AI 都能在几秒钟内为您生成一份详尽、合理且充满惊喜的旅行计划。"
                    : "In today's fast-paced world, time is our most valuable asset. Yet, planning the perfect trip often takes dozens of hours scouring countless blogs, forums, and booking sites. AriaTrip AI was born to disrupt this status quo. We leverage cutting-edge artificial intelligence to transform massive amounts of travel data into a personalized itinerary tailored just for you. Whether you are a thrill-seeking adventurer, a vacationer craving relaxation, or a cultural explorer passionate about local traditions, AriaTrip AI can generate a detailed, logical, and surprising travel plan for you in seconds."
                }
            </p>
            <p className="text-lg leading-relaxed">
                {lang === 'CN'
                    ? "我们的愿景是让每个人都能轻松享受高品质的旅行体验。通过不断优化我们的算法和扩展我们的数据库，我们致力于成为您最贴心、最智能的全球旅行伴侣。从繁华的都市到宁静的乡村，从热门景点到隐秘角落，AriaTrip AI 将带您发现世界的美好，创造难忘的回忆。"
                    : "Our vision is to make high-quality travel experiences easily accessible to everyone. By continuously optimizing our algorithms and expanding our database, we are committed to becoming your most thoughtful and intelligent global travel companion. From bustling metropolises to tranquil countryside, from popular attractions to hidden corners, AriaTrip AI will guide you to discover the beauty of the world and create unforgettable memories."
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
                  <p className="text-sm mb-3">
                      {lang === 'CN'
                        ? "拒绝无效奔波。我们的系统内置了尖端的地理空间优化算法，能精准计算每个兴趣点之间的最佳动线。我们承诺：您的精力只用在享受旅行，而不是浪费在路上。"
                        : "No more wasted travel time. Our system uses advanced geospatial algorithms to calculate the perfect route between points of interest. Spend your energy enjoying the trip, not stuck in transit."
                      }
                  </p>
                  <p className="text-sm">
                      {lang === 'CN'
                        ? "传统的行程规划往往忽略了实际的地理距离和交通状况，导致游客在景点之间疲于奔命。AriaTrip AI 的算法会综合考虑距离、交通方式、甚至地形起伏，为您规划出最省时、最省力的游览路线。这意味着您可以有更多的时间去细细品味一杯当地的咖啡，或者在博物馆里多停留片刻，而不是在地铁站里迷失方向。"
                        : "Traditional itinerary planning often ignores actual geographical distances and traffic conditions, leaving tourists exhausted from rushing between attractions. AriaTrip AI's algorithms comprehensively consider distance, transportation modes, and even terrain to plan the most time-saving and effortless sightseeing routes for you. This means you have more time to savor a local coffee or linger in a museum, rather than getting lost in a subway station."
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
                  <p className="text-sm mb-3">
                      {lang === 'CN'
                        ? "AriaTrip AI 的推荐引擎扮演着本地人专家的角色，过滤掉了常见的游客陷阱。我们为您筛选出富有地道风味的体验和“私藏行程”，让您的旅行更具深度。"
                        : "Acting as a local expert, our recommendation engine filters out tourist traps. We curate authentic experiences and 'hidden gems' to give your trip real depth."
                      }
                  </p>
                  <p className="text-sm">
                      {lang === 'CN'
                        ? "我们深知，真正的旅行不仅仅是打卡著名景点，更是深入体验当地人的生活方式。因此，我们的数据库不仅包含了广为人知的地标，还收录了大量只有本地人才知道的隐秘餐厅、独立书店、特色市集和文化活动。AriaTrip AI 会根据您的兴趣偏好，将这些“隐藏的宝石”巧妙地融入您的行程中，让您的每一次旅行都独一无二，充满惊喜。"
                        : "We understand that true travel is not just about checking off famous sights, but deeply experiencing the local way of life. Therefore, our database includes not only well-known landmarks but also a vast array of hidden restaurants, independent bookstores, specialty markets, and cultural events known only to locals. Based on your interests, AriaTrip AI cleverly integrates these 'hidden gems' into your itinerary, making every trip unique and full of surprises."
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
                  <p className="text-sm mb-3">
                      {lang === 'CN'
                        ? "为解决信息过时痛点，我们提供一键直链到 Instagram、TikTok 和 Google Maps。即时查看最新的用户评价和动态照片，让决策基于最真实的社交证明。"
                        : "To solve outdated info, we link directly to Instagram, TikTok, and Google Maps. Instantly see the latest reviews and photos, basing your decisions on real social proof."
                      }
                  </p>
                  <p className="text-sm">
                      {lang === 'CN'
                        ? "在这个信息爆炸的时代，静态的旅游指南往往无法反映目的地的最新状况。一家曾经备受推崇的餐厅可能已经更换了主厨，一个原本宁静的景点可能因为某篇爆款文章而人满为患。通过与主流社交媒体和地图服务的深度整合，AriaTrip AI 让您能够随时获取目的地的最新动态、真实评价和视觉反馈。您可以直接在行程中查看其他旅行者刚刚分享的照片和视频，从而做出更明智、更符合当前实际情况的决策。"
                        : "In this age of information explosion, static travel guides often fail to reflect the latest conditions of a destination. A once highly-praised restaurant might have changed its chef, or a previously tranquil spot might be overcrowded due to a viral article. Through deep integration with mainstream social media and mapping services, AriaTrip AI allows you to access the latest updates, authentic reviews, and visual feedback of your destinations at any time. You can view photos and videos just shared by other travelers directly within your itinerary, enabling you to make smarter decisions based on the current reality."
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
                  <p className="text-sm mb-3">
                      {lang === 'CN'
                        ? "旅行中总有意外。我们的 AI Chatbot 允许您通过自然语言指令（如“把今天的行程放慢”）来修改行程。AriaTrip AI 是一个随时响应您需求的互动式伴侣。"
                        : "Plans change. Our AI Chatbot allows you to modify your itinerary with natural language (e.g., 'Slow down today's pace'). AriaTrip AI is an interactive companion that responds instantly."
                      }
                  </p>
                  <p className="text-sm">
                      {lang === 'CN'
                        ? "计划赶不上变化是旅行中的常态。也许您今天觉得特别疲惫，想要一个更轻松的下午；也许您偶然发现了一个有趣的展览，想要临时加入行程。传统的静态行程表在面对这些突发需求时往往显得无能为力。而 AriaTrip AI 的智能聊天机器人则像一位随时待命的私人助理。您只需用日常语言告诉它您的想法，它就能迅速理解您的意图，并实时重新计算和调整您的行程，确保您的旅行始终保持最佳状态。"
                        : "Plans falling behind changes is a norm in travel. Perhaps you feel particularly tired today and want a more relaxed afternoon; or maybe you stumbled upon an interesting exhibition and want to add it to your itinerary on the fly. Traditional static itineraries are often helpless in the face of these sudden needs. AriaTrip AI's smart chatbot, however, acts like a personal assistant on standby 24/7. You simply tell it your thoughts in everyday language, and it quickly understands your intent, recalculating and adjusting your itinerary in real-time to ensure your trip is always at its best."
                      }
                  </p>
              </div>
          </div>

          <div className="mt-12 text-center p-8 bg-slate-900 text-white rounded-3xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                  {lang === 'CN' ? "选择 AriaTrip AI，开启您的智能旅行新纪元" : "Choose AriaTrip AI, Start Your New Era of Smart Travel"}
              </h3>
              <p className="opacity-80 max-w-3xl mx-auto text-lg leading-relaxed mb-6">
                  {lang === 'CN' 
                    ? "我们不仅仅是一个工具，更是您探索世界的得力伙伴。选择 AriaTrip AI，就是选择优雅、精准、且充满灵感的旅行规划新方式。让我们一起，把繁琐的规划交给人工智能，把纯粹的快乐留给旅行本身。" 
                    : "We are not just a tool, but your capable partner in exploring the world. Choosing AriaTrip AI means choosing a new way of travel planning that is elegant, precise, and full of inspiration. Let's leave the tedious planning to artificial intelligence and keep the pure joy for the journey itself."}
              </p>
              <p className="opacity-80 max-w-3xl mx-auto text-lg leading-relaxed">
                  {lang === 'CN' 
                    ? "无论您是独自踏上寻找自我的旅程，还是与家人朋友共享欢乐时光，AriaTrip AI 都将陪伴您走过每一段精彩的旅程。现在就开始您的第一次智能规划吧，发现那些未曾预见的风景，体验那些超乎想象的奇遇。世界那么大，AriaTrip AI 带您去看看。" 
                    : "Whether you are embarking on a solo journey of self-discovery or sharing joyous moments with family and friends, AriaTrip AI will accompany you through every wonderful journey. Start your first smart planning now, discover unforeseen landscapes, and experience unimaginable adventures. The world is vast, let AriaTrip AI show you around."}
              </p>
          </div>

          {/* ADDITIONAL SEO CONTENT */}
          <div className="mt-16 space-y-12 border-t border-slate-200 pt-12">
              
              {/* The Technology Behind AriaTrip AI */}
              <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                      {lang === 'CN' ? "AriaTrip AI 背后的核心技术" : "The Technology Behind AriaTrip AI"}
                  </h2>
                  <p className="text-lg leading-relaxed mb-4">
                      {lang === 'CN'
                          ? "AriaTrip AI 的强大功能并非偶然，它建立在最前沿的人工智能和机器学习技术之上。我们的核心引擎利用自然语言处理（NLP）来深度理解您的个性化需求，无论是“带小孩的轻松游”还是“极限运动爱好者的狂欢”。通过分析数百万条真实的旅行数据、用户评价和实时交通信息，我们的算法能够在庞大的可能性空间中，为您筛选出最优的行程组合。"
                          : "The power of AriaTrip AI is no accident; it is built on the cutting edge of artificial intelligence and machine learning technologies. Our core engine utilizes Natural Language Processing (NLP) to deeply understand your personalized needs, whether it's a 'relaxing trip with kids' or a 'thrill-seeker's carnival.' By analyzing millions of real travel data points, user reviews, and real-time traffic information, our algorithms can filter out the optimal itinerary combination from a vast space of possibilities."
                      }
                  </p>
                  <p className="text-lg leading-relaxed">
                      {lang === 'CN'
                          ? "此外，我们的动态路由优化技术（Dynamic Routing Optimization）确保了行程在地理位置上的合理性。它不仅计算两点之间的直线距离，更考虑了实际的交通工具、拥堵时段以及景点的最佳游览时间。这种技术与人类专家的经验相结合，使得 AriaTrip AI 生成的不仅仅是一份清单，而是一份真正可执行、高效率的旅行蓝图。"
                          : "Furthermore, our Dynamic Routing Optimization technology ensures the geographical rationality of the itinerary. It doesn't just calculate the straight-line distance between two points; it considers actual transportation modes, congestion periods, and the best times to visit attractions. This technology, combined with human expert experience, means that AriaTrip AI generates not just a list, but a truly executable, highly efficient travel blueprint."
                      }
                  </p>
              </div>

              {/* Why Choose Us over Traditional Agencies */}
              <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                      {lang === 'CN' ? "为什么选择我们而非传统旅行社？" : "Why Choose Us Over Traditional Travel Agencies?"}
                  </h2>
                  <p className="text-lg leading-relaxed mb-4">
                      {lang === 'CN'
                          ? "传统旅行社通常提供千篇一律的跟团游，行程固定、缺乏弹性，且往往包含隐形消费或强制购物。而 AriaTrip AI 赋予了您完全的控制权。您是自己旅程的导演，我们只是为您提供最佳剧本的编剧。您可以随时根据心情调整行程，无需受制于团队的节奏。"
                          : "Traditional travel agencies often provide cookie-cutter group tours with fixed itineraries, lacking flexibility, and frequently including hidden costs or forced shopping. AriaTrip AI gives you complete control. You are the director of your own journey; we are just the screenwriter providing the best script. You can adjust your itinerary at any time based on your mood, without being tied to a group's pace."
                      }
                  </p>
                  <p className="text-lg leading-relaxed">
                      {lang === 'CN'
                          ? "更重要的是，AriaTrip AI 是完全透明和客观的。我们的推荐基于数据和真实评价，而非商业回扣。我们致力于为您寻找性价比最高、体验最好的选择，让您的每一分钱都花在刀刃上。从预算背包客到奢华度假者，AriaTrip AI 都能提供量身定制的无偏见建议。"
                          : "More importantly, AriaTrip AI is completely transparent and objective. Our recommendations are based on data and authentic reviews, not commercial kickbacks. We are dedicated to finding the most cost-effective and best-experience options for you, ensuring every penny is well spent. From budget backpackers to luxury vacationers, AriaTrip AI provides tailored, unbiased advice."
                      }
                  </p>
              </div>

              {/* Our Core Values */}
              <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                      {lang === 'CN' ? "我们的核心价值观" : "Our Core Values"}
                  </h2>
                  <ul className="list-disc list-inside text-lg leading-relaxed space-y-3">
                      <li>
                          <strong>{lang === 'CN' ? "用户至上 (User-Centricity): " : "User-Centricity: "}</strong>
                          {lang === 'CN' ? "您的体验是我们一切工作的出发点和落脚点。" : "Your experience is the starting point and ultimate goal of everything we do."}
                      </li>
                      <li>
                          <strong>{lang === 'CN' ? "持续创新 (Continuous Innovation): " : "Continuous Innovation: "}</strong>
                          {lang === 'CN' ? "我们不断探索 AI 技术的边界，只为提供更智能、更便捷的服务。" : "We constantly explore the boundaries of AI technology to provide smarter, more convenient services."}
                      </li>
                      <li>
                          <strong>{lang === 'CN' ? "真实透明 (Authenticity & Transparency): " : "Authenticity & Transparency: "}</strong>
                          {lang === 'CN' ? "拒绝虚假宣传，提供客观、真实的旅行信息和建议。" : "We reject false advertising and provide objective, authentic travel information and advice."}
                      </li>
                      <li>
                          <strong>{lang === 'CN' ? "可持续旅行 (Sustainable Travel): " : "Sustainable Travel: "}</strong>
                          {lang === 'CN' ? "我们鼓励并推荐环保的出行方式，致力于保护我们美丽的地球家园。" : "We encourage and recommend eco-friendly travel methods, committed to protecting our beautiful planet."}
                      </li>
                  </ul>
              </div>

              {/* The Future of Travel Planning */}
              <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">
                      {lang === 'CN' ? "旅行规划的未来" : "The Future of Travel Planning"}
                  </h2>
                  <p className="text-lg leading-relaxed mb-4">
                      {lang === 'CN'
                          ? "我们相信，未来的旅行规划将变得像与老朋友聊天一样自然。AriaTrip AI 正朝着这个方向不断迈进。我们正在研发更高级的上下文理解能力，让 AI 能够记住您的偏好历史，甚至在您开口之前就能预测您的需求。想象一下，一个完全懂您的数字伴侣，在您抵达一个新城市时，自动为您推荐最符合您口味的隐藏咖啡馆。"
                          : "We believe that future travel planning will become as natural as chatting with an old friend. AriaTrip AI is constantly moving in this direction. We are developing more advanced contextual understanding capabilities, allowing the AI to remember your preference history and even predict your needs before you speak. Imagine a digital companion that completely understands you, automatically recommending the hidden cafe that best suits your taste the moment you arrive in a new city."
                      }
                  </p>
                  <p className="text-lg leading-relaxed">
                      {lang === 'CN'
                          ? "随着增强现实（AR）和虚拟现实（VR）技术的普及，AriaTrip AI 也将探索如何将这些技术融入行程预览中，让您在出发前就能“身临其境”地感受目的地的魅力。我们的旅程才刚刚开始，我们期待着与您一起，重新定义探索世界的方式。"
                          : "With the popularization of Augmented Reality (AR) and Virtual Reality (VR) technologies, AriaTrip AI will also explore how to integrate these technologies into itinerary previews, allowing you to 'immersively' feel the charm of the destination before departure. Our journey has just begun, and we look forward to redefining the way we explore the world together with you."
                      }
                  </p>
              </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
