import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Youtube, Instagram, Heart, Coffee, ShieldAlert, Cpu } from 'lucide-react';
import SectionReveal from './SectionReveal';

// Reusable text scrambling animator component
const ScrambledText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = '!<>-_\\/[]{}—=+*^?#________';

  useEffect(() => {
    let isMounted = true;
    const startTimeout = setTimeout(() => {
      let frame = 0;
      const targetText = text;
      const length = targetText.length;
      const queue = Array.from({ length }, (_, i) => ({
        to: targetText[i],
        start: Math.floor(Math.random() * 15),
        end: Math.floor(Math.random() * 20) + 12,
        char: ''
      }));

      const tick = () => {
        if (!isMounted) return;
        let output = '';
        let complete = 0;

        for (let i = 0; i < length; i++) {
          const { to, start, end } = queue[i];
          if (frame >= end) {
            complete++;
            output += to;
          } else if (frame >= start) {
            if (Math.random() < 0.3 || !queue[i].char) {
              queue[i].char = chars[Math.floor(Math.random() * chars.length)];
            }
            output += queue[i].char;
          } else {
            output += '';
          }
        }

        setDisplayText(output);

        if (complete < length) {
          requestAnimationFrame(tick);
          frame++;
        }
      };

      tick();
    }, delay);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
    };
  }, [text, delay]);

  return <span className="font-mono">{displayText}</span>;
};

const AboutMePage = ({ onBackToHome }) => {
  // Scroll to top of the page on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const photos = [
    { src: '/about-photo-1.jpg', caption: 'Cafe vibes ☕', tilt: 'rotate-[-3deg]' },
    { src: '/about-photo-2.jpg', caption: 'Outdoors relax 🍃', tilt: 'rotate-[2.5deg]' },
    { src: '/about-photo-3.jpg', caption: 'Classy look 🕴️', tilt: 'rotate-[1.8deg]' },
    { src: '/about-photo-4.jpg', caption: 'Farewell award 🏆', tilt: 'rotate-[-2.2deg]' },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden min-h-screen">
      {/* Background accent blobs */}
      <div className="absolute top-[10%] right-[-100px] w-96 h-96 bg-accent-600/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[20%] left-[-150px] w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-3xl" />

      <div className="max-w-[92vw] mx-auto px-4 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-12">
          <button 
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-800/60 border border-dark-700/50 
                       text-sm text-dark-300 hover:text-[#06b6d4] hover:border-[#06b6d4]/30 transition-all duration-300 cursor-none"
          >
            ← Back to Home
          </button>
        </div>

        {/* Section Title with Decrypt animation */}
        <div className="mb-16">
          <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-2 block font-mono">
            // Personal Profile
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            <ScrambledText text="ABOUT ME" delay={150} />
          </h2>
          <div className="w-20 h-1 bg-accent-500 rounded-full mt-4" />
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Biography Text */}
          <div className="lg:col-span-7 space-y-8">
            <SectionReveal delay={0.1}>
              <div className="space-y-6 text-dark-300 leading-relaxed text-base">
                <p className="text-lg text-white font-medium">
                  Hey! I'm <span className="text-gradient font-bold">Varun Kumar</span>, a developer, researcher, and content creator currently pursuing my Master of Computer Applications (MCA) in Data Science at Chandigarh University.
                </p>
                <p>
                  My journey is driven by an intense curiosity about data. I love studying how large-scale models learn, finding insights in complex databases, and engineering robust analytics pipelines. I aim to build smart systems as a future <strong className="text-white">AI ML Architect</strong>.
                </p>
                <p>
                  Outside of coding terminals, I lead digital operations for our family bus booking enterprise, writing custom portals to automate seat scheduling.
                </p>
              </div>
            </SectionReveal>

            {/* Hobbies / Editing Section */}
            <SectionReveal delay={0.2}>
              <div className="glass rounded-2xl p-6 border border-dark-700/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Youtube className="text-red-500" size={22} />
                  Video Editing & Subculture Hobbies
                </h3>
                <p className="text-dark-300 text-sm mb-4 leading-relaxed">
                  When I am not training models or querying databases, I run digital graphic edit handles under Optimus Prime's original title:
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a 
                    href="https://www.youtube.com/@orionpax_xd" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40 transition-all flex flex-col gap-1 cursor-none"
                  >
                    <span className="text-xs font-semibold text-red-400 tracking-wider font-mono">YOUTUBE CHANNEL</span>
                    <span className="text-sm font-bold text-white flex items-center justify-between">
                      @orionpax_xd
                      <span className="text-[10px] bg-red-500/20 px-2 py-0.5 rounded text-red-400">7K+ Subs</span>
                    </span>
                  </a>

                  <a 
                    href="https://www.instagram.com/savage_editzx/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 hover:bg-purple-500/10 hover:border-purple-500/40 transition-all flex flex-col gap-1 cursor-none"
                  >
                    <span className="text-xs font-semibold text-purple-400 tracking-wider font-mono">INSTAGRAM</span>
                    <span className="text-sm font-bold text-white flex items-center justify-between">
                      @savage_editzx
                      <span className="text-[10px] bg-purple-500/20 px-2 py-0.5 rounded text-purple-400">Creative Reels</span>
                    </span>
                  </a>
                </div>
              </div>
            </SectionReveal>

            {/* Quick Fact Grid */}
            <SectionReveal delay={0.3}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="glass p-4 rounded-xl text-center border border-dark-700/50">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center mx-auto mb-2">
                    <Heart className="text-orange-400" size={18} />
                  </div>
                  <span className="block text-[10px] text-dark-400 font-semibold uppercase tracking-wider font-mono">ANIMAL</span>
                  <span className="text-sm font-bold text-white">Lion Fan 🦁</span>
                </div>

                <div className="glass p-4 rounded-xl text-center border border-dark-700/50">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center mx-auto mb-2">
                    <Cpu className="text-emerald-400" size={18} />
                  </div>
                  <span className="block text-[10px] text-dark-400 font-semibold uppercase tracking-wider font-mono">DREAM</span>
                  <span className="text-xs font-bold text-white leading-tight">AI ML Architect</span>
                </div>

                <div className="glass p-4 rounded-xl text-center border border-dark-700/50">
                  <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center mx-auto mb-2">
                    <Coffee className="text-[#8b5cf6]" size={18} />
                  </div>
                  <span className="block text-[10px] text-dark-400 font-semibold uppercase tracking-wider font-mono">COMFORT</span>
                  <span className="text-sm font-bold text-white">Coffee ☕</span>
                </div>

                <div className="glass p-4 rounded-xl text-center border border-dark-700/50">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center mx-auto mb-2">
                    <ShieldAlert className="text-red-400" size={18} />
                  </div>
                  <span className="block text-[10px] text-dark-400 font-semibold uppercase tracking-wider font-mono">STRESS</span>
                  <span className="text-xs font-bold text-white leading-tight">Future Jobs</span>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* RIGHT COLUMN: Polaroid Grid of Photos */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                className={`glass p-3 pb-6 rounded-xl bg-white border border-gray-200 shadow-2xl relative transition-shadow duration-300 hover:shadow-accent-500/15 ${photo.tilt}`}
              >
                {/* Polaroid Photo Frame */}
                <div className="aspect-[3/4] overflow-hidden rounded-lg bg-dark-900 mb-3 border border-dark-800">
                  <img 
                    src={photo.src} 
                    alt={photo.caption} 
                    className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                {/* Caption */}
                <div className="text-center font-serif text-sm font-semibold text-gray-800 tracking-tight py-1 font-mono italic">
                  {photo.caption}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutMePage;
