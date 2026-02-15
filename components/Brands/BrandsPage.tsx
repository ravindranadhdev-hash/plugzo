import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid3X3, Star, TrendingUp, Users, Zap, Award, ChevronRight, X } from 'lucide-react';

// Brand data with comprehensive information
interface EVBrand {
  id: number;
  name: string;
  logo: string;
  sampleImage: string;
  category: string;
  description: string;
  founded: number;
  headquarters: string;
  models: number;
  marketCap: string;
  rating: number;
  popularModels: { name: string; image: string }[];
  priceRange: string;
  chargingSupport: string;
  website: string;
}

const EV_BRANDS: EVBrand[] = [
  {
    id: 1,
    name: 'Tata Motors',
    logo: '/assets/brands/tata.png',
    sampleImage: '/assets/vehicles/tata-nexon-ev.jpg',
    category: 'Automaker',
    description: 'Leading Indian automaker with comprehensive EV lineup including Nexon, Tiago, Tigor, and Punch.',
    founded: 1945,
    headquarters: 'Mumbai, India',
    models: 15,
    marketCap: '₹2.3L Cr',
    rating: 4.5,
    popularModels: [
      { name: 'Nexon EV', image: '/assets/vehicles/tata-nexon-ev.jpg' },
      { name: 'Tiago EV', image: '/assets/vehicles/tata-tiago-ev.jpg' },
      { name: 'Tigor EV', image: '/assets/vehicles/tata-tigor-ev.jpg' }
    ],
    priceRange: '₹8-20 Lakhs',
    chargingSupport: 'AC/DC Fast Charging',
    website: 'https://www.tatamotors.com/electric-vehicles'
  },
  {
    id: 2,
    name: 'Mahindra Electric',
    logo: '/assets/brands/mahindra.png',
    sampleImage: '/assets/vehicles/mahindra-xuv400.jpg',
    category: 'Automaker',
    description: 'Pioneering electric mobility with XUV400, e2o, and Treo models focused on performance and utility.',
    founded: 1945,
    headquarters: 'Mumbai, India',
    models: 8,
    marketCap: '₹1.8L Cr',
    rating: 4.3,
    popularModels: [
      { name: 'XUV400', image: '/assets/vehicles/mahindra-xuv400.jpg' },
      { name: 'e2oPlus', image: '/assets/vehicles/mahindra-e2o.jpg' },
      { name: 'Treo', image: '/assets/vehicles/mahindra-treo.jpg' }
    ],
    priceRange: '₹13-17 Lakhs',
    chargingSupport: 'DC Fast Charging',
    website: 'https://www.mahindraelectric.com'
  },
  {
    id: 3,
    name: 'Ola Electric',
    logo: '/assets/brands/ola.png',
    sampleImage: '/assets/vehicles/ola-s1-pro.jpg',
    category: 'Automaker',
    description: 'Revolutionary electric scooters with S1 Pro, S1 Air, and Ather rivalry in premium segment.',
    founded: 2017,
    headquarters: 'Bangalore, India',
    models: 4,
    marketCap: '₹45,000 Cr',
    rating: 4.6,
    popularModels: [
      { name: 'S1 Pro', image: '/assets/vehicles/ola-s1-pro.jpg' },
      { name: 'S1 Air', image: '/assets/vehicles/ola-s1-air.jpg' },
      { name: 'S1X', image: '/assets/vehicles/ola-s1x.jpg' }
    ],
    priceRange: '₹85,000-1.3 Lakhs',
    chargingSupport: 'Portable Battery Swap',
    website: 'https://www.olaelectric.com'
  },
  {
    id: 4,
    name: 'Ather Energy',
    logo: '/assets/brands/ather.png',
    sampleImage: '/assets/vehicles/ather-450x.jpg',
    category: 'Automaker',
    description: 'Premium electric scooters with advanced technology, IoT connectivity, and fast charging capabilities.',
    founded: 2013,
    headquarters: 'Chennai, India',
    models: 3,
    marketCap: '₹38,000 Cr',
    rating: 4.7,
    popularModels: [
      { name: '450X', image: '/assets/vehicles/ather-450x.jpg' },
      { name: '450 Plus', image: '/assets/vehicles/ather-450-plus.jpg' },
      { name: '450 Apex', image: '/assets/vehicles/ather-450-apex.jpg' }
    ],
    priceRange: '₹1.3-1.5 Lakhs',
    chargingSupport: 'Ather Grid Fast Charging',
    website: 'https://www.atherenergy.com'
  },
  {
    id: 5,
    name: 'TVS Motor',
    logo: '/assets/brands/tvs.png',
    sampleImage: '/assets/vehicles/tvs-iqube.jpg',
    category: 'Automaker',
    description: 'Traditional manufacturer entering EV space with iQube Electric and Apache RTR series.',
    founded: 1978,
    headquarters: 'Chennai, India',
    models: 3,
    marketCap: '₹1.2L Cr',
    rating: 4.2,
    popularModels: [
      { name: 'iQube Electric', image: '/assets/vehicles/tvs-iqube.jpg' },
      { name: 'Apache RTR 160', image: '/assets/vehicles/tvs-apache.jpg' }
    ],
    priceRange: '₹1.1-1.3 Lakhs',
    chargingSupport: 'Standard Charging',
    website: 'https://www.tvsmotor.com/electric'
  },
  {
    id: 6,
    name: 'Bajaj Auto',
    logo: '/assets/brands/bajaj.png',
    sampleImage: '/assets/vehicles/bajaj-chetak.jpg',
    category: 'Automaker',
    description: 'Iconic Indian brand with Chetak Electric leading the electric revolution in two-wheelers.',
    founded: 1945,
    headquarters: 'Pune, India',
    models: 2,
    marketCap: '₹2.1L Cr',
    rating: 4.4,
    popularModels: [
      { name: 'Chetak Electric', image: '/assets/vehicles/bajaj-chetak.jpg' },
      { name: 'Pulsar NS160', image: '/assets/vehicles/bajaj-pulsar.jpg' }
    ],
    priceRange: '₹1-1.2 Lakhs',
    chargingSupport: 'Home Charging',
    website: 'https://www.bajajauto.com/electric'
  },
  {
    id: 7,
    name: 'Hero Electric',
    logo: '/assets/brands/hero.png',
    sampleImage: '/assets/vehicles/hero-vida.jpg',
    category: 'Automaker',
    description: 'Premium electric scooters with advanced features and stylish design targeting youth market.',
    founded: 2012,
    headquarters: 'Delhi, India',
    models: 5,
    marketCap: '₹8,000 Cr',
    rating: 4.5,
    popularModels: [
      { name: 'Vida V1', image: '/assets/vehicles/hero-vida-v1.jpg' },
      { name: 'Vida V1 Plus', image: '/assets/vehicles/hero-vida-plus.jpg' },
      { name: 'Vida V1 Pro', image: '/assets/vehicles/hero-vida-pro.jpg' }
    ],
    priceRange: '₹1.1-1.5 Lakhs',
    chargingSupport: 'Hero Charging Network',
    website: 'https://www.heroelectric.com'
  },
  {
    id: 8,
    name: 'MG Motor India',
    logo: '/assets/brands/mg.png',
    sampleImage: '/assets/vehicles/mg-zs-ev.jpg',
    category: 'Automaker',
    description: 'British heritage with Indian manufacturing offering ZS EV, Hector, and Comet EV.',
    founded: 2017,
    headquarters: 'Gurgaon, India',
    models: 4,
    marketCap: '₹15,000 Cr',
    rating: 4.6,
    popularModels: [
      { name: 'MG ZS EV', image: '/assets/vehicles/mg-zs-ev.jpg' },
      { name: 'MG Hector', image: '/assets/vehicles/mg-hector.jpg' },
      { name: 'MG Comet EV', image: '/assets/vehicles/mg-comet-ev.jpg' }
    ],
    priceRange: '₹22-30 Lakhs',
    chargingSupport: 'MG Charge Stations',
    website: 'https://www.mgmotor.co.in'
  },
  {
    id: 9,
    name: 'Hyundai India',
    logo: '/assets/brands/hyundai.png',
    sampleImage: '/assets/vehicles/hyundai-kona-ev.jpg',
    category: 'Automaker',
    description: 'Global brand with strong Indian presence offering Kona Electric, Ioniq 5, and Venue EV.',
    founded: 1996,
    headquarters: 'Chennai, India',
    models: 4,
    marketCap: '₹45,000 Cr',
    rating: 4.7,
    popularModels: [
      { name: 'Kona Electric', image: '/assets/vehicles/hyundai-kona-ev.jpg' },
      { name: 'Ioniq 5', image: '/assets/vehicles/hyundai-ioniq5.jpg' },
      { name: 'Venue EV', image: '/assets/vehicles/hyundai-venue-ev.jpg' }
    ],
    priceRange: '₹23-45 Lakhs',
    chargingSupport: 'Hyundai Charging Network',
    website: 'https://www.hyundai.com/in'
  },
  {
    id: 10,
    name: 'Kia India',
    logo: '/assets/brands/kia.png',
    sampleImage: '/assets/vehicles/kia-ev6.jpg',
    category: 'Automaker',
    description: 'Korean automaker with stylish EV6 and upcoming EV9 models for Indian market.',
    founded: 1944,
    headquarters: 'Mumbai, India',
    models: 2,
    marketCap: '₹35,000 Cr',
    rating: 4.5,
    popularModels: [
      { name: 'Kia EV6', image: '/assets/vehicles/kia-ev6.jpg' },
      { name: 'Kia EV9', image: '/assets/vehicles/kia-ev9.jpg' }
    ],
    priceRange: '₹25-35 Lakhs',
    chargingSupport: 'Kia Charging Network',
    website: 'https://www.kia.com/in'
  },
  {
    id: 11,
    name: 'Stellantis India',
    logo: '/assets/brands/stellantis.png',
    sampleImage: '/assets/vehicles/jeep-meridian.jpg',
    category: 'Automaker',
    description: 'Global automotive giant with Citroën, Peugeot, Jeep, and Fiat EV brands in India.',
    founded: 2021,
    headquarters: 'Mumbai, India',
    models: 6,
    marketCap: '₹8.5L Cr',
    rating: 4.3,
    popularModels: [
      { name: 'Jeep Meridian', image: '/assets/vehicles/jeep-meridian.jpg' },
      { name: 'Citroën e-C3', image: '/assets/vehicles/citroen-e-c3.jpg' },
      { name: 'Peugeot e-208', image: '/assets/vehicles/peugeot-e-208.jpg' }
    ],
    priceRange: '₹30-50 Lakhs',
    chargingSupport: 'Multi-Brand Charging',
    website: 'https://www.stellantis.com/in'
  },
  {
    id: 12,
    name: 'Tesla India',
    logo: '/assets/brands/tesla.png',
    sampleImage: '/assets/vehicles/tesla-model-3.jpg',
    category: 'Automaker',
    description: 'Global EV leader with Model 3, Model Y, and upcoming Cybertruck in Indian market.',
    founded: 2003,
    headquarters: 'Austin, Texas, USA',
    models: 3,
    marketCap: '$800B',
    rating: 4.8,
    popularModels: [
      { name: 'Model 3', image: '/assets/vehicles/tesla-model-3.jpg' },
      { name: 'Model Y', image: '/assets/vehicles/tesla-model-y.jpg' },
      { name: 'Cybertruck', image: '/assets/vehicles/tesla-cybertruck.jpg' }
    ],
    priceRange: '₹50-70 Lakhs',
    chargingSupport: 'Tesla Supercharger Network',
    website: 'https://www.tesla.com'
  }
];

const BrandsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [filteredBrands, setFilteredBrands] = useState(EV_BRANDS);
  const [selectedBrand, setSelectedBrand] = useState<EVBrand | null>(null);
  const [showModelsModal, setShowModelsModal] = useState(false);

  const categories = [
    { id: 'all', name: 'All Brands', icon: Grid3X3 },
    { id: 'automaker', name: 'Automakers', icon: Award },
    { id: 'startup', name: 'Startups', icon: TrendingUp },
    { id: 'luxury', name: 'Luxury', icon: Star }
  ];

  useEffect(() => {
    let filtered = EV_BRANDS;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(brand => brand.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(brand => 
        brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brand.popularModels.some(model => model.name.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return b.rating - a.rating;
        case 'models':
          return b.models - a.models;
        case 'founded':
          return a.founded - b.founded;
        default:
          return 0;
      }
    });

    setFilteredBrands(filtered);
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0F3D2E] via-[#1a4d2e] to-[#1DB954] text-white py-24 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-40 h-40 bg-white/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon with Animation */}
            <div className="flex justify-center mb-8">
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl"
              >
                <Award className="w-10 h-10 text-white drop-shadow-lg" />
              </motion.div>
            </div>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              Explore <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8f5e8] to-[#1DB954] drop-shadow-lg">
                EV Brands
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed"
            >
              Discover leading electric vehicle manufacturers and startups in India. 
              <br className="hidden md:block" />
              Compare features, pricing, and charging support across all brands.
            </motion.p>
            
            {/* Stats Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Grid3X3 className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">15+ Brands</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <TrendingUp className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Market Leaders</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Zap className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">Fast Charging</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Users className="w-4 h-4 text-white" />
                <span className="text-sm font-medium text-white">10M+ Users</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands, models, or features..."
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-[#1DB954] transition-all bg-white text-gray-800 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-[#1DB954] appearance-none cursor-pointer transition-all bg-white text-gray-800"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
              <div className="relative">
                <Grid3X3 className="absolute left-3 top-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-[#1DB954] appearance-none cursor-pointer transition-all bg-white text-gray-800"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="rating">Rating (High-Low)</option>
                  <option value="models">Models (High-Low)</option>
                  <option value="founded">Founded (Old-New)</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Results</label>
              <div className="bg-[#1DB954]/10 border-2 border-[#1DB954]/20 rounded-xl px-4 py-3 flex items-center justify-center">
                <span className="text-[#1DB954] font-bold text-lg">{filteredBrands.length} Brands</span>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory !== 'all') && (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="font-semibold">Active filters:</span>
                  <div className="flex gap-2">
                    {searchQuery && (
                      <span className="bg-[#1DB954]/10 text-[#1DB954] px-3 py-1 rounded-full text-sm font-medium">
                        Search: "{searchQuery}"
                      </span>
                    )}
                    {selectedCategory !== 'all' && (
                      <span className="bg-[#1DB954]/10 text-[#1DB954] px-3 py-1 rounded-full text-sm font-medium">
                        {categories.find(c => c.id === selectedCategory)?.name}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  className="text-[#1DB954] hover:text-[#17a045] font-medium text-sm transition-colors"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Brands Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {filteredBrands.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No brands found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find the brand you're looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg border border-gray-100/70 hover:border-[#1DB954]/30 hover:shadow-[0_10px_40px_-15px_rgba(29,185,84,0.35)] transition-all duration-500 relative overflow-hidden"
              >
                {/* Brand Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={brand.sampleImage}
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full bg-gradient-to-br from-[#1DB954] to-[#0F3D2E] flex items-center justify-center text-white font-bold text-2xl';
                      fallback.textContent = brand.name.substring(0, 2).toUpperCase();
                      target.parentElement?.appendChild(fallback);
                    }}
                  />
                  <div className="absolute top-4 right-4 z-10 flex items-center px-3 py-1.5 bg-gradient-to-r from-[#1DB954] to-[#25d966] rounded-full">
                    <Star size={12} className="text-white mr-1.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">{brand.category}</span>
                  </div>
                </div>

                {/* Brand Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-12 h-12 object-contain bg-white rounded-lg p-2 border border-gray-200"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'w-12 h-12 bg-[#1DB954] rounded-lg flex items-center justify-center text-white font-bold text-sm';
                            fallback.textContent = brand.name.substring(0, 2).toUpperCase();
                            target.parentElement?.appendChild(fallback);
                          }}
                        />
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{brand.name}</h3>
                          <div className="flex items-center gap-2 text-white/90">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm">{brand.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-4">{brand.description}</p>
                  
                  {/* Brand Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Founded</p>
                      <p className="text-lg font-bold text-[#0F3D2E]">{brand.founded}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Models</p>
                      <p className="text-lg font-bold text-[#0F3D2E]">{brand.models}</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedBrand(brand);
                        setShowModelsModal(true);
                      }}
                      className="flex-1 px-4 py-2 bg-[#1DB954] text-white rounded-lg font-medium hover:bg-[#17a045] transition-colors"
                    >
                      View Models
                    </button>
                    <button
                      onClick={() => window.open(brand.website, '_blank')}
                      className="flex-1 px-4 py-2 border border-[#1DB954] text-[#1DB954] rounded-lg font-medium hover:bg-[#1DB954] hover:text-white transition-all"
                    >
                      Visit Website
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Models Modal */}
      {showModelsModal && selectedBrand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
          onClick={() => setShowModelsModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0F3D2E] to-[#1DB954] p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedBrand.logo}
                    alt={selectedBrand.name}
                    className="w-16 h-16 object-contain bg-white rounded-xl p-2"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-16 h-16 bg-white rounded-xl flex items-center justify-center text-[#0F3D2E] font-bold text-xl';
                      fallback.textContent = selectedBrand.name.substring(0, 2).toUpperCase();
                      target.parentElement?.appendChild(fallback);
                    }}
                  />
                  <div>
                    <h3 className="text-2xl font-bold">{selectedBrand.name}</h3>
                    <p className="text-white/90 text-sm">{selectedBrand.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModelsModal(false)}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {/* Brand Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Founded</p>
                  <p className="text-lg font-bold text-[#0F3D2E]">{selectedBrand.founded}</p>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Models</p>
                  <p className="text-lg font-bold text-[#0F3D2E]">{selectedBrand.models}</p>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rating</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-lg font-bold text-[#0F3D2E]">{selectedBrand.rating}</span>
                  </div>
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Market Cap</p>
                  <p className="text-lg font-bold text-[#1DB954]">{selectedBrand.marketCap}</p>
                </div>
              </div>

              {/* Popular Models */}
              <div className="mb-6">
                <h4 className="text-2xl font-black text-center mb-8">Popular Models</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                  {selectedBrand.popularModels.map((model, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: idx * 0.1,
                        ease: "easeOut"
                      }}
                      className="group"
                    >
                      {/* Card Container */}
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                        {/* Image Section */}
                        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
                          <img
                            src={model.image}
                            alt={model.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const fallback = document.createElement('div');
                              fallback.className = 'w-full h-full bg-gradient-to-br from-[#1DB954] to-[#0F3D2E] flex items-center justify-center text-white font-bold text-2xl';
                              fallback.textContent = model.name.substring(0, 2).toUpperCase();
                              target.parentElement?.appendChild(fallback);
                            }}
                          />
                          
                          {/* Model Badge */}
                          <div className="absolute top-3 left-3">
                            <div className="bg-white px-2 py-1 rounded-full shadow-md border border-gray-200">
                              <span className="text-xs font-bold text-gray-900">{model.name}</span>
                            </div>
                          </div>
                        </div>

                        {/* Content Section */}
                        <div className="p-4">
                          {/* Model Name */}
                          <h3 className="text-base font-bold text-gray-900 mb-3 text-center">{model.name}</h3>
                          
                          {/* Specifications */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                  <span className="text-green-600 font-bold text-xs">₹</span>
                                </div>
                                <span className="text-gray-600 font-medium text-xs">Price</span>
                              </div>
                              <span className="text-gray-900 font-bold text-xs">{selectedBrand.priceRange}</span>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-gray-100">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <span className="text-blue-600 font-bold text-xs">⚡</span>
                                </div>
                                <span className="text-gray-600 font-medium text-xs">Charging</span>
                              </div>
                              <span className="text-gray-900 font-bold text-xs">{selectedBrand.chargingSupport}</span>
                            </div>

                            <div className="flex items-center justify-between py-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                  <span className="text-purple-600 font-bold text-xs">🏷️</span>
                                </div>
                                <span className="text-gray-600 font-medium text-xs">Category</span>
                              </div>
                              <span className="text-gray-900 font-bold text-xs">{selectedBrand.category}</span>
                            </div>
                          </div>

                          {/* Action Button */}
                          <button className="w-full bg-gradient-to-r from-[#1DB954] to-[#17a045] text-white font-bold py-2 px-4 rounded-lg hover:from-[#17a045] hover:to-[#1DB954] transition-all duration-300 shadow-lg hover:shadow-xl text-xs">
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-[#0F3D2E] mb-3">Additional Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p><strong>Headquarters:</strong> {selectedBrand.headquarters}</p>
                    <p><strong>Founded:</strong> {selectedBrand.founded}</p>
                  </div>
                  <div>
                    <p><strong>Market Cap:</strong> {selectedBrand.marketCap}</p>
                    <p><strong>Total Models:</strong> {selectedBrand.models}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => window.open(selectedBrand.website, '_blank')}
                  className="flex-1 px-4 py-3 bg-[#1DB954] text-white rounded-lg font-medium hover:bg-[#17a045] transition-colors"
                >
                  Visit Official Website
                </button>
                <button
                  onClick={() => setShowModelsModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BrandsPage;
