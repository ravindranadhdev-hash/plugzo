import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, Clock, MapPin, Users, Zap, Shield, CheckCircle, AlertCircle, Send, Headphones, Globe, Calendar } from 'lucide-react';

const Assistance247: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    issue: '',
    description: '',
    urgency: 'normal'
  });

  const supportChannels = [
    {
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      available: '24/7',
      waitTime: '< 2 minutes',
      icon: <Phone className="w-6 h-6" />,
      color: 'from-[#1DB954] to-[#17a045]',
      contact: '+91 8080-123-456',
      action: 'Call Now'
    },
    {
      title: 'Live Chat',
      description: 'Instant chat with support agents',
      available: '24/7',
      waitTime: '< 1 minute',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      contact: 'chat.plugzo.in',
      action: 'Start Chat'
    },
    {
      title: 'Email Support',
      description: 'Detailed email assistance',
      available: '24/7',
      waitTime: '< 4 hours',
      icon: <Mail className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      contact: 'support@plugzo.in',
      action: 'Send Email'
    }
  ];

  const commonIssues = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Charging Station Issues',
      description: 'Station not working, payment failures, connection problems',
      solution: 'Try another station or contact support immediately'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Payment & Billing',
      description: 'Charged incorrectly, refund requests, payment failures',
      solution: 'Check transaction history or contact billing support'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Account Problems',
      description: 'Login issues, profile updates, password reset',
      solution: 'Use password reset or contact account support'
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      title: 'App Technical Issues',
      description: 'App crashes, feature not working, sync problems',
      solution: 'Update app or clear cache, contact tech support'
    }
  ];

  const supportStats = [
    { label: 'Average Response Time', value: '< 2 minutes', icon: <Clock className="w-5 h-5" /> },
    { label: 'Customer Satisfaction', value: '98.5%', icon: <CheckCircle className="w-5 h-5" /> },
    { label: 'Issues Resolved Daily', value: '1,200+', icon: <Users className="w-5 h-5" /> },
    { label: 'Support Agents', value: '50+', icon: <Headphones className="w-5 h-5" /> }
  ];

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
              <Headphones className="w-10 h-10" />
            </div>
            <h1 className="text-5xl font-bold mb-6">24/7 Assistance</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Round-the-clock support for all your EV charging needs. We're here to help, anytime, anywhere.
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-lg font-medium">Available Now</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="text-lg font-medium">India Wide</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Support Channels */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#0F3D2E] text-center mb-12">Contact Support</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => (
              <motion.div
                key={channel.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className={`bg-gradient-to-r ${channel.color} p-6 text-white`}>
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                    {channel.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{channel.title}</h3>
                  <p className="text-white/90 mb-4">{channel.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Available: {channel.available}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>Wait Time: {channel.waitTime}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Contact</p>
                    <p className="font-semibold text-[#0F3D2E]">{channel.contact}</p>
                  </div>
                  <button className={`w-full bg-gradient-to-r ${channel.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}>
                    {channel.action}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-12"
        >
          <h3 className="text-2xl font-bold text-[#0F3D2E] text-center mb-8">Our Support Performance</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {supportStats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-12 h-12 bg-[#1DB954]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-[#1DB954]">{stat.icon}</div>
                </div>
                <p className="text-2xl font-bold text-[#0F3D2E] mb-2">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Common Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-[#0F3D2E] mb-8">Common Issues & Solutions</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {commonIssues.map((issue, index) => (
              <div key={issue.title} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1DB954]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-[#1DB954]">{issue.icon}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#0F3D2E] mb-2">{issue.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{issue.description}</p>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-800">
                        <strong>Quick Fix:</strong> {issue.solution}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Emergency Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-[#0F3D2E] to-[#1DB954] rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6">Emergency Support Request</h3>
          <p className="text-white/90 mb-8">
            For urgent issues that require immediate attention, submit an emergency request and we'll prioritize your case.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                placeholder="Your phone number"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Issue Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 h-24"
                placeholder="Describe your emergency issue..."
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-[#1DB954] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
              <Send className="w-5 h-5" />
              Submit Emergency Request
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors border border-white/30">
              Call Emergency Line: +91 8080-999-999
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Assistance247;
