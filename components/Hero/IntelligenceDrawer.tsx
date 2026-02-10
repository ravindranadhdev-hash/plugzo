import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Globe, Clock, Star, Navigation, 
  Bookmark, Share2, Smartphone, Search, X, Zap, ChevronDown, Image as ImageIcon
} from 'lucide-react';
import { StationService } from '../../services/StationService';

interface IntelligenceDrawerProps {
  id: number | null;
  onClose: () => void;
}

export const IntelligenceDrawer: React.FC<IntelligenceDrawerProps> = ({ id, onClose }) => {
  const [station, setStation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setStation(null);
      StationService.getStationDetails(id)
        .then(response => {
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

  // 1. SHARE FUNCTIONALITY
  const handleShare = async () => {
    const shareData = {
      title: `Plugzo - ${station?.name}`,
      text: `Charge your EV at ${station?.name} in ${station?.locality}. Find it on Plugzo!`,
      url: window.location.href, // Or your specific domain link
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleDirections = () => {
    if (!station) return;
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[9999] flex justify-end pointer-events-none font-sans">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
        className="relative w-full max-w-md bg-white h-full shadow-2xl pointer-events-auto overflow-y-auto no-scrollbar"
      >
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#4287f5]"></div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center px-10">Syncing Hyderabad Grid Node...</p>
          </div>
        ) : station && (
          <>
            {/* SEARCH HEADER */}
            <div className="sticky top-0 z-20 bg-white p-3 border-b flex items-center gap-3">
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
              <div className="flex-1 bg-slate-100 rounded-full flex items-center px-4 py-2 gap-3">
                <Search size={16} className="text-slate-400" />
                <input readOnly value={station.name} className="bg-transparent border-none outline-none text-sm font-medium text-slate-700 w-full truncate" />
              </div>
            </div>

            {/* HERO IMAGE & GALLERY TRIGGER */}
            <div className="relative aspect-video w-full bg-slate-200 overflow-hidden">
              <img 
                src={station.media?.[0]?.file_path || 'https://via.placeholder.com/800x450?text=No+Station+Photo'} 
                className="w-full h-full object-cover" 
                alt="Station" 
              />
              <button 
                onClick={() => setShowGallery(true)}
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 text-[11px] font-bold text-slate-700 hover:bg-white"
              >
                <ImageIcon size={14} /> View {station.media?.length || 0} Photos
              </button>
            </div>

            {/* TITLE & RATINGS */}
            <div className="p-6 pb-2">
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">{station.name}</h1>
              <div className="flex items-center gap-1.5 mt-2">
                {station.reviews_avg_rating ? (
                  <>
                    <span className="text-sm font-bold text-slate-700">{station.reviews_avg_rating}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(station.reviews_avg_rating) ? "currentColor" : "none"} />)}
                    </div>
                  </>
                ) : (
                  <span className="text-sm font-semibold text-[#4287f5]">No ratings yet</span>
                )}
                <span className="text-sm text-slate-500">({station.reviews?.length || 0} reviews)</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">EV Charging Hub in {station.locality}</p>
            </div>

            {/* TAB NAVIGATION */}
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

            {/* ACTION HUB */}
            <div className="flex justify-between px-8 py-6 border-b">
              <ActionButton onClick={handleDirections} icon={<Navigation fill="currentColor" />} label="Directions" primary />
              <ActionButton icon={<Bookmark />} label="Save" />
              <ActionButton onClick={handleShare} icon={<Share2 />} label="Share" />
              <ActionButton icon={<Smartphone />} label="To Phone" />
            </div>

            {/* DYNAMIC TAB CONTENT */}
            <div className="p-6 pb-20">
              {activeTab === 'Overview' && (
                <div className="space-y-6">
                  <InfoRow icon={<MapPin className="text-[#4287f5]" />} text={station.address} />
                  <InfoRow icon={<Clock className="text-[#4287f5]" />} text="Open 24 hours" />
                  
                  <div className="flex items-start gap-4">
                    <Zap className="text-[#1DB954] shrink-0 mt-0.5" size={20} />
                    <div className="flex-1 space-y-2">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connectors</p>
                      {station.chargers?.map((c: any) => (
                        <p key={c.id} className="text-sm font-bold text-slate-700">
                          {c.power_kw}kW · {c.charger_type?.name}
                        </p>
                      ))}
                    </div>
                  </div>
                  <InfoRow icon={<Phone className="text-[#4287f5]" />} text={station.phone || 'Contact station'} />
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="space-y-6">
                   {station.reviews?.length > 0 ? (
                     station.reviews.map((rev: any) => (
                       <div key={rev.id} className="border-b pb-4 last:border-0">
                         <div className="flex items-center gap-2 mb-2">
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-[#4287f5]">
                             {rev.user_name?.charAt(0) || 'U'}
                           </div>
                           <div className="flex text-amber-400 scale-75 -ml-2">
                             {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < rev.rating ? "currentColor" : "none"} />)}
                           </div>
                         </div>
                         <p className="text-sm text-slate-600 italic">"{rev.comment}"</p>
                       </div>
                     ))
                   ) : (
                     <div className="text-center py-10">
                        <Star size={32} className="mx-auto text-slate-200 mb-2" />
                        <p className="text-slate-400 text-sm font-medium">Be the first to review this station</p>
                     </div>
                   )}
                </div>
              )}

              {activeTab === 'About' && (
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {station.about || "This Plugzo hub provides reliable EV charging infrastructure in Hyderabad's prime corridors. Verified and monitored 24/7."}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </motion.div>

      {/* 2. PHOTO GALLERY OVERLAY */}
      <AnimatePresence>
        {showGallery && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black pointer-events-auto p-4 flex flex-col"
          >
            <div className="flex justify-between items-center text-white mb-4">
              <span className="font-bold">{station?.name} Photos</span>
              <button onClick={() => setShowGallery(false)} className="p-2 bg-white/10 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 no-scrollbar">
              {station?.media?.map((m: any) => (
                <img key={m.id} src={m.file_path} className="w-full rounded-2xl object-cover" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
    <span className="text-sm leading-relaxed text-slate-600 font-bold">{text}</span>
  </div>
);

export default IntelligenceDrawer;