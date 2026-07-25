import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, Plus, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { fetchApprovedReviews } from '../services/api';
import SectionReveal from './SectionReveal';

/**
 * Reviews / Testimonials Section - Displays approved reviews with pagination (Show More)
 * Smooth-scrolls to the Contact section for new submissions
 */
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  // Load reviews on mount
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchApprovedReviews();
        setReviews(data);
      } catch (error) {
        console.error('Failed to load reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, []);

  const scrollToSubmitForm = () => {
    const formSection = document.getElementById('contact');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Slice list to show only 6 initially
  const visibleReviews = showAll ? reviews : reviews.slice(0, 6);

  return (
    <section id="reviews" className="relative py-24 lg:py-32 bg-dark-900/10">
      <div className="max-w-7xl mx-auto section-padding">
        {/* Section Header */}
        <SectionReveal>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
            <div className="text-center sm:text-left">
              <span className="text-accent-400 text-sm font-semibold tracking-wider uppercase mb-2 block">
                Recommendations
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Client <span className="text-gradient">Reviews</span>
              </h2>
              <div className="w-20 h-1 bg-accent-500 rounded-full mx-auto sm:mx-0" />
            </div>

            <button
              onClick={scrollToSubmitForm}
              className="btn-primary flex items-center gap-2 text-sm shadow-md"
            >
              <Plus size={16} />
              Write a Review
            </button>
          </div>
        </SectionReveal>

        {/* Reviews Listing */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-accent-500" size={32} />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 glass rounded-2xl border border-dark-700/50">
            <MessageSquare className="mx-auto text-dark-500 mb-4" size={40} />
            <h3 className="text-lg font-semibold text-white mb-1">No Reviews Yet</h3>
            <p className="text-dark-400 text-sm mb-6 max-w-sm mx-auto">
              Be the first to share your experience working with me.
            </p>
            <button
              onClick={scrollToSubmitForm}
              className="btn-outline flex items-center gap-2 mx-auto text-xs py-2 px-4"
            >
              <Plus size={14} />
              Submit Review
            </button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {visibleReviews.map((review, index) => (
                  <SectionReveal key={review.id} delay={index * 0.05}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      layout
                      className="glass rounded-2xl p-6 border border-dark-700/50 h-full flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1.5 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                          ))}
                        </div>

                        <p className="text-dark-300 text-sm leading-relaxed mb-6 italic">
                          &quot;{review.message}&quot;
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-dark-800/40 pt-4 mt-auto">
                        <div>
                          <h4 className="font-bold text-white text-sm">{review.name}</h4>
                          {review.role && (
                            <p className="text-xs text-dark-400 mt-0.5">{review.role}</p>
                          )}
                        </div>
                        <span className="text-[10px] text-dark-500">
                          {new Date(review.created_at).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                    </motion.div>
                  </SectionReveal>
                ))}
              </AnimatePresence>
            </div>

            {/* Show More/Less Button */}
            {reviews.length > 6 && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="btn-outline flex items-center gap-2 text-sm px-6 py-3 border border-dark-700/50 hover:border-accent-500/30"
                >
                  {showAll ? (
                    <>
                      <span>Show Less</span>
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      <span>Show More</span>
                      <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Reviews;
