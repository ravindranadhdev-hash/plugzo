import React from 'react';
import { motion } from 'framer-motion';
import { X, Search, Clock, MapPin } from 'lucide-react';
import { COLORS, HYDERABAD_AREAS } from '../../constants';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleAreaClick = (area: string) => {
    onSearch(area);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[300] bg-white flex flex-col"
    >
      <div className="p-6 flex items-center gap-4 border-b border-gray-100">
        <div className="relative flex-1">
          <input 
            autoFocus
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Hyderabad Localities..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#1DB954]/20 font-bold"
          />
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button onClick={onClose} className="p-3 bg-gray-50 rounded-2xl text-gray-400">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Recent Discoveries</h4>
          <div className="space-y-4">
            {['Gachibowli', 'T-Hub 2.0', 'RGIA Airport'].map(item => (
              <button 
                key={item}
                onClick={() => handleAreaClick(item)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <div className="p-2 bg-gray-100 rounded-lg text-gray-400"><Clock size={18} /></div>
                <span className="font-bold text-[#0D1E3A]">{item}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Popular Hubs</h4>
          <div className="flex flex-wrap gap-2">
            {HYDERABAD_AREAS.map(area => (
              <button 
                key={area}
                onClick={() => handleAreaClick(area)}
                className="px-5 py-3 rounded-full bg-[#F4FFF8] border border-[#1DB954]/20 text-[#1DB954] font-bold text-sm"
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchOverlay;