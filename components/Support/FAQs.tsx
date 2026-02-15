import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search, HelpCircle, Zap, Shield, Users, MessageSquare, Clock, Star, ThumbsUp, Filter } from 'lucide-react';

const FAQs: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All FAQs', icon: <HelpCircle className="w-4 h-4" />, color: 'bg-[#1DB954]' },
    { id: 'getting-started', name: 'Getting Started', icon: <Zap className="w-4 h-4" />, color: 'bg-blue-500' },
    { id: 'charging', name: 'Charging', icon: <Zap className="w-4 h-4" />, color: 'bg-green-500' },
    { id: 'payment', name: 'Payment & Billing', icon: <Shield className="w-4 h-4" />, color: 'bg-purple-500' },
    { id: 'account', name: 'Account', icon: <Users className="w-4 h-4" />, color: 'bg-orange-500' },
    { id: 'technical', name: 'Technical', icon: <MessageSquare className="w-4 h-4" />, color: 'bg-red-500' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I create a Plugzo account?',
      answer: 'Creating a Plugzo account is simple! Download our app from Google Play or App Store, click "Sign Up", enter your email and phone number, verify your details, and you\'re ready to start charging. The whole process takes less than 2 minutes.',
      helpful: 234,
      views: 15420,
      featured: true
    },
    {
      id: 2,
      category: 'charging',
      question: 'How do I find charging stations near me?',
      answer: 'Open the Plugzo app and allow location access. The map will automatically show nearby charging stations. You can also search by location, filter by charger type, and check real-time availability. Tap on any station to see details, pricing, and start navigation.',
      helpful: 189,
      views: 12350,
      featured: true
    },
    {
      id: 3,
      category: 'payment',
      question: 'What payment methods are accepted?',
      answer: 'We accept multiple payment methods including UPI, credit/debit cards, net banking, digital wallets like PayTM and Google Pay, and some stations also support RFID cards. Payment is processed securely through our encrypted payment gateway.',
      helpful: 167,
      views: 9870,
      featured: false
    },
    {
      id: 4,
      category: 'charging',
      question: 'What should I do if a charging station is not working?',
      answer: 'If a station is not working, first check if it\'s marked as "Out of Service" in the app. If it shows as available but doesn\'t work, report the issue immediately through the app. We\'ll notify the station operator and help you find an alternative station nearby.',
      helpful: 145,
      views: 11200,
      featured: false
    },
    {
      id: 5,
      category: 'account',
      question: 'How do I reset my password?',
      answer: 'To reset your password, click "Forgot Password" on the login screen. Enter your registered email or phone number, and we\'ll send a reset link. Click the link, create a new password, and you\'ll be able to access your account immediately.',
      helpful: 198,
      views: 8900,
      featured: false
    },
    {
      id: 6,
      category: 'payment',
      question: 'How are charging fees calculated?',
      answer: 'Charging fees consist of three components: energy consumption (per kWh), time spent at station (per minute), and any service fees. The exact rate varies by station and is displayed clearly before you start charging. Premium members enjoy discounted rates.',
      helpful: 156,
      views: 10500,
      featured: false
    },
    {
      id: 7,
      category: 'technical',
      question: 'Why is the app not showing nearby stations?',
      answer: 'Ensure location services are enabled for the Plugzo app. Check that you have an active internet connection. Try refreshing the app or restarting it. If issues persist, clear the app cache or reinstall the app.',
      helpful: 134,
      views: 7800,
      featured: false
    },
    {
      id: 8,
      category: 'getting-started',
      question: 'What types of EV chargers are available?',
      answer: 'Plugzo supports all major charger types: AC Type 1, AC Type 2, CCS (Combined Charging System), CHAdeMO, and Bharat AC/DC standards. Each station listing clearly shows available charger types and power output (kW).',
      helpful: 178,
      views: 9200,
      featured: false
    },
    {
      id: 9,
      category: 'charging',
      question: 'Can I reserve a charging slot in advance?',
      answer: 'Yes! Many stations support advance booking through the app. You can reserve a time slot up to 24 hours in advance. Reserved slots are held for 15 minutes after your scheduled time. A small reservation fee may apply.',
      helpful: 123,
      views: 6700,
      featured: false
    },
    {
      id: 10,
      category: 'payment',
      question: 'How do I get a refund for a failed charging session?',
      answer: 'If a charging session fails due to technical issues, you\'re automatically eligible for a full refund. The refund is processed within 24-48 hours to your original payment method. You can also request manual refunds through the app\'s support section.',
      helpful: 167,
      views: 8900,
      featured: false
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

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
            <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Find quick answers to common questions about Plugzo's EV charging services.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
              />
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-8 text-white/90">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{faqs.length}</span>
                <span>FAQs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{faqs.reduce((sum, faq) => sum + faq.helpful, 0).toLocaleString()}</span>
                <span>Helpful Votes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{Math.round(faqs.reduce((sum, faq) => sum + faq.views, 0) / 1000)}K</span>
                <span>Total Views</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#0F3D2E]" />
            <h2 className="text-lg font-semibold text-[#0F3D2E]">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[#1DB954] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${selectedCategory === category.id ? 'bg-white/20' : category.color}`}>
                  {category.icon}
                </div>
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQs List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                faq.featured ? 'ring-2 ring-[#1DB954]/20' : ''
              }`}
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-[#1DB954]/20"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-2">
                      {faq.featured && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-xs font-semibold text-yellow-600">Featured</span>
                        </div>
                      )}
                      <h3 className="font-semibold text-[#0F3D2E] text-lg">{faq.question}</h3>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        <span>{faq.helpful}</span>
                      </div>
                      <div>{faq.views.toLocaleString()} views</div>
                    </div>
                    <div className="flex-shrink-0">
                      {openItems.includes(faq.id) ? (
                        <ChevronUp className="w-5 h-5 text-[#1DB954]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openItems.includes(faq.id) ? 'auto' : 0,
                  opacity: openItems.includes(faq.id) ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    <div className="mt-4 flex items-center gap-4">
                      <button className="flex items-center gap-2 text-sm text-[#1DB954] hover:text-[#17a045] transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        Helpful
                      </button>
                      <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        Still need help?
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No FAQs Found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>

      {/* Still Need Help Section */}
      <div className="bg-gradient-to-r from-[#0F3D2E] to-[#1DB954] py-16 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Still Have Questions?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is here to help 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#1DB954] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Contact Support
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30">
                Browse Help Center
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
