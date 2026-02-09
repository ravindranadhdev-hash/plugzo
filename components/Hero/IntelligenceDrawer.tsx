import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Globe, Clock, Star, Navigation, 
  Bookmark, Share2, Smartphone, Search, X, Zap, ChevronDown 
} from 'lucide-react';
import { StationService } from '../../services/StationService';
// import { StationService } from '../services/stationService';

interface IntelligenceDrawerProps {
  id: number | null;
  onClose: () => void;
}

export const IntelligenceDrawer: React.FC<IntelligenceDrawerProps> = ({ id, onClose }) => {
  const [station, setStation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    if (id) {
      setLoading(true);
      setStation(null); // Clear previous data to prevent flash of old content
      StationService.getStationDetails(id)
        .then(response => {
          // IMPORTANT: We take response.data because your API nests the object inside 'data'
          setStation(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("API Error:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (!id) return null;

  const handleDirections = () => {
    if (!station) return;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end pointer-events-none">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="relative w-full max-w-md bg-white h-full shadow-2xl pointer-events-auto overflow-y-auto no-scrollbar font-sans"
      >
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#4287f5]"></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Syncing Grid Node...</p>
          </div>
        ) : station && (
          <>
            {/* 1. GMB SEARCH HEADER */}
            <div className="sticky top-0 z-20 bg-white p-3 border-b flex items-center gap-3">
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
              <div className="flex-1 bg-slate-100 rounded-full flex items-center px-4 py-2 gap-3">
                <Search size={16} className="text-slate-400" />
                <input 
                  readOnly 
                  value={station.name || 'Station Details'} 
                  className="bg-transparent border-none outline-none text-sm font-medium text-slate-700 w-full truncate"
                />
              </div>
            </div>

            {/* 2. HERO IMAGE */}
            <div className="relative aspect-video w-full bg-slate-200">
              <img 
                src={station.media?.[0]?.file_path || 'https://via.placeholder.com/800x450?text=No+Image'} 
                className="w-full h-full object-cover" 
                alt="Station" 
              />
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 text-[11px] font-bold text-slate-700">
                <Globe size={14} /> View Photos
              </div>
            </div>

            {/* 3. TITLE & RATINGS */}
            <div className="p-6 pb-2">
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                {station.name || 'Plugzo Hub'}
              </h1>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-sm font-bold text-slate-700">{station.overall_rating || '4.8'}</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-sm text-slate-500">(Verified Hub)</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">EV Charging Station in {station.locality}</p>
            </div>

            {/* 4. TAB NAVIGATION */}
            <div className="flex border-b px-6 gap-8 mt-4">
              {['Overview', 'Reviews', 'About'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-bold transition-all relative ${
                    activeTab === tab ? 'text-[#4287f5]' : 'text-slate-400'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4287f5]" />}
                </button>
              ))}
            </div>

            {/* 5. CIRCULAR ACTION HUB */}
            <div className="flex justify-between px-8 py-6 border-b">
              <ActionButton onClick={handleDirections} icon={<Navigation fill="currentColor" />} label="Directions" primary />
              <ActionButton icon={<Bookmark />} label="Save" />
              <ActionButton icon={<Smartphone />} label="To Phone" />
              <ActionButton icon={<Share2 />} label="Share" />
            </div>

            {/* 6. INFO LIST */}
            <div className="p-6 space-y-6">
              <InfoRow icon={<MapPin className="text-[#4287f5]" />} text={station.address} />
              
              <div className="flex items-start gap-4">
                <Clock className="text-[#4287f5] shrink-0 mt-0.5" size={20} />
                <div className="flex-1">
                  <div className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-slate-700 font-bold">
                       <span className="text-green-600">Open</span> · 24 hours
                    </span>
                    <ChevronDown size={16} className="text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Power Specs from Chargers Array */}
              <div className="flex items-start gap-4">
                <Zap className="text-[#1DB954] shrink-0 mt-0.5" size={20} />
                <div className="flex-1 space-y-1">
                  {station.chargers?.map((c: any) => (
                    <p key={c.id} className="text-sm font-bold text-slate-700">
                      {c.power_kw}kW {c.charger_type?.name}
                    </p>
                  ))}
                </div>
              </div>

              <InfoRow icon={<Phone className="text-[#4287f5]" />} text={station.phone || 'Contact Grid'} />
              
              <div className="pt-4">
                 <button className="w-full flex items-center justify-center gap-2 bg-blue-50 text-[#4287f5] py-3.5 rounded-full text-xs font-black uppercase tracking-widest">
                   Suggest an edit
                 </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

const ActionButton = ({ icon, label, primary = false, onClick }: any) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
      primary ? 'bg-[#4287f5] text-white shadow-lg' : 'bg-white border border-slate-200 text-[#4287f5] hover:bg-slate-50'
    }`}>
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <span className="text-[9px] font-black uppercase tracking-tighter text-[#4287f5]">{label}</span>
  </button>
);

const InfoRow = ({ icon, text }: any) => (
  <div className="flex items-start gap-4 group cursor-pointer">
    <div className="shrink-0 mt-0.5">{React.cloneElement(icon, { size: 20 })}</div>
    <span className="text-sm leading-relaxed text-slate-600 font-bold">
      {text}
    </span>
  </div>
);

export default IntelligenceDrawer;