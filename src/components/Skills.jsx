import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { 
  BarChart3, Code2, Brain, Wrench, 
  FileSpreadsheet, Database, PieChart, LayoutDashboard, Filter, TrendingUp,
  Terminal, BarChart, Braces, FileCode, Command,
  Cog, Table, Grid3X3, Layers, Flame, Zap,
  BookOpen, GitBranch, Code, Cloud, Box, Container
} from 'lucide-react';
import { skillCategories } from '../data/skills';
import SectionReveal from './SectionReveal';

/**
 * Skills Section - Categorized skill grid with icons and hover interactions
 * No boring progress bars — visual cards with level indicators
 */

// Icon mapping
const iconMap = {
  BarChart3, Code2, Brain, Wrench,
  FileSpreadsheet, Database, PieChart, LayoutDashboard, Filter, TrendingUp,
  Terminal, BarChart, Braces, FileCode, Command,
  Cog, Table, Grid3X3, Layers, Flame, Zap,
  BookOpen, GitBranch, Code, Cloud, Box, Container
};

const levelColors = {
  'Advanced': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Intermediate': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Beginner': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const levelDots = {
  'Advanced': 3,
  'Intermediate': 2,
  'Beginner': 1,
};

const Skills = ({ setCurrentPage }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories = activeCategory === 'all' 
    ? skillCategories 
    : skillCategories.filter(cat => cat.id === activeCategory);

  return (
    <section id="skills" className="relative py-24 lg:py-32 min-h-screen">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-600/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto section-padding">
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
              My Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Skills & <span className="text-gradient">Technologies</span>
            </h2>
            <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mb-6" />
            <p className="text-dark-400 max-w-2xl mx-auto">
              A comprehensive toolkit built through coursework, projects, and hands-on experience 
              in data science and analytics.
            </p>
          </div>
        </SectionReveal>

        {/* Category Filter */}
        <SectionReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                ${activeCategory === 'all'
                  ? 'bg-accent-600 text-white shadow-lg shadow-accent-600/20'
                  : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700'
                }`}
            >
              All Skills
            </button>
            {skillCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${activeCategory === cat.id
                    ? 'bg-accent-600 text-white shadow-lg shadow-accent-600/20'
                    : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700'
                  }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </SectionReveal>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredCategories.map((category, catIndex) => {
              const CategoryIcon = iconMap[category.icon] || Code2;

              return (
                <SectionReveal key={category.id} delay={catIndex * 0.1}>
                  <div className="glass rounded-2xl p-6 lg:p-8 border border-dark-700/50 
                                  hover:border-accent-500/20 transition-all duration-500">
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent-500/10 border border-accent-500/20 
                                      flex items-center justify-center">
                        <CategoryIcon className="text-accent-400" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{category.title}</h3>
                        <p className="text-sm text-dark-400">{category.description}</p>
                      </div>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {category.skills.map((skill, skillIndex) => {
                        const SkillIcon = iconMap[skill.icon] || Code2;
                        const levelWidth = skill.level === 'Advanced' ? '100%' : skill.level === 'Intermediate' ? '70%' : '40%';
                        const levelColorClass = 
                          skill.level === 'Advanced' ? 'text-emerald-400' : 
                          skill.level === 'Intermediate' ? 'text-amber-400' : 'text-blue-400';

                        return (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: skillIndex * 0.03 }}
                            whileHover={{ y: -2 }}
                            className="group relative p-3.5 rounded-xl bg-dark-800/30 border border-dark-700/20 
                                       hover:border-accent-500/25 hover:bg-dark-800/80 transition-all duration-300 
                                       overflow-hidden cursor-default flex flex-col justify-between h-[72px]"
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-2">
                                <SkillIcon size={16} className="text-dark-400 group-hover:text-accent-400 transition-colors" />
                                <span className="text-xs sm:text-sm font-semibold text-dark-200 group-hover:text-white transition-colors">
                                  {skill.name}
                                </span>
                              </div>
                              <span className={`text-[9px] font-mono font-medium ${levelColorClass}`}>
                                {skill.level}
                              </span>
                            </div>

                            {/* Dynamic progress bar */}
                            <div className="w-full h-1 bg-dark-700/20 rounded-full overflow-hidden mt-2 relative">
                              <div 
                                className="h-full bg-gradient-to-r from-[#06b6d4] to-[#8b5cf6]"
                                style={{ width: levelWidth }}
                              />
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
