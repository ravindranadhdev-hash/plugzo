import React, { useState, useEffect } from 'react';
import { Search, User } from 'lucide-react';
import { COLORS } from '../../constants';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Charging', href: '#/' },
    { name: '2026 Fleet', href: '#/vehicles' },
    { name: 'Grid Intel', href: '#/blog' },
    { name: 'Host a Hub', href: '#/vendor' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-8 flex items-center justify-between ${
        scrolled 
          ? 'h-16 bg-[#0A1F1A]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
          : 'h-20 bg-[#0A1F1A]'
      }`}
    >
      {/* LOGO AREA */}
      <div className="flex items-center cursor-pointer" onClick={() => window.location.hash = '#/'}>
        <img 
          src="/assets/logo2.png" 
          alt="PLUGZO" 
          className={`${scrolled ? 'h-10' : 'h-12'} w-auto transition-all duration-500`}
        />
      </div>

      {/* CENTRAL NAV CAPSULE */}
      <div className="hidden lg:flex items-center bg-white/5 border border-white/10 px-8 py-2 rounded-full shadow-inner">
        <div className="flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-[#1DB954] transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* ACTIONS AREA */}
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 text-white/50 hover:text-[#1DB954] transition-colors group">
          <Search size={18} />
          <span className="hidden xl:block text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            Search
          </span>
        </button>

        <div className="h-6 w-[1px] bg-white/10" />

        <button 
          className="flex items-center gap-3 px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest text-white bg-[#1DB954] hover:bg-[#17a045] transition-all active:scale-95 shadow-lg shadow-[#1DB954]/20"
        >
          <User size={16} strokeWidth={2.5} />
          <span className="whitespace-nowrap">Access Portal</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;