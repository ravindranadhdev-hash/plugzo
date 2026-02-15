import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  MapPin, 
  Building2, 
  Phone, 
  Mail, 
  User, 
  Zap, 
  Upload, 
  X, 
  ArrowRight,
  Shield,
  Clock,
  Users,
  Award
} from 'lucide-react';

const EVStationRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    stationName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    chargerType: '',
    powerKw: '',
    chargers: [] as string[],
    listingType: 'basic',
    description: '',
    amenities: [] as string[],
    operatingHours: '',
    pricingModel: '',
    mediaFile: null as File | null
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const HYDERABAD_AREAS = [
    "HITEC City", "Gachibowli", "Madhapur", "Kondapur", "Kukatpally", 
    "Miyapur", "Ameerpet", "Begumpet", "Secunderabad", "Banjara Hills", "Jubilee Hills",
  ];

  const chargerOptions = [
    { id: 'type2', name: 'Type 2', power: '7.4-22 kW' },
    { id: 'ccs', name: 'CCS', power: '50-350 kW' },
    { id: 'chademo', name: 'CHAdeMO', power: '50-100 kW' },
    { id: 'bharat_ac', name: 'Bharat AC', power: '3.3-22 kW' },
    { id: 'bharat_dc', name: 'Bharat DC', power: '15-200 kW' },
  ];

  const amenityOptions = [
    'Restroom', 'WiFi', 'Café', 'Parking', 'Security', 'Lighting', 
    'Maintenance', 'Customer Support', 'Accessibility', 'Shop'
  ];

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

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, mediaFile: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setFormStatus('success');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormStatus('idle');
      setFormData({
        stationName: '',
        ownerName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        chargerType: '',
        powerKw: '',
        chargers: [],
        listingType: 'basic',
        description: '',
        amenities: [],
        operatingHours: '',
        pricingModel: '',
        mediaFile: null
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0F3D2E] to-[#1DB954] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Register Your EV Station</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Join India's fastest growing EV charging network. List your station and reach thousands of EV owners.
            </p>
            
            {/* Benefits */}
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">50K+ Users</h3>
                <p className="text-sm text-white/80">Active EV Drivers</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">500+ Stations</h3>
                <p className="text-sm text-white/80">Network Wide</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">24/7 Support</h3>
                <p className="text-sm text-white/80">Technical Assistance</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-1">Premium Tools</h3>
                <p className="text-sm text-white/80">Analytics & Insights</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 p-8 lg:p-12">
            {formStatus === 'success' ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-20 h-20 bg-[#1DB954]/10 text-[#1DB954] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-bold text-[#0F3D2E]">Station Registered Successfully!</h3>
                <p className="text-xl text-gray-600 max-w-md mx-auto">
                  Thank you for joining Plugzo! Our team will review your application and contact you within 24 hours.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-green-800 font-medium">
                    <strong>Next Steps:</strong> You'll receive a confirmation email with setup instructions and access to your station dashboard.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Station Information */}
                <div>
                  <h2 className="text-2xl font-bold text-[#0F3D2E] mb-6 flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-[#1DB954]" />
                    Station Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Station Name</label>
                      <input
                        type="text"
                        name="stationName"
                        value={formData.stationName}
                        onChange={handleInputChange}
                        placeholder="Display Name (e.g. Gachibowli Fast Charge)"
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Name</label>
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="business@example.com"
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          required
                          className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Complete Station Address"
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select City</option>
                        {HYDERABAD_AREAS.map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Telangana"
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">PIN Code</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="500032"
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Charging Information */}
                <div>
                  <h2 className="text-2xl font-bold text-[#0F3D2E] mb-6 flex items-center gap-3">
                    <Zap className="w-6 h-6 text-[#1DB954]" />
                    Charging Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Available Chargers</label>
                      <div className="space-y-3">
                        {chargerOptions.map((charger) => (
                          <label key={charger.id} className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.chargers.includes(charger.id)}
                              onChange={() => handleChargerToggle(charger.id)}
                              className="w-5 h-5 text-[#1DB954] rounded focus:ring-[#1DB954]"
                            />
                            <div>
                              <span className="font-medium text-gray-800">{charger.name}</span>
                              <span className="text-sm text-gray-500 ml-2">({charger.power})</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Listing Type</label>
                      <select
                        name="listingType"
                        value={formData.listingType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-all appearance-none cursor-pointer"
                      >
                        <option value="basic">Basic Listing - Free</option>
                        <option value="premium">Premium Listing - ₹999/month</option>
                        <option value="enterprise">Enterprise - Custom</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Operating Hours</label>
                      <input
                        type="text"
                        name="operatingHours"
                        value={formData.operatingHours}
                        onChange={handleInputChange}
                        placeholder="24/7 or 6:00 AM - 10:00 PM"
                        required
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h2 className="text-2xl font-bold text-[#0F3D2E] mb-6 flex items-center gap-3">
                    <Users className="w-6 h-6 text-[#1DB954]" />
                    Additional Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your station, location highlights, and any special features..."
                        rows={4}
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1DB954] focus:border-transparent transition-all resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Available Amenities</label>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {amenityOptions.map((amenity) => (
                          <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.amenities.includes(amenity)}
                              onChange={() => handleAmenityToggle(amenity)}
                              className="w-4 h-4 text-[#1DB954] rounded focus:ring-[#1DB954]"
                            />
                            <span className="text-sm text-gray-700">{amenity}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Station Photos</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="station-photo"
                        />
                        <label htmlFor="station-photo" className="flex items-center justify-center gap-2 w-full py-6 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-all">
                          <Upload size={20} className="text-gray-400" />
                          <span className="text-sm font-medium text-gray-600">
                            {formData.mediaFile ? formData.mediaFile.name : "Upload Station Photos"}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full py-5 bg-gradient-to-r from-[#1DB954] to-[#17a045] text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Registering Station...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Register Your Station
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EVStationRegistration;
