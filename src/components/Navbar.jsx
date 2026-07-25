import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import useActiveSection from '../hooks/useActiveSection';

/**
 * Navbar - Sticky glassmorphism navigation with active section highlighting
 * Smooth scroll to sections on click
 */

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ setCurrentPage, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(navLinks.map(link => link.id));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    // Handle About as page navigation
    if (id === 'about') {
      if (setCurrentPage) {
        setCurrentPage('about');
      }
      setIsMobileMenuOpen(false);
      return;
    }
    
    // Handle Skills as page navigation
    if (id === 'skills') {
      if (setCurrentPage) {
        setCurrentPage('skills');
      }
      setIsMobileMenuOpen(false);
      return;
    }
    
    // Handle other sections with scroll (only on home page)
    if (currentPage === 'home') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    } else {
      // If not on home page, go back to home first
      if (setCurrentPage) {
        setCurrentPage('home');
      }
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? 'glass shadow-lg shadow-black/5 py-3' 
            : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-[92vw] mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="font-mono text-xl font-bold tracking-tight text-white flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <span>varun</span>
            <span className="text-[#06b6d4]">.dev_</span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300
                  ${activeSection === link.id
                    ? 'text-accent-400'
                    : 'text-dark-400 hover:text-dark-200 dark:text-dark-400 dark:hover:text-white'
                  }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-accent-500/10 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg bg-dark-800/80 text-dark-200 
                         flex items-center justify-center hover:bg-dark-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div 
              className="absolute inset-0 bg-dark-950/90 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-20 left-4 right-4 bg-dark-900 border border-dark-700 
                         rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`px-4 py-3 rounded-xl text-left font-medium transition-all
                      ${activeSection === link.id
                        ? 'bg-accent-500/10 text-accent-400'
                        : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                      }`}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
