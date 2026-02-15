import React, { useState, useEffect } from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import SplitView from './components/Hero/SplitView';
import VehicleShowcase from './components/Vehicle/VehicleShowcase';
import VendorBanner from './components/Registration/VendorBanner';
import BlogGrid from './components/Blog/BlogGrid';
import FAQSection from './components/FAQ/FAQSection';
import EVStockInfo from './components/Stock/EVStockInfo';
import PrivacyPolicy from './components/Legal/PrivacyPolicy';
import TermsOfService from './components/Legal/TermsOfService';
import HelpCenter from './components/Support/HelpCenter';
import Assistance247 from './components/Support/Assistance247';
import FAQs from './components/Support/FAQs';
import EVStationRegistration from './components/Registration/EVStationRegistration';
import CarDetailPage from './components/Details/CarDetailPage';
import BlogDetailPage from './components/Details/BlogDetailPage';
import StationDetailPage from './components/Details/StationDetailPage';
import IntelligenceDrawer from './components/Hero/IntelligenceDrawer';
import PlugzoBot from './components/Chat/PlugzoBot';
import AboutPage from './components/About/AboutPage';
import UpdatesPage from './components/Updates/UpdatesPage';
import IndiaEVPage from './components/IndiaEV/IndiaEVPage';
import CollectionsPage from './components/Collections/CollectionsPage';
import ContactPage from './components/Contact/ContactPage';
import BrandsPage from './components/Brands/BrandsPage';
import { VEHICLES, BLOGS } from './data';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const cleanPath = window.location.pathname.replace(/^\//, '') || 'home';
      return cleanPath;
    }
    return 'home';
  });

  const [activeStationId, setActiveStationId] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      const cleanPath = window.location.pathname.replace(/^\//, '') || 'home';
      setCurrentPath(cleanPath);
    };

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderContent = () => {
    try {
      const normalizedPath =
        currentPath === '' || currentPath === '/' ? 'home' : currentPath;

      // HOME
      if (normalizedPath === 'home') {
        return (
          <>
            <SplitView
              activeStationId={activeStationId}
              onStationSelect={setActiveStationId}
            />
            <VehicleShowcase />
            <VendorBanner />
            <BlogGrid />
            <FAQSection />
            <EVStockInfo />
          </>
        );
      }

      if (normalizedPath === 'about') return <AboutPage />;
      if (normalizedPath === 'updates') return <UpdatesPage />;
      if (normalizedPath === 'india-ev') return <IndiaEVPage />;
      if (normalizedPath === 'collections') return <CollectionsPage />;
      if (normalizedPath === 'brands') return <BrandsPage />;
      if (normalizedPath === 'contact') return <ContactPage />;
      if (normalizedPath === 'privacy') return <PrivacyPolicy />;
      if (normalizedPath === 'terms') return <TermsOfService />;
      if (normalizedPath === 'help') return <HelpCenter />;
      if (normalizedPath === 'assistance') return <Assistance247 />;
      if (normalizedPath === 'faqs') return <FAQs />;
      if (normalizedPath === 'register-station') return <EVStationRegistration />;

      // Station Detail
      if (normalizedPath.startsWith('station/')) {
        const id = parseInt(normalizedPath.replace('station/', ''), 10);
        return !isNaN(id) ? (
          <StationDetailPage key={`station-${id}`} stationId={id} />
        ) : (
          <div className="p-20 text-center">Invalid Station</div>
        );
      }

      // Vehicle Detail
      if (normalizedPath.startsWith('vehicle/')) {
        const id = normalizedPath.split('/').pop();
        const vehicle = (VEHICLES || []).find(v => v.id === id);
        if (vehicle)
          return <CarDetailPage key={`vehicle-${id}`} vehicle={vehicle} />;
      }

      // Blog Detail
      if (normalizedPath.startsWith('blog/')) {
        const id = normalizedPath.split('/').pop();
        const blog = (BLOGS || []).find(b => b.id === id);
        if (blog)
          return <BlogDetailPage key={`blog-${id}`} blog={blog} />;
      }

    } catch (e) {
      console.error('Routing error:', e);
    }

    // Ultimate fallback
    return (
      <div className="animate-in fade-in duration-500">
        <SplitView
          activeStationId={activeStationId}
          onStationSelect={setActiveStationId}
        />
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
        {renderContent() || (
          <div className="p-20 text-center">Loading Content...</div>
        )}
      </main>

      <Footer />
      <PlugzoBot />

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
