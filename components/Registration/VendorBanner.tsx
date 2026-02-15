import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

const HYDERABAD_AREAS = [
  "HITEC City", "Gachibowli", "Madhapur", "Kondapur", "Kukatpally", 
  "Miyapur", "Ameerpet", "Begumpet", "Secunderabad", "Banjara Hills", "Jubilee Hills",
];

const EVStationOnboarding: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");

  const initialFormState = {
    stationName: "",
    ownerName: "",
    email: "",
    phone: "",
    locality: "",
    address: "",
    chargerType: "2",
    voltageLevel: "2",
    powerKw: "8",
    about: "",
    mediaFile: null as File | null,
    lat: "17.423200",
    lng: "78.408500",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    // Simulate API Call
    setTimeout(() => setFormStatus("success"), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, mediaFile: e.target.files[0] });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* HEADER / NAV */}
      <nav className="absolute top-0 w-full px-6 py-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Zap className="text-white w-5 h-5" fill="currentColor" />
          </div>
          EV<span className="text-emerald-600">GRID</span>
        </div>
      </nav>

      <main className="relative pt-32 pb-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* LEFT SIDE: CONTENT */}
            <div className="space-y-8 lg:sticky lg:top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Network Expansion 2024</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[0.9] text-slate-900">
                Start Your <span className="text-emerald-600">EV Charging Business.</span>
              </h1>

              <p className="text-lg text-slate-500 max-w-md leading-relaxed">
                Transform your space into a profitable EV charging station. Join Hyderabad's fastest growing network and earn from the EV revolution.
              </p>

              <div className="grid grid-cols-3 gap-8 pt-4">
                <div>
                  <div className="text-2xl font-bold">₹0</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Investment</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">30%</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Revenue Share</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Support</div>
                </div>
              </div>

              {!isOpen && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.hash = '#/register-station'}
                  className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl transition-all"
                >
                  Register EV Station
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              )}
            </div>

            {/* RIGHT SIDE: ILLUSTRATION OR FORM */}
            <div className="relative min-h-[600px] mb-[-1px]"> {/* mb-[-1px] removes gap at bottom */}
              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div
                    key="illustration"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-emerald-50 rounded-[40px] p-12 h-full flex flex-col justify-center items-center border border-emerald-100 relative overflow-hidden"
                  >
                    {/* Abstract Graphic Elements */}
                    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-white/50 rounded-full blur-3xl" />

                    <div className="relative z-10 w-full space-y-8">
                        <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-emerald-100">
                            <div className="flex gap-4 items-center">
                                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <div className="font-bold">Retail Hub</div>
                                    <div className="text-xs text-slate-400 text-nowrap">Commercial Partner</div>
                                </div>
                            </div>
                            <div className="text-emerald-600 font-black">Live</div>
                        </div>

                        <div className="flex justify-center">
                             <div className="w-32 h-44 bg-slate-900 rounded-[32px] flex flex-col items-center justify-center gap-4 relative shadow-2xl border-4 border-white">
                                <Zap className="text-emerald-400 w-12 h-12 animate-pulse" fill="currentColor" />
                                <div className="w-12 h-1 bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div 
                                        animate={{ x: [-48, 48] }} 
                                        transition={{ repeat: Infinity, duration: 1.5 }}
                                        className="w-full h-full bg-emerald-400" 
                                    />
                                </div>
                             </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur p-4 rounded-2xl border border-white text-center text-sm font-medium text-slate-600 shadow-sm">
                            Connect your infrastructure to our smart grid
                        </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[40px] p-8 lg:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100"
                  >
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black tracking-tight">Start Your Business</h2>
                        <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {formStatus === "success" ? (
                      <div className="text-center py-20 space-y-4">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-3xl font-black">Business Registered!</h3>
                        <p className="text-slate-500">Our business team will contact you within 24 hours to setup your charging station.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Station Details</label>
                            <input
                            type="text"
                            placeholder="Display Name (e.g. Gachibowli Fast Charge)"
                            required
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all"
                            value={formData.stationName}
                            onChange={(e) => setFormData({...formData, stationName: e.target.value})}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                            type="text"
                            placeholder="Full Name"
                            required
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all"
                            value={formData.ownerName}
                            onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                            />
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">+91</span>
                                <input
                                type="tel"
                                placeholder="Phone"
                                className="w-full pl-12 pr-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                        </div>

                        <select
                            required
                            className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all appearance-none cursor-pointer"
                            value={formData.locality}
                            onChange={(e) => setFormData({...formData, locality: e.target.value})}
                        >
                            <option value="">Select Area / Locality</option>
                            {HYDERABAD_AREAS.map(area => <option key={area} value={area}>{area}</option>)}
                        </select>

                        <div className="grid grid-cols-2 gap-4">
                            <select className="px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                                value={formData.chargerType}
                                onChange={(e) => setFormData({...formData, chargerType: e.target.value})}
                            >
                                <option value="2">Type 2 (AC)</option>
                                <option value="3">CCS (DC Fast)</option>
                            </select>
                            <input
                                type="number"
                                placeholder="Power (kW)"
                                className="px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all"
                                value={formData.powerKw}
                                onChange={(e) => setFormData({...formData, powerKw: e.target.value})}
                            />
                        </div>

                        <div className="relative group">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="file-upload" className="flex items-center justify-center gap-2 w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer group-hover:bg-slate-50 transition-all">
                                <Upload size={18} className="text-slate-400" />
                                <span className="text-sm font-medium text-slate-500">
                                    {formData.mediaFile ? formData.mediaFile.name : "Upload Station Photo"}
                                </span>
                            </label>
                        </div>

                        <button
                          type="submit"
                          disabled={formStatus === "loading"}
                          className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all disabled:opacity-50"
                        >
                          {formStatus === "loading" ? "Starting Business..." : "Launch Your Business"}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EVStationOnboarding;