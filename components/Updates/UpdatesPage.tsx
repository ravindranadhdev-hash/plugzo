import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, TrendingUp, Zap, Award, Users, Globe, ChevronRight, ArrowRight, Star, Flame, BarChart3, Clock, MapPin } from 'lucide-react';
import { COLORS } from '../../constants';

// EV Data structure for year-wise collections and trending comparisons
interface EVYearData {
  year: number;
  title: string;
  description: string;
  totalLaunches: number;
  featuredVehicles: FeaturedVehicle[];
  marketTrends: MarketTrend[];
  keyHighlights: string[];
}

interface FeaturedVehicle {
  id: string;
  name: string;
  manufacturer: string;
  type: 'car' | 'bike' | 'scooter';
  price: string;
  range: string;
  image: string;
  launchDate: string;
  rating: number;
  sales?: string;
}

interface MarketTrend {
  title: string;
  description: string;
  percentage: number;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
}

// Mock data for EV collections by year
const EV_YEAR_DATA: EVYearData[] = [
  {
    year: 2024,
    title: "EV Revolution Accelerates",
    description: "Record-breaking year with major launches across all segments",
    totalLaunches: 47,
    featuredVehicles: [
      {
        id: 'tata-punch-ev',
        name: 'Tata Punch EV',
        manufacturer: 'Tata Motors',
        type: 'car',
        price: '₹12.49 Lakhs',
        range: '421 km',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tata_Punch_EV.jpg/640px-Tata_Punch_EV.jpg',
        launchDate: 'January 2024',
        rating: 4.5,
        sales: '15,000+ units'
      },
      {
        id: 'byd-seal',
        name: 'BYD Seal',
        manufacturer: 'BYD',
        type: 'car',
        price: '₹41 Lakhs',
        range: '700 km',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/BYD_Seal.jpg/640px-BYD_Seal.jpg',
        launchDate: 'March 2024',
        rating: 4.7,
        sales: '8,000+ units'
      },
      {
        id: 'ather-rizta',
        name: 'Ather Rizta',
        manufacturer: 'Ather Energy',
        type: 'scooter',
        price: '₹1.25 Lakhs',
        range: '160 km',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Ather_Rizta.jpg/640px-Ather_Rizta.jpg',
        launchDate: 'April 2024',
        rating: 4.3,
        sales: '12,000+ units'
      }
    ],
    marketTrends: [
      {
        title: 'EV Adoption',
        description: 'Market share increased significantly',
        percentage: 67,
        icon: <TrendingUp size={16} />,
        trend: 'up'
      },
      {
        title: 'Charging Infrastructure',
        description: 'New charging stations added',
        percentage: 45,
        icon: <Zap size={16} />,
        trend: 'up'
      },
      {
        title: 'Battery Costs',
        description: 'Average battery prices reduced',
        percentage: 23,
        icon: <ArrowRight size={16} />,
        trend: 'down'
      }
    ],
    keyHighlights: [
      'Tata Motors crossed 100,000 EV sales milestone',
      'Hyderabad became EV capital with 500+ charging stations',
      'Electric scooter market grew by 120%',
      'Premium EV segment saw 3x growth'
    ]
  },
  {
    year: 2023,
    title: "Mass Market Expansion",
    description: "Focus on affordable EVs and charging network expansion",
    totalLaunches: 35,
    featuredVehicles: [
      {
        id: 'tata-nexon-ev-max',
        name: 'Nexon EV Max',
        manufacturer: 'Tata Motors',
        type: 'car',
        price: '₹18.99 Lakhs',
        range: '453 km',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tata_Nexon_EV_front.jpg/640px-Tata_Nexon_EV_front.jpg',
        launchDate: 'September 2023',
        rating: 4.6,
        sales: '25,000+ units'
      },
      {
        id: 'ola-s1-pro-gen2',
        name: 'Ola S1 Pro Gen 2',
        manufacturer: 'Ola Electric',
        type: 'scooter',
        price: '₹1.45 Lakhs',
        range: '195 km',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Ola_S1_Pro.jpg/640px-Ola_S1_Pro.jpg',
        launchDate: 'August 2023',
        rating: 4.2,
        sales: '18,000+ units'
      },
      {
        id: 'mg-cyberster',
        name: 'MG Cyberster',
        manufacturer: 'MG Motors',
        type: 'car',
        price: '₹60 Lakhs',
        range: '580 km',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/MG_Cyberster.jpg/640px-MG_Cyberster.jpg',
        launchDate: 'October 2023',
        rating: 4.8,
        sales: '2,000+ units'
      }
    ],
    marketTrends: [
      {
        title: 'Price Reduction',
        description: 'Average EV prices decreased',
        percentage: 15,
        icon: <ArrowRight size={16} />,
        trend: 'down'
      },
      {
        title: 'Range Improvement',
        description: 'Average range increased',
        percentage: 28,
        icon: <TrendingUp size={16} />,
        trend: 'up'
      },
      {
        title: 'Model Variety',
        description: 'New models launched',
        percentage: 52,
        icon: <Users size={16} />,
        trend: 'up'
      }
    ],
    keyHighlights: [
      'FAME II subsidy boosted EV adoption',
      'Fast charging network expanded to 200 cities',
      'Electric vehicle financing became mainstream',
      'Corporate EV adoption increased by 80%'
    ]
  },
  {
    year: 2022,
    title: "Infrastructure Foundation",
    description: "Building the foundation for EV ecosystem",
    totalLaunches: 28,
    featuredVehicles: [
      {
        id: 'tata-tiago-ev',
        name: 'Tata Tiago EV',
        manufacturer: 'Tata Motors',
        type: 'car',
        price: '₹8.49 Lakhs',
        range: '315 km',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Tata_Tiago_EV.jpg/640px-Tata_Tiago_EV.jpg',
        launchDate: 'December 2022',
        rating: 4.4,
        sales: '20,000+ units'
      },
      {
        id: 'revolt-rv400',
        name: 'Revolt RV400',
        manufacturer: 'Revolt Motors',
        type: 'bike',
        price: '₹1.38 Lakhs',
        range: '150 km',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Revolt_RV400.jpg/640px-Revolt_RV400.jpg',
        launchDate: 'June 2022',
        rating: 4.1,
        sales: '8,000+ units'
      },
      {
        id: 'simple-one',
        name: 'Simple One',
        manufacturer: 'Simple Energy',
        type: 'scooter',
        price: '₹1.10 Lakhs',
        range: '231 km',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Simple_One_scooter.jpg/640px-Simple_One_scooter.jpg',
        launchDate: 'August 2022',
        rating: 4.0,
        sales: '5,000+ units'
      }
    ],
    marketTrends: [
      {
        title: 'Charging Stations',
        description: 'Infrastructure growth',
        percentage: 120,
        icon: <Zap size={16} />,
        trend: 'up'
      },
      {
        title: 'Consumer Interest',
        description: 'Search queries increased',
        percentage: 85,
        icon: <Users size={16} />,
        trend: 'up'
      },
      {
        title: 'Government Support',
        description: 'Policy initiatives',
        percentage: 65,
        icon: <Award size={16} />,
        trend: 'up'
      }
    ],
    keyHighlights: [
      'PLI scheme boosted local manufacturing',
      'Battery swapping technology emerged',
      'EV startups raised $1B+ funding',
      'First premium EV segment established'
    ]
  }
];

