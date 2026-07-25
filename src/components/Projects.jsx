import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, ArrowUpRight, Filter } from 'lucide-react';
import { projects, projectCategories } from '../data/projects';
import SectionReveal from './SectionReveal';

/**
 * Projects Section - Filterable grid with featured case study
 * Projects data is imported from data/projects.js for easy editing
 */

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const featuredProject = projects.find(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured || activeFilter !== 'all');

  return (
    <section id="projects" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Section Header */}
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
              Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mb-6" />
            <p className="text-dark-400 max-w-2xl mx-auto">
              A selection of my best work in data analysis, machine learning, and web development.
              Each project represents a unique challenge and learning opportunity.
            </p>
          </div>
        </SectionReveal>

        {/* Filter Buttons */}
        <SectionReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {projectCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2
                  ${activeFilter === cat.id
                    ? 'bg-accent-600 text-white shadow-lg shadow-accent-600/20'
                    : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700'
                  }`}
              >
                {cat.id === 'all' && <Filter size={14} />}
                {cat.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Featured Project (Netflix) - Only show when 'all' or 'data-analysis' is selected */}
        <AnimatePresence>
          {featuredProject && (activeFilter === 'all' || activeFilter === featuredProject.category) && (
            <SectionReveal>
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mb-12"
              >
                <div className="glass rounded-2xl overflow-hidden border border-accent-500/20 
                                hover:border-accent-500/40 transition-all duration-500 group">
                  <div className="grid lg:grid-cols-2">
                    {/* Image/Thumbnail */}
                    <div className="relative h-64 lg:h-full min-h-[320px] bg-dark-900 overflow-hidden flex items-center justify-center border-r border-dark-800/30">
                      <img 
                        src={featuredProject.thumbnail} 
                        alt={featuredProject.title} 
                        className="w-full h-full object-cover lg:object-contain transition-transform duration-750 group-hover:scale-[1.02]"
                      />
                      {/* Subtle overlay gradient for mobile view */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent lg:hidden pointer-events-none" />
                      
                      {/* Floating badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                                         bg-accent-600 text-white text-xs font-semibold shadow-lg shadow-accent-600/20 border border-accent-500/30">
                          <Star size={12} fill="currentColor" />
                          Featured Case Study
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-10">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-accent-300 transition-colors">
                        {featuredProject.title}
                      </h3>
                      <p className="text-dark-300 leading-relaxed mb-6">
                        {featuredProject.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {Object.entries(featuredProject.stats || {}).map(([key, value]) => (
                          <div key={key} className="text-center p-3 rounded-lg bg-dark-800/50">
                            <div className="text-lg font-bold text-accent-400">{value}</div>
                            <div className="text-xs text-dark-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {featuredProject.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium 
                                                     bg-accent-500/10 text-accent-400 border border-accent-500/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <a
                          href={featuredProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex items-center gap-2 text-sm"
                        >
                          <Github size={16} />
                          View Code
                        </a>
                        {featuredProject.liveUrl && (
                          <a
                            href={featuredProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline flex items-center gap-2 text-sm"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SectionReveal>
          )}
        </AnimatePresence>

        {/* Regular Projects Grid */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {regularProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="glass rounded-2xl overflow-hidden h-full card-hover group">
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-dark-900 overflow-hidden flex items-center justify-center">
                    {project.thumbnail ? (
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] 
                                        from-accent-500/20 to-transparent" />
                        <span className="text-4xl opacity-50 group-hover:scale-110 transition-transform duration-500">
                          {project.category === 'data-analysis' ? '📊' : 
                           project.category === 'machine-learning' ? '🤖' : '💻'}
                        </span>
                      </>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-accent-950/80 opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-300 flex items-center justify-center gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center
                                   text-white hover:bg-accent-500 hover:scale-110 transition-all duration-300"
                        aria-label="View GitHub"
                      >
                        <Github size={18} />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center
                                     text-white hover:bg-accent-500 hover:scale-110 transition-all duration-300"
                          aria-label="View Live Demo"
                        >
                          <ArrowUpRight size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-dark-400 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium 
                                                   bg-dark-800 text-dark-400 border border-dark-700">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium text-dark-500">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-dark-400 hover:text-accent-400 transition-colors 
                                   flex items-center gap-1"
                      >
                        <Github size={14} />
                        Code
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-dark-400 hover:text-accent-400 transition-colors 
                                     flex items-center gap-1"
                        >
                          <ExternalLink size={14} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
