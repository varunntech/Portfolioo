import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Trophy } from 'lucide-react';
import { timelineEvents } from '../data/timeline';
import SectionReveal from './SectionReveal';

/**
 * Experience & Education Timeline - Vertical animated timeline
 */

const typeConfig = {
  education: { icon: GraduationCap, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  experience: { icon: Briefcase, color: 'bg-accent-500/20 text-accent-400 border-accent-500/30' },
  internship: { icon: Briefcase, color: 'bg-accent-500/20 text-accent-400 border-accent-500/30' },
  certification: { icon: Award, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  achievement: { icon: Trophy, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
};

const Experience = () => {
  return (
    <section id="experience" className="relative py-24 lg:py-32">
      <div className="max-w-5xl mx-auto section-padding">
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
              Journey
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Experience & <span className="text-gradient">Education</span>
            </h2>
            <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto" />
          </div>
        </SectionReveal>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b 
                          from-accent-500/50 via-accent-500/20 to-transparent md:-translate-x-px" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const config = typeConfig[event.type];
              const Icon = config.icon;
              const isLeft = index % 2 === 0;

              return (
                <SectionReveal key={event.id} delay={index * 0.1}>
                  <div className={`relative flex items-start md:items-center 
                                   ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent-500 
                                    shadow-lg shadow-accent-500/30 md:-translate-x-1.5 mt-6 md:mt-0 z-10" />

                    <div className={`ml-12 md:ml-0 md:w-1/2 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="glass rounded-2xl p-6 border border-dark-700/50 
                                   hover:border-accent-500/20 transition-all duration-300"
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center 
                                          border ${config.color}`}>
                            <Icon size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold text-white">{event.title}</h3>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full 
                                               border uppercase tracking-wider ${config.color}`}>
                                {event.type}
                              </span>
                            </div>
                            <p className="text-accent-400 text-sm font-medium">{event.organization}</p>
                            <p className="text-dark-500 text-xs mt-0.5">{event.date} • {event.location}</p>
                          </div>
                        </div>

                        <p className="text-dark-300 text-sm leading-relaxed mb-4">
                          {event.description}
                        </p>

                        {event.highlights && event.highlights.length > 0 && (
                          <ul className="space-y-1.5">
                            {event.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-dark-400">
                                <span className="w-1 h-1 rounded-full bg-accent-500 mt-2 flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    </div>

                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
