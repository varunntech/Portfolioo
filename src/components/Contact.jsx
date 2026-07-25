import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Linkedin, Github, Loader2, Star } from 'lucide-react';
import { submitReview } from '../services/api';
import SectionReveal from './SectionReveal';

/**
 * Contact Section - Repurposed as "Leave a Review" form submitting directly to Supabase
 */

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '916200050859';
const WHATSAPP_MESSAGE = 'Hi, I saw your portfolio and would like to connect!';
const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL || 'https://linkedin.com/in/[your-profile]';
const GITHUB_URL = import.meta.env.VITE_GITHUB_URL || 'https://github.com/[your-username]';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', role: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitReview(formData);
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', role: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Something went wrong. Please try again later.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto section-padding">
        <SectionReveal>
          <div className="text-center mb-16">
            <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
              Recommendation Form
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Leave a <span className="text-gradient">Review</span>
            </h2>
            <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto mb-6" />
            <p className="text-dark-400 max-w-2xl mx-auto">
              Share your experience working with me. Submitted reviews are saved securely and will appear live on the portfolio once approved by Varun.
            </p>
          </div>
        </SectionReveal>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-8">
            <SectionReveal delay={0.1}>
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6 border border-dark-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center">
                      <Mail className="text-accent-400" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-dark-400 mb-0.5">Email</p>
                      <a href="mailto:varunntech@gmail.com" 
                         className="text-white font-medium hover:text-accent-400 transition-colors">
                        varunntech@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="glass rounded-2xl p-6 border border-dark-700/50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <MessageCircle className="text-emerald-400" size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-dark-400 mb-0.5">WhatsApp</p>
                      <p className="text-white font-medium">+91 62000 50859</p>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full py-2.5 rounded-lg bg-emerald-600/20 text-emerald-400 
                               border border-emerald-600/30 text-sm font-medium text-center block
                               hover:bg-emerald-600/30 transition-colors"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <MessageCircle size={16} />
                      Chat with me
                    </span>
                  </a>
                </div>

                <div className="glass rounded-2xl p-6 border border-dark-700/50">
                  <p className="text-sm text-dark-400 mb-4">Social Profiles</p>
                  <div className="flex gap-3">
                    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center 
                                  text-dark-400 hover:text-white hover:bg-dark-700 transition-all">
                      <Github size={18} />
                    </a>
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"
                       className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center 
                                  text-dark-400 hover:text-white hover:bg-dark-700 transition-all">
                      <Linkedin size={18} />
                    </a>
                    <a href="mailto:varunntech@gmail.com"
                       className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center 
                                  text-dark-400 hover:text-white hover:bg-dark-700 transition-all">
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>

          <div className="lg:col-span-3">
            <SectionReveal delay={0.2}>
              <div className="glass rounded-2xl p-6 lg:p-8 border border-dark-700/50">
                <h3 className="text-xl font-bold text-white mb-6">Leave a Review</h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 
                                   text-white placeholder-dark-500 focus:outline-none focus:border-accent-500/50 
                                   focus:ring-1 focus:ring-accent-500/50 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 
                                   text-white placeholder-dark-500 focus:outline-none focus:border-accent-500/50 
                                   focus:ring-1 focus:ring-accent-500/50 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-dark-300 mb-2">
                      Designation / Role (Optional)
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 
                                 text-white placeholder-dark-500 focus:outline-none focus:border-accent-500/50 
                                 focus:ring-1 focus:ring-accent-500/50 transition-all"
                      placeholder="CEO at TechCorp or Client"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-dark-300 mb-2">
                      Review Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 
                                 text-white placeholder-dark-500 focus:outline-none focus:border-accent-500/50 
                                 focus:ring-1 focus:ring-accent-500/50 transition-all resize-none"
                      placeholder="Write your review or feedback here..."
                    />
                  </div>

                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl text-sm ${
                        submitStatus.type === 'success' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 py-3.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Star size={18} />
                        Submit Review
                      </>
                    )}
                  </button>
                </form>

              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
