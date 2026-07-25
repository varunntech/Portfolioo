import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MessageCircle, ArrowDown, FileText } from 'lucide-react';
import ParticleBackground from './ParticleBackground';

/**
 * Hero Section - Animated landing with typing effect, particles, and CTAs
 */

const roles = [
  'Data Analyst',
  'ML Enthusiast', 
  'Python Developer',
  'Data Science Student'
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/varunntech', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/varun-singh-a226942a9?utm_source=share_via&utm_content=profile&utm_medium=member_ios', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:varunntech@gmail.com', label: 'Email' },
  { icon: MessageCircle, href: 'https://wa.me/916200050859?text=Hi, I saw your portfolio and would like to connect!', label: 'WhatsApp' },
];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentText = roles[roleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentRole(currentText.slice(0, currentRole.length + 1));
        if (currentRole === currentText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentRole(currentText.slice(0, currentRole.length - 1));
        if (currentRole === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentRole, isDeleting, roleIndex]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Varun-Kumar-Resume.pdf';
    link.setAttribute('download', 'Varun-Kumar-Resume.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient (always pitch black) */}
      <div className="absolute inset-0 bg-[#020205] transition-colors duration-300" />

      {/* Animated particles */}
      <ParticleBackground />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Giant Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span className="text-[18vw] font-display font-black text-[#06b6d4]/[0.02] dark:text-white/[0.015] tracking-[0.15em] uppercase leading-none select-none">
          VARUN
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center section-padding max-w-4xl mx-auto">
        {/* Greeting badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                     bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Available for internships & freelance
        </motion.div>

        {/* Welcome Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-xs sm:text-sm font-mono tracking-[0.25em] text-[#00f5ff] uppercase mb-6 flex items-center justify-center gap-2"
        >
          <span>⚡</span> Welcome to my digital space
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tight mb-4"
        >
          <span className="animating-gradient-text">Varun Kumar</span>
        </motion.h1>

        {/* Role with typing effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-dark-300 mb-4 h-10"
        >
          <span className="text-accent-400 font-mono">
            {`> `}{currentRole}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-dark-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          MCA Data Science student passionate about transforming data into insights.
          I build intelligent solutions using Python, Machine Learning, and modern analytics tools.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <button 
            onClick={scrollToProjects} 
            className="px-6 py-3 border border-[#06b6d4] text-[#06b6d4] bg-transparent hover:bg-[#06b6d4]/10 
                       font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 
                       flex items-center gap-2 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] cursor-none"
          >
            View Projects
            <ArrowDown size={18} />
          </button>
          <button 
            onClick={downloadResume} 
            className="px-6 py-3 bg-gradient-to-r from-[#06b6d4]/30 to-[#8b5cf6]/30 border border-[#06b6d4]/40 
                       text-white hover:text-white hover:from-[#06b6d4]/60 hover:to-[#8b5cf6]/60 
                       font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 
                       flex items-center gap-2 shadow-lg shadow-[#06b6d4]/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] cursor-none"
          >
            <FileText size={18} className="text-[#06b6d4]" />
            Download CV
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-4"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-xl bg-dark-800/80 border border-dark-700/50 
                         flex items-center justify-center text-dark-400 
                         hover:text-accent-400 hover:border-accent-500/30 hover:bg-accent-500/5
                         transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              aria-label={social.label}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent" />
    </section>
  );
};

export default Hero;
