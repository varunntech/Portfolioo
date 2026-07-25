import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import AboutPage from './components/AboutPage';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubActivity from './components/GitHubActivity';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CursorAndBackground from './components/CursorAndBackground';
import Preloader from './components/Preloader';

/**
 * App - Main portfolio application
 * 
 * Component structure is modular — each section is self-contained.
 * To add backend integration later:
 * 1. Update services/api.js with real API calls
 * 2. Add React Query or SWR for data fetching (optional)
 * 3. Replace placeholder data in src/data/ files with API calls
 */

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  // Initialize dark mode class on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#020205] text-dark-100 transition-colors duration-300 overflow-x-hidden relative">
        <div className="torch-glow" />
        <CursorAndBackground />
        <Navbar setCurrentPage={setCurrentPage} currentPage={currentPage} />

        <main>
        {currentPage === 'home' && (
          <>
            <Hero />
            <About />
            <Projects />
            <GitHubActivity />
            <Experience />
            <Certifications />
            <Reviews />
            <Contact />
          </>
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'skills' && <Skills setCurrentPage={setCurrentPage} />}
      </main>

      <Footer />
      <ScrollToTop />
      </div>
    </>
  );
}

export default App;
