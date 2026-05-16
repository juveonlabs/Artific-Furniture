import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import './App.css';
import { EnquireProvider } from './context/EnquireContext';
import EnquireModal from './components/EnquireModal';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import VideoReel from './components/VideoReel';
import StatementBand from './components/StatementBand';
import EthosStrip from './components/EthosStrip';
import CoreValuesSection from './components/CoreValuesSection';
import RecentWorksSection from './components/RecentWorksSection';
import DiningCatalogue from './components/DiningCatalogue';
import SofasCatalogue from './components/SofasCatalogue';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SeatingPage from './pages/SeatingPage';
import CollectionsPage from './pages/CollectionsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AteliersPage from './pages/AteliersPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';

function HomePage() {
  return (
    <>
      <HeroSection />
      <VideoReel />
      <StatementBand />
      <EthosStrip />
      <CoreValuesSection />
      <RecentWorksSection />
      <DiningCatalogue />
      <SofasCatalogue />
      <ContactSection />
      <Footer />
    </>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, duration: 1.4, smoothWheel: true });
    let raf: number;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, [location.pathname]);

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <EnquireProvider>
      <div className="app-container">
        <ScrollProgress />
        <EnquireModal />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/seating" element={<SeatingPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ateliers" element={<AteliersPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
        </Routes>
      </div>
    </EnquireProvider>
  );
}

export default App;
