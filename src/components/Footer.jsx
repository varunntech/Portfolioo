import { Heart } from 'lucide-react';

/**
 * Footer - Simple, clean footer with attribution
 */

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-800/50 py-8 bg-dark-950">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-dark-400">
            <span className="font-bold text-white">VK</span>
            <span>•</span>
            <span>Varun Kumar</span>
          </div>

          <p className="text-sm text-dark-500 flex items-center gap-1">
            Built with <Heart size={14} className="text-red-500 fill-red-500" /> using React & Tailwind
          </p>

          <p className="text-sm text-dark-500">
            © {currentYear} All rights reserved.
          </p>
        </div>

        {/* Avengers Quote & Hidden Page Link */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <p className="text-sm text-dark-400 italic">"Avengers… Assemble."</p>
          <a
            href="/unlisted.html"
            className="text-2xl hover:scale-125 transition-transform cursor-pointer"
            title="Click for a surprise! 👀"
          >
            👀
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
