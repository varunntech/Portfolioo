import { useState, useEffect } from 'react';

/**
 * Custom hook to track which section is currently in view
 * Used for navbar active state highlighting
 * @param {string[]} sectionIds - Array of section IDs to track
 * @param {number} threshold - Intersection threshold (0-1)
 * @returns {string} - Currently active section ID
 */
export const useActiveSection = (sectionIds, threshold = 0.3) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold, rootMargin: '-80px 0px -60% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sectionIds, threshold]);

  return activeSection;
};

export default useActiveSection;
