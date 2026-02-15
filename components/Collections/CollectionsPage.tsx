import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  Bike, 
  Zap, 
  Battery, 
  Gauge, 
  Star, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Filter, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  X, 
  Plus, 
  Minus, 
  Check, 
  AlertCircle,
  Users,
  Award,
  Clock
} from 'lucide-react';
import { COLORS } from '../../constants';

// Vehicle interface
interface Vehicle {
  id: string;
  name: string;
  manufacturer: string;
  type: 'car' | 'bike' | 'scooter';
  price: number;
  priceDisplay: string;
  range: number;
  rangeDisplay: string;
  topSpeed: number;
  topSpeedDisplay: string;
  batteryCapacity: number;
  batteryCapacityDisplay: string;
  rating: number;
  reviewCount: number;
  sales: number;
  salesDisplay: string;
  trend: 'up' | 'down' | 'stable';
  trendPercentage: number;
  image: string;
  launchDate: string;
  features: string[];
  chargingTime: string;
  warranty: string;
  available: boolean;
}

// Mock vehicle data
const VEHICLES: Vehicle[] = [
  // Cars
  {
    id: 'tata-nexon-ev',
    name: 'Nexon EV',
    manufacturer: 'Tata Motors',
    type: 'car',
    price: 1899000,
    priceDisplay: '₹18.99 Lakhs',
    range: 453,
    rangeDisplay: '453 km',
    topSpeed: 140,
    topSpeedDisplay: '140 km/h',
    batteryCapacity: 40.5,
    batteryCapacityDisplay: '40.5 kWh',
    rating: 4.6,
    reviewCount: 2543,
    sales: 35000,
    salesDisplay: '35,000+',
    trend: 'up',
    trendPercentage: 45,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tata_Nexon_EV_front.jpg/640px-Tata_Nexon_EV_front.jpg',
    launchDate: '2023-09',
    features: ['Fast Charging', 'Connected Car', 'Regenerative Braking'],
    chargingTime: '60 min (0-80%)',
    warranty: '8 years / 1.6L km'
  },
  {
    id: 'tata-punch-ev',
    name: 'Punch EV',
    manufacturer: 'Tata Motors',
    type: 'car',
    price: 1249000,
    priceDisplay: '₹12.49 Lakhs',
    range: 421,
    rangeDisplay: '421 km',
    topSpeed: 140,
    topSpeedDisplay: '140 km/h',
    batteryCapacity: 35,
    batteryCapacityDisplay: '35 kWh',
    rating: 4.5,
    reviewCount: 1856,
    sales: 15000,
    salesDisplay: '15,000+',
    trend: 'up',
    trendPercentage: 120,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Tata_Punch_EV.jpg/640px-Tata_Punch_EV.jpg',
    launchDate: '2024-01',
    features: ['IP67 Rating', 'Connected Features', 'Multiple Drive Modes'],
    chargingTime: '56 min (0-80%)',
    warranty: '8 years / 1.6L km'
  },
  {
    id: 'byd-seal',
    name: 'Seal',
    manufacturer: 'BYD',
    type: 'car',
    price: 4100000,
    priceDisplay: '₹41 Lakhs',
    range: 700,
    rangeDisplay: '700 km',
    topSpeed: 180,
    topSpeedDisplay: '180 km/h',
    batteryCapacity: 82.5,
    batteryCapacityDisplay: '82.5 kWh',
    rating: 4.7,
    reviewCount: 892,
    sales: 8000,
    salesDisplay: '8,000+',
    trend: 'up',
    trendPercentage: 95,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/BYD_Seal.jpg/640px-BYD_Seal.jpg',
    launchDate: '2024-03',
    features: ['Blade Battery', 'DiPilot ADAS', 'Luxury Interior'],
    chargingTime: '30 min (0-80%)',
    warranty: '8 years / 1.6L km'
  },
  {
    id: 'mg-zs-ev',
    name: 'ZS EV',
    manufacturer: 'MG Motors',
    type: 'car',
    price: 2299000,
    priceDisplay: '₹22.99 Lakhs',
    range: 461,
    rangeDisplay: '461 km',
    topSpeed: 140,
    topSpeedDisplay: '140 km/h',
    batteryCapacity: 50.3,
    batteryCapacityDisplay: '50.3 kWh',
    rating: 4.4,
    reviewCount: 1234,
    sales: 12000,
    salesDisplay: '12,000+',
    trend: 'up',
    trendPercentage: 28,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/MG_ZS_EV.jpg/640px-MG_ZS_EV.jpg',
    launchDate: '2023-06',
    features: ['AI Assistant', 'Wireless Charging', 'Panoramic Sunroof'],
    chargingTime: '45 min (0-80%)',
    warranty: '8 years / 1.6L km'
  },
  // Scooters
  {
    id: 'ola-s1-pro',
    name: 'S1 Pro',
    manufacturer: 'Ola Electric',
    type: 'scooter',
    price: 145000,
    priceDisplay: '₹1.45 Lakhs',
    range: 195,
    rangeDisplay: '195 km',
    topSpeed: 115,
    topSpeedDisplay: '115 km/h',
    batteryCapacity: 4,
    batteryCapacityDisplay: '4 kWh',
    rating: 4.2,
    reviewCount: 3421,
    sales: 28000,
    salesDisplay: '28,000+',
    trend: 'up',
    trendPercentage: 65,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Ola_S1_Pro.jpg/640px-Ola_S1_Pro.jpg',
    launchDate: '2023-08',
    features: ['App Connected', 'Geofencing', 'Cruise Control'],
    chargingTime: '4.5 hours (0-100%)',
    warranty: '3 years / 30,000 km'
  },
  {
    id: 'ather-450x',
    name: '450X',
    manufacturer: 'Ather Energy',
    type: 'scooter',
    price: 145000,
    priceDisplay: '₹1.45 Lakhs',
    range: 150,
    rangeDisplay: '150 km',
    topSpeed: 100,
    topSpeedDisplay: '100 km/h',
    batteryCapacity: 3.7,
    batteryCapacityDisplay: '3.7 kWh',
    rating: 4.6,
    reviewCount: 2890,
    sales: 18000,
    salesDisplay: '18,000+',
    trend: 'up',
    trendPercentage: 52,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Ather_450X.jpg/640px-Ather_450X.jpg',
    launchDate: '2023-05',
    features: ['Smart Dashboard', 'Fast Charging', 'Bluetooth Connectivity'],
    chargingTime: '5.5 hours (0-100%)',
    warranty: '3 years / 40,000 km'
  },
  {
    id: 'tvs-iqube',
    name: 'iQube',
    manufacturer: 'TVS Motors',
    type: 'scooter',
    price: 125000,
    priceDisplay: '₹1.25 Lakhs',
    range: 150,
    rangeDisplay: '150 km',
    topSpeed: 78,
    topSpeedDisplay: '78 km/h',
    batteryCapacity: 4.4,
    batteryCapacityDisplay: '4.4 kWh',
    rating: 4.3,
    reviewCount: 1567,
    sales: 15000,
    salesDisplay: '15,000+',
    trend: 'up',
    trendPercentage: 85,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/TVS_iQube.jpg/640px-TVS_iQube.jpg',
    launchDate: '2023-07',
    features: ['Smart Connectivity', 'Multiple Ride Modes', 'GPS Navigation'],
    chargingTime: '4 hours (0-100%)',
    warranty: '3 years / 30,000 km'
  },
  // Bikes
  {
    id: 'revolt-rv400',
    name: 'RV400',
    manufacturer: 'Revolt Motors',
    type: 'bike',
    price: 138000,
    priceDisplay: '₹1.38 Lakhs',
    range: 150,
    rangeDisplay: '150 km',
    topSpeed: 85,
    topSpeedDisplay: '85 km/h',
    batteryCapacity: 4.4,
    batteryCapacityDisplay: '4.4 kWh',
    rating: 4.1,
    reviewCount: 987,
    sales: 8000,
    salesDisplay: '8,000+',
    trend: 'up',
    trendPercentage: 35,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Revolt_RV400.jpg/640px-Revolt_RV400.jpg',
    launchDate: '2022-06',
    features: ['AI Enabled', 'Battery Swapping', 'Cloud Connectivity'],
    chargingTime: '4 hours (0-100%)',
    warranty: '3 years / 30,000 km'
  },
  {
    id: 'tork-kratos',
    name: 'Kratos',
    manufacturer: 'Tork Motors',
    type: 'bike',
    price: 165000,
    priceDisplay: '₹1.65 Lakhs',
    range: 180,
    rangeDisplay: '180 km',
    topSpeed: 105,
    topSpeedDisplay: '105 km/h',
    batteryCapacity: 6,
    batteryCapacityDisplay: '6 kWh',
    rating: 4.0,
    reviewCount: 456,
    sales: 3000,
    salesDisplay: '3,000+',
    trend: 'up',
    trendPercentage: 180,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Tork_Kratos.jpg/640px-Tork_Kratos.jpg',
    launchDate: '2023-09',
    features: ['Axial Flux Motor', 'Fast Charging', 'Mobile App'],
    chargingTime: '3 hours (0-100%)',
    warranty: '3 years / 30,000 km'
  }
];