// Trending comparison data for SEO
const TRENDING_COMPARISONS = [
  {
    category: "Best Selling EV Cars 2024",
    vehicles: [
      { name: "Tata Nexon EV", sales: "35,000+", growth: "+45%", rating: 4.6 },
      { name: "Tata Punch EV", sales: "15,000+", growth: "+120%", rating: 4.5 },
      { name: "MG ZS EV", sales: "12,000+", growth: "+28%", rating: 4.4 },
      { name: "BYD Atto 3", sales: "8,000+", growth: "+95%", rating: 4.7 }
    ]
  },
  {
    category: "Top Electric Scooters 2024",
    vehicles: [
      { name: "Ola S1 Pro", sales: "28,000+", growth: "+65%", rating: 4.2 },
      { name: "Ather 450X", sales: "18,000+", growth: "+52%", rating: 4.6 },
      { name: "TVS iQube", sales: "15,000+", growth: "+85%", rating: 4.3 },
      { name: "Hero Vida", sales: "10,000+", growth: "+140%", rating: 4.1 }
    ]
  },
  {
    category: "Electric Motorcycles Rising Stars",
    vehicles: [
      { name: "Revolt RV400", sales: "8,000+", growth: "+35%", rating: 4.1 },
      { name: "Tork Kratos", sales: "3,000+", growth: "+180%", rating: 4.0 },
      { name: "Ultraviolette F77", sales: "1,500+", growth: "+220%", rating: 4.5 }
    ]
  },
  {
    category: "Premium EV Market Leaders",
    vehicles: [
      { name: "BYD Seal", sales: "8,000+", growth: "+95%", rating: 4.7 },
      { name: "MG Cyberster", sales: "2,000+", growth: "+150%", rating: 4.8 },
      { name: "BMW i4", sales: "1,800+", growth: "+75%", rating: 4.6 },
      { name: "Mercedes EQS", sales: "1,200+", growth: "+45%", rating: 4.5 }
    ]
  }
];

