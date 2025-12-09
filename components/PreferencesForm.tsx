import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPreferences, Language } from '../types';
import { TRAVEL_STYLES, BUDGET_LEVELS, PACING_STYLES } from '../constants';
import { MapPin, Calendar, Hotel, Globe, ChevronDown, ChevronUp, Plane, Sparkles, Clock, PlaneTakeoff, Info, Zap, MousePointer, Heart, Plus, X, DollarSign, Activity as ActivityIcon, Users, Map as MapIcon, Shield } from 'lucide-react';

interface Props {
  onSubmit: (prefs: UserPreferences) => void;
}

const POPULAR_DESTINATIONS: Record<string, string[]> = {
    // Japan
    'japan': [
        'Tokyo', 'Osaka', 'Kyoto', 'Hokkaido', 'Okinawa', 'Nara', 'Fukuoka', 'Nagoya',
        'Mount Fuji', 'Arashiyama Bamboo Grove', 'Fushimi Inari Shrine', 'Tokyo Tower'
    ],
    // China
    'china': [
        'Beijing', 'Shanghai', 'Guangzhou', 'Chengdu', 'Xi\'an', 'Shenzhen', 'Hangzhou', 'Nanjing',
        'Great Wall of China', 'Terracotta Army', 'West Lake', 'The Bund'
    ],
    // USA
    'usa': [
        'New York', 'Los Angeles', 'San Francisco', 'Las Vegas', 'Hawaii', 'Chicago', 'Miami', 'Boston', 'Orlando',
        'Statue of Liberty', 'Golden Gate Bridge', 'Grand Canyon', 'Times Square', 'Hollywood Sign'
    ],
    'united states': [
        'New York', 'Los Angeles', 'San Francisco', 'Las Vegas', 'Hawaii', 'Chicago', 'Miami', 'Boston', 'Orlando',
        'Statue of Liberty', 'Golden Gate Bridge', 'Grand Canyon', 'Times Square', 'Hollywood Sign'
    ],
    // Europe
    'europe': [
        'London', 'Paris', 'Rome', 'Barcelona', 'Amsterdam', 'Berlin', 'Prague', 'Vienna', 'Budapest', 'Santorini'
    ]
};

// Marketing Copy Helper
const getMarketingCopy = (lang: Language) => {
    if (lang === '中文') {
        return {
            heroTitle: "AriaTrip AI：优雅的旅行，由精准的算法谱写。",
            heroSubtitle: "告别僵硬的模板行程，迎接属于您的咏叹调之旅。",
            featuresTitle: "核心卖点",
            feature1Title: "不止规划，更是定制",
            feature1Desc: "您的 AI 向导，只推荐本地人才知道的私藏角落。",
            feature2Title: "路线零折返",
            feature2Desc: "军工级算法优化，将您路上的时间压缩到极致。",
            feature3Title: "所见即所信",
            feature3Desc: "行程直连 Insta/TikTok，一键验证真实体验和最新动态。",
            howItWorksTitle: "AriaTrip AI 怎么工作？",
            how1Title: "定义您的旅程",
            how1Desc: "输入目的地和偏好，告诉我们您是想“特种兵”式打卡还是慵懒漫游。",
            how2Title: "智能聚类逻辑",
            how2Desc: "AriaTrip AI 会自动聚合附近的景点，绝不让您在城市两端来回奔波。",
            how3Title: "可视化与执行",
            how3Desc: "在地图上直观查看路线，一键预订，让计划变成现实。",
            footerCopy: "AriaTrip AI - 让每一次旅行都如同一支顺畅、迷人的咏叹调。"
        };
    }
    // Default English
    return {
        heroTitle: "AriaTrip AI: Elegant travel, composed by precise algorithms.",
        heroSubtitle: "Say goodbye to rigid templates, welcome your Aria journey.",
        featuresTitle: "Core Features",
        feature1Title: "More Than Planning",
        feature1Desc: "Your AI guide recommending hidden corners only locals know.",
        feature2Title: "Zero Backtracking",
        feature2Desc: "Military-grade algorithm optimization to minimize your transit time.",
        feature3Title: "See It, Believe It",
        feature3Desc: "Direct links to Insta/TikTok to verify real experiences instantly.",
        howItWorksTitle: "How AriaTrip AI Works",
        how1Title: "Define Your Trip",
        how1Desc: "Enter destinations and preferences. Tell us if you want a relaxed foodie tour or an intensive run.",
        how2Title: "Smart Clustering",
        how2Desc: "AriaTrip AI groups nearby attractions. No running back and forth. It calculates logical routes.",
        how3Title: "Visualize & Execute",
        how3Desc: "See your optimized route on the map. It's a plan you can actually follow.",
        footerCopy: "AriaTrip AI - Making every trip a smooth, charming aria."
    };
};

