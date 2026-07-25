import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Award, Github, FolderOpen } from 'lucide-react';
import SectionReveal from './SectionReveal';
import { projects } from '../data/projects';
import { certifications } from '../data/certifications';

/**
 * About Section - Bio, education highlight, and animated stat counters
 */

// Letter shuffle animation component
const LetterShuffle = ({ text, inView }) => {
  const [displayText, setDisplayText] = useState(text);
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  useEffect(() => {
    if (!inView) {
      setDisplayText(text);
      return;
    }

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((letter, index) => {
        if (index < iterations) {
          return text[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      }).join(''));
      
      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 1/3;
    }, 30);

    return () => clearInterval(interval);
  }, [inView, text]);

  return <span>{displayText}</span>;
};

// Image slider component
const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-dark-800 border border-dark-700/50">
      {images.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: index === currentIndex ? 1 : 0,
            x: index === currentIndex ? 0 : index > currentIndex ? 100 : -100
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-900/80 text-white flex items-center justify-center hover:bg-dark-800 transition-colors z-10"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-dark-900/80 text-white flex items-center justify-center hover:bg-dark-800 transition-colors z-10"
      >
        →
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-accent-400 w-6' : 'bg-dark-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Animated counter component
const AnimatedCounter = ({ value, suffix, inView }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const frameRef = useRef();

  useEffect(() => {
    if (!inView) return;

    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      countRef.current = Math.floor(easeOut * value);
      setCount(countRef.current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameRef.current);
  }, [inView, value]);

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const About = ({ showMoreAbout = false }) => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' });
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' });

  const sliderImages = [
    { src: '/varun-profile.jpg', alt: 'Varun Kumar' },
    { src: '/varun-profile-2.jpg', alt: 'Varun Kumar - Professional' },
    { src: '/varun-profile-3.jpg', alt: 'Varun Kumar - Casual' },
    { src: '/varun-profile-4.jpg', alt: 'Varun Kumar - Portrait' }
  ];

  // Dynamically compute stats from your actual data files
  const projectsCount = projects ? projects.length : 0;
  const certificationsCount = certifications ? certifications.length : 0;
  const yearsExperience = Math.max(2, new Date().getFullYear() - 2024); // Dynamically grows relative to 2024 (e.g. 2026 - 2024 = 2)

  const stats = [
    { icon: FolderOpen, value: projectsCount, suffix: '', label: 'Projects Completed' },
    { icon: Award, value: certificationsCount, suffix: '', label: 'Certifications' },
    { icon: Github, value: 500, suffix: '+', label: 'GitHub Contributions' },
    { icon: BookOpen, value: yearsExperience, suffix: '', label: 'Years of Experience' },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Section Header */}
        <SectionReveal>
          <div ref={headerRef} className="text-center mb-16">
            <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Who I <span className="text-gradient">Am</span>
            </h2>
            <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto" />
          </div>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo / Visual */}
          <SectionReveal direction="left" delay={0.1}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-500/20 to-accent-700/10 rounded-3xl blur-2xl" />

              {/* Photo placeholder */}
              <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden 
                              bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700/50
                              group shadow-2xl">
                <img 
                  src="/varun-profile.jpg" 
                  alt="Varun Kumar" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -right-4 lg:right-8 glass rounded-xl px-4 py-3 
                            border border-accent-500/20 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-medium text-dark-200">MCA Data Science</span>
                </div>
              </motion.div>
            </div>
          </SectionReveal>

          {/* Bio Content */}
          <div>
            <SectionReveal delay={0.2}>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Turning Complex Data into <span className="text-gradient">Clear Insights</span>
              </h3>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <div className="space-y-4 text-dark-300 leading-relaxed mb-8">
                <p>
                  I'm Varun Kumar, a passionate Data Analyst and MCA Data Science student 
                  with a strong foundation in statistical analysis, machine learning, and data visualization. 
                  I enjoy uncovering patterns in data and building predictive models that solve real-world problems.
                </p>
                <p>
                  My journey in data science began with curiosity about how algorithms can learn from data. 
                  Today, I work with Python, SQL, Power BI, and modern ML frameworks to transform raw data 
                  into actionable business intelligence.
                </p>
                <p>
                  When I'm not analyzing data, you'll find me exploring new ML research papers, 
                  contributing to open-source projects, or mentoring peers in data science fundamentals.
                </p>
              </div>
            </SectionReveal>

            {/* Education Highlight */}
            <SectionReveal delay={0.4}>
              <div className="glass rounded-xl p-6 mb-8 border-l-4 border-accent-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent-500/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="text-accent-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Master of Computer Applications (MCA)</h4>
                    <p className="text-accent-400 text-sm font-medium mb-1">Specialization: Data Science</p>
                    <p className="text-dark-400 text-sm">Chandigarh University • 2026 – 2028</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>

        {/* Stats Counter */}
        <div ref={statsRef} className="mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <SectionReveal key={stat.label} delay={0.1 * index}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass rounded-2xl p-6 text-center border border-dark-700/50 
                             hover:border-accent-500/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent-500/10 
                                  flex items-center justify-center">
                    <stat.icon className="text-accent-400" size={24} />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      inView={statsInView} 
                    />
                  </div>
                  <div className="text-sm text-dark-400">{stat.label}</div>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>

        {/* More About Me Section - Only shows when About is clicked */}
        {showMoreAbout && (
          <div className="mt-24">
            <SectionReveal>
              <div className="text-center mb-12">
                <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
                  Personal
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  More <span className="text-gradient">About Me</span>
                </h2>
                <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto" />
              </div>
            </SectionReveal>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <SectionReveal direction="left" delay={0.1}>
                <div className="glass rounded-2xl p-8 border border-dark-700/50">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🎓</span> Education Journey
                  </h3>
                  <div className="space-y-4 text-dark-300">
                    <p>
                      Currently pursuing my Master of Computer Applications (MCA) with specialization in Data Science. 
                      My academic journey has been driven by a deep passion for understanding how data can be transformed 
                      into meaningful insights that drive real-world decisions.
                    </p>
                    <p>
                      From the basics of programming to advanced machine learning algorithms, I've built a strong 
                      foundation that allows me to tackle complex data challenges with confidence and creativity.
                    </p>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal direction="right" delay={0.2}>
                <div className="glass rounded-2xl p-8 border border-dark-700/50">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🌍</span> My Roots
                  </h3>
                  <div className="space-y-4 text-dark-300">
                    <p>
                      I come from Gopalganj, Bihar - a place that taught me the values of hard work, perseverance, 
                      and staying grounded. Growing up in a small town has given me a unique perspective on life 
                      and technology.
                    </p>
                    <p>
                      These roots keep me humble and remind me that technology should ultimately serve people 
                      and solve real problems, regardless of where they come from.
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
