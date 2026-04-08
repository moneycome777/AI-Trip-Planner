
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserPreferences, Language } from '../types';
import { TRAVEL_STYLES, BUDGET_LEVELS, PACING_STYLES, TRANSPORT_MODES } from '../constants';
import { EXAMPLE_ITINERARIES } from '../data/exampleItineraries';
import { MapPin, Calendar, Hotel, Globe, ChevronDown, ChevronUp, Plane, Clock, PlaneTakeoff, DollarSign, Activity as ActivityIcon, Users, Map as MapIcon, Shield, Plus, X, Car, History, Sparkles, HelpCircle, ArrowRight, Compass } from 'lucide-react';


interface Props {
  onSubmit: (prefs: UserPreferences) => void;
  onResume?: () => void;
  savedTripDest?: string | null;
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

    // Korea
    'korea': [
        'Seoul', 'Busan', 'Jeju Island', 'Incheon', 'Daegu', 'Gyeongju',
        'Gyeongbokgung Palace', 'N Seoul Tower', 'Bukchon Hanok Village'
    ],

    // France
    'france': [
        'Paris', 'Nice', 'Lyon', 'Bordeaux', 'Marseille', 'Versailles', 'Cannes',
        'Eiffel Tower', 'Louvre Museum', 'Mont Saint-Michel'
    ],

    // Italy
    'italy': [
        'Rome', 'Venice', 'Florence', 'Milan', 'Naples', 'Pisa', 'Turin', 'Amalfi Coast',
        'Colosseum', 'Leaning Tower of Pisa', 'Trevi Fountain', 'Vatican City'
    ],

    // UK
    'uk': [
        'London', 'Edinburgh', 'Manchester', 'Liverpool', 'Birmingham', 'Oxford', 'Cambridge',
        'Big Ben', 'Tower Bridge', 'Stonehenge', 'Buckingham Palace'
    ],
    'united kingdom': [
        'London', 'Edinburgh', 'Manchester', 'Liverpool', 'Birmingham', 'Oxford', 'Cambridge',
        'Big Ben', 'Tower Bridge', 'Stonehenge', 'Buckingham Palace'
    ],

    // Thailand
    'thailand': [
        'Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Krabi', 'Koh Samui',
        'Wat Arun', 'Phi Phi Islands', 'The Grand Palace'
    ],

    // Spain
    'spain': [
        'Barcelona', 'Madrid', 'Seville', 'Valencia', 'Granada', 'Ibiza',
        'Sagrada Familia', 'Park Güell', 'Alhambra Palace'
    ],

    // Germany
    'germany': [
        'Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne', 'Dresden',
        'Brandenburg Gate', 'Neuschwanstein Castle', 'Cologne Cathedral'
    ],

    // Australia
    'australia': [
        'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Gold Coast', 'Adelaide',
        'Sydney Opera House', 'Great Barrier Reef', 'Uluru'
    ],

    // Canada
    'canada': [
        'Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Quebec City',
        'Niagara Falls', 'Banff National Park', 'CN Tower'
    ],

    // Malaysia
    'malaysia': [
        'Kuala Lumpur', 'Penang', 'Langkawi', 'Malacca', 'Kota Kinabalu',
        'Petronas Twin Towers', 'Batu Caves', 'George Town Heritage Area'
    ],

    // Singapore
    'singapore': [
        'Marina Bay', 'Sentosa', 'Orchard Road', 'Chinatown',
        'Marina Bay Sands', 'Gardens by the Bay', 'Merlion Park'
    ],

    // Indonesia
    'indonesia': [
        'Bali', 'Jakarta', 'Yogyakarta', 'Bandung', 'Lombok',
        'Borobudur Temple', 'Uluwatu Temple', 'Mount Bromo'
    ],

    // Vietnam
    'vietnam': [
        'Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Hoi An', 'Nha Trang',
        'Ha Long Bay', 'Golden Bridge (Ba Na Hills)'
    ],

    // India
    'india': [
        'Delhi', 'Mumbai', 'Goa', 'Jaipur', 'Bangalore', 'Kerala', 'Agra',
        'Taj Mahal', 'Amber Fort', 'Gateway of India'
    ],

