import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * SectionReveal - Wrapper component for scroll-triggered animations
 * Wrap any section content with this to get smooth reveal animations
 * 
 * Usage:
 * <SectionReveal>
 *   <YourContent />
 * </SectionReveal>
 */

const SectionReveal = ({ 
  children, 
  className = '',
  delay = 0,
  direction = 'up', // 'up', 'down', 'left', 'right'
  duration = 0.6
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ 
        duration, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
