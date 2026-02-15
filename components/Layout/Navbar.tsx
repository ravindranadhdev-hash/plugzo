import React, { useState, useEffect, useRef } from 'react';
import { Search, User, X } from 'lucide-react';
import { COLORS } from '../../constants';

interface SearchSuggestion {
  id: number;
  name: string;
  address: string;
  locality: string;
  powerKW?: number;
  total_chargers?: number;
}

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSuggestions([]);
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  // Handle search query change
  useEffect(() => {
    if (searchQuery.length >= 3) {
      setIsLoading(true);
      // Simulate API call for suggestions
      setTimeout(() => {
        // Mock suggestions - in real app, this would be an API call
        const mockSuggestions: SearchSuggestion[] = [
          {
            id: 1,
            name: 'Gachibowli Charging Station',
            address: 'Gachibowli, Hyderabad',
            locality: 'Gachibowli',
            total_chargers: 4,
            powerKW: 60
          },
          {
            id: 2,
            name: 'HITEC City EV Hub',
            address: 'HITEC City, Hyderabad',
            locality: 'HITEC City',
            total_chargers: 6,
            powerKW: 120
          }
        ].filter(station => 
          station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          station.locality.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setSuggestions(mockSuggestions);
        setIsLoading(false);
      }, 300);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const navLinks = [
    { name: 'Charging', href: '#/' },
    { name: 'Collections', href: '#/collections' },
    { name: 'India on EV', href: '#/india-ev' },
    { name: 'Updates', href: '#/updates' },
    { name: 'About', href: '#/about' },
    { name: 'Contact', href: '#/contact' },
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
          onError={(e) => {
            console.error('Navbar logo failed to load:', e);
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
            console.log('Navbar logo loaded successfully');
          }}
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
          {/* Explore More Button */}
          <button
            onClick={() => window.location.hash = '#/collections'}
            className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90 hover:text-[#1DB954] transition-all border border-white/20 px-4 py-1 rounded-full hover:border-[#1DB954]/40 hover:bg-white/10"
          >
            Explore More →
          </button>
        </div>
      </div>

      {/* ACTIONS AREA */}
      <div className="flex items-center gap-6">
        {/* Search Button and Popup */}
        <div className="relative" ref={searchRef}>
          <button 
            onClick={handleSearchClick}
            className="flex items-center gap-2 text-white/50 hover:text-[#1DB954] transition-colors group"
          >
            <Search size={18} />
            <span className="hidden xl:block text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Search
            </span>
          </button>

          {/* Search Popup */}
          {isSearchOpen && (
            <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[200]">
              {/* Search Input */}
              <div className="p-4 border-b border-gray-100 bg-white">
                <div className="flex items-center gap-3">
                  <Search size={20} className="text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stations, locations..."
                    className="flex-1 outline-none text-gray-800 placeholder-gray-400 bg-white"
                    style={{ backgroundColor: 'white', color: '#1f2937' }}
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                      setSuggestions([]);
                    }}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <X size={16} className="text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Suggestions */}
              <div className="max-h-80 overflow-y-auto bg-white">
                {isLoading ? (
                  <div className="p-6 text-center bg-white">
                    <div className="w-6 h-6 border-2 border-[#1DB954] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-gray-500">Searching...</p>
                  </div>
                ) : searchQuery.length >= 3 && suggestions.length > 0 ? (
                  <div className="p-2 bg-white">
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors bg-white"
                        onClick={() => {
                          // Handle suggestion click
                          console.log('Selected station:', suggestion);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                          setSuggestions([]);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 text-sm mb-1">
                              {suggestion.name}
                            </h4>
                            <p className="text-xs text-gray-500 mb-2">
                              📍 {suggestion.address}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-400">
                              <span>⚡ {suggestion.powerKW || 60}KW</span>
                              <span>🔌 {suggestion.total_chargers || 1} chargers</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : searchQuery.length >= 3 ? (
                  <div className="p-6 text-center bg-white">
                    <p className="text-sm text-gray-500">No stations found</p>
                  </div>
                ) : (
                  <div className="p-6 text-center bg-white">
                    <p className="text-sm text-gray-400">Type at least 3 characters to search</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="h-6 w-[1px] bg-white/10" />

        <button 
          className="flex items-center gap-3 px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest text-white bg-[#1DB954] hover:bg-[#17a045] transition-all active:scale-95 shadow-lg shadow-[#1DB954]/20"
        >
          <User size={16} strokeWidth={2.5} />
          <span className="whitespace-nowrap">Login</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;