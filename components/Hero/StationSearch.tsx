import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Navigation } from 'lucide-react';

interface StationSearchProps {
  onSearch: (query: string) => void;
  suggestions?: string[];
}

const POPULAR_LOCALITIES = [
  "Gachibowli", "HITEC City", "Madhapur", "Kondapur", "Jubilee Hills", "Banjara Hills"
];

const StationSearch: React.FC<StationSearchProps> = ({ onSearch, suggestions = [] }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [query, onSearch]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = suggestions.filter(s =>
        s.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [query, suggestions]);

  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  const handleSelection = (value: string) => {
    setQuery(value);
    setShowSuggestions(false);
    onSearch(value);
  };

  return (
    <div className="w-full mb-2">
      {/* 1. PRIMARY SEARCH INPUT */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-[#1DB954] transition-colors">
          <Search size={18} strokeWidth={2.5} />
        </div>

        <input 
          ref={inputRef}
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (query.trim()) setShowSuggestions(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          placeholder="Search localities or hubs..."
          className={`w-full bg-white border rounded-2xl py-4 pl-12 pr-12 
                   text-sm font-semibold text-[#0F3D2E] placeholder:text-slate-400 
                   transition-all duration-300 outline-none
                   ${isFocused 
                     ? 'border-[#1DB954] ring-[6px] ring-[#1DB954]/5 shadow-xl shadow-[#1DB954]/10' 
                     : 'border-slate-100 hover:border-slate-200 shadow-sm'
                   }`}
        />

        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-[#0F3D2E] rounded-full p-1 transition-all flex items-center justify-center"
              style={{ marginTop: '-1px' }}
            >
              <X size={14} strokeWidth={3} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* 2. SEARCH BELOW AREA FILTERS (Professional Pills) */}
      <div className="mt-2 mb-1 overflow-hidden relative">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <button
            onClick={() => handleSelection('')}
            className={`flex items-center gap-1.5 px-2 py-1.5 text-[11px] font-bold uppercase tracking-widest whitespace-nowrap shrink-0 border rounded-full transition-all
              ${query === '' 
                ? 'bg-[#1DB954] border-[#1DB954] text-white shadow-md shadow-green-500/20' 
                : 'text-[#1DB954] border-transparent hover:bg-[#1DB954]/10'
              }`}
          >
             <Navigation size={12} fill="currentColor" /> Nearby
          </button>
          
          {POPULAR_LOCALITIES.map((area) => (
            <button
              key={area}
              onClick={() => handleSelection(area)}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all border
                ${query === area 
                  ? 'bg-[#1DB954] border-[#1DB954] text-white shadow-md shadow-green-500/20' 
                  : 'bg-white border-slate-100 text-slate-500 hover:border-[#1DB954] hover:text-[#1DB954]'
                }`}
            >
              {area}
            </button>
          ))}
        </div>
        {/* Subtle Fade for horizontal scroll */}
        <div className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-[#F4FFF8] to-transparent pointer-events-none md:hidden" />
      </div>

      {/* 3. AUTO-SUGGESTIONS DROPDOWN */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.99 }}
            className="absolute mt-2 w-full bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-[100]"
          >
            <div className="p-2">
              <p className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">Localities Found</p>
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSelection(suggestion)}
                  className="w-full px-3 py-3 text-left text-sm font-bold text-[#0F3D2E] hover:bg-[#F4FFF8] rounded-xl transition-colors flex items-center gap-3"
                >
                  <div className="bg-slate-50 p-2 rounded-lg group-hover:bg-white">
                    <MapPin size={14} className="text-[#1DB954]" strokeWidth={2.5} />
                  </div>
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StationSearch;