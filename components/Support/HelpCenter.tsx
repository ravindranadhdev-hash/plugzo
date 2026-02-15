import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, HelpCircle, Phone, Mail, MessageSquare, Clock, Zap, Shield, Users, ChevronRight, Star, ArrowRight } from 'lucide-react';

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: <HelpCircle className="w-5 h-5" />, color: 'bg-[#1DB954]' },
    { id: 'charging', name: 'Charging Issues', icon: <Zap className="w-5 h-5" />, color: 'bg-blue-500' },
    { id: 'payment', name: 'Payment & Billing', icon: <Shield className="w-5 h-5" />, color: 'bg-purple-500' },
    { id: 'account', name: 'Account Management', icon: <Users className="w-5 h-5" />, color: 'bg-orange-500' },
    { id: 'technical', name: 'Technical Support', icon: <MessageSquare className="w-5 h-5" />, color: 'bg-red-500' }
  ];

  const helpArticles = [
    {
      id: 1,
      category: 'charging',
      title: 'How to start a charging session',
      description: 'Learn the step-by-step process to begin charging your EV at any Plugzo station.',
      views: 15420,
      helpful: 89,
      featured: true
    },
    {
      id: 2,
      category: 'payment',
      title: 'Payment methods and refunds',
      description: 'Understand our payment options, refund policies, and billing procedures.',
      views: 12350,
      helpful: 92,
      featured: true
    },
    {
      id: 3,
      category: 'account',
      title: 'Managing your account settings',
      description: 'Update your profile, change preferences, and manage your subscription.',
      views: 9870,
      helpful: 87,
      featured: false
    },
    {
      id: 4,
      category: 'charging',
      title: 'Charging station not working',
      description: 'What to do when you encounter a faulty or unavailable charging station.',
      views: 11200,
      helpful: 91,
      featured: false
    },
    {
      id: 5,
      category: 'technical',
      title: 'App troubleshooting guide',
      description: 'Common app issues and how to resolve them quickly.',
      views: 8900,
      helpful: 85,
      featured: false
    },
    {
      id: 6,
      category: 'payment',
      title: 'Understanding charging rates',
      description: 'How our pricing works and what factors affect charging costs.',
      views: 10500,
      helpful: 88,
      featured: false
    }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0F3D2E] to-[#1DB954] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold mb-6">Help Center</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Find answers to your questions, learn about our services, and get the support you need.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#1DB954] rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#0F3D2E] mb-2">Call Support</h3>
            <p className="text-gray-600 mb-4">Get immediate help from our support team</p>
            <div className="flex items-center gap-2 text-[#1DB954] font-medium">
              <span>+91 8080-123-456</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#0F3D2E] rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#0F3D2E] mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Send us detailed questions and issues</p>
            <div className="flex items-center gap-2 text-[#1DB954] font-medium">
              <span>support@plugzo.in</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-[#0F3D2E] mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with our support team instantly</p>
            <div className="flex items-center gap-2 text-[#1DB954] font-medium">
              <span>Available 24/7</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[#0F3D2E] mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${selectedCategory === category.id ? 'bg-white/20' : category.color}`}>
                  {category.icon}
                </div>
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Help Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-[#0F3D2E] mb-6">
            {selectedCategory === 'all' ? 'All Help Articles' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer ${
                  article.featured ? 'ring-2 ring-[#1DB954]/20' : ''
                }`}
              >
                {article.featured && (
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-xs font-semibold text-yellow-600">Featured</span>
                  </div>
                )}
                <h3 className="font-semibold text-[#0F3D2E] mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{article.views.toLocaleString()} views</span>
                  <span>{article.helpful}% helpful</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Still Need Help Section */}
      <div className="bg-gradient-to-r from-[#0F3D2E] to-[#1DB954] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#1DB954] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Start Live Chat
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Call Support
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
