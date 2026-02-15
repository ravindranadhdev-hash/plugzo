import React from 'react';
import { motion } from 'framer-motion';
import { Zap, MapPin, Users, Shield, Clock, Target, Battery, Globe, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0F3D2E] via-[#1a4d2e] to-[#1DB954] text-white py-24 px-4 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
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
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl"
              >
                <Zap size={40} className="text-white drop-shadow-lg" />
              </motion.div>
            </div>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              Why Choose <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8f5e8] to-[#1DB954] drop-shadow-lg">
                Plugzo?
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light"
            >
              We're not just another charging network. We're your dedicated EV charging partner, 
              <br className="hidden md:block" />
              focused exclusively on helping you find the nearest charging hubs when you need them most.
            </motion.p>
            
            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6 mt-10"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Trusted by 50K+ Users</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">500+ Stations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 space-y-20">
        
        {/* Our Concept Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DB954]/10 rounded-full border border-[#1DB954]/20">
            <Target className="w-5 h-5 text-[#1DB954]" />
            <span className="text-sm font-bold text-[#1DB954] uppercase tracking-wider">Our Concept</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-[#0F3D2E]">
            Focused on One Thing: <span className="text-[#1DB954]">Finding Charging Hubs</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-2xl text-left">
              <h3 className="text-xl font-bold text-[#0F3D2E] mb-4">What We Do</h3>
              <p className="text-gray-600 leading-relaxed">
                Plugzo is a specialized platform dedicated to helping EV owners locate charging stations quickly and efficiently. 
                We focus exclusively on charging hub discovery, ensuring you can find the nearest available charger without any distractions.
              </p>
            </div>
            <div className="bg-[#1DB954]/10 p-8 rounded-2xl text-left border border-[#1DB954]/20">
              <h3 className="text-xl font-bold text-[#1DB954] mb-4">What We Don't Do</h3>
              <p className="text-gray-700 leading-relaxed">
                Unlike other platforms that try to be everything for everyone, we don't sell cars, 
                don't offer financing, and don't distract you with unrelated services. 
                We focus 100% on what matters most: finding your next charge.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Why Trust Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-[#0F3D2E]">
              Why Trust <span className="text-[#1DB954]">Plugzo?</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're built by EV owners, for EV owners. Here's what makes us different:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#1DB954]/30 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-[#1DB954]/10 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-[#1DB954]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F3D2E] mb-3">Hyper-Local Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                We specialize in Hyderabad's EV infrastructure. Every station is verified, 
                every location is mapped accurately, and every update is real-time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#1DB954]/30 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-[#1DB954]/10 rounded-xl flex items-center justify-center mb-6">
                <Battery className="w-6 h-6 text-[#1DB954]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F3D2E] mb-3">EV-Only Expertise</h3>
              <p className="text-gray-600 leading-relaxed">
                Unlike general mapping apps, we understand EV charging. We know about connector types, 
                charging speeds, and what EV owners actually need.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-2xl border border-gray-100 hover:border-[#1DB954]/30 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-[#1DB954]/10 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-[#1DB954]" />
              </div>
              <h3 className="text-xl font-bold text-[#0F3D2E] mb-3">Real-Time Updates</h3>
              <p className="text-gray-600 leading-relaxed">
                Our platform updates in real-time. If a station is occupied or back online, 
                you'll know immediately. No more wasted trips to unavailable chargers.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Commitment Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#0F3D2E] to-[#1DB954] rounded-3xl p-12 text-white text-center space-y-8"
        >
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black">
            Our Commitment to EV Owners
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Users className="w-5 h-5" />
                Community-Driven
              </h3>
              <p className="text-white/90">
                We're built by EV owners who understand the real challenges of finding reliable charging. 
                Our platform reflects actual user needs and experiences.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Globe className="w-5 h-5" />
                Transparent & Honest
              </h3>
              <p className="text-white/90">
                No hidden agendas, no upselling, no distractions. We show you exactly what you need: 
                available charging stations near your location.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Award className="w-5 h-5" />
                Quality Over Quantity
              </h3>
              <p className="text-white/90">
                We'd rather have 100 verified, reliable stations than 1000 unverified ones. 
                Quality and accuracy are our top priorities.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Zap className="w-5 h-5" />
                Always Improving
              </h3>
              <p className="text-white/90">
                We continuously update our platform based on user feedback and evolving EV technology. 
                Your experience drives our innovation.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-black text-[#0F3D2E]">
            Join the <span className="text-[#1DB954]">Plugzo</span> Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the difference of a platform built exclusively for EV charging. 
            No distractions, no complications - just reliable charging hub discovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.hash = '#/'}
              className="px-8 py-4 bg-[#1DB954] text-white rounded-xl font-bold hover:bg-[#17a045] transition-colors"
            >
              Find Charging Stations
            </button>
            <button 
              onClick={() => window.location.hash = '#/vendor'}
              className="px-8 py-4 bg-white border-2 border-[#1DB954] text-[#1DB954] rounded-xl font-bold hover:bg-[#1DB954]/10 transition-colors"
            >
              List Your Station
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
