import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Users, Lightbulb, Award, TrendingUp, Calendar, MapPin, ExternalLink, Youtube, Star, ArrowRight, Zap, Globe, Target, Brain, Rocket, Clock, X } from 'lucide-react';
import { COLORS } from '../../constants';

// Interface for company owner data
interface CompanyOwner {
  id: string;
  name: string;
  company: string;
  role: string;
  image: string;
  bio: string;
  idea: string;
  journey: string;
  achievements: string[];
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  sharkTankVideo?: {
    videoId: string;
    title: string;
    description: string;
    season?: string;
    episode?: string;
    deal?: string;
  };
}

// Interface for blog articles
interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: 'startup' | 'innovation' | 'market' | 'technology';
  featured: boolean;
  image: string;
  tags: string[];
}

// Mock data for Indian EV company owners and their Shark Tank appearances
const INDIAN_EV_OWNERS: CompanyOwner[] = [
  {
    id: 'bhavish-aggerwal',
    name: 'Bhavish Aggarwal',
    company: 'Ola Electric',
    role: 'CEO & Founder',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Bhavish_Aggarwal_in_2017.jpg/640px-Bhavish_Aggarwal_in_2017.jpg',
    bio: 'Bhavish Aggarwal is the founder of Ola Electric, leading the electric mobility revolution in India with affordable and accessible EV solutions.',
    idea: 'To make electric mobility accessible to every Indian by creating affordable electric scooters with advanced technology and extensive charging infrastructure.',
    journey: 'After successfully building Ola Cabs, Bhavish pivoted to electric mobility in 2017, recognizing the massive opportunity in India\'s EV space. Ola Electric has become one of the largest EV manufacturers in India.',
    achievements: [
      'Built India\'s largest EV manufacturing plant',
      'Raised over $300M in funding',
      'Sold 100,000+ electric scooters',
      'Created extensive charging network'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/bhavishaggerwal',
      twitter: 'https://twitter.com/bhavishaggarwal',
      website: 'https://www.olaelectric.com'
    },
    sharkTankVideo: {
      videoId: 'dQw4w9WgXcQ', // Example video ID - replace with actual
      title: 'Ola Electric - Future of Indian Mobility',
      description: 'Bhavish Aggarwal presents Ola Electric\'s vision for transforming Indian transportation with electric scooters',
      season: 'Season 1',
      episode: 'Episode 5',
      deal: 'Secured funding from multiple Sharks'
    }
  },
  {
    id: 'swapnil-jain',
    name: 'Swapnil Jain',
    company: 'Ather Energy',
    role: 'CEO & Co-founder',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Swapnil_Jain_Ather.jpg/640px-Swapnil_Jain_Ather.jpg',
    bio: 'Swapnil Jain co-founded Ather Energy with a vision to create premium electric scooters with cutting-edge technology and superior performance.',
    idea: 'To build premium electric scooters that don\'t compromise on performance, design, or technology, setting new standards in the EV industry.',
    journey: 'IIT-Madras graduates Swapnil Jain and Mehta started Ather in 2013 with a focus on R&D and building India\'s first smart electric scooter. The company has pioneered several innovations in the EV space.',
    achievements: [
      'Pioneered connected scooter technology',
      'Built proprietary battery technology',
      'Expanded to 50+ cities',
      'Raised over $100M in funding'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/swapniljain',
      website: 'https://www.atherenergy.com'
    },
    sharkTankVideo: {
      videoId: 'abc123def', // Example video ID
      title: 'Ather Energy - Premium Electric Mobility',
      description: 'Swapnil Jain showcases Ather\'s premium electric scooters and their vision for the future of urban mobility',
      season: 'Season 2',
      episode: 'Episode 8',
      deal: 'Strategic investment from Sharks'
    }
  },
  {
    id: 'hemant-bavle',
    name: 'Hemant Bavle',
    company: 'Revolt Motors',
    role: 'Founder & CEO',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Hemant_Bavle_Revolt.jpg/640px-Hemant_Bavle_Revolt.jpg',
    bio: 'Hemant Bavle founded Revolt Motors to revolutionize the electric motorcycle segment in India with AI-powered smart bikes.',
    idea: 'To create India\'s first AI-enabled electric motorcycles with swappable battery technology, making electric mobility more convenient and accessible.',
    journey: 'An automotive enthusiast with experience in engineering, Hemant started Revolt in 2017 to address the gap in the electric motorcycle market. The company introduced innovative features like AI and battery swapping.',
    achievements: [
      'Launched India\'s first AI electric motorcycle',
      'Introduced battery swapping technology',
      'Built strong dealer network',
      'Expanded to international markets'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/hemantbavle',
      website: 'https://www.revoltmotors.com'
    },
    sharkTankVideo: {
      videoId: 'xyz789abc', // Example video ID
      title: 'Revolt Motors - AI-Powered Electric Motorcycles',
      description: 'Hemant Bavle presents Revolt\'s AI-enabled electric motorcycles and innovative battery swapping technology',
      season: 'Season 3',
      episode: 'Episode 12',
      deal: 'Partnership with Sharks for expansion'
    }
  },
  {
    id: 'suhas-rajpal',
    name: 'Suhas Rajpal',
    company: 'Simple Energy',
    role: 'CEO & Founder',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Suhas_Rajpal_Simple.jpg/640px-Suhas_Rajpal_Simple.jpg',
    bio: 'Suhas Rajpal founded Simple Energy with a mission to create high-performance electric scooters with exceptional range and design.',
    idea: 'To build electric scooters that offer superior range, performance, and design while maintaining affordability for the mass market.',
    journey: 'With a background in engineering and passion for sustainable mobility, Suhas started Simple Energy in 2015. The company focused on R&D to create products that would set new benchmarks in the EV industry.',
    achievements: [
      'Developed high-range electric scooters',
      'Innovative battery management system',
      'Strong focus on R&D and innovation',
      'Expanding manufacturing capabilities'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/suhasrajpal',
      website: 'https://www.simpleenergy.in'
    },
    sharkTankVideo: {
      videoId: 'def456ghi', // Example video ID
      title: 'Simple Energy - High-Performance Electric Scooters',
      description: 'Suhas Rajpal showcases Simple Energy\'s high-performance electric scooters with exceptional range',
      season: 'Season 2',
      episode: 'Episode 15',
      deal: 'Investment for manufacturing expansion'
    }
  }
];

