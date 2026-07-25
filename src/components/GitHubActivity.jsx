import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, GitFork, Star, Users } from 'lucide-react';
import { fetchGitHubStats, getGitHubStatsUrls } from '../services/api';
import SectionReveal from './SectionReveal';

/**
 * GitHub Activity Section - Stats cards and contribution graph placeholders
 * Ready for github-readme-stats or GitHub API integration
 */

const GitHubActivity = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchGitHubStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to load GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const imageUrls = getGitHubStatsUrls();

  const statCards = [
    { label: 'Repositories', value: stats?.public_repos ?? '--', icon: Github },
    { label: 'Followers', value: stats?.followers ?? '--', icon: Users },
    { label: 'Following', value: stats?.following ?? '--', icon: Users },
    { label: 'Gists', value: stats?.public_gists ?? '--', icon: GitFork },
  ];

  return (
    <section id="github" className="relative py-24 lg:py-32 bg-dark-900/30">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
              Open Source
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              GitHub <span className="text-gradient">Activity</span>
            </h2>
            <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mb-6" />
            <p className="text-dark-400 max-w-2xl mx-auto">
              My open source contributions and coding activity. 
              Replace placeholder images with your real GitHub stats.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {statCards.map((stat, index) => (
            <SectionReveal key={stat.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 text-center border border-dark-700/50 
                           hover:border-accent-500/20 transition-all duration-300"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-accent-500/10 
                                flex items-center justify-center">
                  <stat.icon className="text-accent-400" size={20} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {loading ? (
                    <div className="w-12 h-8 bg-dark-700 rounded animate-pulse mx-auto" />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-sm text-dark-400">{stat.label}</div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <SectionReveal delay={0.1}>
            <div className="glass rounded-2xl p-4 border border-dark-700/50 overflow-hidden">
              <h3 className="text-sm font-medium text-dark-300 mb-4 px-2">GitHub Stats</h3>
              <img 
                src={imageUrls.statsCard} 
                alt="GitHub Stats" 
                className="w-full rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden h-32 bg-dark-800 rounded-lg items-center justify-center text-dark-500 text-sm px-4 text-center">
                GitHub Stats service is temporarily unavailable. Please try again later.
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <div className="glass rounded-2xl p-4 border border-dark-700/50 overflow-hidden">
              <h3 className="text-sm font-medium text-dark-300 mb-4 px-2">Top Languages</h3>
              <img 
                src={imageUrls.topLanguages} 
                alt="Top Languages" 
                className="w-full rounded-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden h-32 bg-dark-800 rounded-lg items-center justify-center text-dark-500 text-sm px-4 text-center">
                GitHub Languages service is temporarily unavailable. Please try again later.
              </div>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.3}>
          <div className="mt-6 glass rounded-2xl p-4 border border-dark-700/50 overflow-hidden">
            <h3 className="text-sm font-medium text-dark-300 mb-4 px-2">Contribution Graph</h3>
            <img 
              src={imageUrls.contributionGraph} 
              alt="Contribution Graph" 
              className="w-full rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden h-48 bg-dark-800 rounded-lg items-center justify-center text-dark-500 text-sm px-4 text-center">
              GitHub Contribution Graph is temporarily unavailable. Please try again later.
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

export default GitHubActivity;
