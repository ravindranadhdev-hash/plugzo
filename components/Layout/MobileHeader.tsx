import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Zap, X, User, Clock, Store, Settings, HelpCircle, Search, Bell } from 'lucide-react';
import { COLORS } from '../../constants';

interface MobileHeaderProps {
  onSearchClick: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onSearchClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 w-full z-50 shadow-lg border-b border-white/5 lg:hidden"
        style={{ backgroundColor: COLORS.dark }}
      >
        <div 
          className="flex items-center justify-between h-14 px-4 pt-[env(safe-area-inset-top)]"
          style={{ paddingTop: 'max(env(safe-area-inset-top), 8px)' }}
        >
          {/* BRANDING (LEFT) */}
          <div 
            className="relative cursor-pointer group flex items-center gap-2"
            onClick={() => window.location.hash = '#/'}
          >
            <img 
              src="/assets/logo2.png" 
              alt="PLUGZO" 
              className="h-9 w-20 object-contain"
              onError={(e) => {
                console.error('MobileHeader logo failed to load:', e);
                // Fallback to text if image fails
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.fallback-text')) {
                  const fallback = document.createElement('div');
                  fallback.className = 'fallback-text text-white font-bold text-lg';
                  fallback.textContent = 'PLUGZO';
                  parent.appendChild(fallback);
                }
              }}
              onLoad={() => {
                console.log('MobileHeader logo loaded successfully');
              }}
            />
          </div>

          {/* UTILITY CLUSTER (RIGHT) */}
          <div className="flex items-center gap-3">
            {/* Search Circle */}
            <button 
              onClick={onSearchClick}
              className="p-2 border border-white/10 rounded-full text-white active:bg-white/10 transition-colors"
            >
              <Search size={18} strokeWidth={2.5} />
            </button>
            
            {/* Notification Bell */}
            <button className="relative p-2 text-white active:scale-95 transition-transform">
              <Bell size={20} strokeWidth={2.5} />
              <span 
                className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 animate-pulse" 
                style={{ borderColor: COLORS.dark }}
              />
            </button>

            {/* LOGIN BUTTON */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="px-5 py-2 rounded-full font-semibold text-xs uppercase tracking-wide shadow-md active:scale-95 transition-all ml-1"
              style={{ backgroundColor: COLORS.lemon, color: COLORS.dark }}
            >
              Login
            </button>
          </div>
        </div>
      </header>

      {/* SIDE DRAWER OVERLAY (MENU) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[201]" 
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-screen w-[85%] bg-white shadow-2xl p-8 flex flex-col z-[202]"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                   <img 
                     src="/assets/logo2.png" 
                     alt="PLUGZO" 
                     className="h-8 w-auto object-contain"
                     onError={(e) => {
                       console.error('Drawer logo failed to load:', e);
                       // Fallback to text if image fails
                       const target = e.target as HTMLImageElement;
                       target.style.display = 'none';
                       const parent = target.parentElement;
                       if (parent && !parent.querySelector('.fallback-text')) {
                         const fallback = document.createElement('div');
                         fallback.className = 'fallback-text text-[#0D1E3A] font-bold text-lg';
                         fallback.textContent = 'PLUGZO';
                         parent.appendChild(fallback);
                       }
                     }}
                     onLoad={() => {
                       console.log('Drawer logo loaded successfully');
                     }}
                   />
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 bg-gray-50 rounded-xl"
                >
                  <X size={24} className="text-gray-400" />
                </button>
              </div>
              
              <nav className="flex flex-col gap-6 flex-1">
                <MenuLink icon={<User size={22} />} label="My Account" />
                <MenuLink icon={<Clock size={22} />} label="Booking History" />
                <MenuLink icon={<Store size={22} />} label="Register Your Store" />
                <MenuLink icon={<HelpCircle size={22} />} label="Help & Support" />
                <MenuLink icon={<Settings size={22} />} label="Settings" />
              </nav>

              <div className="mt-auto pt-10 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Network Status: Active
                </p>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                  Designed & Developed by WebBrilliance
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const MenuLink = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <button className="flex items-center gap-4 text-[#0D1E3A] group">
    <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-[#1DB954]/10 group-hover:text-[#1DB954] transition-colors">
      {icon}
    </div>
    <span className="text-lg font-semibold tracking-tight">{label}</span>
  </button>
);

export default MobileHeader;