type SortOption = 'price' | 'rating' | 'trend' | 'battery' | 'sales' | 'range' | 'speed';
type SortDirection = 'asc' | 'desc';
type FilterType = 'all' | 'car' | 'bike' | 'scooter';

const CollectionsPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [compareVehicles, setCompareVehicles] = useState<Vehicle[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Filter and sort vehicles
  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = VEHICLES;

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(v => v.type === selectedType);
    }

    // Sort vehicles
    const sorted = [...filtered].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'trend':
          aValue = a.trendPercentage;
          bValue = b.trendPercentage;
          break;
        case 'battery':
          aValue = a.batteryCapacity;
          bValue = b.batteryCapacity;
          break;
        case 'sales':
          aValue = a.sales;
          bValue = b.sales;
          break;
        case 'range':
          aValue = a.range;
          bValue = b.range;
          break;
        case 'speed':
          aValue = a.topSpeed;
          bValue = b.topSpeed;
          break;
        default:
          aValue = a.rating;
          bValue = b.rating;
      }

      if (sortDirection === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return sorted;
  }, [selectedType, sortBy, sortDirection]);

  const handleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortDirection('desc');
    }
  };

  const addToCompare = (vehicle: Vehicle) => {
    if (compareVehicles.length < 3 && !compareVehicles.find(v => v.id === vehicle.id)) {
      setCompareVehicles([...compareVehicles, vehicle]);
    }
  };

  const removeFromCompare = (vehicleId: string) => {
    setCompareVehicles(compareVehicles.filter(v => v.id !== vehicleId));
  };

  const getSortIcon = (option: SortOption) => {
    if (sortBy !== option) {
      return <ArrowUpDown size={16} className="text-gray-400" />;
    }
    return sortDirection === 'asc' ? <ArrowUp size={16} className="text-[#1DB954]" /> : <ArrowDown size={16} className="text-[#1DB954]" />;
  };

  const getComparisonValue = (vehicle: Vehicle, field: keyof Vehicle) => {
    switch (field) {
      case 'price':
        return vehicle.priceDisplay;
      case 'range':
        return vehicle.rangeDisplay;
      case 'topSpeed':
        return vehicle.topSpeedDisplay;
      case 'batteryCapacity':
        return vehicle.batteryCapacityDisplay;
      case 'rating':
        return vehicle.rating.toFixed(1);
      case 'sales':
        return vehicle.salesDisplay;
      default:
        return '';
    }
  };

  const getComparisonColor = (vehicle: Vehicle, field: keyof Vehicle, isHigherBetter: boolean = true) => {
    if (compareVehicles.length !== 2) return '';
    
    const values = compareVehicles.map(v => {
      switch (field) {
        case 'price':
          return v.price;
        case 'range':
          return v.range;
        case 'topSpeed':
          return v.topSpeed;
        case 'batteryCapacity':
          return v.batteryCapacity;
        case 'rating':
          return v.rating;
        case 'sales':
          return v.sales;
        default:
          return 0;
      }
    });

    const vehicleValue = values[compareVehicles.findIndex(v => v.id === vehicle.id)];
    const otherValue = values[compareVehicles.findIndex(v => v.id !== vehicle.id)];

    if (isHigherBetter) {
      return vehicleValue > otherValue ? 'text-green-600 font-bold' : vehicleValue < otherValue ? 'text-red-600' : '';
    } else {
      return vehicleValue < otherValue ? 'text-green-600 font-bold' : vehicleValue > otherValue ? 'text-red-600' : '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0F3D2E] via-[#1a4d2e] to-[#1DB954] text-white py-24 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/15 rounded-full blur-2xl"></div>
          <div className="absolute top-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
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
                <Car className="w-10 h-10 text-white drop-shadow-lg" />
              </motion.div>
            </div>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              EV <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8f5e8] to-[#1DB954] drop-shadow-lg">
                Collections
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Explore our comprehensive collection of electric vehicles with advanced sorting, 
              <br className="hidden md:block" />
              filtering, and comparison tools to find your perfect EV.
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">200+ Vehicles</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Top Brands</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Battery className="w-4 h-4" />
                <span className="text-sm font-medium">Smart Compare</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Type Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedType === 'all'
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Vehicles
              </button>
              <button
                onClick={() => setSelectedType('car')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedType === 'car'
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Car size={16} />
                Cars
              </button>
              <button
                onClick={() => setSelectedType('scooter')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedType === 'scooter'
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bike size={16} />
                Scooters
              </button>
              <button
                onClick={() => setSelectedType('bike')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  selectedType === 'bike'
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Zap size={16} />
                Bikes
              </button>
            </div>

            {/* Sorting Options */}
            <div className="flex gap-2">
              <button
                onClick={() => handleSort('price')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  sortBy === 'price'
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <DollarSign size={16} />
                Price
                {getSortIcon('price')}
              </button>
              <button
                onClick={() => handleSort('rating')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  sortBy === 'rating'
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Star size={16} />
                Rating
                {getSortIcon('rating')}
              </button>
              <button
                onClick={() => handleSort('trend')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  sortBy === 'trend'
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <TrendingUp size={16} />
                Trend
                {getSortIcon('trend')}
              </button>
              <button
                onClick={() => handleSort('battery')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  sortBy === 'battery'
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Battery size={16} />
                Battery
                {getSortIcon('battery')}
              </button>
            </div>

            {/* Compare Button */}
            <button
              onClick={() => setShowCompareModal(true)}
              disabled={compareVehicles.length === 0}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                compareVehicles.length > 0
                  ? 'bg-orange-500 text-white hover:bg-orange-600'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Filter size={16} />
              Compare ({compareVehicles.length})
            </button>
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedVehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#1DB954]/30 hover:shadow-lg transition-all"
            >
              {/* Vehicle Image */}
              <div className="relative h-48 bg-gray-100">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                    vehicle.trend === 'up' ? 'bg-green-100 text-green-700' :
                    vehicle.trend === 'down' ? 'bg-red-100 text-red-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {vehicle.trend === 'up' ? '+' : vehicle.trend === 'down' ? '-' : ''}{vehicle.trendPercentage}%
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <div className="px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-bold">
                    {vehicle.type.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#0F3D2E]">{vehicle.name}</h3>
                  <p className="text-sm text-gray-500">{vehicle.manufacturer}</p>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium ml-1">{vehicle.rating}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-sm text-gray-500">({vehicle.reviewCount} reviews)</span>
                </div>

                {/* Key Specs */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="font-medium text-[#1DB954]">{vehicle.priceDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-gray-400" />
                    <span>{vehicle.rangeDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-gray-400" />
                    <span>{vehicle.topSpeedDisplay}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-gray-400" />
                    <span>{vehicle.batteryCapacityDisplay}</span>
                  </div>
                </div>

                {/* Sales */}
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Sales: {vehicle.salesDisplay}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCompare(vehicle)}
                    disabled={compareVehicles.length >= 3 || compareVehicles.find(v => v.id === vehicle.id)}
                    className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                      compareVehicles.find(v => v.id === vehicle.id)
                        ? 'bg-green-100 text-green-700'
                        : compareVehicles.length >= 3
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-[#1DB954] text-white hover:bg-[#17a045]'
                    }`}
                  >
                    {compareVehicles.find(v => v.id === vehicle.id) ? 'Added' : 'Compare'}
                  </button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compare Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowCompareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#0F3D2E]">Compare Vehicles</h2>
                  <button
                    onClick={() => setShowCompareModal(false)}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>
                <p className="text-gray-600 mt-2">
                  Select up to 3 vehicles to compare side by side
                </p>
              </div>

              {/* Comparison Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {compareVehicles.length === 0 ? (
                  <div className="text-center py-12">
                    <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No vehicles selected for comparison</p>
                    <button
                      onClick={() => setShowCompareModal(false)}
                      className="mt-4 px-6 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#17a045] transition-colors"
                    >
                      Browse Vehicles
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Vehicle Headers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {compareVehicles.map((vehicle) => (
                        <div key={vehicle.id} className="text-center">
                          <img
                            src={vehicle.image}
                            alt={vehicle.name}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-bold text-[#0F3D2E]">{vehicle.name}</h3>
                          <p className="text-sm text-gray-500">{vehicle.manufacturer}</p>
                          <button
                            onClick={() => removeFromCompare(vehicle.id)}
                            className="mt-2 text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      {compareVehicles.length < 3 && (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                          <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500 text-sm">Add another vehicle</p>
                        </div>
                      )}
                    </div>

                    {/* Comparison Table */}
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <tbody>
                          <tr className="border-b">
                            <td className="py-3 font-medium text-gray-700">Price</td>
                            {compareVehicles.map((vehicle) => (
                              <td key={`price-${vehicle.id}`} className={`py-3 text-center ${getComparisonColor(vehicle, 'price', false)}`}>
                                {vehicle.priceDisplay}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 font-medium text-gray-700">Range</td>
                            {compareVehicles.map((vehicle) => (
                              <td key={`range-${vehicle.id}`} className={`py-3 text-center ${getComparisonColor(vehicle, 'range', true)}`}>
                                {vehicle.rangeDisplay}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 font-medium text-gray-700">Top Speed</td>
                            {compareVehicles.map((vehicle) => (
                              <td key={`speed-${vehicle.id}`} className={`py-3 text-center ${getComparisonColor(vehicle, 'topSpeed', true)}`}>
                                {vehicle.topSpeedDisplay}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 font-medium text-gray-700">Battery Capacity</td>
                            {compareVehicles.map((vehicle) => (
                              <td key={`battery-${vehicle.id}`} className={`py-3 text-center ${getComparisonColor(vehicle, 'batteryCapacity', true)}`}>
                                {vehicle.batteryCapacityDisplay}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 font-medium text-gray-700">Rating</td>
                            {compareVehicles.map((vehicle) => (
                              <td key={`rating-${vehicle.id}`} className={`py-3 text-center ${getComparisonColor(vehicle, 'rating', true)}`}>
                                <div className="flex items-center justify-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span>{vehicle.rating}</span>
                                </div>
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 font-medium text-gray-700">Sales</td>
                            {compareVehicles.map((vehicle) => (
                              <td key={`sales-${vehicle.id}`} className={`py-3 text-center ${getComparisonColor(vehicle, 'sales', true)}`}>
                                {vehicle.salesDisplay}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 font-medium text-gray-700">Charging Time</td>
                            {compareVehicles.map((vehicle) => (
                              <td key={`charging-${vehicle.id}`} className="py-3 text-center text-gray-700">
                                {vehicle.chargingTime}
                              </td>
                            ))}
                          </tr>
                          <tr className="border-b">
                            <td className="py-3 font-medium text-gray-700">Warranty</td>
                            {compareVehicles.map((vehicle) => (
                              <td key={`warranty-${vehicle.id}`} className="py-3 text-center text-gray-700">
                                {vehicle.warranty}
                              </td>
                            ))}
                          </tr>
                          <tr>
                            <td className="py-3 font-medium text-gray-700">Features</td>
                            {compareVehicles.map((vehicle) => (
                              <td key={`features-${vehicle.id}`} className="py-3">
                                <div className="space-y-1">
                                  {vehicle.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-1 text-sm text-gray-600">
                                      <Check className="w-3 h-3 text-green-500" />
                                      <span>{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-100 rounded"></div>
                        <span className="text-gray-600">Better Value</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-100 rounded"></div>
                        <span className="text-gray-600">Lower Value</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollectionsPage;
