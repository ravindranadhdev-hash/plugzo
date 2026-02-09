import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2, Loader2, ChevronDown, Phone, Mail, User, MapPin } from 'lucide-react';
import { COLORS, HYDERABAD_AREAS } from '../../constants';

const VendorBanner: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    locality: '',
    whatsappUpdates: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-[48px] bg-[#0F3D2E] shadow-2xl border border-white/5">
      <div className="flex flex-col lg:flex-row min-h-[700px]">
        
        {/* LEFT COLUMN: CINEMATIC LIFESTYLE IMAGERY (55%) */}
        <div className="w-full lg:w-[55%] relative h-[400px] lg:h-auto overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200" 
            alt="Cinematic EV Charging Hub Hyderabad" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-[#0F3D2E]" />
          
          {/* Glass-Pill Badge */}
          <div className="absolute top-8 left-8">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-luxury font-sans">
                Hyderabad's #1 Energy Network
              </span>
            </div>
          </div>

          {/* Location Context Overlay */}
          <div className="absolute bottom-12 left-12 hidden lg:block">
            <h4 className="text-white/60 text-[10px] font-black uppercase tracking-luxury mb-2 font-sans">Active Deployment</h4>
            <p className="text-white text-2xl font-black tracking-tighter font-display italic">HITEC City Phase II Hub</p>
          </div>
        </div>

        {/* RIGHT COLUMN: THE COMMAND FORM (45%) */}
        <div className="w-full lg:w-[45%] bg-[#0F3D2E] p-10 lg:p-16 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            {formStatus === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
              >
                <div className="w-24 h-24 bg-[#1DB954] text-[#0F3D2E] rounded-[32px] mx-auto flex items-center justify-center shadow-2xl shadow-[#1DB954]/20">
                  <CheckCircle2 size={48} />
                </div>
                <div>
                  <h3 className="text-4xl font-black text-white tracking-tighter mb-4 font-display">Sync Complete.</h3>
                  <p className="text-white/60 text-lg font-sans font-medium">
                    Our grid analysts are calculating your asset's potential. Expect a detailed infrastructure quote in your inbox shortly.
                  </p>
                </div>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="px-10 py-4 border-2 border-[#1DB954]/20 rounded-2xl text-[#1DB954] font-black text-[11px] uppercase tracking-luxury hover:bg-[#1DB954]/10 transition-all font-sans"
                >
                  Register Another Asset
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-10"
              >
                <div>
                  <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none font-display mb-4">
                    Scale Your <br />
                    <span className="text-[#1DB954]">Revenue.</span>
                  </h2>
                  <p className="text-white/60 text-base font-sans font-medium leading-relaxed">
                    Get a custom infrastructure quote today. Let our grid experts help you monetize your parking assets.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative group">
                    <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1DB954] transition-colors" />
                    <input 
                      required
                      type="text"
                      placeholder="Enter your name"
                      className="w-full bg-white rounded-2xl pl-14 pr-6 py-5 text-sm font-bold text-[#0D1E3A] focus:outline-none focus:ring-4 focus:ring-[#1DB954]/20 transition-all placeholder:text-gray-300 font-sans"
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="relative group">
                    <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1DB954] transition-colors" />
                    <input 
                      required
                      type="email"
                      placeholder="work@company.com"
                      className="w-full bg-white rounded-2xl pl-14 pr-6 py-5 text-sm font-bold text-[#0D1E3A] focus:outline-none focus:ring-4 focus:ring-[#1DB954]/20 transition-all placeholder:text-gray-300 font-sans"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex-1 relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <img src="https://flagcdn.com/w20/in.png" alt="India" className="w-5 h-auto rounded-sm" />
                        <span className="text-sm font-bold text-gray-400">+91</span>
                      </div>
                      <input 
                        required
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full bg-white rounded-2xl pl-24 pr-6 py-5 text-sm font-bold text-[#0D1E3A] focus:outline-none focus:ring-4 focus:ring-[#1DB954]/20 transition-all placeholder:text-gray-300 font-sans"
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-2">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={formData.whatsappUpdates}
                          onChange={(e) => setFormData({...formData, whatsappUpdates: e.target.checked})}
                          className="peer sr-only"
                        />
                        <div className="w-5 h-5 bg-white/10 rounded-md border border-white/20 peer-checked:bg-[#1DB954] peer-checked:border-[#1DB954] transition-all" />
                        <CheckCircle2 size={14} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#0F3D2E] opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-[11px] font-bold text-white/70 uppercase tracking-widest font-sans">Send me updates on WhatsApp</span>
                    </label>
                  </div>

                  <div className="relative group">
                    <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select 
                      required
                      className="w-full bg-white rounded-2xl pl-14 pr-12 py-5 text-sm font-bold text-[#0D1E3A] appearance-none focus:outline-none focus:ring-4 focus:ring-[#1DB954]/20 transition-all font-sans"
                      onChange={(e) => setFormData({...formData, locality: e.target.value})}
                    >
                      <option value="">Select Locality</option>
                      {HYDERABAD_AREAS.map(area => (
                        <option key={area} value={area}>{area}</option>
                      ))}
                    </select>
                    <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formStatus === 'loading'}
                    className="w-full bg-[#1DB954] text-[#0F3D2E] rounded-2xl py-6 font-black text-[12px] uppercase tracking-luxury shadow-2xl shadow-[#1DB954]/20 flex items-center justify-center gap-4 transition-all hover:shadow-[#1DB954]/40 font-sans btn-tech-pulse"
                  >
                    {formStatus === 'loading' ? (
                      <Loader2 size={22} className="animate-spin" />
                    ) : (
                      <>
                        GET FREE HUB QUOTE
                        <Zap size={20} fill="currentColor" />
                      </>
                    )}
                  </motion.button>

                  <div className="pt-4 flex flex-col items-center gap-2">
                    <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest text-center font-sans">
                      By submitting this form, you agree to our <span className="text-white/50 underline cursor-pointer">privacy policy</span> & <span className="text-white/50 underline cursor-pointer">terms</span>.
                    </p>
                    <p className="text-[8px] font-black text-[#4287f5] uppercase tracking-luxury font-sans">
                      Developed by WebBrilliance
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VendorBanner;