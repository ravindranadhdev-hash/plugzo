import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Phone, Globe, Clock, Star, Navigation, 
  Bookmark, Share2, Smartphone, X, Zap, Image as ImageIcon 
} from 'lucide-react';
import { StationService } from '../../services/StationService';

interface StationDetailPageProps {
  stationId: number; 
}

const StationDetailPage: React.FC<StationDetailPageProps> = ({ stationId }) => {
  const [station, setStation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    if (!stationId) return;
    
    let isMounted = true;
    setLoading(true);
    setStation(null);
    
    StationService.getStationDetails(stationId)
      .then(response => {
        if (isMounted && response?.data) {
          setStation(response.data);
        }
      })
      .catch(err => {
        console.error("Station fetch error:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => { isMounted = false; };
  }, [stationId]);

  const handleShare = async () => {
    if (!station) return;
    const shareData = {
      title: `Plugzo - ${station.name}`,
      text: `Charge your EV at ${station.name} in ${station.locality}.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) { console.error(err); }
  };

  const handleDirections = () => {
    if (!station) return;
    // Ensure coordinates are treated as numbers
    const lat = parseFloat(station.lat);
    const lng = parseFloat(station.lng);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F4FFF8]" />;
  }

  if (!station) {
    return <div className="min-h-screen bg-[#F4FFF8]" />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-white pb-24 font-sans"
    >
      {/* 1. PREMIUM STICKY HEADER */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100">
        <div className="flex items-center justify-between p-4 max-w-2xl mx-auto">
          <button 
            onClick={() => window.location.hash = '#/'}
            className="flex items-center gap-2 text-[#0F3D2E] hover:opacity-70 transition-opacity"
          >
            <X size={20} />
            <span className="font-bold text-xs uppercase tracking-widest">Exit Detail</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button onClick={handleShare} className="p-2.5 bg-slate-50 rounded-full text-[#0F3D2E]"><Share2 size={18} /></button>
            <button className="p-2.5 bg-slate-50 rounded-full text-[#0F3D2E]"><Bookmark size={18} /></button>
          </div>
        </div>
      </div>

      {/* 2. HERO IMAGE SECTION */}
      <div className="relative aspect-[3/2] bg-slate-100 overflow-hidden max-w-2xl mx-auto md:rounded-b-[40px]">
        <img 
          src={station?.media?.[0]?.file_path || 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800'} 
          className="w-full h-full object-cover" 
          alt={station?.name} 
        />
        <button 
          onClick={() => setShowGallery(true)}
          className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-[10px] font-black text-[#0F3D2E] uppercase tracking-luxury transition-all hover:bg-white"
        >
          <ImageIcon size={14} className="text-[#1DB954]" /> {station?.media?.length || 0} Photos
        </button>
      </div>

      {/* 3. CORE STATION INFO */}
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="font-display text-3xl font-black text-[#0F3D2E] tracking-tighter leading-tight mb-2">
          {station?.name}
        </h1>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-1.5 text-[#1DB954]">
            <Star size={16} fill="currentColor" />
            <span className="font-bold text-sm">{station?.reviews_avg_rating || '4.5'}</span>
          </div>
          <span className="text-slate-400 text-sm font-medium">({station?.reviews?.length || 0} reviews)</span>
          <div className="flex items-center gap-1 text-slate-500 border-l border-slate-200 pl-4">
            <MapPin size={16} className="text-[#4287f5]" />
            <span className="text-sm font-medium">{station?.locality}</span>
          </div>
        </div>

        {/* 4. PREMIUM TABS */}
        <div className="flex border-b border-slate-100 mb-8 overflow-x-auto no-scrollbar">
          {['Overview', 'Reviews', 'About'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
                activeTab === tab ? 'text-[#1DB954]' : 'text-slate-400'
              }`}
            >
              {tab}
              {activeTab === tab && <motion.div layoutId="tab-underline-mobile" className="absolute bottom-0 left-0 w-full h-1 bg-[#1DB954] rounded-t-full" />}
            </button>
          ))}
        </div>

        {/* 5. DYNAMIC TAB CONTENT */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeTab === 'Overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={handleDirections} className="flex flex-col items-center gap-3 p-6 bg-[#F4FFF8] border border-[#1DB954]/10 rounded-[32px] hover:bg-[#1DB954]/5 transition-colors">
                    <Navigation size={24} className="text-[#4287f5]" fill="currentColor" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0F3D2E]">Directions</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 p-6 bg-[#F4FFF8] border border-[#1DB954]/10 rounded-[32px]">
                    <Smartphone size={24} className="text-[#1DB954]" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0F3D2E]">Reserve</span>
                  </button>
                </div>

                <div className="space-y-8 pt-4">
                  <DetailItem icon={<Zap className="text-[#1DB954]" />} title="Charging Grid">
                    <div className="space-y-2">
                        {station?.chargers?.map((c: any) => (
                          <p key={c.id} className="text-sm font-bold text-[#0F3D2E]">
                            {c.power_kw}kW <span className="mx-2 opacity-20">|</span> {c.charger_type?.name}
                          </p>
                        ))}
                    </div>
                  </DetailItem>
                  
                  <DetailItem icon={<Phone className="text-[#4287f5]" />} title="Direct Line">
                    <p className="text-sm font-bold text-[#0F3D2E]">{station?.phone || 'Grid Support Only'}</p>
                  </DetailItem>

                  <DetailItem icon={<Clock className="text-[#4287f5]" />} title="Operational Hours">
                    <p className="text-sm font-bold text-[#0F3D2E]">Open 24/7 • All Systems Live</p>
                  </DetailItem>
                </div>
              </div>
            )}

            {/* Reviews and About code remains the same as your logic */}
        </div>
      </div>

      {/* 6. FIXED CALL-TO-ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-2xl border-t border-slate-100 p-5 z-50">
        <div className="flex gap-4 max-w-2xl mx-auto">
          <button onClick={handleDirections} className="flex-1 py-4 bg-[#0F3D2E] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl transition-transform active:scale-95">
             Get Directions
          </button>
          <button className="flex-1 py-4 bg-[#1DB954] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-green-500/20 active:scale-95">
             Book Session
          </button>
        </div>
      </div>

      {/* GALLERY OVERLAY */}
      <AnimatePresence>
        {showGallery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black p-6 flex flex-col">
            <div className="flex justify-between items-center text-white mb-8">
              <span className="font-display font-black text-sm tracking-widest uppercase italic">The Plugzo Gallery</span>
              <button onClick={() => setShowGallery(false)} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-6 no-scrollbar pb-32">
              {station?.media?.map((m: any) => (
                <img key={m.id} src={m.file_path} className="w-full rounded-[40px] object-cover shadow-2xl border border-white/5" alt="node detail" />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Internal Helper Component for Info Rows
const DetailItem = ({ icon, title, children }: any) => (
  <div className="flex items-start gap-5 group">
    <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-[#F4FFF8] transition-colors">{icon}</div>
    <div className="flex-1">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">{title}</p>
      {children}
    </div>
  </div>
);

export default StationDetailPage;