// Mock data for blog articles
const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'ev-revolution-2024',
    title: 'India\'s EV Revolution: How Local Innovators Are Changing the Game',
    excerpt: 'Discover how Indian entrepreneurs are revolutionizing the electric vehicle landscape with innovative solutions tailored for local needs.',
    content: `India's electric vehicle market is experiencing unprecedented growth, driven by local innovators who understand the unique challenges and opportunities in the Indian context. From affordable electric scooters to premium electric motorcycles, Indian companies are leading the charge in sustainable mobility.

The success stories of companies like Ola Electric, Ather Energy, Revolt Motors, and Simple Energy demonstrate how Indian entrepreneurs are not just participating in the global EV revolution but actively shaping it with innovations suited to local conditions.

These companies have introduced features like swappable batteries, AI-powered connectivity, and extensive charging networks that address specific Indian needs such as traffic conditions, climate challenges, and affordability concerns.`,
    author: 'EV Editorial Team',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'startup',
    featured: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Electric_scooters_in_India.jpg/640px-Electric_scooters_in_India.jpg',
    tags: ['EV Revolution', 'Indian Startups', 'Innovation', 'Sustainability']
  },
  {
    id: 'shark-tank-ev-success',
    title: 'Shark Tank India: EV Startups That Secured Big Deals',
    excerpt: 'Explore the most successful EV startups from Shark Tank India and how the show helped accelerate their growth and market presence.',
    content: `Shark Tank India has become a platform for EV startups to showcase their innovations and secure funding from some of the country's most successful investors. The show has not only provided financial backing but also mentorship and market access that has helped these startups scale rapidly.

Companies that appeared on Shark Tank India have reported significant growth in sales, brand recognition, and investor interest. The exposure from the show has helped them build trust with customers and partners, while the Sharks' expertise has guided their strategic decisions.

From battery technology to vehicle design, these startups are pushing the boundaries of what's possible in electric mobility, making India a hub for EV innovation.`,
    author: 'Startup Analyst',
    date: '2024-02-20',
    readTime: '6 min read',
    category: 'startup',
    featured: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Shark_Tank_India_Set.jpg/640px-Shark_Tank_India_Set.jpg',
    tags: ['Shark Tank', 'Funding', 'Startups', 'Investment']
  },
  {
    id: 'battery-technology-innovation',
    title: 'Battery Technology Breakthroughs: Indian Companies Leading the Charge',
    excerpt: 'Deep dive into the innovative battery technologies being developed by Indian companies and their impact on the EV ecosystem.',
    content: `Battery technology is at the heart of the electric vehicle revolution, and Indian companies are making significant strides in developing innovative solutions that address local challenges. From swappable batteries to advanced battery management systems, these innovations are making EVs more practical and affordable for Indian consumers.

Companies like Revolt Motors have pioneered battery swapping technology that addresses range anxiety and charging infrastructure challenges. Ather Energy has developed sophisticated battery management systems that optimize performance and longevity. Simple Energy is working on high-density batteries that offer superior range.

These innovations are not just technical achievements but practical solutions that address real-world problems faced by EV users in India, from traffic congestion to limited charging infrastructure.`,
    author: 'Technology Expert',
    date: '2024-03-10',
    readTime: '10 min read',
    category: 'technology',
    featured: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Electric_vehicle_battery.jpg/640px-Electric_vehicle_battery.jpg',
    tags: ['Battery Technology', 'Innovation', 'R&D', 'Engineering']
  },
  {
    id: 'ev-market-analysis-2024',
    title: 'EV Market Analysis 2024: Trends, Challenges, and Opportunities',
    excerpt: 'Comprehensive analysis of the Indian EV market in 2024, including growth trends, regulatory changes, and emerging opportunities.',
    content: `The Indian EV market is experiencing exponential growth in 2024, driven by supportive government policies, increasing consumer awareness, and technological advancements. The market has evolved from early adopters to mainstream acceptance, with electric two-wheelers leading the charge.

Key trends include the rise of premium EV segments, expansion of charging infrastructure, and increasing competition among manufacturers. The government's push for electric mobility through subsidies and incentives has accelerated adoption, while private investment is fueling innovation and expansion.

However, challenges remain, including charging infrastructure gaps, battery technology limitations, and consumer concerns about range and reliability. Companies that can address these challenges while delivering value to customers are well-positioned for success in this rapidly evolving market.`,
    author: 'Market Analyst',
    date: '2024-04-05',
    readTime: '12 min read',
    category: 'market',
    featured: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/EV_market_growth_chart.jpg/640px-EV_market_growth_chart.jpg',
    tags: ['Market Analysis', 'Growth Trends', 'Industry Report', '2024 Outlook']
  }
];

const IndiaEVPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'owners' | 'articles'>('owners');
  const [selectedOwner, setSelectedOwner] = useState<CompanyOwner | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

  const categoryColors = {
    startup: 'bg-blue-100 text-blue-800',
    innovation: 'bg-purple-100 text-purple-800',
    market: 'bg-green-100 text-green-800',
    technology: 'bg-orange-100 text-orange-800'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0F3D2E] via-[#1a4d2e] to-[#1DB954] text-white py-24 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-40 h-40 bg-white/15 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
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
                className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl"
              >
                <Globe className="w-12 h-12 text-white drop-shadow-lg" />
              </motion.div>
            </div>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              India on <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8f5e8] to-[#1DB954] drop-shadow-lg">
                EV
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Discover the stories of visionary Indian entrepreneurs revolutionizing electric mobility, 
              <br className="hidden md:block" />
              their innovative ideas, and their journey from Shark Tank to success.
            </motion.p>
            
            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">50+ Founders</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Shark Tank Alumni</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Rocket className="w-4 h-4" />
                <span className="text-sm font-medium">₹5000+ Cr Funding</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('owners')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'owners'
                  ? 'border-[#1DB954] text-[#1DB954]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Users size={16} />
              Company Owners
            </button>
            <button
              onClick={() => setActiveTab('articles')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                activeTab === 'articles'
                  ? 'border-[#1DB954] text-[#1DB954]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Lightbulb size={16} />
              Articles
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'owners' ? (
            <motion.div
              key="owners"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Company Owners Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                {INDIAN_EV_OWNERS.map((owner, index) => (
                  <motion.div
                    key={owner.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#1DB954]/30 hover:shadow-lg transition-all"
                  >
                    <div className="p-6 space-y-6">
                      {/* Owner Header */}
                      <div className="flex items-start gap-4">
                        <img
                          src={owner.image}
                          alt={owner.name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#0F3D2E]">{owner.name}</h3>
                          <p className="text-sm text-gray-500">{owner.role}</p>
                          <p className="text-sm font-medium text-[#1DB954]">{owner.company}</p>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-gray-600 text-sm leading-relaxed">{owner.bio}</p>

                      {/* Core Idea */}
                      <div className="bg-gradient-to-r from-[#1DB954]/10 to-[#25d966]/10 rounded-xl p-4 border border-[#1DB954]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Brain className="w-5 h-5 text-[#1DB954]" />
                          <h4 className="font-bold text-[#0F3D2E]">Core Idea</h4>
                        </div>
                        <p className="text-sm text-gray-700">{owner.idea}</p>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="font-bold text-[#0F3D2E] mb-3">Key Achievements</h4>
                        <div className="space-y-2">
                          {owner.achievements.slice(0, 3).map((achievement, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <Award className="w-4 h-4 text-[#1DB954]" />
                              <span className="text-sm text-gray-600">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shark Tank Video */}
                      {owner.sharkTankVideo && (
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Youtube className="w-5 h-5 text-red-600" />
                            <h4 className="font-bold text-[#0F3D2E]">Shark Tank Appearance</h4>
                          </div>
                          <div className="bg-gray-100 rounded-xl overflow-hidden">
                            <div className="aspect-video bg-gray-200 flex items-center justify-center">
                              <button
                                onClick={() => setSelectedOwner(owner)}
                                className="flex items-center gap-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                              >
                                <Play size={16} />
                                Watch on YouTube
                              </button>
                            </div>
                            <div className="p-3">
                              <p className="text-sm font-medium text-gray-800">{owner.sharkTankVideo.title}</p>
                              <p className="text-xs text-gray-500 mt-1">{owner.sharkTankVideo.description}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedOwner(owner)}
                          className="flex-1 bg-[#1DB954] text-white py-2 rounded-lg font-medium hover:bg-[#17a045] transition-colors"
                        >
                          View Full Profile
                        </button>
                        {owner.socialLinks.website && (
                          <a
                            href={owner.socialLinks.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="articles"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Featured Article */}
              {BLOG_ARTICLES.filter(article => article.featured).map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#1DB954]/30 hover:shadow-lg transition-all"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[article.category]}`}>
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar size={12} />
                          <span className="text-xs">{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock size={12} />
                          <span className="text-xs">{article.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-[#0F3D2E] mb-3">{article.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">By {article.author}</span>
                        </div>
                        <button
                          onClick={() => setSelectedArticle(article)}
                          className="flex items-center gap-2 text-[#1DB954] hover:text-[#17a045] font-medium transition-colors"
                        >
                          Read More <ArrowRight size={16} />
                        </button>
                      </div>
                      <div className="flex gap-2 mt-4">
                        {article.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Other Articles Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {BLOG_ARTICLES.filter(article => !article.featured).map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl p-6 border border-gray-100 hover:border-[#1DB954]/30 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[article.category]}`}>
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar size={12} />
                        <span className="text-xs">{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-[#0F3D2E] mb-2">{article.title}</h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{article.readTime}</span>
                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="text-[#1DB954] hover:text-[#17a045] font-medium text-sm transition-colors"
                      >
                        Read More
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Owner Detail Modal */}
      <AnimatePresence>
        {selectedOwner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOwner(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-48 bg-gradient-to-br from-[#1DB954]/10 to-[#25d966]/10 p-6">
                <button
                  onClick={() => setSelectedOwner(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
                <div className="flex items-center gap-6">
                  <img
                    src={selectedOwner.image}
                    alt={selectedOwner.name}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  <div>
                    <h2 className="text-3xl font-bold text-[#0F3D2E]">{selectedOwner.name}</h2>
                    <p className="text-gray-600">{selectedOwner.role}</p>
                    <p className="text-lg font-medium text-[#1DB954]">{selectedOwner.company}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {/* Shark Tank Video */}
                {selectedOwner.sharkTankVideo && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-[#0F3D2E] mb-4">Shark Tank Appearance</h3>
                    <div className="bg-gray-100 rounded-xl overflow-hidden">
                      <div className="aspect-video bg-gray-200">
                        <iframe
                          src={`https://www.youtube.com/embed/${selectedOwner.sharkTankVideo.videoId}`}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 mb-2">{selectedOwner.sharkTankVideo.title}</h4>
                        <p className="text-gray-600 text-sm mb-3">{selectedOwner.sharkTankVideo.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{selectedOwner.sharkTankVideo.season}</span>
                          <span>•</span>
                          <span>{selectedOwner.sharkTankVideo.episode}</span>
                          {selectedOwner.sharkTankVideo.deal && (
                            <>
                              <span>•</span>
                              <span className="text-green-600 font-medium">{selectedOwner.sharkTankVideo.deal}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Journey */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#0F3D2E] mb-4">Entrepreneurial Journey</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedOwner.journey}</p>
                </div>

                {/* Core Idea */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#0F3D2E] mb-4">Vision & Idea</h3>
                  <div className="bg-gradient-to-r from-[#1DB954]/10 to-[#25d966]/10 rounded-xl p-6 border border-[#1DB954]/20">
                    <p className="text-gray-700">{selectedOwner.idea}</p>
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#0F3D2E] mb-4">Key Achievements</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {selectedOwner.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Award className="w-5 h-5 text-[#1DB954]" />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="text-xl font-bold text-[#0F3D2E] mb-4">Connect</h3>
                  <div className="flex gap-4">
                    {selectedOwner.socialLinks.linkedin && (
                      <a
                        href={selectedOwner.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {selectedOwner.socialLinks.twitter && (
                      <a
                        href={selectedOwner.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {selectedOwner.socialLinks.website && (
                      <a
                        href={selectedOwner.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#17a045] transition-colors"
                      >
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-64 bg-gradient-to-br from-[#1DB954]/10 to-[#25d966]/10">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[selectedArticle.category]}`}>
                      {selectedArticle.category}
                    </span>
                    <div className="flex items-center gap-1 text-white/80">
                      <Calendar size={12} />
                      <span className="text-xs">{new Date(selectedArticle.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/80">
                      <Clock size={12} />
                      <span className="text-xs">{selectedArticle.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white">{selectedArticle.title}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600">By {selectedArticle.author}</span>
                  </div>
                  <div className="flex gap-2 mb-6">
                    {selectedArticle.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IndiaEVPage;
