import { TripPlan, UserPreferences } from '../types';

export interface ExampleItinerary {
  slug: string;
  title: string;
  image: string;
  preferences: UserPreferences;
  plan: TripPlan;
}

export const DEMO_ITINERARY: ExampleItinerary = {
  slug: 'demo-ultimate-japan',
  title: 'Demo: Ultimate Japan Experience',
  image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  preferences: {
    destination: 'Tokyo, Kyoto, Osaka',
    departFrom: 'Anywhere',
    duration: '7 Days',
    layover: '',
    hotel: 'Luxury & Traditional',
    style: ['Culture', 'Food', 'Sightseeing', 'Hidden Gems'],
    constraints: 'Showcase the power of AriaTrip AI',
    language: 'English',
    budget: 'Luxury',
    pacing: 'Balanced',
    transportMode: 'Public Transport'
  },
  plan: {
    trip_summary: 'Experience the magic of AriaTrip AI! This demo showcases our ability to seamlessly route multiple cities, provide hyper-local insights, estimate realistic budgets, and give you a survival guide—all generated in seconds.',
    estimated_budget: '$3,500 USD (~¥525,000 JPY)',
    budget_breakdown: 'This is a high-end demo budget. It includes Green Car (First Class) Shinkansen passes, premium omakase dining, private tea ceremonies, and luxury ryokan stays. Excludes international flights.',
    suggested_dates: 'Late March (Cherry Blossom Season) or Mid-November (Autumn Foliage)',
    date_reasoning: 'AriaTrip AI analyzes historical weather patterns to suggest the absolute best time to visit based on your preferences.',
    suggested_hotels: [
      { name: 'Aman Tokyo', price_range: '$1,200 - $2,000 USD', description: 'Ultra-luxury in the sky with panoramic views of the Imperial Palace Gardens.' },
      { name: 'Hoshinoya Kyoto', price_range: '$800 - $1,500 USD', description: 'A riverside luxury ryokan accessible only by private boat. A true bucket-list experience.' }
    ],
    warnings: [
      'AriaTrip AI Safety Tip: Kyoto buses get extremely crowded during peak seasons. We\'ve routed you near subway lines to avoid this.',
      'Cultural Tip: Tipping is considered rude in Japan. Excellent service is standard.',
      'Logistics: Forward your heavy luggage from Tokyo to Kyoto using the "Takuhaibin" service (approx. $15/bag).'
    ],
    packing_list: [
      'Slip-on shoes (you will take them off frequently at temples and restaurants)',
      'Pocket Wi-Fi or eSIM (crucial for navigating train schedules)',
      'A coin purse (Japan is still surprisingly cash-heavy for small purchases)'
    ],
    weather_forecast: 'Spring (March-May): 10-20°C (50-68°F). Autumn (Sep-Nov): 15-25°C (59-77°F). Crisp, clear, and perfect for walking.',
    transport_advice: 'AriaTrip AI recommends the 7-Day JR Pass. For local transit, add a digital Suica card to your Apple/Google Wallet before you arrive.',
    days: [
      {
        day_number: 1,
        theme: 'Tokyo: Neon & Nostalgia',
        activities: [
          {
            place_name: 'Meiji Jingu Shrine',
            action: 'Start your day with tranquility in this massive forested shrine.',
            latitude: 35.6764,
            longitude: 139.6993,
            type: 'sightseeing',
            cost_estimate: 'Free',
            travel_time_to_next: '10 mins',
            description: 'AriaTrip AI groups activities geographically. Notice how we start here before the crowds arrive.'
          },
          {
            place_name: 'Harajuku & Takeshita Street',
            action: 'Dive into youth culture and grab a famous Harajuku crepe.',
            latitude: 35.6712,
            longitude: 139.7028,
            type: 'sightseeing',
            cost_estimate: '¥1,000',
            travel_time_to_next: '15 mins',
            description: 'Just a 5-minute walk from Meiji Jingu. Zero backtracking!'
          },
          {
            place_name: 'Shibuya Scramble Crossing & Omakase Dinner',
            action: 'Witness the organized chaos, then enjoy a premium sushi dinner.',
            latitude: 35.6595,
            longitude: 139.7005,
            type: 'food',
            cost_estimate: '¥25,000',
            description: 'AriaTrip AI finds the perfect balance of iconic sights and high-end culinary experiences.'
          }
        ]
      },
      {
        day_number: 2,
        theme: 'Tokyo: Tradition Meets Future',
        activities: [
          {
            place_name: 'Senso-ji Temple (Asakusa)',
            action: 'Explore Tokyo\'s oldest temple and shop at Nakamise street.',
            latitude: 35.7148,
            longitude: 139.7967,
            type: 'sightseeing',
            cost_estimate: 'Free',
            travel_time_to_next: '20 mins',
            description: 'AriaTrip AI knows this is best visited early morning.'
          },
          {
            place_name: 'teamLab Planets TOKYO',
            action: 'Walk barefoot through water in this immersive digital art museum.',
            latitude: 35.6499,
            longitude: 139.7890,
            type: 'sightseeing',
            cost_estimate: '¥3,800',
            travel_time_to_next: '25 mins',
            description: 'A must-do modern experience. Book tickets weeks in advance!'
          },
          {
            place_name: 'Ginza High-End Shopping',
            action: 'Stroll the luxury boutiques and enjoy a wagyu beef dinner.',
            latitude: 35.6712,
            longitude: 139.7665,
            type: 'food',
            cost_estimate: '¥30,000',
            description: 'The Beverly Hills of Tokyo.'
          }
        ]
      },
      {
        day_number: 3,
        theme: 'Bullet Train to Ancient Kyoto',
        activities: [
          {
            place_name: 'Shinkansen (Bullet Train)',
            action: 'Ride the bullet train from Tokyo to Kyoto (approx 2h 15m).',
            latitude: 35.6812,
            longitude: 139.7671,
            type: 'transport',
            cost_estimate: 'Included in JR Pass',
            transport_tip: 'Sit on the right side (Seat E) for views of Mt. Fuji!',
            travel_time_to_next: '30 mins',
            description: 'AriaTrip AI even gives you seating tips for the best views.'
          },
          {
            place_name: 'Kiyomizu-dera Temple',
            action: 'Visit the iconic wooden stage overlooking the city.',
            latitude: 34.9948,
            longitude: 135.7850,
            type: 'sightseeing',
            cost_estimate: '¥400',
            travel_time_to_next: '15 mins',
            description: 'A UNESCO World Heritage site.'
          },
          {
            place_name: 'Gion District (Geisha Quarter)',
            action: 'Evening stroll through preserved wooden streets. Keep an eye out for Geiko.',
            latitude: 35.0037,
            longitude: 135.7785,
            type: 'sightseeing',
            cost_estimate: 'Free',
            description: 'AriaTrip AI schedules this for the evening when the lanterns are lit.'
          }
        ]
      },
      {
        day_number: 4,
        theme: 'Kyoto: Zen & Bamboo',
        activities: [
          {
            place_name: 'Arashiyama Bamboo Grove',
            action: 'Walk through the towering bamboo stalks.',
            latitude: 35.0094,
            longitude: 135.6668,
            type: 'sightseeing',
            cost_estimate: 'Free',
            travel_time_to_next: '10 mins',
            description: 'Arrive by 7:30 AM to beat the crowds.'
          },
          {
            place_name: 'Tenryu-ji Temple',
            action: 'Admire one of Kyoto\'s finest Zen gardens.',
            latitude: 35.0155,
            longitude: 135.6738,
            type: 'sightseeing',
            cost_estimate: '¥500',
            travel_time_to_next: '25 mins',
            description: 'Right next to the Bamboo Grove.'
          },
          {
            place_name: 'Kinkaku-ji (Golden Pavilion)',
            action: 'See the stunning gold-leaf covered Zen temple reflecting in the pond.',
            latitude: 35.0394,
            longitude: 135.7292,
            type: 'sightseeing',
            cost_estimate: '¥500',
            description: 'AriaTrip AI optimizes the route from Arashiyama to Kinkaku-ji.'
          }
        ]
      },
      {
        day_number: 5,
        theme: 'Kyoto: The Thousand Gates',
        activities: [
          {
            place_name: 'Fushimi Inari Taisha',
            action: 'Hike the mountain trail lined with thousands of vermilion torii gates.',
            latitude: 34.9671,
            longitude: 135.7727,
            type: 'sightseeing',
            cost_estimate: 'Free',
            travel_time_to_next: '20 mins',
            description: 'AriaTrip AI suggests hiking past the halfway point where crowds thin out.'
          },
          {
            place_name: 'Nishiki Market',
            action: 'Sample local Kyoto delicacies at "Kyoto\'s Kitchen".',
            latitude: 35.0049,
            longitude: 135.7632,
            type: 'food',
            cost_estimate: '¥3,000',
            travel_time_to_next: '15 mins',
            description: 'Perfect spot for lunch after a morning hike.'
          },
          {
            place_name: 'Traditional Tea Ceremony',
            action: 'Experience the art of matcha preparation in a historic machiya.',
            latitude: 35.0060,
            longitude: 135.7680,
            type: 'other',
            cost_estimate: '¥5,000',
            description: 'AriaTrip AI includes cultural immersion, not just sightseeing.'
          }
        ]
      },
      {
        day_number: 6,
        theme: 'Osaka: The Kitchen of Japan',
        activities: [
          {
            place_name: 'Train to Osaka',
            action: 'Short 30-minute train ride from Kyoto to Osaka.',
            latitude: 34.7024,
            longitude: 135.4959,
            type: 'transport',
            cost_estimate: '¥570',
            travel_time_to_next: '15 mins',
            description: 'Seamless inter-city routing.'
          },
          {
            place_name: 'Osaka Castle',
            action: 'Explore the historic castle and its massive stone walls.',
            latitude: 34.6873,
            longitude: 135.5262,
            type: 'sightseeing',
            cost_estimate: '¥600',
            travel_time_to_next: '20 mins',
            description: 'A symbol of Osaka\'s power and history.'
          },
          {
            place_name: 'Dotonbori Food Tour',
            action: 'Eat your way through Osaka: Takoyaki, Okonomiyaki, and Kushikatsu.',
            latitude: 34.6687,
            longitude: 135.5013,
            type: 'food',
            cost_estimate: '¥8,000',
            description: 'Osaka\'s motto is "Kuidaore" (eat until you drop).'
          }
        ]
      },
      {
        day_number: 7,
        theme: 'Departure',
        activities: [
          {
            place_name: 'Kuromon Ichiba Market',
            action: 'Last-minute souvenir shopping and fresh seafood breakfast.',
            latitude: 34.6654,
            longitude: 135.5065,
            type: 'food',
            cost_estimate: '¥4,000',
            travel_time_to_next: '45 mins',
            description: 'Pick up some high-quality matcha or snacks to take home.'
          },
          {
            place_name: 'Kansai International Airport (KIX)',
            action: 'Take the Haruka Express to the airport for departure.',
            latitude: 34.4320,
            longitude: 135.2304,
            type: 'transport',
            cost_estimate: '¥1,500',
            description: 'AriaTrip AI always ensures you have a smooth exit strategy.'
          }
        ]
      }
    ]
  }
};

