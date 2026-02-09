import React from 'react';
import { motion } from 'framer-motion';
import { X, Smartphone, MapPin } from 'lucide-react';
import { COLORS, SPRING_CONFIG } from '../../constants';

interface QRModalProps {
  lat: number;
  lng: number;
  name: string;
  onClose: () => void;
}

const QRModal: React.FC<QRModalProps> = ({ lat, lng, name, onClose }) => {
  const navUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(navUrl)}&bgcolor=F4FFF8&color=0F3D2E&margin=10`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', ...SPRING_CONFIG }}
        className="max-w-sm w-full bg-white rounded-[40px] p-8 text-center shadow-2xl relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} className="text-gray-400" />
        </button>

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${COLORS.primary}10` }}>
            <Smartphone size={32} style={{ color: COLORS.primary }} />
          </div>

          <h2 className="text-2xl font-black mb-2" style={{ color: COLORS.dark }}>Send to Phone</h2>
          <p className="text-gray-500 text-sm mb-8">Scan this code with your camera to open navigation for <span className="font-bold">{name}</span></p>

          <div className="relative group p-4 rounded-3xl bg-[#F4FFF8] border-2 border-dashed border-[#1DB954]/20">
            <img 
              src={qrUrl} 
              alt="Navigation QR Code" 
              className="w-48 h-48 rounded-2xl shadow-sm"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-[1px] pointer-events-none">
                <MapPin size={24} style={{ color: COLORS.primary }} />
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Direct Native App Link Generated
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default QRModal;