import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, MapPin } from 'lucide-react';
import SectionReveal from './SectionReveal';

/**
 * AboutPage - Full dedicated About page with image slider
 */

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

const AboutPage = ({ setCurrentPage }) => {
  const sliderImages = [
    { src: '/about-photo-1.jpg', alt: 'Varun Kumar - Photo 1' },
    { src: '/about-photo-2.jpg', alt: 'Varun Kumar - Photo 2' },
    { src: '/about-photo-3.jpg', alt: 'Varun Kumar - Photo 3' },
    { src: '/about-photo-4.jpg', alt: 'Varun Kumar - Photo 4' }
  ];

  return (
    <section className="relative py-24 lg:py-32 min-h-screen">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setCurrentPage('home')}
          className="mb-8 flex items-center gap-2 text-accent-400 hover:text-accent-300 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Home</span>
        </motion.button>

        {/* Section Header */}
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
              About Me
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              About <span className="text-gradient">Me</span>
            </h1>
            <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto" />
          </div>
        </SectionReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Photo Slider */}
          <SectionReveal direction="left" delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent-500/20 to-accent-700/10 rounded-3xl blur-2xl" />
              <ImageSlider images={sliderImages} />
            </div>
          </SectionReveal>

          {/* Content */}
          <div className="space-y-8">
            <SectionReveal delay={0.2}>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Turning Complex Data into <span className="text-gradient">Clear Insights</span>
              </h3>
              <div className="space-y-4 text-dark-300 leading-relaxed">
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

            {/* Education */}
            <SectionReveal delay={0.3}>
              <div className="glass rounded-xl p-6 border-l-4 border-accent-500">
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

            {/* Location */}
            <SectionReveal delay={0.4}>
              <div className="glass rounded-xl p-6 border-l-4 border-emerald-500">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-emerald-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">From Gopalganj, Bihar</h4>
                    <p className="text-dark-400 text-sm">
                      A place that taught me the values of hard work, perseverance, and staying grounded. 
                      Growing up in a small town has given me a unique perspective on life and technology.
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
