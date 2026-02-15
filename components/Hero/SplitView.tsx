import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowLeft, ChevronLeft } from 'lucide-react';
import { Station } from '../../types';
import { useStations } from '../../hooks/useStations';
import { useUserLocation } from '../../hooks/useUserLocation';
import ChargerCard from './ChargerCard';
import HyderabadMap from '../Map/HyderabadMap';
import StationSearch from './StationSearch';
import LocationPermissionModal from './LocationPermissionModal';
import SearchOverlay from './SearchOverlay';
import MobileHeader from '../Layout/MobileHeader';
import IntelligenceDrawer from './IntelligenceDrawer';

interface SplitViewProps {
  activeStationId: number | null;
  onStationSelect: (id: number) => void;
  isRoot?: boolean;
}

const SplitView: React.FC<SplitViewProps> = ({ activeStationId, onStationSelect, isRoot = false }) => {
  console.log("🎯 SplitView rendering:", { isRoot, activeStationId });
  
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { coords: userLocation, requestLocation: detectLocation } = useUserLocation();

  const apiParams = useMemo(() => {
    const params: any = { search: searchQuery };
    if (userLocation) {
      params.lat = userLocation.lat;
      params.lng = userLocation.lng;
      params.radius = 12; 
    }
    return params;
  }, [userLocation, searchQuery]);

  const { stations, loading } = useStations(apiParams);

  useEffect(() => {
    const hasRequested = localStorage.getItem('nearvolt_location_requested');
    if (!hasRequested) {
      setShowPermissionModal(true);
    } else {
      detectLocation();
    }
  }, []);

  const handleCardClick = (station: Station) => {
    try {
      // Mobile-Only Redirect Logic
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // REDIRECT TO NEW PAGE (No Drawer) - Use clean URL
        window.history.pushState({}, '', `/station/${station.id}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      } else {
        // OPEN DRAWER (Desktop only)
        onStationSelect(station.id); 
      }
    } catch (error) {
      console.error("Navigation sync error:", error);
    }
  };

  const handleMarkerClick = (id: string) => {
    try {
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        // Mobile-Only Redirect Logic
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
          // REDIRECT TO NEW PAGE (No Drawer)
          window.location.hash = `#/station/${numericId}`;
        } else {
          // OPEN DRAWER (Desktop only)
          onStationSelect(numericId);
        }
      }
    } catch (error) {
      console.error("Marker click error:", error);
    }
  };

  return (
    <div className="relative h-screen w-screen max-w-full overflow-hidden flex flex-col bg-[#F4FFF8] no-scrollbar">
      <AnimatePresence>
        {isSearchOpen && (
          <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSearch={setSearchQuery} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPermissionModal && (
          <LocationPermissionModal onDetect={detectLocation} onDeny={() => { setShowPermissionModal(false); localStorage.setItem('nearvolt_location_requested', 'true'); }} />
        )}
      </AnimatePresence>

      {/* BACKGROUND CONTENT */}
      <div 
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-500 ease-in-out w-full bg-[#F4FFF8] ${
          activeStationId ? 'blur-md grayscale-[0.5] brightness-[0.5] pointer-events-none' : ''
        }`}
      >
        {/* MOBILE VIEW */}
        <div className="md:hidden flex-1 w-full overflow-hidden relative">
          <MobileHeader 
            onSearchClick={() => setIsSearchOpen(true)} 
          />
          
          <AnimatePresence mode="wait">
            {mobileView === 'list' ? (
              <motion.div 
                key="mobile-list" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="h-full w-full flex flex-col bg-[#F4FFF8]"
              >
                {/* Scrollable list area - pt-20 accounts for header h-16 + small gap */}
                <div 
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto px-6 pb-32 pt-20 mt-[env(safe-area-inset-top)] no-scrollbar scroll-smooth"
                >
                  <div className="mb-6 px-2 mt-4">
            <h2 className="text-2xl font-semibold tracking-tight text-[#1E1E1E]">Elite Hubs</h2>
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Verified Grid Nodes</p>
                  </div>
                  {loading ? (
                    <div className="flex flex-col items-center py-24 gap-4">
                      <Loader2 className="animate-spin text-[#1DB954]" size={48} />
                    </div>
                  ) : stations.length === 0 ? (
                    <div className="flex flex-col items-center py-24 gap-4 text-center">
                      <div className="w-16 h-16 bg-[#F4FFF8] rounded-full flex items-center justify-center mb-4">
                        <MapPin size={24} className="text-[#1DB954]" />
                      </div>
                      <h3 className="text-lg font-semibold text-[#0D1E3A]">No stations available</h3>
                      <p className="text-sm text-gray-500 px-8">Check your connection or try again later</p>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {stations.map((station) => (
                        <ChargerCard key={station.id} station={station} onClick={() => handleCardClick(station)} />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Mobile Map Toggle Button */}
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[90]">
                     <button 
                     onClick={() => setMobileView('map')}
                     className="px-6 py-3 bg-[#0D1E3A] text-white rounded-full font-semibold text-sm uppercase tracking-wide shadow-2xl shadow-[#0D1E3A]/40 flex items-center gap-2"
                   >
                     <MapPin size={16} className="text-[#1DB954]" /> Open Map View
                   </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="mobile-map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full relative">
                <button 
                  onClick={() => setMobileView('list')}
                  className="absolute top-24 left-6 mt-[env(safe-area-inset-top)] z-[200] flex items-center gap-2 bg-white/95 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl text-[#0D1E3A] font-bold border border-white/40 font-sans"
                >
                  <ArrowLeft size={18} /> 
                  <span className="text-xs uppercase tracking-wide">Back to List</span>
                </button>
                <HyderabadMap activeChargerId={activeStationId?.toString()} userLocation={userLocation} stations={stations} onMarkerClick={handleMarkerClick} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:flex flex-1 w-full bg-white overflow-hidden pt-20">
          <aside className={`${
            isSidebarCollapsed ? 'w-[60px]' : 'w-[400px] lg:w-[450px]'
          } flex flex-col bg-white border-r border-gray-100 relative z-30 overflow-hidden shadow-xl shadow-gray-100/20 transition-all duration-300`}>
            <div className="p-6 pb-2">
              <div className="flex items-center justify-between mb-3">
                {!isSidebarCollapsed && (
                  <h2 className="text-3xl font-semibold tracking-tight text-[#1E1E1E] italic">Elite Hubs.</h2>
                )}
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors ml-auto"
                >
                  <ChevronLeft className={`transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} size={20} />
                </button>
              </div>
              
              {/* Integrated Search Bar - Only show when not collapsed */}
              {!isSidebarCollapsed && (
                <StationSearch 
                  onSearch={setSearchQuery} 
                  suggestions={['Gachibowli', 'HITEC City', 'Madhapur', 'Kondapur', 'Financial District', 'Banjara Hills', 'Jubilee Hills', 'Begumpet']}
                />
              )}
            </div>

            {/* Station List - Only show when not collapsed */}
            {!isSidebarCollapsed && (
              <div className="flex-1 overflow-y-auto p-6 pt-2 space-y-4 scroll-hide no-scrollbar">
                {loading ? (
                  <div className="py-20 flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-[#1DB954]" size={40} />
                  </div>
                ) : stations.length === 0 ? (
                  <div className="py-20 flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 bg-[#F4FFF8] rounded-full flex items-center justify-center mb-4">
                      <MapPin size={24} className="text-[#1DB954]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#0D1E3A]">No stations available</h3>
                    <p className="text-sm text-gray-500">Check your connection or try again later</p>
                  </div>
                ) : (
                  <>
                    {stations.map((station) => (
                      <motion.div
                        key={station.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      >
                        <ChargerCard station={station} onClick={() => handleCardClick(station)} />
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            )}
          </aside>

          <main className={`${
            isSidebarCollapsed ? 'flex-1 w-full' : 'flex-1'
          } relative bg-[#F4FFF8] overflow-hidden`}>
             <HyderabadMap activeChargerId={activeStationId?.toString()} userLocation={userLocation} stations={stations} onMarkerClick={handleMarkerClick} />
          </main>
          
          {/* DESKTOP ONLY: GMB DRAWER WITH KEY PROP */}
          <IntelligenceDrawer 
            key={activeStationId} 
            id={activeStationId} 
            onClose={() => onStationSelect(null)} 
          />
        </div>
      </div>
    </div>
  );
};

const MapPin = ({ size, className }: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default SplitView;