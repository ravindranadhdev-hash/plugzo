import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Zap } from 'lucide-react';
import { COLORS, SPRING_CONFIG } from '../../constants';

interface LocationPermissionModalProps {
  onDetect: () => void;
  onDeny: () => void;
}

const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({ onDetect, onDeny }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0F3D2E]/40 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', ...SPRING_CONFIG }}
        className="max-w-md w-full rounded-[40px] p-10 text-center shadow-2xl overflow-hidden relative"
        style={{ backgroundColor: '#F4FFF8' }}
      >
        {/* Animated Background Element */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ backgroundColor: COLORS.primary }}></div>
        
        <div className="relative z-10">
          <div className="w-20 h-20 rounded-3xl mx-auto mb-8 flex items-center justify-center" style={{ backgroundColor: `${COLORS.primary}10` }}>
            <MapPin size={40} style={{ color: COLORS.primary }} />
          </div>

          <h2 className="text-3xl font-extrabold mb-4" style={{ color: COLORS.dark }}>Find the Nearest Volt</h2>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Enable location to see chargers in Gachibowli, HITEC City, and your immediate vicinity.
          </p>

          <div className="space-y-4">
            <button 
              onClick={onDetect}
              className="w-full py-5 rounded-2xl text-white font-extrabold text-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl"
              style={{ backgroundColor: COLORS.primary, boxShadow: '0 10px 30px rgba(29, 185, 84, 0.3)' }}
            >
              <Navigation size={22} />
              DETECT MY LOCATION
            </button>
            <button 
              onClick={onDeny}
              className="w-full py-4 text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-60"
              style={{ color: COLORS.dark }}
            >
              Manual Selection
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LocationPermissionModal;