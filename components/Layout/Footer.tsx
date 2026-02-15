import React from 'react';
import { Zap, Instagram, Twitter, Linkedin } from 'lucide-react';

const FooterLink: React.FC<{ children: React.ReactNode; href?: string }> = ({ children, href = "#" }) => (
  <a 
    href={href}
    className="text-gray-400 hover:text-[#1DB954] transition-colors duration-200 text-sm cursor-pointer"
  >
    {children}
  </a>
);

const SocialIcon = ({ icon }: { icon: React.ReactNode }) => (
  <div className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#1DB954] border border-white/10 hover:border-[#1DB954] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 cursor-pointer group">
    <div className="transform group-hover:scale-110 transition-transform">
      {icon}
    </div>
  </div>
);

const Footer: React.FC = () => {
  const currentYear = 2026;

  return (
    <footer className="bg-[#0A1F1A] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Section - Takes 4 columns */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <img 
                src="/assets/logo2.png" 
                alt="PLUGZO" 
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  console.error('Footer logo failed to load:', e);
                  // Fallback to text if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-text')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'fallback-text text-white font-bold text-xl';
                    fallback.textContent = 'PLUGZO';
                    parent.appendChild(fallback);
                  }
                }}
                onLoad={() => {
                  console.log('Footer logo loaded successfully');
                }}
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Hyderabad's premier high-speed EV charging network. Powering sustainable mobility with smart, reliable infrastructure across the city.
            </p>
            <div className="flex gap-3 pt-2">
              <SocialIcon icon={<Linkedin size={18} />} />
              <SocialIcon icon={<Twitter size={18} />} />
              <SocialIcon icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* Links Grid - Takes 8 columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-6">
            
            {/* Column 1: Locations */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                Locations
              </h4>
              <ul className="space-y-3">
                <li><FooterLink>Gachibowli</FooterLink></li>
                <li><FooterLink>HITEC City</FooterLink></li>
                <li><FooterLink>Madhapur</FooterLink></li>
                <li><FooterLink>Financial District</FooterLink></li>
                <li><FooterLink>Kondapur</FooterLink></li>
              </ul>
            </div>

            {/* Column 2: Explore */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                Explore
              </h4>
              <ul className="space-y-3">
                <li><FooterLink href="#/collections">Collections</FooterLink></li>
                <li><FooterLink href="#/india-ev">India on EV</FooterLink></li>
                <li><FooterLink href="#/updates">Updates</FooterLink></li>
                <li><FooterLink href="#/about">About Us</FooterLink></li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-3">
                <li><FooterLink href="#/contact">Contact Us</FooterLink></li>
                <li><FooterLink href="#/help">Help Center</FooterLink></li>
                <li><FooterLink href="#/assistance">24/7 Assistance</FooterLink></li>
                <li><FooterLink href="#/faqs">FAQs</FooterLink></li>
              </ul>
            </div>

            {/* Column 4: Company */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3">
                <li><FooterLink href="#/about">About Us</FooterLink></li>
                <li><FooterLink href="#/updates">Updates</FooterLink></li>
                <li><FooterLink href="#/india-ev">India on EV</FooterLink></li>
                <li><FooterLink>Careers</FooterLink></li>
                <li><FooterLink href="#/privacy">Privacy Policy</FooterLink></li>
                <li><FooterLink href="#/terms">Terms of Service</FooterLink></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} Plugzo Energy Network. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;