    // Turkey
    'turkey': [
        'Istanbul', 'Cappadocia', 'Antalya', 'Ankara', 'Izmir',
        'Hagia Sophia', 'Blue Mosque', 'Pamukkale'
    ],

    // UAE
    'uae': [
        'Dubai', 'Abu Dhabi', 'Sharjah', 'Ras Al Khaimah',
        'Burj Khalifa', 'Sheikh Zayed Grand Mosque', 'Palm Jumeirah'
    ],

    // Switzerland
    'switzerland': [
        'Zurich', 'Geneva', 'Lucerne', 'Interlaken', 'Zermatt',
        'Matterhorn', 'Lake Geneva', 'Jungfraujoch'
    ],

    // Netherlands
    'netherlands': [
        'Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht',
        'Zaanse Schans', 'Keukenhof Gardens'
    ],

    // Greece
    'greece': [
        'Athens', 'Santorini', 'Mykonos', 'Crete', 'Thessaloniki',
        'Acropolis', 'Parthenon', 'Oia Village'
    ],

    // Brazil
    'brazil': [
        'Rio de Janeiro', 'São Paulo', 'Salvador', 'Brasília',
        'Christ the Redeemer', 'Sugarloaf Mountain', 'Iguazu Falls'
    ],

    // Egypt
    'egypt': [
        'Cairo', 'Luxor', 'Alexandria', 'Giza', 'Aswan',
        'Pyramids of Giza', 'Sphinx', 'Karnak Temple'
    ],

    // South Africa
    'south africa': [
        'Cape Town', 'Johannesburg', 'Durban', 'Pretoria',
        'Table Mountain', 'Kruger National Park', 'Cape of Good Hope'
    ]
};

