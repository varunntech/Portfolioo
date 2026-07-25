import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

/**
 * CursorAndBackground - Interactive custom cursor and mouse-following background glowing orb
 */
const CursorAndBackground = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for trailing ring physics
  const springConfig = { damping: 30, stiffness: 280, mass: 0.6 };
  const outerX = useSpring(mouseX, springConfig);
  const outerY = useSpring(mouseY, springConfig);

  // Springs for background spotlight physics (slower, floating drift)
  const bgSpringConfig = { damping: 65, stiffness: 80, mass: 1.2 };
  const bgX = useSpring(mouseX, bgSpringConfig);
  const bgY = useSpring(mouseY, bgSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Expand cursor ring when hovering clickables/inputs
    const handleMouseOver = (e) => {
      const target = e.target;
      const isHoverable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT';
      
      setIsHovered(!!isHoverable);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  // Create high-performance background gradient string matching the spring coordinates
  const backgroundTemplate = useMotionTemplate`radial-gradient(700px circle at ${bgX}px ${bgY}px, rgba(6, 182, 212, 0.12), transparent 80%)`;

  return (
    <>
      {/* 1. Moving Glowing Radial Spotlight Background */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-100 transition-opacity duration-300"
        style={{ background: backgroundTemplate }}
      />

      {/* 2. Custom Hover cursor (disabled on mobile) */}
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Inner Dot */}
            <motion.div
              className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#06b6d4] rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
              style={{
                x: mouseX,
                y: mouseY,
                translateX: '-50%',
                translateY: '-50%'
              }}
              animate={{
                scale: isHovered ? 2.5 : 1
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            />
            {/* Outer Ring */}
            <motion.div
              className="fixed top-0 left-0 w-8 h-8 border border-[#06b6d4]/40 rounded-full pointer-events-none z-50 hidden md:block"
              style={{
                x: outerX,
                y: outerY,
                translateX: '-50%',
                translateY: '-50%'
              }}
              animate={{
                scale: isHovered ? 1.7 : 1,
                borderColor: isHovered ? 'rgba(6, 182, 212, 0.7)' : 'rgba(6, 182, 212, 0.4)',
                backgroundColor: isHovered ? 'rgba(6, 182, 212, 0.08)' : 'rgba(6, 182, 212, 0)'
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CursorAndBackground;