const UpdatesPage: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [activeTab, setActiveTab] = useState<'yearwise' | 'trending'>('yearwise');

  const selectedYearData = EV_YEAR_DATA.find(data => data.year === selectedYear);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0F3D2E] via-[#1a4d2e] to-[#1DB954] text-white py-24 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              EV Market <br className="hidden md:block" />
              Updates & <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8f5e8] to-[#1DB954] drop-shadow-lg">
                Trends
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Year-wise EV launches, market trends, and comprehensive comparisons to help you stay informed about the electric vehicle revolution.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('yearwise')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'yearwise'
                  ? 'border-[#1DB954] text-[#1DB954]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Year-wise Collections
            </button>
            <button
              onClick={() => setActiveTab('trending')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'trending'
                  ? 'border-[#1DB954] text-[#1DB954]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Trending Comparisons
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'yearwise' ? (
            <motion.div
              key="yearwise"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Year Selector */}
              <div className="flex flex-wrap gap-4 justify-center">
                {EV_YEAR_DATA.map((yearData) => (
                  <button
                    key={yearData.year}
                    onClick={() => setSelectedYear(yearData.year)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      selectedYear === yearData.year
                        ? 'bg-[#1DB954] text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {yearData.year}
                  </button>
                ))}
              </div>

              {selectedYearData && (
                <div className="space-y-12">
                  {/* Year Header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                  >
                    <h2 className="text-3xl md:text-4xl font-black text-[#0F3D2E]">
                      {selectedYearData.year}: {selectedYearData.title}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      {selectedYearData.description}
                    </p>
                    <div className="flex justify-center gap-8 text-center">
                      <div>
                        <div className="text-3xl font-bold text-[#1DB954]">{selectedYearData.totalLaunches}</div>
                        <div className="text-sm text-gray-500">Total Launches</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Featured Vehicles */}
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-[#0F3D2E]">Featured Launches</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {selectedYearData.featuredVehicles.map((vehicle, index) => (
                        <motion.div
                          key={vehicle.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#1DB954]/30 hover:shadow-lg transition-all"
                        >
                          <div className="h-48 bg-gray-100">
                            <img
                              src={vehicle.image}
                              alt={vehicle.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6 space-y-4">
                            <div>
                              <h4 className="text-lg font-bold text-[#0F3D2E]">{vehicle.name}</h4>
                              <p className="text-sm text-gray-500">{vehicle.manufacturer}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium ml-1">{vehicle.rating}</span>
                              </div>
                              <span className="text-gray-300">•</span>
                              <span className="text-sm text-gray-500">{vehicle.launchDate}</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Price</span>
                                <span className="text-sm font-bold text-[#1DB954]">{vehicle.price}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Range</span>
                                <span className="text-sm font-bold">{vehicle.range}</span>
                              </div>
                              {vehicle.sales && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Sales</span>
                                  <span className="text-sm font-bold text-orange-600">{vehicle.sales}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Market Trends */}
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-[#0F3D2E]">Market Trends</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {selectedYearData.marketTrends.map((trend, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white p-6 rounded-2xl border border-gray-100"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              trend.trend === 'up' ? 'bg-green-100 text-green-600' :
                              trend.trend === 'down' ? 'bg-red-100 text-red-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {trend.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-[#0F3D2E]">{trend.title}</h4>
                              <p className="text-xs text-gray-500">{trend.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  trend.trend === 'up' ? 'bg-green-500' :
                                  trend.trend === 'down' ? 'bg-red-500' :
                                  'bg-gray-500'
                                }`}
                                style={{ width: `${Math.min(trend.percentage, 100)}%` }}
                              />
                            </div>
                            <span className={`text-sm font-bold ${
                              trend.trend === 'up' ? 'text-green-600' :
                              trend.trend === 'down' ? 'text-red-600' :
                              'text-gray-600'
                            }`}>
                              {trend.trend === 'up' ? '+' : trend.trend === 'down' ? '-' : ''}{trend.percentage}%
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="bg-gradient-to-r from-[#1DB954]/10 to-[#25d966]/10 rounded-3xl p-8 border border-[#1DB954]/20">
                    <h3 className="text-2xl font-bold text-[#0F3D2E] mb-6">Key Highlights</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {selectedYearData.keyHighlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-[#1DB954] rounded-full" />
                          <p className="text-gray-700">{highlight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="trending"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* SEO-Optimized Trending Comparisons */}
              <div className="space-y-12">
                {TRENDING_COMPARISONS.map((category, categoryIndex) => (
                  <motion.div
                    key={categoryIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: categoryIndex * 0.1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <Flame className="w-6 h-6 text-orange-500" />
                      <h2 className="text-2xl md:text-3xl font-black text-[#0F3D2E]">{category.category}</h2>
                    </div>
                    
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              <th className="text-left p-4 font-bold text-gray-700">Vehicle</th>
                              <th className="text-center p-4 font-bold text-gray-700">Sales</th>
                              <th className="text-center p-4 font-bold text-gray-700">Growth</th>
                              <th className="text-center p-4 font-bold text-gray-700">Rating</th>
                              <th className="text-center p-4 font-bold text-gray-700">Trend</th>
                            </tr>
                          </thead>
                          <tbody>
                            {category.vehicles.map((vehicle, vehicleIndex) => (
                              <tr key={vehicleIndex} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-4">
                                  <div className="font-bold text-[#0F3D2E]">{vehicle.name}</div>
                                </td>
                                <td className="p-4 text-center">
                                  <span className="text-sm font-bold text-orange-600">{vehicle.sales}</span>
                                </td>
                                <td className="p-4 text-center">
                                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                    {vehicle.growth}
                                  </span>
                                </td>
                                <td className="p-4 text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                    <span className="text-sm font-bold">{vehicle.rating}</span>
                                  </div>
                                </td>
                                <td className="p-4 text-center">
                                  <div className="flex items-center justify-center">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* SEO Content */}
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-lg font-bold text-blue-900 mb-3">Market Analysis</h3>
                      <p className="text-blue-800 text-sm leading-relaxed">
                        The {category.category.toLowerCase()} segment shows remarkable growth in 2024, with {category.vehicles[0].name} leading the market. 
                        Consumer preference for electric vehicles continues to rise, driven by improving infrastructure, government incentives, and increasing environmental awareness. 
                        This comprehensive comparison helps EV buyers make informed decisions based on sales performance, user ratings, and growth trends.
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Market Overview */}
              <div className="bg-gradient-to-r from-[#0F3D2E] to-[#1DB954] rounded-3xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">EV Market Overview 2024</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-6 h-6" />
                      <h3 className="font-bold">Market Growth</h3>
                    </div>
                    <p className="text-white/90 text-sm">
                      The Indian EV market grew by 67% in 2024, with electric vehicles becoming mainstream choices for urban commuters.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6" />
                      <h3 className="font-bold">Consumer Adoption</h3>
                    </div>
                    <p className="text-white/90 text-sm">
                      Over 2 million EV owners now in India, with charging infrastructure expanding to support growing demand.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Globe className="w-6 h-6" />
                      <h3 className="font-bold">Future Outlook</h3>
                    </div>
                    <p className="text-white/90 text-sm">
                      Industry experts predict 30% EV penetration by 2030, with new models and improved battery technology driving adoption.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UpdatesPage;