export const EXAMPLE_ITINERARIES: ExampleItinerary[] = [
  {
    slug: '5-days-in-tokyo',
    title: '5 Days in Tokyo: The Ultimate First-Timer\'s Guide',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80',
    preferences: {
      destination: 'Tokyo',
      departFrom: 'New York',
      duration: '5 Days',
      layover: '',
      hotel: 'Shinjuku or Shibuya',
      style: ['Culture', 'Food', 'Sightseeing'],
      constraints: '',
      language: 'English',
      budget: 'Standard',
      pacing: 'Balanced',
      transportMode: 'Public Transport'
    },
    plan: {
      trip_summary: 'A 5-day exploration of Tokyo, balancing modern city life with traditional culture.',
      estimated_budget: '$1,200 USD (~¥180,000 JPY)',
      budget_breakdown: 'Includes local transport (Suica), meals, and attraction tickets. Excludes flights and hotel.',
      suggested_dates: 'Late March to Early April (Cherry Blossoms) or October to November (Autumn Leaves)',
      date_reasoning: 'Best weather and beautiful seasonal scenery.',
      suggested_hotels: [
        { name: 'Hotel Gracery Shinjuku', price_range: '$150 - $250 USD', description: 'Famous "Godzilla Hotel", extremely convenient location.' },
        { name: 'Shibuya Excel Hotel Tokyu', price_range: '$200 - $350 USD', description: 'Directly connected to Shibuya Station, overlooking the scramble crossing.' }
      ],
      warnings: [
        'Trains stop running around midnight. Taxis are expensive.',
        'Always carry some cash; many small restaurants don\'t accept cards.',
        'Stand on the left side of escalators in Tokyo.'
      ],
      packing_list: [
        'Comfortable walking shoes (you will walk 15k+ steps a day)',
        'Portable Wi-Fi or eSIM',
        'Coin purse for yen coins'
      ],
      weather_forecast: 'Mild in spring and autumn. Hot and humid in summer. Cold but dry in winter.',
      transport_advice: 'Use a Suica or Pasmo card (available on Apple Wallet) for all trains and buses.',
      days: [
        {
          day_number: 1,
          theme: 'Modern Tokyo & Neon Lights',
          activities: [
            {
              place_name: 'Shinjuku Gyoen National Garden',
              action: 'Stroll through the beautiful gardens.',
              latitude: 35.6852,
              longitude: 139.7100,
              type: 'sightseeing',
              cost_estimate: '¥500',
              travel_time_to_next: '15 mins',
              description: 'A peaceful escape in the middle of the city.'
            },
            {
              place_name: 'Omoide Yokocho',
              action: 'Eat yakitori in the narrow alleys.',
              latitude: 35.6928,
              longitude: 139.6995,
              type: 'food',
              cost_estimate: '¥3,000',
              travel_time_to_next: '10 mins',
              description: 'Nostalgic food alley near Shinjuku Station.'
            },
            {
              place_name: 'Tokyo Metropolitan Government Building',
              action: 'View the city from the free observation deck.',
              latitude: 35.6895,
              longitude: 139.6917,
              type: 'sightseeing',
              cost_estimate: 'Free',
              description: 'Great views of Tokyo, especially at sunset.'
            }
          ]
        },
        {
          day_number: 2,
          theme: 'Youth Culture & Fashion',
          activities: [
            {
              place_name: 'Meiji Jingu Shrine',
              action: 'Visit the grand Shinto shrine.',
              latitude: 35.6764,
              longitude: 139.6993,
              type: 'sightseeing',
              cost_estimate: 'Free',
              travel_time_to_next: '10 mins',
              description: 'Located in a dense forest right next to Harajuku.'
            },
            {
              place_name: 'Takeshita Street',
              action: 'Experience Harajuku fashion and crepes.',
              latitude: 35.6712,
              longitude: 139.7028,
              type: 'sightseeing',
              cost_estimate: '¥1,000',
              travel_time_to_next: '15 mins',
              description: 'Bustling street full of trendy shops.'
            },
            {
              place_name: 'Shibuya Scramble Crossing',
              action: 'Walk across the world\'s busiest intersection.',
              latitude: 35.6595,
              longitude: 139.7005,
              type: 'sightseeing',
              cost_estimate: 'Free',
              description: 'Iconic Tokyo experience.'
            }
          ]
        },
        {
          day_number: 3,
          theme: 'Tradition & History',
          activities: [
            {
              place_name: 'Senso-ji Temple',
              action: 'Explore Tokyo\'s oldest temple.',
              latitude: 35.7148,
              longitude: 139.7967,
              type: 'sightseeing',
              cost_estimate: 'Free',
              travel_time_to_next: '5 mins',
              description: 'Historic temple in Asakusa.'
            },
            {
              place_name: 'Nakamise Shopping Street',
              action: 'Buy traditional souvenirs and snacks.',
              latitude: 35.7119,
              longitude: 139.7963,
              type: 'food',
              cost_estimate: '¥2,000',
              travel_time_to_next: '20 mins',
              description: 'Street leading up to Senso-ji.'
            },
            {
              place_name: 'Tokyo Skytree',
              action: 'Enjoy panoramic views from the tower.',
              latitude: 35.7101,
              longitude: 139.8107,
              type: 'sightseeing',
              cost_estimate: '¥3,100',
              description: 'The tallest structure in Japan.'
            }
          ]
        },
        {
          day_number: 4,
          theme: 'Pop Culture & Electronics',
          activities: [
            {
              place_name: 'Akihabara',
              action: 'Browse anime, manga, and electronics shops.',
              latitude: 35.6984,
              longitude: 139.7730,
              type: 'sightseeing',
              cost_estimate: 'Free',
              travel_time_to_next: '5 mins',
              description: 'The center of Japan\'s otaku culture.'
            },
            {
              place_name: 'Maid Cafe',
              action: 'Experience a unique themed cafe.',
              latitude: 35.7000,
              longitude: 139.7710,
              type: 'food',
              cost_estimate: '¥2,500',
              travel_time_to_next: '15 mins',
              description: 'A quirky and fun dining experience.'
            },
            {
              place_name: 'Ueno Park',
              action: 'Relax in the park or visit a museum.',
              latitude: 35.7141,
              longitude: 139.7736,
              type: 'sightseeing',
              cost_estimate: 'Free',
              description: 'Large park with museums and a zoo.'
            }
          ]
        },
        {
          day_number: 5,
          theme: 'Market & Bay Area',
          activities: [
            {
              place_name: 'Tsukiji Outer Market',
              action: 'Eat fresh seafood for breakfast.',
              latitude: 35.6655,
              longitude: 139.7707,
              type: 'food',
              cost_estimate: '¥4,000',
              travel_time_to_next: '20 mins',
              description: 'Bustling market with amazing street food.'
            },
            {
              place_name: 'teamLab Planets',
              action: 'Immerse yourself in digital art.',
              latitude: 35.6499,
              longitude: 139.7890,
              type: 'sightseeing',
              cost_estimate: '¥3,800',
              travel_time_to_next: '15 mins',
              description: 'Interactive and visually stunning art museum.'
            },
            {
              place_name: 'Odaiba',
              action: 'See the life-size Gundam and Rainbow Bridge.',
              latitude: 35.6248,
              longitude: 139.7731,
              type: 'sightseeing',
              cost_estimate: 'Free',
              description: 'Entertainment district on a man-made island.'
            }
          ]
        }
      ]
    }
  },
  {
    slug: '3-days-in-london',
    title: '3 Days in London: A Royal Weekend',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    preferences: {
      destination: 'London',
      departFrom: 'Paris',
      duration: '3 Days',
      layover: '',
      hotel: 'Central London',
      style: ['History', 'Sightseeing', 'Culture'],
      constraints: '',
      language: 'English',
      budget: 'Standard',
      pacing: 'Intensive',
      transportMode: 'Public Transport'
    },
    plan: {
      trip_summary: 'A fast-paced 3-day tour of London\'s most iconic royal and historical landmarks.',
      estimated_budget: '£400 GBP',
      budget_breakdown: 'Includes Oyster card top-up, meals, and attraction tickets. Excludes flights and hotel.',
      suggested_dates: 'May to September',
      date_reasoning: 'Warmer weather and longer daylight hours.',
      suggested_hotels: [
        { name: 'The Z Hotel Covent Garden', price_range: '£120 - £200 GBP', description: 'Compact but modern rooms in a perfect central location.' },
        { name: 'The Hoxton, Holborn', price_range: '£200 - £350 GBP', description: 'Trendy hotel with a great atmosphere and restaurant.' }
      ],
      warnings: [
        'Look right before crossing the street (traffic drives on the left).',
        'Stand on the right on Tube escalators.',
        'London weather is unpredictable; always carry an umbrella.'
      ],
      packing_list: [
        'Comfortable walking shoes',
        'Layers and a waterproof jacket',
        'UK power adapter (Type G)'
      ],
      weather_forecast: 'Mild with a chance of rain year-round.',
      transport_advice: 'Use a contactless credit card or Apple/Google Pay for the Tube and buses (daily cap applies).',
      days: [
        {
          day_number: 1,
          theme: 'Royal London',
          activities: [
            {
              place_name: 'Buckingham Palace',
              action: 'Watch the Changing of the Guard.',
              latitude: 51.5014,
              longitude: -0.1419,
              type: 'sightseeing',
              cost_estimate: 'Free',
              travel_time_to_next: '15 mins',
              description: 'The King\'s official London residence.'
            },
            {
              place_name: 'Westminster Abbey',
              action: 'Tour the historic church.',
              latitude: 51.4993,
              longitude: -0.1273,
              type: 'sightseeing',
              cost_estimate: '£27',
              travel_time_to_next: '5 mins',
              description: 'Site of royal coronations and weddings.'
            },
            {
              place_name: 'Houses of Parliament & Big Ben',
              action: 'Take photos from Westminster Bridge.',
              latitude: 51.5007,
              longitude: -0.1246,
              type: 'sightseeing',
              cost_estimate: 'Free',
              description: 'Iconic symbols of London.'
            }
          ]
        },
        {
          day_number: 2,
          theme: 'History & Views',
          activities: [
            {
              place_name: 'Tower of London',
              action: 'See the Crown Jewels and meet the Beefeaters.',
              latitude: 51.5081,
              longitude: -0.0759,
              type: 'sightseeing',
              cost_estimate: '£33',
              travel_time_to_next: '10 mins',
              description: 'Historic castle and former prison.'
            },
            {
              place_name: 'Tower Bridge',
              action: 'Walk across the famous bridge.',
              latitude: 51.5055,
              longitude: -0.0754,
              type: 'sightseeing',
              cost_estimate: 'Free',
              travel_time_to_next: '15 mins',
              description: 'Often confused with London Bridge.'
            },
            {
              place_name: 'Borough Market',
              action: 'Grab lunch from various food stalls.',
              latitude: 51.5055,
              longitude: -0.0905,
              type: 'food',
              cost_estimate: '£15',
              description: 'One of the largest and oldest food markets in London.'
            }
          ]
        },
        {
          day_number: 3,
          theme: 'Museums & West End',
          activities: [
            {
              place_name: 'The British Museum',
              action: 'See the Rosetta Stone and Egyptian mummies.',
              latitude: 51.5194,
              longitude: -0.1270,
              type: 'sightseeing',
              cost_estimate: 'Free',
              travel_time_to_next: '15 mins',
              description: 'World-class museum of human history and culture.'
            },
            {
              place_name: 'Covent Garden',
              action: 'Watch street performers and shop.',
              latitude: 51.5117,
              longitude: -0.1240,
              type: 'sightseeing',
              cost_estimate: 'Free',
              travel_time_to_next: '10 mins',
              description: 'Lively area with shops, restaurants, and entertainment.'
            },
            {
              place_name: 'West End Theatre',
              action: 'Watch a world-class musical.',
              latitude: 51.5113,
              longitude: -0.1316,
              type: 'other',
              cost_estimate: '£50 - £150',
              description: 'London\'s equivalent to Broadway.'
            }
          ]
        }
      ]
    }
  },
  {
    slug: 'japan-golden-route',
    title: 'Japan Golden Route: Tokyo to Kyoto',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    preferences: {
      destination: 'Japan',
      departFrom: 'Sydney',
      duration: '7 Days',
      layover: '',
      hotel: 'Mix of Hotels and Ryokans',
      style: ['Culture', 'Nature', 'Food'],
      constraints: '',
      language: 'English',
      budget: 'Standard',
      pacing: 'Intensive',
      transportMode: 'Public Transport'
    },
    plan: {
      trip_summary: 'A classic 7-day journey covering Tokyo, Mt. Fuji (Hakone), Kyoto, and Osaka.',
      estimated_budget: '$1,800 USD (~¥270,000 JPY)',
      budget_breakdown: 'Includes Shinkansen tickets, local transport, meals, and attractions. Excludes flights and accommodation.',
      suggested_dates: 'April (Cherry Blossoms) or November (Autumn Leaves)',
      date_reasoning: 'Perfect weather and stunning seasonal colors.',
      suggested_hotels: [
        { name: 'Hakone Kowakien Ten-yu', price_range: '$300 - $500 USD', description: 'Luxury ryokan with private open-air baths.' },
        { name: 'Cross Hotel Kyoto', price_range: '$150 - $250 USD', description: 'Modern hotel in the heart of Kyoto.' }
      ],
      warnings: [
        'Book Shinkansen tickets with Mt. Fuji views (Mount Fuji side) in advance.',
        'Kyoto buses can be very crowded; use the subway when possible.',
        'Tattoos may prohibit entry to public onsen (hot springs).'
      ],
      packing_list: [
        'Easy-to-remove shoes (for temples and ryokans)',
        'Japan Rail Pass (if traveling extensively)',
        'Portable charger'
      ],
      weather_forecast: 'Varies by region, but generally mild in spring and autumn.',
      transport_advice: 'Use the Shinkansen (bullet train) for intercity travel. Buy a JR Pass if it makes financial sense for your itinerary.',
      days: [
        {
          day_number: 1,
          theme: 'Arrival in Tokyo',
          activities: [
            {
              place_name: 'Shinjuku',
              action: 'Explore the neon-lit streets.',
              latitude: 35.6938,
              longitude: 139.7034,
              type: 'sightseeing',
              cost_estimate: 'Free',
              travel_time_to_next: '15 mins',
              description: 'Vibrant entertainment and business district.'
            },
            {
              place_name: 'Shibuya',
              action: 'See the scramble crossing and Hachiko statue.',
              latitude: 35.6595,
              longitude: 139.7005,
              type: 'sightseeing',
              cost_estimate: 'Free',
              description: 'Famous intersection and meeting spot.'
            }
          ]
        },
        {
          day_number: 2,
          theme: 'Hakone & Mt. Fuji',
          activities: [
            {
              place_name: 'Romancecar to Hakone',
              action: 'Take the scenic train from Shinjuku.',
              latitude: 35.2324,
              longitude: 139.1069,
              type: 'transport',
              cost_estimate: '¥2,470',
              travel_time_to_next: '30 mins',
              description: 'Comfortable train ride to the hot spring town.'
            },
            {
              place_name: 'Lake Ashi',
              action: 'Take a sightseeing cruise on a pirate ship.',
              latitude: 35.2000,
              longitude: 139.0167,
              type: 'sightseeing',
              cost_estimate: '¥1,200',
              travel_time_to_next: '20 mins',
              description: 'Beautiful lake with views of Mt. Fuji on clear days.'
            },
            {
              place_name: 'Ryokan Stay',
              action: 'Relax in an onsen and enjoy a kaiseki dinner.',
              latitude: 35.2324,
              longitude: 139.1069,
              type: 'hotel',
              cost_estimate: 'Included in hotel',
              description: 'Traditional Japanese inn experience.'
            }
          ]
        },
        {
          day_number: 3,
          theme: 'Journey to Kyoto',
          activities: [
            {
              place_name: 'Shinkansen to Kyoto',
              action: 'Ride the bullet train.',
              latitude: 34.9858,
              longitude: 135.7588,
              type: 'transport',
              cost_estimate: '¥13,000',
              travel_time_to_next: '20 mins',
              description: 'Fast and efficient travel to the ancient capital.'
            },
            {
              place_name: 'Kiyomizu-dera',
              action: 'Visit the iconic wooden temple.',
              latitude: 34.9948,
              longitude: 135.7850,
              type: 'sightseeing',
              cost_estimate: '¥400',
              travel_time_to_next: '15 mins',
              description: 'Famous temple offering great views of Kyoto.'
            },
            {
              place_name: 'Gion District',
              action: 'Walk through the traditional geisha district.',
              latitude: 35.0037,
              longitude: 135.7785,
              type: 'sightseeing',
              cost_estimate: 'Free',
              description: 'Historic streets with wooden machiya houses.'
            }
          ]
        },
        {
          day_number: 4,
          theme: 'Kyoto Classics',
          activities: [
            {
              place_name: 'Fushimi Inari Taisha',
              action: 'Hike through thousands of vermilion torii gates.',
              latitude: 34.9671,
              longitude: 135.7727,
              type: 'sightseeing',
              cost_estimate: 'Free',
              travel_time_to_next: '25 mins',
              description: 'Iconic shrine dedicated to the Shinto god of rice.'
            },
            {
              place_name: 'Kinkaku-ji (Golden Pavilion)',
              action: 'See the stunning gold-leaf covered Zen temple.',
              latitude: 35.0394,
              longitude: 135.7292,
              type: 'sightseeing',
              cost_estimate: '¥500',
              travel_time_to_next: '30 mins',
              description: 'One of Kyoto\'s most famous landmarks.'
            },
            {
              place_name: 'Arashiyama Bamboo Grove',
              action: 'Walk through the towering bamboo stalks.',
              latitude: 35.0094,
              longitude: 135.6668,
              type: 'sightseeing',
              cost_estimate: 'Free',
              description: 'A magical and photogenic forest.'
            }
          ]
        },
        {
          day_number: 5,
          theme: 'Nara Day Trip',
          activities: [
            {
              place_name: 'Nara Park',
              action: 'Feed the friendly, free-roaming deer.',
              latitude: 34.6851,
              longitude: 135.8430,
              type: 'sightseeing',
              cost_estimate: '¥200 for deer crackers',
              travel_time_to_next: '10 mins',
              description: 'Large park home to hundreds of sacred deer.'
            },
            {
              place_name: 'Todai-ji Temple',
              action: 'See the giant bronze Buddha statue.',
              latitude: 34.6890,
              longitude: 135.8398,
              type: 'sightseeing',
              cost_estimate: '¥600',
              description: 'One of Japan\'s most historically significant temples.'
            }
          ]
        },
        {
          day_number: 6,
          theme: 'Osaka Food Culture',
          activities: [
            {
              place_name: 'Dotonbori',
              action: 'Eat takoyaki and okonomiyaki under neon lights.',
              latitude: 34.6687,
              longitude: 135.5013,
              type: 'food',
              cost_estimate: '¥3,000',
              travel_time_to_next: '15 mins',
              description: 'Osaka\'s vibrant entertainment and food district.'
            },
            {
              place_name: 'Osaka Castle',
              action: 'Visit the historic castle and its grounds.',
              latitude: 34.6873,
              longitude: 135.5262,
              type: 'sightseeing',
              cost_estimate: '¥600',
              description: 'A symbol of Osaka\'s history.'
            }
          ]
        },
        {
          day_number: 7,
          theme: 'Departure',
          activities: [
            {
              place_name: 'Kansai International Airport (KIX)',
              action: 'Depart from Osaka.',
              latitude: 34.4320,
              longitude: 135.2304,
              type: 'transport',
              cost_estimate: '¥1,500',
              description: 'Take the Haruka Express or airport bus.'
            }
          ]
        }
      ]
    }
  },
  {
    slug: 'things-to-do-in-new-york',
    title: 'New York City in 4 Days',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    preferences: {
      destination: 'New York',
      departFrom: 'London',
      duration: '4 Days',
      layover: '',
      hotel: 'Midtown Manhattan',
      style: ['Sightseeing', 'Food', 'Entertainment'],
      constraints: '',
      language: 'English',
      budget: 'Standard',
      pacing: 'Intensive',
      transportMode: 'Public Transport'
    },
    plan: {
      trip_summary: 'A fast-paced 4-day tour of New York City\'s most famous landmarks and neighborhoods.',
      estimated_budget: '$600 USD (~£470 GBP)',
      budget_breakdown: 'Includes subway passes, meals, Broadway show, and attraction tickets. Excludes flights and hotel.',
      suggested_dates: 'September to November or April to June',
      date_reasoning: 'Pleasant weather for walking and exploring.',
      suggested_hotels: [
        { name: 'Pod 51', price_range: '$150 - $250 USD', description: 'Budget-friendly, great location in Midtown.' },
        { name: 'Arlo Midtown', price_range: '$250 - $400 USD', description: 'Modern, stylish, and close to Times Square.' }
      ],
      warnings: [
        'Get a MetroCard or use OMNY (contactless) for the subway.',
        'Don\'t block the sidewalk; walk with purpose.',
        'Tipping 18-20% is standard in restaurants and for taxis.'
      ],
      packing_list: [
        'Very comfortable walking shoes',
        'Portable phone charger',
        'Layers for changing weather'
      ],
      weather_forecast: 'Hot in summer, cold in winter. Spring and autumn are mild.',
      transport_advice: 'Use the subway for long distances and walk the rest. Avoid taxis during rush hour.',
      days: [
        {
          day_number: 1,
          theme: 'Midtown Icons',
          activities: [
            {
              place_name: 'Times Square',
              action: 'Experience the neon lights and bustling energy.',
              latitude: 40.7580,
              longitude: -73.9855,
              type: 'sightseeing',
              cost_estimate: '$0',
              travel_time_to_next: '10 mins',
              description: 'The Crossroads of the World.'
            },
            {
              place_name: 'Rockefeller Center',
              action: 'Visit the plaza and optionally go up to the Top of the Rock.',
              latitude: 40.7587,
              longitude: -73.9787,
              type: 'sightseeing',
              cost_estimate: '$40',
              travel_time_to_next: '15 mins',
              description: 'Famous complex of commercial buildings.'
            },
            {
              place_name: 'Broadway Show',
              action: 'Catch a world-famous musical or play.',
              latitude: 40.7590,
              longitude: -73.9845,
              type: 'other',
              cost_estimate: '$150',
              description: 'The pinnacle of live theater.'
            }
          ]
        },
        {
          day_number: 2,
          theme: 'Downtown & Liberty',
          activities: [
            {
              place_name: 'Statue of Liberty & Ellis Island',
              action: 'Take the ferry to see the iconic statue.',
              latitude: 40.6892,
              longitude: -74.0445,
              type: 'sightseeing',
              cost_estimate: '$24',
              travel_time_to_next: '20 mins',
              description: 'A symbol of freedom and hope.'
            },
            {
              place_name: '9/11 Memorial & Museum',
              action: 'Pay respects and learn about the historic event.',
              latitude: 40.7115,
              longitude: -74.0131,
              type: 'sightseeing',
              cost_estimate: '$33',
              travel_time_to_next: '15 mins',
              description: 'Moving tribute to the victims of 9/11.'
            },
            {
              place_name: 'Brooklyn Bridge',
              action: 'Walk across the bridge at sunset.',
              latitude: 40.7061,
              longitude: -73.9969,
              type: 'sightseeing',
              cost_estimate: '$0',
              description: 'Historic suspension bridge with skyline views.'
            }
          ]
        },
        {
          day_number: 3,
          theme: 'Central Park & Museums',
          activities: [
            {
              place_name: 'Central Park',
              action: 'Rent a bike or walk through the massive urban park.',
              latitude: 40.7812,
              longitude: -73.9665,
              type: 'sightseeing',
              cost_estimate: '$15',
              travel_time_to_next: '20 mins',
              description: 'New York\'s backyard.'
            },
            {
              place_name: 'The Metropolitan Museum of Art (The Met)',
              action: 'Explore one of the world\'s largest art museums.',
              latitude: 40.7794,
              longitude: -73.9632,
              type: 'sightseeing',
              cost_estimate: '$30',
              description: 'Over 5,000 years of art from around the world.'
            }
          ]
        },
        {
          day_number: 4,
          theme: 'High Line & Departure',
          activities: [
            {
              place_name: 'The High Line',
              action: 'Walk along the elevated linear park.',
              latitude: 40.7480,
              longitude: -74.0048,
              type: 'sightseeing',
              cost_estimate: '$0',
              travel_time_to_next: '15 mins',
              description: 'Built on a historic freight rail line.'
            },
            {
              place_name: 'Chelsea Market',
              action: 'Grab lunch at this famous indoor food hall.',
              latitude: 40.7420,
              longitude: -74.0048,
              type: 'food',
              cost_estimate: '$25',
              description: 'Gourmet food hall and shopping mall.'
            }
          ]
        }
      ]
    }
  },
  {
    slug: 'how-much-does-a-trip-to-singapore-cost',
    title: 'Singapore on a Budget',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    preferences: {
      destination: 'Singapore',
      departFrom: 'Sydney',
      duration: '3 Days',
      layover: '',
      hotel: 'Chinatown',
      style: ['Food', 'Culture', 'Budget'],
      constraints: '',
      language: 'English',
      budget: 'Economy',
      pacing: 'Balanced',
      transportMode: 'Public Transport'
    },
    plan: {
      trip_summary: 'A budget-friendly 3-day itinerary focusing on Singapore\'s amazing street food and free attractions.',
      estimated_budget: '150 SGD (~$170 AUD)',
      budget_breakdown: 'Focuses on hawker centers, free attractions, and MRT travel. Excludes flights and hostel/hotel.',
      suggested_dates: 'February to April',
      date_reasoning: 'Slightly less rain and humidity.',
      suggested_hotels: [
        { name: 'Wink Capsule Hostel', price_range: '40 - 60 SGD', description: 'Clean, modern capsule hostel in Chinatown.' },
        { name: 'Hotel 81 Chinatown', price_range: '80 - 120 SGD', description: 'Basic, budget-friendly private rooms.' }
      ],
      warnings: [
        'Use an EZ-Link card or a contactless bank card for the MRT and buses.',
        'Tap water is safe to drink; bring a reusable bottle.',
        'Chewing gum is banned, and littering carries heavy fines.'
      ],
      packing_list: [
        'Light, breathable clothing',
        'Umbrella for sudden downpours',
        'Reusable water bottle'
      ],
      weather_forecast: 'Hot and humid year-round with frequent rain showers.',
      transport_advice: 'The MRT is the best and cheapest way to get around. Taxis are relatively affordable but not necessary.',
      days: [
        {
          day_number: 1,
          theme: 'Culture & Hawker Food',
          activities: [
            {
              place_name: 'Chinatown',
              action: 'Explore the vibrant streets and visit the Buddha Tooth Relic Temple.',
              latitude: 1.2840,
              longitude: 103.8440,
              type: 'sightseeing',
              cost_estimate: '0 SGD',
              travel_time_to_next: '10 mins',
              description: 'Historic district with rich heritage.'
            },
            {
              place_name: 'Maxwell Food Centre',
              action: 'Try the famous Tian Tian Hainanese Chicken Rice.',
              latitude: 1.2804,
              longitude: 103.8447,
              type: 'food',
              cost_estimate: '8 SGD',
              travel_time_to_next: '20 mins',
              description: 'One of Singapore\'s best hawker centers.'
            },
            {
              place_name: 'Kampong Glam & Haji Lane',
              action: 'See the Sultan Mosque and explore indie boutiques.',
              latitude: 1.3022,
              longitude: 103.8590,
              type: 'sightseeing',
              cost_estimate: '15 SGD',
              description: 'Trendy neighborhood with street art.'
            }
          ]
        },
        {
          day_number: 2,
          theme: 'Gardens & Bay Views',
          activities: [
            {
              place_name: 'Singapore Botanic Gardens',
              action: 'Walk through the lush, UNESCO World Heritage site.',
              latitude: 1.3138,
              longitude: 103.8159,
              type: 'sightseeing',
              cost_estimate: '0 SGD',
              travel_time_to_next: '25 mins',
              description: 'Beautiful tropical gardens.'
            },
            {
              place_name: 'Marina Bay Sands Boardwalk',
              action: 'Stroll around the bay and take photos.',
              latitude: 1.2868,
              longitude: 103.8545,
              type: 'sightseeing',
              cost_estimate: '0 SGD',
              travel_time_to_next: '15 mins',
              description: 'Iconic views of the city skyline.'
            },
            {
              place_name: 'Gardens by the Bay (Supertree Grove)',
              action: 'Watch the free Garden Rhapsody light and sound show.',
              latitude: 1.2816,
              longitude: 103.8636,
              type: 'sightseeing',
              cost_estimate: '0 SGD',
              description: 'Futuristic park with massive tree-like structures.'
            }
          ]
        },
        {
          day_number: 3,
          theme: 'Sentosa & Departure',
          activities: [
            {
              place_name: 'Sentosa Island (Siloso Beach)',
              action: 'Relax on the beach. Take the boardwalk to save on monorail fees.',
              latitude: 1.2540,
              longitude: 103.8238,
              type: 'sightseeing',
              cost_estimate: '0 SGD',
              travel_time_to_next: '40 mins',
              description: 'Resort island with beaches and attractions.'
            },
            {
              place_name: 'Jewel Changi Airport',
              action: 'Marvel at the HSBC Rain Vortex before your flight.',
              latitude: 1.3602,
              longitude: 103.9898,
              type: 'sightseeing',
              cost_estimate: '0 SGD',
              description: 'Massive indoor waterfall and forest.'
            }
          ]
        }
      ]
    }
  }
];