const KNOWLEDGE_BASE_LINKS = [
    { title: "What is an AI trip planner?", path: "/what-is-an-ai-trip-planner" },
    { title: "Is AI travel planning accurate?", path: "/is-an-ai-trip-planner-accurate" },
    { title: "Best AI trip planner of 2024", path: "/best-ai-trip-planner" },
    { title: "AI vs Travel Agent", path: "/ai-trip-planner-vs-travel-agent" },
    { title: "Can AI build itineraries?", path: "/can-ai-create-a-travel-itinerary" },
    { title: "How do I plan a trip?", path: "/how-do-i-plan-a-trip" }
];

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
  'English': { whereLabel: "Where to? (Add Multiple)", wherePlaceholder: "e.g. Tokyo (Press Enter)", departLabel: "Depart from?", departPlaceholder: "e.g. London", whenLabel: "Duration?", whenPlaceholder: "e.g. 5 Days", advanced: "Advanced Settings", layoverLabel: "Layover (optional)", layoverPlaceholder: "e.g. 10h stop in Dubai", hotelLabel: "Hotel Preference (optional)", hotelPlaceholder: "e.g. Hilton Osaka", styleLabel: "Travel Style", constraintsLabel: "Special Requests (optional)", constraintsPlaceholder: "e.g. No spicy food...", budgetLabel: "Budget", pacingLabel: "Pacing", transportLabel: "Transport Mode", button: "Generate Trip" },
  '中文': { whereLabel: "去哪里？（添加多个）", wherePlaceholder: "例如：东京 (按回车添加)", departLabel: "出发地？", departPlaceholder: "例如：上海", whenLabel: "多久？", whenPlaceholder: "例如：5天", advanced: "高级设置", layoverLabel: "中停留（可选填）", layoverPlaceholder: "例如：在迪拜停留10小时", hotelLabel: "酒店偏好（可选填）", hotelPlaceholder: "例如：大阪希尔顿", styleLabel: "旅行风格", constraintsLabel: "特殊要求（可选填）", constraintsPlaceholder: "例如：不吃辣...", budgetLabel: "预算", pacingLabel: "节奏", transportLabel: "交通方式", button: "生成行程" },
  '日本語': { whereLabel: "どこへ？（複数追加）", wherePlaceholder: "例：東京", departLabel: "出発地", departPlaceholder: "例：東京", whenLabel: "期間", whenPlaceholder: "例：5日間", advanced: "詳細設定", layoverLabel: "乗り継ぎ（任意入力）", layoverPlaceholder: "例：ドバイ", hotelLabel: "ホテル（任意入力）", hotelPlaceholder: "例：ヒルトン", styleLabel: "スタイル", constraintsLabel: "リクエスト（任意入力）", constraintsPlaceholder: "例：辛いものNG", budgetLabel: "予算", pacingLabel: "ペース", transportLabel: "交通", button: "作成" },
  'Hindi': { whereLabel: "कहाँ जाएँ? (एकाधिक जोड़ें)", wherePlaceholder: "जैसे टोक्यो", departLabel: "कहाँ से?", departPlaceholder: "जैसे दिल्ली", whenLabel: "कब?", whenPlaceholder: "जैसे 5 दिन", advanced: "उन्नत", layoverLabel: "ठहराव (ऐच्छिक)", layoverPlaceholder: "जैसे दुबई", hotelLabel: "होटल (ऐच्छिक)", hotelPlaceholder: "जैसे हिल्टन", styleLabel: "शैली", constraintsLabel: "अनुरोध (ऐच्छिक)", constraintsPlaceholder: "जैसे मसालेदार नहीं", budgetLabel: "बजट", pacingLabel: "गति", transportLabel: "परिवहन", button: "बनाएँ" },
  'Spanish': { whereLabel: "¿A dónde? (Agregar múltiples)", wherePlaceholder: "ej. Tokio", departLabel: "¿Desde?", departPlaceholder: "ej. Madrid", whenLabel: "¿Cuánto?", whenPlaceholder: "ej. 5 días", advanced: "Avanzado", layoverLabel: "Escala (opcional)", layoverPlaceholder: "ej. Dubái", hotelLabel: "Hotel (opcional)", hotelPlaceholder: "ej. Hilton", styleLabel: "Estilo", constraintsLabel: "Peticiones (opcional)", constraintsPlaceholder: "ej. Sin picante", budgetLabel: "Presupuesto", pacingLabel: "Ritmo", transportLabel: "Transporte", button: "Generar" },
  'Arabic': { whereLabel: "إلى أين؟ (إضافة متعدد)", wherePlaceholder: "طوكيو", departLabel: "من أين؟", departPlaceholder: "الرياض", whenLabel: "المدة؟", whenPlaceholder: "5 أيام", advanced: "متقدم", layoverLabel: "توقف قصير (اختياري)", layoverPlaceholder: "دبي", hotelLabel: "(اختياري) فندق", hotelPlaceholder: "هيلتون", styleLabel: "نمط", constraintsLabel: "(اختياري) طلبات", constraintsPlaceholder: "لا حار", budgetLabel: "ميزانية", pacingLabel: "سرعة", transportLabel: "نقل", button: "إنشاء" },
  'French': { whereLabel: "Où aller ? (Ajouter plusieurs)", wherePlaceholder: "ex. Tokyo", departLabel: "De ?", departPlaceholder: "ex. Paris", whenLabel: "Quand ?", whenPlaceholder: "ex. 5 jours", advanced: "Avancé", layoverLabel: "Escale (facultatif)", layoverPlaceholder: "ex. Dubaï", hotelLabel: "Hôtel (facultatif)", hotelPlaceholder: "ex. Hilton", styleLabel: "Style", constraintsLabel: "Demandes (facultatif)", constraintsPlaceholder: "ex. Pas épicé", budgetLabel: "Budget", pacingLabel: "Rythme", transportLabel: "Transport", button: "Générer" },
  'Portuguese': { whereLabel: "Para onde? (Adicionar múltiplos)", wherePlaceholder: "ex. Tóquio", departLabel: "De onde?", departPlaceholder: "ex. Lisboa", whenLabel: "Quanto?", whenPlaceholder: "ex. 5 dias", advanced: "Avançado", layoverLabel: "Escala (opcional)", layoverPlaceholder: "ex. Dubai", hotelLabel: "Hotel (opcional)", hotelPlaceholder: "ex. Hilton", styleLabel: "Estilo", constraintsLabel: "Pedidos (opcional)", constraintsPlaceholder: "ex. Sem picante", budgetLabel: "Orçamento", pacingLabel: "Ritmo", transportLabel: "Transporte", button: "Gerar" },
  'Russian': { whereLabel: "Куда? (Добавить несколько)", wherePlaceholder: "напр. Токио", departLabel: "Откуда?", departPlaceholder: "напр. Москва", whenLabel: "Сколько?", whenPlaceholder: "напр. 5 дней", advanced: "Настройки", layoverLabel: "Пересадка (необязательно)", layoverPlaceholder: "напр. Дубай", hotelLabel: "Отель (необязательно)", hotelPlaceholder: "напр. Хилтон", styleLabel: "Стиль", constraintsLabel: "Пожелания (необязательно)", constraintsPlaceholder: "напр. не острое", budgetLabel: "Бюджет", pacingLabel: "Темп", transportLabel: "Транспорт", button: "Создать" },
  'Indonesian': { whereLabel: "Ke mana? (Tambah beberapa)", wherePlaceholder: "cth. Tokyo", departLabel: "Dari?", departPlaceholder: "cth. Jakarta", whenLabel: "Lama?", whenPlaceholder: "cth. 5 hari", advanced: "Lanjutan", layoverLabel: "Transit (opsional)", layoverPlaceholder: "cth. Dubai", hotelLabel: "Hotel (opsional)", hotelPlaceholder: "cth. Hilton", styleLabel: "Gaya", constraintsLabel: "Khusus (opsional)", constraintsPlaceholder: "cth. Tidak pedas", budgetLabel: "Anggaran", pacingLabel: "Keสะดุด", transportLabel: "Transportasi", button: "Buat" },
  'Korean': { whereLabel: "어디로? (여러 개 추가)", wherePlaceholder: "예: 도쿄", departLabel: "출발?", departPlaceholder: "예: 서울", whenLabel: "기간?", whenPlaceholder: "예: 5일", advanced: "설정", layoverLabel: "경유 (선택 사항)", layoverPlaceholder: "예: 두바이", hotelLabel: "호텔 (선택 사항)", hotelPlaceholder: "예: 힐튼", styleLabel: "스타일", constraintsLabel: "요청 (선택 사항)", constraintsPlaceholder: "예: 매운거 X", budgetLabel: "예산", pacingLabel: "강도", transportLabel: "교통", button: "생성" },
  'Thai': { whereLabel: "ไปที่ไหน? (เพิ่มหลายรายการ)", wherePlaceholder: "เช่น โตเกียว", departLabel: "จาก?", departPlaceholder: "เช่น กทม", whenLabel: "นาน?", whenPlaceholder: "เช่น 5 วัน", advanced: "ขั้นสูง", layoverLabel: "แวะพัก (ไม่จำเป็น)", layoverPlaceholder: "เช่น ดูไบ", hotelLabel: "โรงแรม (ไม่จำเป็น)", hotelPlaceholder: "เช่น ฮิลตัน", styleLabel: "สไตล์", constraintsLabel: "ขอพิเศษ (ไม่จำเป็น)", constraintsPlaceholder: "เช่น ไม่เผ็ด", budgetLabel: "งบ", pacingLabel: "ความแน่น", transportLabel: "การเดินทาง", button: "สร้าง" }
};

