import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface StationSearchProps {
  onSearch: (query: string) => void;
  suggestions?: string[];
}

const StationSearch: React.FC<StationSearchProps> = ({ onSearch, suggestions = [] }) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [query, onSearch]);

  // Filter suggestions based on query
  useEffect(() => {
    if (query.trim()) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [query, suggestions]);

  const handleClear = () => {
    setQuery('');
    setFilteredSuggestions([]);
    onSearch('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
    onSearch(suggestion);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  return (
    <motion.div 
      className="relative w-full mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Search Input Container */}
      <div className="relative group">
        {/* Search Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <Search size={16} strokeWidth={2.5} />
        </div>

        {/* Input Field */}
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
            // Delay hiding suggestions to allow click events
            setTimeout(() => setShowSuggestions(false), 150);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search localities (e.g., Gachibowli, HITEC City)..."
          className={`w-full bg-white border rounded-2xl py-3.5 pl-11 pr-12 
                   text-sm font-medium text-[#0F3D2E] placeholder:text-slate-400 
                   focus:outline-none transition-all duration-200
                   ${isFocused 
                     ? 'border-[#1DB954] ring-4 ring-[#1DB954]/5 shadow-lg shadow-[#1DB954]/10' 
                     : 'border-slate-200 hover:border-slate-300'
                   }`}
        />

        {/* Clear Button (only show when there's text) */}
        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
            >
              <X size={14} strokeWidth={2} />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Keyboard Hint (Desktop Only) */}
        {!query && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-400 pointer-events-none">
            <span className="text-[12px]">⌘</span>K
          </div>
        )}
      </div>

      {/* Auto-Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg shadow-slate-200/20 overflow-hidden z-50"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, delay: index * 0.05 }}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left text-sm font-medium text-[#0F3D2E] hover:bg-[#F4FFF8] transition-colors flex items-center gap-3 first:pt-3.5 last:pb-3.5"
              >
                <Search size={14} className="text-slate-400" strokeWidth={2} />
                <span>{suggestion}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StationSearch;
