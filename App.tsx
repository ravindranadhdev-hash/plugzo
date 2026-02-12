import React, { useState, useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import SplitView from './components/Hero/SplitView';
import VehicleShowcase from './components/Vehicle/VehicleShowcase';
import VendorBanner from './components/Registration/VendorBanner';
import BlogGrid from './components/Blog/BlogGrid';
import CarDetailPage from './components/Details/CarDetailPage';
import BlogDetailPage from './components/Details/BlogDetailPage';
import StationDetailPage from './components/Details/StationDetailPage';
import IntelligenceDrawer from './components/Hero/IntelligenceDrawer';
import PlugzoBot from './components/Chat/PlugzoBot';
import { VEHICLES, BLOGS } from './data';

const App: React.FC = () => {
  const [hash, setHash] = useState(() => typeof window !== 'undefined' ? window.location.hash : '#/');
  const [activeStationId, setActiveStationId] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash || '#/');
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderContent = () => {
  // 1. Safe URL Fallback - Normalize all root variations
  const currentPath = hash === '' || hash === '#' || hash === '#/' ? '#/' : hash;

  // A. Home View (Default) - This must be the priority fallback
  if (currentPath === '#/') {
    return (
      <div className="animate-in fade-in duration-500">
        {/* Pass a flag to indicate we are at root to prevent sorting loops */}
        <SplitView 
          activeStationId={activeStationId} 
          onStationSelect={setActiveStationId} 
          isRoot={true} 
        />
        <VehicleShowcase />
        <VendorBanner />
        <BlogGrid />
      </div>
    );
  }

  try {
    // B. Station Detail
    if (currentPath.startsWith('#/station/')) {
      const id = parseInt(currentPath.replace('#/station/', ''), 10);
      return !isNaN(id) ? <StationDetailPage key={`station-${id}`} stationId={id} /> : <div className="p-20 text-center">Invalid Node</div>;
    }

    // C. Vehicle Detail
    if (currentPath.startsWith('#/vehicle/')) {
      const id = currentPath.split('/').pop();
      const vehicle = (VEHICLES || []).find(v => v.id === id);
      if (vehicle) return <CarDetailPage key={`vehicle-${id}`} vehicle={vehicle} />;
    }

    // D. Blog Detail
    if (currentPath.startsWith('#/blog/')) {
      const id = currentPath.split('/').pop();
      const blog = (BLOGS || []).find(b => b.id === id);
      if (blog) return <BlogDetailPage key={`blog-${id}`} blog={blog} />;
    }
  } catch (e) {
    console.error("Routing error:", e);
  }

  // E. Ultimate fallback - Never let this fail
  return (
    <div className="animate-in fade-in duration-500">
      <SplitView activeStationId={activeStationId} onStationSelect={setActiveStationId} />
      <VehicleShowcase />
      <VendorBanner />
      <BlogGrid />
    </div>
  );
};

  return (
    <div className="min-h-screen bg-[#F4FFF8] flex flex-col relative overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1">
        {/* If renderContent fails for any reason, it won't kill the whole app */}
        {renderContent() || <div className="p-20 text-center">Loading Content...</div>}
      </main>

      <Footer />
      <PlugzoBot />
      
      {/* Safe Drawer Render */}
      {isDesktop && activeStationId !== null && (
        <IntelligenceDrawer 
          key={`drawer-${activeStationId}`} 
          id={activeStationId} 
          onClose={() => setActiveStationId(null)} 
        />
      )}
    </div>
  );
};

export default App;