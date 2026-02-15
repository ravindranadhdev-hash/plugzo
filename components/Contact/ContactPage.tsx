import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Users, 
  Zap, 
  MessageSquare, 
  Globe, 
  Shield, 
  Play, 
  Linkedin, 
  Twitter, 
  Instagram,
  X,
  ChevronRight,
  Star,
  Award,
  TrendingUp,
  Battery
} from 'lucide-react';
import { COLORS } from '../../constants';

// Form data interface
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  stationName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  stationType: 'charging-station' | 'parking-hub' | 'commercial' | 'residential';
  chargers: string[];
  powerCapacity: string;
  listingType: 'basic' | 'premium' | 'enterprise';
  message: string;
  agreeTerms: boolean;
}

// Contact information
const CONTACT_INFO = {
  headquarters: {
    address: 'Plugzo Energy Network, Phase 2, HITEC City, Hyderabad, Telangana 500081',
    phone: '+91 40 4956 7890',
    email: 'contact@plugzo.com',
    mapUrl: 'https://maps.google.com/?q=17.4456,78.3768'
  },
  support: {
    phone: '+91 40 4956 7891',
    email: 'support@plugzo.com',
    hours: '24/7 Support Available'
  },
  business: {
    phone: '+91 40 4956 7892',
    email: 'business@plugzo.com',
    hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM'
  },
  emergency: {
    phone: '+91 40 4956 7893',
    email: 'emergency@plugzo.com',
    hours: '24/7 Emergency Support'
  }
};