const UI_TEXT: Record<Language, any> = {
  'English': {
    whereLabel: "Where to? (Add multiple)",
    wherePlaceholder: "e.g. Tokyo (Press Enter)",
    departLabel: "Depart from?",
    departPlaceholder: "e.g. London",
    whenLabel: "When / How long?",
    whenPlaceholder: "e.g. 5 Days",
    advanced: "Advanced Settings (Optional)",
    layoverLabel: "Layover / Stopover",
    layoverPlaceholder: "e.g. 10h stop in Dubai",
    hotelLabel: "Hotel / Accommodation",
    hotelPlaceholder: "e.g. Hilton Osaka",
    styleLabel: "Travel Style",
    constraintsLabel: "Constraints / Special Requests",
    constraintsPlaceholder: "e.g. No spicy food...",
    budgetLabel: "Budget Level",
    pacingLabel: "Trip Pacing (Intensity)",
    button: "Generate Trip"
  },
  '中文': {
    whereLabel: "去哪里？(可添加多个)",
    wherePlaceholder: "例如：东京 (按回车添加)",
    departLabel: "出发地？",
    departPlaceholder: "例如：上海",
    whenLabel: "时间 / 多久？",
    whenPlaceholder: "例如：5天",
    advanced: "高级设置 (可选)",
    layoverLabel: "中转 / 停留",
    layoverPlaceholder: "例如：在迪拜停留10小时",
    hotelLabel: "酒店 / 住宿",
    hotelPlaceholder: "例如：大阪希尔顿",
    styleLabel: "旅行风格",
    constraintsLabel: "限制 / 特殊要求",
    constraintsPlaceholder: "例如：不吃辣...",
    budgetLabel: "预算等级",
    pacingLabel: "行程节奏 (强度)",
    button: "生成行程"
  },
  '日本語': {
    whereLabel: "どこへ？(複数追加可)",
    wherePlaceholder: "例：東京 (Enterで追加)",
    departLabel: "出発地",
    departPlaceholder: "例：東京",
    whenLabel: "いつ / 期間？",
    whenPlaceholder: "例：5日間",
    advanced: "詳細設定 (任意)",
    layoverLabel: "乗り継ぎ / 経由",
    layoverPlaceholder: "例：ドバイで10時間待機",
    hotelLabel: "ホテル / 宿泊先",
    hotelPlaceholder: "例：ヒルトン大阪",
    styleLabel: "旅行スタイル",
    constraintsLabel: "制約 / 特別なリクエスト",
    constraintsPlaceholder: "例：辛いものはダメ...",
    budgetLabel: "予算レベル",
    pacingLabel: "旅行のペース",
    button: "プランを作成"
  },
  'Hindi': {
      whereLabel: "कहाँ जाना है?",
      wherePlaceholder: "जैसे टोक्यो",
      departLabel: "कहाँ से?",
      departPlaceholder: "जैसे दिल्ली",
      whenLabel: "कब / कितने दिन?",
      whenPlaceholder: "जैसे 5 दिन",
      advanced: "उन्नत सेटिंग्स",
      layoverLabel: "लेओवर",
      layoverPlaceholder: "जैसे दुबई में 8 घंटे",
      hotelLabel: "होटल",
      hotelPlaceholder: "जैसे हिल्टन",
      styleLabel: "शैली",
      constraintsLabel: "विशेष अनुरोध",
      constraintsPlaceholder: "जैसे मसालेदार नहीं",
      budgetLabel: "बजट",
      pacingLabel: "गति",
      button: "यात्रा बनाएँ"
  },
  'Spanish': {
      whereLabel: "¿A dónde?",
      wherePlaceholder: "ej. Tokio",
      departLabel: "¿Desde dónde?",
      departPlaceholder: "ej. Madrid",
      whenLabel: "¿Cuándo / Cuánto?",
      whenPlaceholder: "ej. 5 días",
      advanced: "Opciones avanzadas",
      layoverLabel: "Escala",
      layoverPlaceholder: "ej. 10h en Dubái",
      hotelLabel: "Hotel",
      hotelPlaceholder: "ej. Hilton",
      styleLabel: "Estilo",
      constraintsLabel: "Restricciones",
      constraintsPlaceholder: "ej. Sin picante",
      budgetLabel: "Presupuesto",
      pacingLabel: "Ritmo",
      button: "Generar Viaje"
  },
  'Arabic': {
      whereLabel: "إلى أين؟",
      wherePlaceholder: "مثلاً: طوكيو",
      departLabel: "من أين؟",
      departPlaceholder: "مثلاً: الرياض",
      whenLabel: "متى / المدة؟",
      whenPlaceholder: "مثلاً: 5 أيام",
      advanced: "إعدادات متقدمة",
      layoverLabel: "توقف",
      layoverPlaceholder: "مثلاً: 8 ساعات في دبي",
      hotelLabel: "فندق",
      hotelPlaceholder: "مثلاً: هيلتون",
      styleLabel: "النمط",
      constraintsLabel: "قيود",
      constraintsPlaceholder: "مثلاً: لا طعام حار",
      budgetLabel: "الميزانية",
      pacingLabel: "السرعة",
      button: "إنشاء رحلة"
  },
  'French': {
      whereLabel: "Où ?",
      wherePlaceholder: "ex. Tokyo",
      departLabel: "De ?",
      departPlaceholder: "ex. Paris",
      whenLabel: "Quand ?",
      whenPlaceholder: "ex. 5 jours",
      advanced: "Avancé",
      layoverLabel: "Escale",
      layoverPlaceholder: "ex. 10h à Dubaï",
      hotelLabel: "Hôtel",
      hotelPlaceholder: "ex. Hilton",
      styleLabel: "Style",
      constraintsLabel: "Contraintes",
      constraintsPlaceholder: "ex. Pas épicé",
      budgetLabel: "Budget",
      pacingLabel: "Rythme",
      button: "Générer"
  },
  'Portuguese': {
      whereLabel: "Para onde?",
      wherePlaceholder: "ex. Tóquio",
      departLabel: "De onde?",
      departPlaceholder: "ex. São Paulo",
      whenLabel: "Quando?",
      whenPlaceholder: "ex. 5 dias",
      advanced: "Avançado",
      layoverLabel: "Escala",
      layoverPlaceholder: "ex. 10h em Dubai",
      hotelLabel: "Hotel",
      hotelPlaceholder: "ex. Hilton",
      styleLabel: "Estilo",
      constraintsLabel: "Restrições",
      constraintsPlaceholder: "ex. Sem picante",
      budgetLabel: "Orçamento",
      pacingLabel: "Ritmo",
      button: "Gerar"
  },
  'Russian': {
      whereLabel: "Куда?",
      wherePlaceholder: "например, Токио",
      departLabel: "Откуда?",
      departPlaceholder: "например, Москва",
      whenLabel: "Когда?",
      whenPlaceholder: "например, 5 дней",
      advanced: "Настройки",
      layoverLabel: "Пересадка",
      layoverPlaceholder: "например, 10ч в Дубае",
      hotelLabel: "Отель",
      hotelPlaceholder: "например, Хилтон",
      styleLabel: "Стиль",
      constraintsLabel: "Ограничения",
      constraintsPlaceholder: "например, не острое",
      budgetLabel: "Бюджет",
      pacingLabel: "Темп",
      button: "Создать"
  },
  'Indonesian': {
      whereLabel: "Ke mana?",
      wherePlaceholder: "cth. Tokyo",
      departLabel: "Dari mana?",
      departPlaceholder: "cth. Jakarta",
      whenLabel: "Kapan?",
      whenPlaceholder: "cth. 5 hari",
      advanced: "Lanjutan",
      layoverLabel: "Transit",
      layoverPlaceholder: "cth. 8 jam di Dubai",
      hotelLabel: "Hotel",
      hotelPlaceholder: "cth. Hilton",
      styleLabel: "Gaya",
      constraintsLabel: "Batasan",
      constraintsPlaceholder: "cth. Tidak pedas",
      budgetLabel: "Anggaran",
      pacingLabel: "Kecepatan",
      button: "Buat"
  },
  'Korean': {
      whereLabel: "어디로?",
      wherePlaceholder: "예: 도쿄",
      departLabel: "출발지?",
      departPlaceholder: "예: 서울",
      whenLabel: "언제?",
      whenPlaceholder: "예: 5일",
      advanced: "고급 설정",
      layoverLabel: "경유",
      layoverPlaceholder: "예: 두바이 10시간",
      hotelLabel: "호텔",
      hotelPlaceholder: "예: 힐튼",
      styleLabel: "스타일",
      constraintsLabel: "제약",
      constraintsPlaceholder: "예: 매운 것 제외",
      budgetLabel: "예산",
      pacingLabel: "일정 강도",
      button: "생성"
  },
  'Thai': {
      whereLabel: "ไปไหน?",
      wherePlaceholder: "เช่น โตเกียว",
      departLabel: "จากไหน?",
      departPlaceholder: "เช่น กรุงเทพ",
      whenLabel: "เมื่อไหร่?",
      whenPlaceholder: "เช่น 5 วัน",
      advanced: "ขั้นสูง",
      layoverLabel: "แวะพัก",
      layoverPlaceholder: "เช่น ดูไบ 8 ชม.",
      hotelLabel: "โรงแรม",
      hotelPlaceholder: "เช่น ฮิลตัน",
      styleLabel: "สไตล์",
      constraintsLabel: "ข้อจำกัด",
      constraintsPlaceholder: "เช่น ไม่เผ็ด",
      budgetLabel: "งบประมาณ",
      pacingLabel: "ความแน่นของทริป",
      button: "สร้าง"
  }
};

const PreferencesForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UserPreferences>({
    destination: '',
    departFrom: '',
    duration: '',
    layover: '',
    hotel: '',
    style: [],
    constraints: '',
    language: 'English',
    budget: 'Standard',
    pacing: 'Balanced'
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [destinations, setDestinations] = useState<string[]>([]);

  const t = UI_TEXT[formData.language];
  const marketing = getMarketingCopy(formData.language);

  const handleDestinationInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setCurrentInput(val);
      const lowerVal = val.toLowerCase().trim();
      if (lowerVal.length > 2) {
         const matches = new Set<string>();
         Object.entries(POPULAR_DESTINATIONS).forEach(([country, cities]) => {
             if (country.includes(lowerVal)) cities.forEach(c => matches.add(c));
             cities.forEach(city => {
                 if (city.toLowerCase().includes(lowerVal)) matches.add(city);
             });
         });
         setSuggestions(Array.from(matches).slice(0, 6));
      } else {
          setSuggestions([]);
      }
  };

  const addDestination = (place: string) => {
      const trimmed = place.trim();
      if (trimmed && !destinations.includes(trimmed)) {
          const newDestinations = [...destinations, trimmed];
          setDestinations(newDestinations);
          setFormData({ ...formData, destination: newDestinations.join(', ') });
      }
      setCurrentInput('');
      setSuggestions([]);
  };

  const removeDestination = (placeToRemove: string) => {
      const newDestinations = destinations.filter(d => d !== placeToRemove);
      setDestinations(newDestinations);
      setFormData({ ...formData, destination: newDestinations.join(', ') });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          addDestination(currentInput);
      }
  };

  const handleStyleToggle = (style: string) => {
    setFormData(prev => {
      const styles = prev.style || [];
      if (styles.includes(style)) return { ...prev, style: styles.filter(s => s !== style) };
      return { ...prev, style: [...styles, style] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let finalDests = [...destinations];
    if (currentInput.trim()) {
        finalDests.push(currentInput.trim());
        setDestinations(finalDests);
    }
    if (finalDests.length > 0 && formData.duration) {
      onSubmit({ ...formData, destination: finalDests.join(', ') });
    } else {
        if (finalDests.length === 0) alert("Please enter at least one destination.");
    }
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto" dir={formData.language === 'Arabic' ? 'rtl' : 'ltr'}>
      <div className="min-h-full flex flex-col items-center p-4 py-10">
        
        {/* Main Application Container */}
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden mb-12 flex-shrink-0">
            
            {/* Header */}
            <div className="bg-indigo-600 p-8 text-white relative text-center">
                <div className={`absolute top-4 ${formData.language === 'Arabic' ? 'left-4' : 'right-4'}`}>
                    <select 
                    className="bg-indigo-700 text-white text-sm rounded px-2 py-1 border-none focus:ring-0 cursor-pointer"
                    value={formData.language}
                    onChange={(e) => setFormData({...formData, language: e.target.value as Language})}
                    >
                    <option value="English">English</option>
                    <option value="中文">中文</option>
                    <option value="日本語">日本語</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Arabic">Arabic</option>
                    <option value="French">French</option>
                    <option value="Portuguese">Portuguese</option>
                    <option value="Russian">Russian</option>
                    <option value="Indonesian">Indonesian</option>
                    <option value="Korean">Korean</option>
                    <option value="Thai">Thai</option>
                    </select>
                </div>
                <div className="flex justify-center items-center gap-2 mb-3">
                    <Plane className={`w-10 h-10 ${formData.language === 'Arabic' ? 'transform scale-x-[-1]' : ''}`} /> 
                    <h1 className="text-3xl font-bold tracking-tight">AriaTrip AI</h1>
                </div>
                
                <h2 className="text-xl font-bold mb-2">{marketing.heroTitle}</h2>
                <p className="text-indigo-200 text-sm">{marketing.heroSubtitle}</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Main Inputs */}
            <div className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.whereLabel}</label>
                {destinations.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {destinations.map(dest => (
                            <span key={dest} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                {dest}
                                <button type="button" onClick={() => removeDestination(dest)} className="hover:text-indigo-900"><X className="w-3 h-3" /></button>
                            </span>
                        ))}
                    </div>
                )}
                <div className="relative">
                    <MapPin className={`absolute top-3 text-gray-400 w-5 h-5 ${formData.language === 'Arabic' ? 'right-3' : 'left-3'}`} />
                    <input
                    type="text"
                    placeholder={t.wherePlaceholder}
                    className={`w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${formData.language === 'Arabic' ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                    value={currentInput}
                    onChange={handleDestinationInput}
                    onKeyDown={handleKeyDown}
                    />
                    {currentInput && (
                         <button type="button" onClick={() => addDestination(currentInput)} className={`absolute top-2 bg-indigo-600 text-white p-1 rounded-md hover:bg-indigo-700 ${formData.language === 'Arabic' ? 'left-2' : 'right-2'}`}><Plus className="w-4 h-4" /></button>
                    )}
                </div>
                {suggestions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 animate-fadeIn">
                        {suggestions.map(city => (
                            <button key={city} type="button" onClick={() => addDestination(city)} className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full hover:bg-indigo-100 border border-indigo-100 transition">{city}</button>
                        ))}
                    </div>
                )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.departLabel}</label>
                    <div className="relative">
                        <PlaneTakeoff className={`absolute top-3 text-gray-400 w-5 h-5 ${formData.language === 'Arabic' ? 'right-3' : 'left-3'}`} />
                        <input
                        type="text"
                        placeholder={t.departPlaceholder}
                        className={`w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${formData.language === 'Arabic' ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                        value={formData.departFrom || ''}
                        onChange={(e) => setFormData({ ...formData, departFrom: e.target.value })}
                        />
                    </div>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.whenLabel}</label>
                    <div className="relative">
                        <Calendar className={`absolute top-3 text-gray-400 w-5 h-5 ${formData.language === 'Arabic' ? 'right-3' : 'left-3'}`} />
                        <input
                        type="text"
                        required
                        placeholder={t.whenPlaceholder}
                        className={`w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${formData.language === 'Arabic' ? 'pr-10 pl-4' : 'pl-10 pr-4'}`}
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        />
                    </div>
                    </div>
                </div>
            </div>

            {/* Advanced Accordion */}
            <div className="border rounded-lg p-4 bg-gray-50">
                <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full text-left text-sm font-semibold text-gray-700"
                >
                <span>{t.advanced}</span>
                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showAdvanced && (
                <div className="mt-4 space-y-4 animate-fadeIn">
                    
                     {/* Constraints - Swapped to top */}
                     <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">{t.constraintsLabel}</label>
                        <textarea
                            rows={2}
                            placeholder={t.constraintsPlaceholder}
                            className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500"
                            value={formData.constraints || ''}
                            onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                        />
                    </div>

                    {/* New Budget & Pacing */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-xs font-medium text-gray-500 mb-1">{t.budgetLabel}</label>
                             <div className="relative">
                                <DollarSign className={`absolute top-2.5 text-gray-400 w-4 h-4 ${formData.language === 'Arabic' ? 'right-3' : 'left-3'}`} />
                                <select 
                                    className={`w-full py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-indigo-500 ${formData.language === 'Arabic' ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
                                    value={formData.budget}
                                    onChange={(e) => setFormData({...formData, budget: e.target.value as any})}
                                >
                                    {BUDGET_LEVELS.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                             </div>
                        </div>
                        <div>
                             <label className="block text-xs font-medium text-gray-500 mb-1">{t.pacingLabel}</label>
                             <div className="relative">
                                <ActivityIcon className={`absolute top-2.5 text-gray-400 w-4 h-4 ${formData.language === 'Arabic' ? 'right-3' : 'left-3'}`} />
                                <select 
                                    className={`w-full py-2 text-sm border border-gray-300 rounded-md bg-white focus:ring-1 focus:ring-indigo-500 ${formData.language === 'Arabic' ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
                                    value={formData.pacing}
                                    onChange={(e) => setFormData({...formData, pacing: e.target.value as any})}
                                >
                                    {PACING_STYLES.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                             </div>
                        </div>
                    </div>

                    <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.layoverLabel}</label>
                    <div className="relative">
                        <Clock className={`absolute top-2.5 text-gray-400 w-4 h-4 ${formData.language === 'Arabic' ? 'right-3' : 'left-3'}`} />
                        <input
                        type="text"
                        placeholder={t.layoverPlaceholder}
                        className={`w-full py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 ${formData.language === 'Arabic' ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
                        value={formData.layover || ''}
                        onChange={(e) => setFormData({ ...formData, layover: e.target.value })}
                        />
                    </div>
                    </div>

                    <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">{t.hotelLabel}</label>
                    <div className="relative">
                        <Hotel className={`absolute top-2.5 text-gray-400 w-4 h-4 ${formData.language === 'Arabic' ? 'right-3' : 'left-3'}`} />
                        <input
                        type="text"
                        placeholder={t.hotelPlaceholder}
                        className={`w-full py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-indigo-500 ${formData.language === 'Arabic' ? 'pr-9 pl-3' : 'pl-9 pr-3'}`}
                        value={formData.hotel || ''}
                        onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                        />
                    </div>
                    </div>

                    {/* Styles */}
                    <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2">{t.styleLabel}</label>
                    <div className="flex flex-wrap gap-2">
                        {TRAVEL_STYLES.map(style => (
                        <button
                            key={style}
                            type="button"
                            onClick={() => handleStyleToggle(style)}
                            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                            formData.style?.includes(style)
                                ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                                : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {style}
                        </button>
                        ))}
                    </div>
                    </div>

                </div>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transform transition hover:scale-[1.02] flex items-center justify-center gap-2"
            >
                <Globe className="w-5 h-5" />
                {t.button}
            </button>
            </form>
        </div>

        {/* SEO & Content Section */}
        <div className="max-w-4xl w-full space-y-12 mb-10 text-gray-800">
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
                        <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{marketing.feature1Title}</h3>
                    <p className="text-sm text-gray-500">{marketing.feature1Desc}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                        <MapIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{marketing.feature2Title}</h3>
                    <p className="text-sm text-gray-500">{marketing.feature2Desc}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{marketing.feature3Title}</h3>
                    <p className="text-sm text-gray-500">{marketing.feature3Desc}</p>
                </div>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-center mb-8">{marketing.howItWorksTitle}</h2>
                <div className="space-y-8">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                        <div>
                            <h4 className="font-bold text-lg">{marketing.how1Title}</h4>
                            <p className="text-gray-600">{marketing.how1Desc}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                        <div>
                            <h4 className="font-bold text-lg">{marketing.how2Title}</h4>
                            <p className="text-gray-600">{marketing.how2Desc}</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                        <div>
                            <h4 className="font-bold text-lg">{marketing.how3Title}</h4>
                            <p className="text-gray-600">{marketing.how3Desc}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <footer className="w-full max-w-4xl border-t border-gray-200 pt-8 pb-4 text-center text-gray-500 text-sm">
            <div className="flex justify-center gap-6 mb-4">
                <Link to="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</Link>
                <Link to="/privacy" className="hover:text-indigo-600 transition">Terms of Service</Link>
                <Link to="/contact" className="hover:text-indigo-600 transition">Contact Us</Link>
            </div>
            <p>&copy; {new Date().getFullYear()} {marketing.footerCopy}</p>
        </footer>

      </div>
    </div>
  );
};

export default PreferencesForm;
