import React from 'react';
import { Menu, Zap, Search, User } from 'lucide-react';
import { COLORS } from '../../constants';

const Navbar: React.FC = () => {
  return (
    <nav 
      className="hidden lg:flex fixed top-0 left-0 right-0 z-[100] h-20 items-center justify-between px-8"
      style={{ backgroundColor: COLORS.dark }}
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = '#/'}>
        <img 
          src="/assets/logo2.jpeg" 
          alt="NearVolt" 
          className="h-8 w-auto"
        />
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center gap-10">
        <a href="#/" className="text-white/80 hover:text-white font-medium transition-colors">Charging</a>
        <a href="#/vehicles" className="text-white/80 hover:text-white font-medium transition-colors">2026 Fleet</a>
        <a href="#/blog" className="text-white/80 hover:text-white font-medium transition-colors">Grid Intel</a>
        <a href="#/vendor" className="text-white/80 hover:text-white font-medium transition-colors">Host a Hub</a>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-white/80 hover:text-white transition-colors">
          <Search size={22} />
        </button>
        <button 
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95"
          style={{ backgroundColor: COLORS.primary, color: '#FFFFFF' }}
        >
          <User size={18} />
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;