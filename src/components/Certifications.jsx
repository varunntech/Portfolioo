import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '../data/certifications';
import SectionReveal from './SectionReveal';

/**
 * Certifications Section - Grid of certificate cards with verify links
 */

const Certifications = () => {
  return (
    <section id="certifications" className="relative py-24 lg:py-32 bg-dark-900/30">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
              Credentials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="text-gradient">Certifications</span>
            </h2>
            <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mb-6" />
            <p className="text-dark-400 max-w-2xl mx-auto">
              Professional certifications and courses that validate my expertise 
              in data science, analytics, and machine learning.
            </p>
          </div>
        </SectionReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <SectionReveal key={cert.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-6 h-full border border-dark-700/50 
                           hover:border-accent-500/20 transition-all duration-300 
                           flex flex-col group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 
                                  flex items-center justify-center group-hover:bg-accent-500/20 
                                  transition-colors duration-300">
                    <Award className="text-accent-400" size={24} />
                  </div>
                  <span className="text-xs font-medium text-dark-500 bg-dark-800 px-2 py-1 rounded-lg">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-300 
                               transition-colors leading-snug">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 text-sm text-dark-400 mb-4">
                  <span>{cert.issuer}</span>
                  <span className="text-dark-600">•</span>
                  <span>{cert.platform}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                  {cert.skills.map(skill => (
                    <span key={skill} className="px-2 py-0.5 rounded text-[11px] font-medium 
                                               bg-dark-800 text-dark-400 border border-dark-700">
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent-400 
                             hover:text-accent-300 transition-colors group/link"
                >
                  <ExternalLink size={14} />
                  <span>Verify Credential</span>
                  <span className="text-[10px] text-dark-500 font-mono ml-auto">
                    {cert.credentialId}
                  </span>
                </a>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