const PreferencesForm: React.FC<Props> = ({ onSubmit, onResume, savedTripDest }) => {
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
    pacing: 'Balanced',
    transportMode: 'Public Transport'
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [destinations, setDestinations] = useState<string[]>([]);
    
  // Date Picker State
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const location = useLocation();
  const t = UI_TEXT[formData.language] || UI_TEXT['English'];
  const marketing = getMarketingCopy(formData.language);

  // Auto-scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Auto-fill destination from router state (e.g. clicked from Destinations page)
  useEffect(() => {
    if (location.state && (location.state as any).autoFillDestination) {
        const destName = (location.state as any).autoFillDestination;
        setDestinations(prev => {
            if (prev.includes(destName)) return prev;
            const newDestinations = [...prev, destName];
            setFormData(prevForm => ({ ...prevForm, destination: newDestinations.join(', ') }));
            return newDestinations;
        });
        
        // Clear history state to avoid re-triggering on refresh if possible
        window.history.replaceState({}, ''); 
    }
  }, []);

  // Auto-calculate duration string when dates are selected
  useEffect(() => {
    if (dateRange.start && dateRange.end) {
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive of start day
        
        if (diffDays > 0) {
            const rangeStr = `${diffDays} Days (${dateRange.start} to ${dateRange.end})`;
            setFormData(prev => ({ ...prev, duration: rangeStr }));
        }
    }
  }, [dateRange]);

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
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-fadeIn flex-grow flex flex-col justify-center">
      
      {/* Main Application Container */}
      <div className="max-w-xl w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-indigo-100/50 overflow-hidden mb-12 flex-shrink-0 border border-white/60 relative z-10 mx-auto">
            
            {/* Header */}
            <div className="p-8 text-center border-b border-white/50 relative">
                 <div className={`absolute top-4 ${formData.language === 'Arabic' ? 'left-4' : 'right-4'}`}>
                    <select 
                    className="bg-white/50 text-slate-600 text-xs font-semibold rounded-lg px-2 py-1.5 border border-slate-200 focus:ring-0 cursor-pointer outline-none hover:bg-white transition"
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

                <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200 transform rotate-3">
                     <Plane className={`w-8 h-8 text-white ${formData.language === 'Arabic' ? 'scale-x-[-1]' : ''}`} /> 
                </div>
                
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2 tracking-tight">{marketing.heroTitle}</h1>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">{marketing.heroSubtitle}</p>
            </div>

            {/* Resume Banner */}
            {savedTripDest && onResume && (
                <div className="px-6 pt-6">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-center justify-between shadow-sm animate-fadeIn relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-indigo-200/20 rounded-full blur-xl -mr-8 -mt-8"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            <div className="bg-white p-2.5 rounded-xl text-indigo-600 shadow-sm border border-indigo-50">
                                <History className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Previous Session</p>
                                <p className="text-sm font-bold text-indigo-900 leading-tight">Resume trip to {savedTripDest}?</p>
                            </div>
                        </div>
                        <button 
                            onClick={onResume}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-lg shadow-indigo-200 relative z-10"
                        >
                            Resume
                        </button>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Main Inputs */}
            <div className="space-y-5">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.whereLabel}</label>
                    {destinations.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {destinations.map(dest => (
                                <span key={dest} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 border border-indigo-100">
                                    {dest}
                                    <button type="button" onClick={() => removeDestination(dest)} className="hover:text-indigo-900"><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="relative group">
                        <MapPin className={`absolute top-3.5 text-slate-400 group-hover:text-indigo-500 transition w-5 h-5 ${formData.language === 'Arabic' ? 'right-4' : 'left-4'}`} />
                        <input
                        type="text"
                        placeholder={t.wherePlaceholder}
                        className={`w-full py-3 bg-white/70 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all text-slate-800 placeholder:text-slate-400 font-medium ${formData.language === 'Arabic' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                        value={currentInput}
                        onChange={handleDestinationInput}
                        onKeyDown={handleKeyDown}
                        />
                        {currentInput && (
                            <button type="button" onClick={() => addDestination(currentInput)} className={`absolute top-2.5 bg-indigo-500 text-white p-1 rounded-lg hover:bg-indigo-600 ${formData.language === 'Arabic' ? 'left-2.5' : 'right-2.5'}`}><Plus className="w-4 h-4" /></button>
                        )}
                    </div>
                    {suggestions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 animate-fadeIn">
                            {suggestions.map(city => (
                                <button key={city} type="button" onClick={() => addDestination(city)} className="text-xs bg-white text-slate-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-100 transition shadow-sm font-medium">{city}</button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.departLabel}</label>
                        <div className="relative group">
                            <PlaneTakeoff className={`absolute top-3.5 text-slate-400 group-hover:text-indigo-500 transition w-5 h-5 ${formData.language === 'Arabic' ? 'right-4' : 'left-4'}`} />
                            <input
                            type="text"
                            placeholder={t.departPlaceholder}
                            className={`w-full py-3 bg-white/70 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all text-slate-800 placeholder:text-slate-400 font-medium ${formData.language === 'Arabic' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                            value={formData.departFrom || ''}
                            onChange={(e) => setFormData({ ...formData, departFrom: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.whenLabel}</label>
                        <div className="relative group">
                            {/* Interactive Date Picker Trigger (Replaces static icon) */}
                            <button
                                type="button"
                                onClick={() => setShowDatePicker(!showDatePicker)}
                                className={`absolute top-3.5 text-slate-400 hover:text-indigo-600 transition z-10 ${formData.language === 'Arabic' ? 'right-4' : 'left-4'}`}
                                title="Pick Dates"
                            >
                                <Calendar className="w-5 h-5" />
                            </button>
                            
                            <input
                                type="text"
                                required
                                placeholder={t.whenPlaceholder}
                                className={`w-full py-3 bg-white/70 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all text-slate-800 placeholder:text-slate-400 font-medium ${formData.language === 'Arabic' ? 'pr-12 pl-4' : 'pl-12 pr-4'}`}
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            />

                            {/* Date Picker Popup */}
                            {showDatePicker && (
                                <div className="absolute top-full mt-2 left-0 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-3 animate-fadeIn">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Start</label>
                                            <input 
                                                type="date" 
                                                className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-slate-50 focus:ring-1 focus:ring-indigo-500 outline-none"
                                                value={dateRange.start}
                                                onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">End</label>
                                            <input 
                                                type="date" 
                                                className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-slate-50 focus:ring-1 focus:ring-indigo-500 outline-none"
                                                value={dateRange.end}
                                                min={dateRange.start}
                                                onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-right mt-2">
                                         <button 
                                            type="button" 
                                            onClick={() => setShowDatePicker(false)}
                                            className="text-[10px] font-bold text-indigo-600 hover:underline"
                                         >
                                            Close
                                         </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Advanced Accordion */}
            <div className="border border-slate-200 rounded-2xl p-1 bg-white/50">
                <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center justify-between w-full p-3 text-left text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition"
                >
                <span className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${showAdvanced ? 'bg-indigo-500' : 'bg-slate-300'}`}></div>
                    {t.advanced}
                </span>
                {showAdvanced ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>

                {showAdvanced && (
                <div className="p-3 pt-0 space-y-4 animate-fadeIn">
                    
                     <div className="mt-2">
                        <label className="block text-xs font-bold text-slate-400 mb-1">{t.constraintsLabel}</label>
                        <textarea
                            rows={2}
                            placeholder={t.constraintsPlaceholder}
                            className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-none outline-none"
                            value={formData.constraints || ''}
                            onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                        />
                    </div>

                    {/* New Transport Mode Selection */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-1">{t.transportLabel}</label>
                        <div className="relative">
                            <Car className={`absolute top-2.5 text-slate-400 w-4 h-4 ${formData.language === 'Arabic' ? 'right-3.5' : 'left-3.5'}`} />
                            <select 
                                className={`w-full py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer text-slate-700 ${formData.language === 'Arabic' ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                                value={formData.transportMode}
                                onChange={(e) => setFormData({...formData, transportMode: e.target.value as any})}
                            >
                                {TRANSPORT_MODES.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                             <label className="block text-xs font-bold text-slate-400 mb-1">{t.budgetLabel}</label>
                             <div className="relative">
                                <DollarSign className={`absolute top-2.5 text-slate-400 w-4 h-4 ${formData.language === 'Arabic' ? 'right-3.5' : 'left-3.5'}`} />
                                <select 
                                    className={`w-full py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer text-slate-700 ${formData.language === 'Arabic' ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                                    value={formData.budget}
                                    onChange={(e) => setFormData({...formData, budget: e.target.value as any})}
                                >
                                    {BUDGET_LEVELS.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                             </div>
                        </div>
                        <div>
                             <label className="block text-xs font-bold text-slate-400 mb-1">{t.pacingLabel}</label>
                             <div className="relative">
                                <ActivityIcon className={`absolute top-2.5 text-slate-400 w-4 h-4 ${formData.language === 'Arabic' ? 'right-3.5' : 'left-3.5'}`} />
                                <select 
                                    className={`w-full py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none cursor-pointer text-slate-700 ${formData.language === 'Arabic' ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                                    value={formData.pacing}
                                    onChange={(e) => setFormData({...formData, pacing: e.target.value as any})}
                                >
                                    {PACING_STYLES.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                             </div>
                        </div>
                    </div>

                    <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">{t.layoverLabel}</label>
                    <div className="relative">
                        <Clock className={`absolute top-2.5 text-slate-400 w-4 h-4 ${formData.language === 'Arabic' ? 'right-3.5' : 'left-3.5'}`} />
                        <input
                        type="text"
                        placeholder={t.layoverPlaceholder}
                        className={`w-full py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none ${formData.language === 'Arabic' ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                        value={formData.layover || ''}
                        onChange={(e) => setFormData({ ...formData, layover: e.target.value })}
                        />
                    </div>
                    </div>

                    <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1">{t.hotelLabel}</label>
                    <div className="relative">
                        <Hotel className={`absolute top-2.5 text-slate-400 w-4 h-4 ${formData.language === 'Arabic' ? 'right-3.5' : 'left-3.5'}`} />
                        <input
                        type="text"
                        placeholder={t.hotelPlaceholder}
                        className={`w-full py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-indigo-500 outline-none ${formData.language === 'Arabic' ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                        value={formData.hotel || ''}
                        onChange={(e) => setFormData({ ...formData, hotel: e.target.value })}
                        />
                    </div>
                    </div>

                    <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">{t.styleLabel}</label>
                    <div className="flex flex-wrap gap-2">
                        {TRAVEL_STYLES.map(style => (
                        <button
                            key={style}
                            type="button"
                            onClick={() => handleStyleToggle(style)}
                            className={`px-3 py-1 text-xs rounded-full border transition-all ${
                            formData.style?.includes(style)
                                ? 'bg-indigo-100 border-indigo-200 text-indigo-700 font-semibold'
                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
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
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-4 rounded-2xl shadow-xl shadow-slate-200 transform transition hover:scale-[1.01] flex items-center justify-center gap-2 text-lg"
            >
                <Globe className="w-5 h-5" />
                {t.button}
            </button>
            </form>
      </div>

      {/* Example Itineraries Section */}
      <div className="max-w-4xl w-full mb-10 text-slate-800 relative z-10 mx-auto px-4">
            <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-10 shadow-sm border border-white/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                            <Compass className="w-8 h-8 text-indigo-500" /> Example Itineraries
                        </h2>
                        <p className="text-slate-500 mt-1 font-medium italic">See what AriaTrip AI can build for you in seconds.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {EXAMPLE_ITINERARIES.map((example: any, i: number) => (
                        <Link 
                            key={i} 
                            to={`/example/${example.slug}`}
                            className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={example.image} 
                                    alt={example.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <span className="bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md mb-2 inline-block">
                                        {example.preferences.duration}
                                    </span>
                                    <h3 className="text-white font-bold text-lg leading-tight group-hover:text-indigo-200 transition-colors">
                                        {example.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {example.preferences.style.slice(0, 3).map((s: string) => (
                                        <span key={s} className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between text-sm font-bold text-indigo-600 group-hover:text-indigo-700">
                                    <span>View Itinerary</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
      </div>

      {/* Educational SEO Hub */}
      <div className="max-w-4xl w-full mb-10 text-slate-800 relative z-10 mx-auto px-4">
            <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-10 shadow-sm border border-white/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                            <Sparkles className="w-8 h-8 text-indigo-500" /> Travel Knowledge Hub
                        </h2>
                        <p className="text-slate-500 mt-1 font-medium italic">Expert insights on planning the perfect vacation with AI.</p>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {KNOWLEDGE_BASE_LINKS.map((link, i) => (
                        <Link 
                            key={i} 
                            to={link.path}
                            className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-200 hover:translate-x-1 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-indigo-50 p-2.5 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <HelpCircle className="w-5 h-5 text-indigo-600 group-hover:text-white" />
                                </div>
                                <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{link.title}</span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                        </Link>
                    ))}
                </div>
            </div>
      </div>

      {/* SEO & Content Section */}
      <div className="max-w-4xl w-full space-y-12 mb-10 text-slate-800 relative z-10 mx-auto px-4">
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Users, color: 'text-indigo-600', bg: 'bg-white', title: marketing.feature1Title, desc: marketing.feature1Desc },
                    { icon: MapIcon, color: 'text-purple-600', bg: 'bg-white', title: marketing.feature2Title, desc: marketing.feature2Desc },
                    { icon: Shield, color: 'text-emerald-600', bg: 'bg-white', title: marketing.feature3Title, desc: marketing.feature3Desc }
                ].map((feat, idx) => (
                    <div key={idx} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-md transition duration-300 text-center">
                        <div className={`${feat.bg} w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${feat.color} shadow-sm border border-slate-100`}>
                            <feat.icon className="w-6 h-6" />
                        </div>
                        <h3 className={`font-bold text-lg mb-2 ${feat.color.replace('600', '900')}`}>{feat.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                    </div>
                ))}
            </div>

            {/* Testimonials */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {[
                     { name: "Sarah J.", role: "Solo Traveler", text: "I used to spend weeks planning. AriaTrip did it in 30 seconds. The map view is a game changer!", loc: "London, UK" },
                     { name: "Michael Chen", role: "Foodie", text: "The local recommendations were spot on. Found amazing ramen shops I would have missed.", loc: "Singapore" },
                     { name: "Elena R.", role: "Backpacker", text: "Zero backtracking logic saved me so much time and money on trains. Highly recommend!", loc: "Madrid, Spain" }
                 ].map((review, i) => (
                     <div key={i} className="bg-white/60 p-5 rounded-2xl shadow-sm border border-white/50 backdrop-blur-sm">
                         <div className="flex items-center gap-1 mb-2">
                             {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400">★</span>)}
                         </div>
                         <p className="text-slate-600 text-sm italic mb-4">"{review.text}"</p>
                         <div>
                             <p className="font-bold text-slate-900 text-sm">{review.name}</p>
                             <p className="text-xs text-slate-400">{review.role} • {review.loc}</p>
                         </div>
                     </div>
                 ))}
            </div>

            {/* How It Works */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white/50">
                <h2 className="text-2xl font-bold text-center mb-10 text-slate-800">{marketing.howItWorksTitle}</h2>
                <div className="space-y-8">
                    {[
                        { num: 1, title: marketing.how1Title, desc: marketing.how1Desc },
                        { num: 2, title: marketing.how2Title, desc: marketing.how2Desc },
                        { num: 3, title: marketing.how3Title, desc: marketing.how3Desc }
                    ].map((step, i) => (
                        <div key={i} className="flex gap-5">
                            <div className="flex-shrink-0 w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold shadow-md text-lg">{step.num}</div>
                            <div>
                                <h4 className="font-bold text-lg text-slate-800 mb-1">{step.title}</h4>
                                <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-4xl pt-8 pb-4 text-center text-slate-500 text-sm relative z-10 mx-auto">
            <div className="flex justify-center gap-6 mb-4 font-medium">
                <Link to="/privacy" className="hover:text-indigo-600 transition">Privacy Policy</Link>
                <Link to="/privacy" className="hover:text-indigo-600 transition">Terms of Service</Link>
                <Link to="/contact" className="hover:text-indigo-600 transition">Contact Us</Link>
            </div>
            <p className="opacity-70">&copy; {new Date().getFullYear()} {marketing.footerCopy}</p>
      </footer>
    </div>
  );
};

export default PreferencesForm;
