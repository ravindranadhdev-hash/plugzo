
import React from 'react';
import { Zap, Instagram, Twitter, Linkedin } from 'lucide-react';
import { COLORS } from '../../constants';

// Fixed FooterLink by explicitly using React.FC to ensure children prop is correctly typed and recognized
const FooterLink: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="hover:text-white transition-colors duration-300 cursor-pointer block">
        {children}
    </span>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#1DB954] hover:bg-[#1DB954] hover:text-white transition-all cursor-pointer">
        {icon}
    </div>
);

const Footer: React.FC = () => {
  const currentYear = 2026; // Set to requested year 2026

  return (
    <footer className="relative bg-[#F4FFF8] pt-20 overflow-hidden">
      {/* THE HORIZON CURVE */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-48 bg-[#0F3D2E] rounded-t-[100%_100%] shadow-[0_-10px_40px_rgba(29,185,84,0.1)] border-t border-[#1DB954]/20" />

      <div className="relative z-10 bg-[#0F3D2E] pt-24 pb-8 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            
            {/* Column 1: Brand & Ethos */}
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <img 
                  src="/assets/logo2.jpeg" 
                  alt="PLUGZO" 
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                Hyderabad's premier high-speed charging infrastructure. Powering 10k+ daily commutes with smart hub intelligence.
              </p>
              <div className="flex gap-4">
                <SocialIcon icon={<Linkedin size={18} />} />
                <SocialIcon icon={<Twitter size={18} />} />
                <SocialIcon icon={<Instagram size={18} />} />
              </div>
            </div>

            {/* Column 2: Local SEO Grid */}
            <div>
              <h4 className="text-white font-semibold mb-8 text-xs tracking-wider uppercase">The Hyderabad Grid</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-400">
                <li><FooterLink>Gachibowli Hubs</FooterLink></li>
                <li><FooterLink>HITEC City Fast-Charge</FooterLink></li>
                <li><FooterLink>Madhapur Terminals</FooterLink></li>
                <li><FooterLink>Financial District Portals</FooterLink></li>
                <li><FooterLink>Kondapur Elite Points</FooterLink></li>
              </ul>
            </div>

            {/* Column 3: Ecosystem */}
            <div>
              <h4 className="text-white font-semibold mb-8 text-xs tracking-wider uppercase">Partner Program</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-400">
                <li><FooterLink>Register Your Store</FooterLink></li>
                <li><FooterLink>Society Infrastructure</FooterLink></li>
                <li><FooterLink>Fleet Enterprise</FooterLink></li>
                <li><FooterLink>Developer API</FooterLink></li>
                <li><FooterLink>Become a Host</FooterLink></li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <h4 className="text-white font-semibold mb-8 text-xs tracking-wider uppercase">Safety & Support</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-400">
                <li><FooterLink>Help Center</FooterLink></li>
                <li><FooterLink>Privacy Policy</FooterLink></li>
                <li><FooterLink>Terms of Service</FooterLink></li>
                <li><FooterLink>24/7 Grid Support</FooterLink></li>
              </ul>
            </div>
          </div>

          {/* DIGITAL SIGNATURE BAR */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-xs font-medium tracking-wider uppercase">
              © {currentYear} PLUGZO ENERGY NETWORK. ALL SYSTEMS LIVE.
            </p>
            <p className="text-gray-400 text-xs font-medium tracking-wider uppercase">
              Designed & Developed by <span className="text-white hover:text-[#4287f5] hover:drop-shadow-[0_0_8px_#4287f5] cursor-pointer transition-all duration-300">WebBrilliance</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
