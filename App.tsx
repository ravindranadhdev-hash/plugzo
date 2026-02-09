import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import SplitView from './components/Hero/SplitView';
import VehicleShowcase from './components/Vehicle/VehicleShowcase';
import VendorBanner from './components/Registration/VendorBanner';
import BlogGrid from './components/Blog/BlogGrid';
import CarDetailPage from './components/Details/CarDetailPage';
import BlogDetailPage from './components/Details/BlogDetailPage';
import SEO from './components/Common/SEO';
import ErrorBoundary from './components/Common/ErrorBoundary';
import IntelligenceDrawer from './components/Hero/IntelligenceDrawer';
import PlugzoBot from './components/Chat/PlugzoBot';
import { VEHICLES, BLOGS } from './data';
import { Vehicle, BlogPost } from './types';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>(window.location.hash || '#/');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  
  // Isolated Global State for Station Drawer
  const [activeStationId, setActiveStationId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentPath(hash);
      
      if (hash.startsWith('#/vehicle/')) {
        const id = hash.split('/').pop();
        const v = VEHICLES.find(item => item.id === id);
        if (v) setSelectedVehicle(v);
      } else if (hash.startsWith('#/blog/')) {
        const id = hash.split('/').pop();
        const b = BLOGS.find(item => item.id === id);
        if (b) setSelectedBlog(b);
      }
      
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const homeSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Where can I find EV charging stations near me in Hyderabad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NearVolt provides a real-time map of verified EV charging stations in major Hyderabad hubs like Gachibowli, HITEC City, and Banjara Hills."
        }
      }
    ]
  }), []);

  const handleStationSelect = (id: number) => {
    console.log('Selected Station ID:', id);
    setActiveStationId(id);
  };

  const renderContent = () => {
    if (currentPath.startsWith('#/vehicle/')) {
      return selectedVehicle ? <CarDetailPage vehicle={selectedVehicle} /> : <div className="py-40 text-center font-bold">Vehicle Not Found</div>;
    }
    if (currentPath.startsWith('#/blog/')) {
      return selectedBlog ? <BlogDetailPage blog={selectedBlog} /> : <div className="py-40 text-center font-bold">Blog Not Found</div>;
    }

    return (
      <main className="w-full bg-[#F4FFF8] font-inter">
        <SEO 
          title="NearVolt | Elite EV Charging & Network Hyderabad"
          description="Find verified high-speed EV hubs in HITEC City and Gachibowli. Book slots, explore the 2026 fleet, and join the network."
          schema={homeSchema}
        />
        
        {/* HERO: THE INTELLIGENCE HUB */}
        <SplitView 
          activeStationId={activeStationId} 
          onStationSelect={handleStationSelect} 
        />

        {/* REMAINING SECTIONS */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 py-10 space-y-24">
          <section id="vehicles" className="scroll-mt-24 pt-10 pb-4">
            <VehicleShowcase />
          </section>
          
          <section id="vendor" className="scroll-mt-24 py-4">
            <VendorBanner />
          </section>
          
          <section id="blog" className="scroll-mt-24 pt-4 pb-20">
            <BlogGrid />
          </section>
        </div>
      </main>
    );
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen selection:bg-[#1DB954] selection:text-white flex flex-col relative">
        <Navbar />
        <div className="flex-1">
          {renderContent()}
        </div>
        <Footer />

        {/* TOP-LEVEL GLOBAL DRAWER OVERLAY */}
        {activeStationId !== null && (
          <IntelligenceDrawer 
            id={activeStationId} 
            onClose={() => setActiveStationId(null)} 
          />
        )}
        
        {/* Plugzo AI Chatbot */}
        <PlugzoBot />
      </div>
    </ErrorBoundary>
  );
};

export default App;