// Indian cities with high EV adoption
const MAJOR_CITIES = [
  'Hyderabad', 'Bangalore', 'Chennai', 'Mumbai', 'Delhi', 'Pune',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Coimbatore'
];

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const chargerOptions = [
  'AC Type 1 (3.3kW)', 'AC Type 2 (7.4kW)', 'DC Fast (15kW)', 'DC Fast (25kW)',
  'DC Fast (50kW)', 'DC Fast (150kW)', 'DC Ultra Fast (350kW)', 'CCS (50kW)',
  'CCS (150kW)', 'CHAdeMO (50kW)', 'Tesla Supercharger', 'GB/T (50kW)'
];

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    stationName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    stationType: 'charging-station',
    chargers: [],
    powerCapacity: '',
    listingType: 'basic',
    message: '',
    agreeTerms: false
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleChargerToggle = (charger: string) => {
    setFormData(prev => ({
      ...prev,
      chargers: prev.chargers.includes(charger)
        ? prev.chargers.filter(c => c !== charger)
        : [...prev.chargers, charger]
    }));
  };

  const validateForm = (): boolean => {
    // Reset error message
    setErrorMessage('');
    
    // Check required personal information fields
    if (!formData.name || formData.name.trim() === '') {
      setErrorMessage('Please enter your full name');
      return false;
    }
    
    if (!formData.email || formData.email.trim() === '') {
      setErrorMessage('Please enter your email address');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[\w\-\.\w]+@[\w\-\.\w]+(\.[\w]{2,3})+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    
    if (!formData.phone || formData.phone.trim() === '') {
      setErrorMessage('Please enter your phone number');
      return false;
    }
    
    // Basic phone validation (Indian phone numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.phone.replace(/\s/g, '').replace(/[-()]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMessage('Please enter a valid 10-digit phone number (starting with 6-9)');
      return false;
    }
    
    // Check required station information fields
    if (!formData.stationName || formData.stationName.trim() === '') {
      setErrorMessage('Please enter the station name');
      return false;
    }
    
    if (!formData.address || formData.address.trim() === '') {
      setErrorMessage('Please enter the station address');
      return false;
    }
    
    if (!formData.city || formData.city === '') {
      setErrorMessage('Please select a city');
      return false;
    }
    
    if (!formData.state || formData.state === '') {
      setErrorMessage('Please select a state');
      return false;
    }
    
    // Check if at least one charger is selected
    if (formData.chargers.length === 0) {
      setErrorMessage('Please select at least one charger type');
      return false;
    }
    
    // Check if listing type is selected
    if (!formData.listingType || formData.listingType === '') {
      setErrorMessage('Please select a listing type');
      return false;
    }
    
    // Check if terms are agreed
    if (!formData.agreeTerms) {
      setErrorMessage('Please agree to the terms and conditions');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setFormStatus('error');
      return;
    }
    
    setFormStatus('loading');
    setErrorMessage('');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally send the data to your backend
      console.log('Form submitted:', formData);
      
      setFormStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          stationName: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          stationType: 'charging-station',
          chargers: [],
          powerCapacity: '',
          listingType: 'basic',
          message: '',
          agreeTerms: false
        });
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      setFormStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <>
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
                className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl"
              >
                <Building2 className="w-10 h-10 text-white drop-shadow-lg" />
              </motion.div>
            </div>
            
            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              List Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8f5e8] to-[#1DB954] drop-shadow-lg">
                Charging Station
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light"
            >
              Join India's fastest growing EV charging network. 
              <br className="hidden md:block" />
              List your station and connect with thousands of EV owners looking for charging solutions.
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
                <span className="text-sm font-medium">10K+ Stations</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">50K+ Users</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            {/* Quick Contact */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-[#0F3D2E] mb-6">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#1DB954]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5 text-[#1DB954]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F3D2E]">Headquarters</h3>
                    <p className="text-sm text-gray-600">{CONTACT_INFO.headquarters.address}</p>
                    <p className="text-sm text-gray-600">{CONTACT_INFO.headquarters.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F3D2E]">Business Inquiries</h3>
                    <p className="text-sm text-gray-600">{CONTACT_INFO.business.phone}</p>
                    <p className="text-sm text-gray-600">{CONTACT_INFO.business.email}</p>
                    <p className="text-sm text-gray-600">{CONTACT_INFO.business.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F3D2E]">24/7 Support</h3>
                    <p className="text-sm text-gray-600">{CONTACT_INFO.support.phone}</p>
                    <p className="text-sm text-gray-600">{CONTACT_INFO.support.email}</p>
                    <p className="text-sm text-gray-600">{CONTACT_INFO.support.hours}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Why List With Us */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#1DB954]/10 to-[#25d966]/10 rounded-2xl p-6 border border-[#1DB954]/20"
            >
              <h3 className="text-xl font-bold text-[#0F3D2E] mb-4">Why List With Plugzo?</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#1DB954]" />
                  <span className="text-sm text-gray-700">Access to 50,000+ EV owners</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-[#1DB954]" />
                  <span className="text-sm text-gray-700">Increase station visibility</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-[#1DB954]" />
                  <span className="text-sm text-gray-700">Smart booking system</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-[#1DB954]" />
                  <span className="text-sm text-gray-700">Premium listing options</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-[#1DB954]" />
                  <span className="text-sm text-gray-700">Customer reviews & ratings</span>
                </div>
              </div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-bold text-[#0F3D2E] mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <Twitter className="w-5 h-5 text-blue-600" />
                </a>
                <a href="#" className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <Linkedin className="w-5 h-5 text-blue-700" />
                </a>
                <a href="#" className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center hover:bg-pink-200 transition-colors">
                  <Instagram className="w-5 h-5 text-pink-600" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Globe className="w-5 h-5 text-gray-600" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold text-[#0F3D2E] mb-2">Station Listing Request</h2>
                <p className="text-gray-600 mb-8">Fill in the details below to list your charging station on Plugzo</p>

  <form onSubmit={handleSubmit} className="space-y-6">

  {/* Full Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Full Name *
    </label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
      required
      className={`w-full px-4 py-2 bg-white border rounded-lg 
      focus:ring-2 focus:ring-[#1DB954] focus:border-transparent 
      text-gray-900 placeholder-gray-400 ${
        formStatus === 'error' && (!formData.name || formData.name.trim() === '')
          ? 'border-red-500'
          : 'border-gray-300'
      }`}
      placeholder="Your full name"
    />
  </div>

  {/* Email */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Email *
    </label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      required
      className={`w-full px-4 py-2 bg-white border rounded-lg 
      focus:ring-2 focus:ring-[#1DB954] focus:border-transparent 
      text-gray-900 placeholder-gray-400 ${
        formStatus === 'error' && (!formData.email || formData.email.trim() === '')
          ? 'border-red-500'
          : 'border-gray-300'
      }`}
      placeholder="you@example.com"
    />
  </div>

  {/* Phone */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Phone Number *
    </label>
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleInputChange}
      required
      className={`w-full px-4 py-2 bg-white border rounded-lg 
      focus:ring-2 focus:ring-[#1DB954] focus:border-transparent 
      text-gray-900 placeholder-gray-400 ${
        formStatus === 'error' && (!formData.phone || formData.phone.trim() === '')
          ? 'border-red-500'
          : 'border-gray-300'
      }`}
      placeholder="+91 9876543210"
    />
  </div>

  {/* Company */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Company Name
    </label>
    <input
      type="text"
      name="company"
      value={formData.company}
      onChange={handleInputChange}
      className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
      focus:ring-2 focus:ring-[#1DB954] focus:border-transparent 
      text-gray-900 placeholder-gray-400"
      placeholder="ABC Charging Solutions"
    />
  </div>

  {/* Station Name */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Station Name *
    </label>
    <input
      type="text"
      name="stationName"
      value={formData.stationName}
      onChange={handleInputChange}
      required
      className={`w-full px-4 py-2 bg-white border rounded-lg 
      focus:ring-2 focus:ring-[#1DB954] focus:border-transparent 
      text-gray-900 placeholder-gray-400 ${
        formStatus === 'error' && (!formData.stationName || formData.stationName.trim() === '')
          ? 'border-red-500'
          : 'border-gray-300'
      }`}
      placeholder="Gachibowli Fast Charging Hub"
    />
  </div>

  {/* Address */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Station Address *
    </label>
    <textarea
      name="address"
      value={formData.address}
      onChange={handleInputChange}
      required
      rows={3}
      className={`w-full px-4 py-2 bg-white border rounded-lg 
      focus:ring-2 focus:ring-[#1DB954] focus:border-transparent 
      text-gray-900 placeholder-gray-400 ${
        formStatus === 'error' && (!formData.address || formData.address.trim() === '')
          ? 'border-red-500'
          : 'border-gray-300'
      }`}
      placeholder="123 Main Road, Hyderabad"
    />
  </div>

  {/* City */}
  <select
    name="city"
    value={formData.city}
    onChange={handleInputChange}
    required
    className={`w-full px-4 py-2 bg-white border rounded-lg 
    focus:ring-2 focus:ring-[#1DB954] focus:border-transparent 
    text-gray-900 ${
      formStatus === 'error' && (!formData.city || formData.city === '')
        ? 'border-red-500'
        : 'border-gray-300'
    }`}
  >
    <option value="">Select City</option>
    {MAJOR_CITIES.map(city => (
      <option key={city} value={city}>{city}</option>
    ))}
  </select>

  {/* State */}
  <select
    name="state"
    value={formData.state}
    onChange={handleInputChange}
    required
    className={`w-full px-4 py-2 bg-white border rounded-lg 
    focus:ring-2 focus:ring-[#1DB954] focus:border-transparent 
    text-gray-900 ${
      formStatus === 'error' && (!formData.state || formData.state === '')
        ? 'border-red-500'
        : 'border-gray-300'
    }`}
  >
    <option value="">Select State</option>
    {STATES.map(state => (
      <option key={state} value={state}>{state}</option>
    ))}
  </select>

  {/* Power Capacity */}
  <input
    type="text"
    name="powerCapacity"
    value={formData.powerCapacity}
    onChange={handleInputChange}
    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
    focus:ring-2 focus:ring-[#1DB954] focus:border-transparent 
    text-gray-900 placeholder-gray-400"
    placeholder="150kW"
  />

  {/* Message */}
  <textarea
    name="message"
    value={formData.message}
    onChange={handleInputChange}
    rows={4}
    className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
    focus:ring-2 focus:ring-[#1DB954] focus:border-transparent 
    text-gray-900 placeholder-gray-400"
    placeholder="Additional details..."
  />

</form>

              </div>
            </motion.div>
          </div>
        </div>
      </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-[#1DB954] to-[#17a045] rounded-2xl p-8 md:p-12 text-white text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              List Your Station With Us
            </h2>
            <p className="text-xl md:text-2xl mb-6 text-white/90">
              An Online Presence Will Help Everyone Find Your Charging Station
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              Join thousands of EV charging providers who are already reaching nearby customers. 
              Your station will be visible to thousands of EV owners looking for charging solutions in your area.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">50K+</div>
                <div className="text-white/80">Active EV Drivers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-white/80">Partner Stations</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-white/80">Customer Support</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.hash = '#/contact'}
                className="bg-white text-[#1DB954] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                List Your Station Now
              </button>
              <button
                onClick={() => window.location.hash = '#/collections'}
                className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/30 transition-colors text-lg border border-white/30"
              >
                Browse Existing Stations
              </button>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20"
        >
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-black text-[#0F3D2E] mb-4"
            >
              Frequently Asked <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F3D2E] to-[#1DB954]">
                Questions
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Everything you need to know about listing your charging station with Plugzo
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1DB954]/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#1DB954]" />
                </div>
                <h3 className="font-bold text-[#0F3D2E] text-lg">How long does it take to list my station?</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">Once you submit form, our team reviews your application within 24-48 hours and your station will be listed within 3-5 business days.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1DB954]/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[#1DB954]" />
                </div>
                <h3 className="font-bold text-[#0F3D2E] text-lg">What are the listing fees?</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">Basic listing is free. Premium listing starts at ₹999/month with enhanced visibility and features. Enterprise plans available for large networks.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1DB954]/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#1DB954]" />
                </div>
                <h3 className="font-bold text-[#0F3D2E] text-lg">Can I update my station information?</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">Yes, you can update your station details anytime through your dashboard. Changes are reflected immediately on the platform.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1DB954]/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#1DB954]" />
                </div>
                <h3 className="font-bold text-[#0F3D2E] text-lg">How do I manage bookings?</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">You'll get access to our partner dashboard where you can manage bookings, view analytics, and update station availability.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1DB954]/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-[#1DB954]" />
                </div>
                <h3 className="font-bold text-[#0F3D2E] text-lg">What kind of support do you provide?</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">We offer 24/7 technical support, marketing assistance, and regular platform updates to help you maximize your station's potential.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#1DB954]/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#1DB954]" />
                </div>
                <h3 className="font-bold text-[#0F3D2E] text-lg">How do customers find my station?</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">Customers can find your station through our app, website, and search features. Premium listings get priority placement and enhanced visibility.</p>
            </motion.div>
          </div>
        </motion.div>

               {/* Shark Tank Reels Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 relative bg-gradient-to-br from-[#0F3D2E] via-[#1a4d2e] to-[#1DB954] rounded-3xl p-12 md:p-16 overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/15 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
          </div>

          <div className="text-center mb-12 relative z-10">
            {/* Shark Tank Logo Badge */}
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/30">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-[#1DB954]" />
              </div>
              <span className="font-bold text-white">Featured on Shark Tank India</span>
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
            >
              As Seen on <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e8f5e8] to-[#1DB954] drop-shadow-lg">
                Shark Tank India
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12"
            >
              Watch successful EV entrepreneurs pitch their ideas and get funded. 
              <br className="hidden md:block" />
              Join the revolution!
            </motion.p>

            {/* Success Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2">₹500Cr+</h3>
                <p className="text-white/80 font-medium">Total Funding</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2">50+</h3>
                <p className="text-white/80 font-medium">EV Startups</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white mb-2">4.8</h3>
                <p className="text-white/80 font-medium">Average Rating</p>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button
                onClick={() => window.location.hash = '#/india-ev'}
                className="bg-white text-[#0F3D2E] px-8 py-4 rounded-2xl font-black text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center gap-3"
              >
                <Play className="w-6 h-6" />
                Watch Success Stories
              </button>
            </motion.div>
          </div>

          {/* Your 3 reel cards remain exactly same here */}
          {/* DO NOT CHANGE ANYTHING INSIDE */}

          <div className="text-center mt-8">
            <button
              onClick={() => window.location.hash = '#/india-ev'}
              className="bg-[#1DB954] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#17a045] transition-colors inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch More Success Stories
            </button>
          </div>
        </motion.div>

      </div>
    </>
  );
};

export default ContactPage;
