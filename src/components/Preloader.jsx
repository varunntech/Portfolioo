import { useEffect, useState } from 'react';

/**
 * Preloader - Authentic loading sequence replica from reference website
 * 1. Counts 0% to 100% with status log label cycles
 * 2. Glitch flashes, hides counter
 * 3. Staggered reveal of name "VARUN" (first letter cyan, others white)
 * 4. Fades in role subtitles
 * 5. Splitting panel reveal of portfolio home page
 */
const Preloader = ({ finishLoading }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(1); // 1: counting, 2: glitching, 3: name reveal, 4: splitting, 5: done
  const [label, setLabel] = useState('Initializing...');
  const [glitchActive, setGlitchActive] = useState(false);
  const [revealedLetters, setRevealedLetters] = useState([]);

  const name = "VARUN";
  const subtitle = "data analyst  ·  ml enthusiast  ·  python developer";

  // Stage 1: Progress counter ticking up from 0 to 100
  useEffect(() => {
    if (stage !== 1) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 1;
        
        // Cycle labels every 25% of progress
        if (next === 25) setLabel('Loading assets...');
        if (next === 50) setLabel('Almost ready...');
        if (next === 75) setLabel('Welcome.');
        
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStage(2); // Go to glitch stage
          }, 200);
          return 100;
        }
        return next;
      });
    }, 18); // Ticks up 1% every 18ms

    return () => clearInterval(interval);
  }, [stage]);

  // Stage 2: Glitch flash twice and fade out counter UI
  useEffect(() => {
    if (stage !== 2) return;

    // First flash
    setGlitchActive(true);
    setTimeout(() => {
      setGlitchActive(false);
      
      // Second flash after short delay
      setTimeout(() => {
        setGlitchActive(true);
        setTimeout(() => {
          setGlitchActive(false);
          setStage(3); // Go to name reveal stage
        }, 100);
      }, 120);
    }, 150);
  }, [stage]);

  // Stage 3: Drop name letters down one-by-one, slide up subtitle roles
  useEffect(() => {
    if (stage !== 3) return;

    // Drop letters one-by-one (80ms spacing)
    name.split('').forEach((_, index) => {
      setTimeout(() => {
        setRevealedLetters((prev) => [...prev, index]);
      }, index * 80);
    });

    // Reveal subtitle and trigger split reveal stage after letters drop
    const totalTime = name.length * 80 + 1000;
    const timer = setTimeout(() => {
      setStage(4);
    }, totalTime);

    return () => clearTimeout(timer);
  }, [stage]);

  // Stage 4: Flash once more and split panels to reveal main site content
  useEffect(() => {
    if (stage !== 4) return;

    setGlitchActive(true);
    setTimeout(() => {
      setGlitchActive(false);
      // Wait for panels to split, then clean up preloader state
      setTimeout(() => {
        setStage(5);
        finishLoading();
      }, 850);
    }, 150);
  }, [stage, finishLoading]);

  // Prevent scrolling during preloader mounting
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (stage === 5) return null;

  return (
    <div id="intro-overlay" className="fixed inset-0 z-[99999] pointer-events-auto">
      {/* Scope CSS variables and animations inside a style tag */}
      <style>{`
        #intro-overlay {
          background: transparent;
        }
        
        /* Scanlines overlay */
        #intro-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 245, 255, 0.015) 3px, rgba(0, 245, 255, 0.015) 4px);
          opacity: 0.6;
        }

        /* Split panels */
        .intro-panel {
          position: absolute;
          left: 0;
          width: 100%;
          height: 50%;
          background: #020205; /* Pitch black matching background */
          transition: transform 0.85s cubic-bezier(0.77, 0, 0.175, 1);
          z-index: 2;
        }
        .intro-panel-top {
          top: 0;
          transform-origin: top center;
        }
        .intro-panel-bot {
          bottom: 0;
          transform-origin: bottom center;
        }
        .intro-panel-top.split {
          transform: translateY(-100%);
        }
        .intro-panel-bot.split {
          transform: translateY(100%);
        }

        /* Counter container */
        #intro-counter {
          position: absolute;
          inset: 0;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 20px;
          text-align: center;
          transition: opacity 0.3s ease-out;
        }
        #intro-num {
          font-family: 'Space Grotesk', 'Fira Code', monospace;
          font-size: clamp(4rem, 12vw, 9rem);
          font-weight: 700;
          color: #00f5ff; /* Cyan color */
          line-height: 1;
          text-shadow: 0 0 40px rgba(0, 245, 255, 0.4);
          letter-spacing: -2px;
        }
        #intro-bar-wrap {
          width: 200px;
          height: 2px;
          background: rgba(0, 245, 255, 0.1);
          border-radius: 1px;
          overflow: hidden;
        }
        #intro-bar {
          height: 100%;
          background: linear-gradient(90deg, #00f5ff, #8b5cf6);
          box-shadow: 0 0 8px #00f5ff;
        }
        #intro-label {
          font-family: 'Space Grotesk', monospace;
          font-size: 0.75rem;
          color: rgba(0, 245, 255, 0.5);
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        /* Name reveal container */
        #intro-name-wrap {
          position: absolute;
          inset: 0;
          z-index: 4;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 14px;
          text-align: center;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease-in-out;
        }
        #intro-name-wrap.show {
          opacity: 1;
        }
        .intro-letter {
          display: inline-block;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.2rem, 6vw, 4.5rem);
          font-weight: 800;
          color: #eef2ff; /* White color */
          text-transform: uppercase;
          letter-spacing: 6px;
          transform: translateY(-60px);
          opacity: 0;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
        }
        .intro-letter.drop {
          transform: translateY(0);
          opacity: 1;
        }
        .intro-letter.cyan {
          color: #00f5ff; /* Cyan first letter */
          text-shadow: 0 0 25px rgba(0, 245, 255, 0.6);
        }
        #intro-sub-text {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(0, 245, 255, 0.6);
          letter-spacing: 4px;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(15px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: center;
          width: 100%;
          padding: 0 20px;
        }
        #intro-sub-text.show {
          opacity: 1;
          transform: translateY(0);
        }

        /* Glitch overlay flash */
        #intro-glitch {
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          opacity: 0;
          background: #00f5ff;
          mix-blend-mode: overlay;
        }
        #intro-glitch.flash {
          animation: glitchFlash 0.15s steps(2, end);
        }
        @keyframes glitchFlash {
          0% { opacity: 0.35; transform: translate(-3px, 0); }
          50% { opacity: 0.15; transform: translate(3px, 0); }
          100% { opacity: 0; transform: translate(0, 0); }
        }
      `}</style>

      {/* 1. Split Panels */}
      <div className={`intro-panel intro-panel-top ${stage >= 4 ? 'split' : ''}`} />
      <div className={`intro-panel intro-panel-bot ${stage >= 4 ? 'split' : ''}`} />

      {/* 2. Glitch Flash Overlay */}
      <div id="intro-glitch" className={glitchActive ? 'flash' : ''} />

      {/* 3. Counter Stage */}
      {stage <= 2 && (
        <div id="intro-counter" style={{ opacity: stage === 2 ? 0 : 1 }}>
          <div id="intro-num">{progress}%</div>
          <div id="intro-bar-wrap">
            <div id="intro-bar" style={{ width: `${progress}%` }} />
          </div>
          <div id="intro-label">{label}</div>
        </div>
      )}

      {/* 4. Name Reveal Stage */}
      {stage >= 3 && (
        <div id="intro-name-wrap" className="show" style={{ opacity: stage === 4 ? 0 : 1 }}>
          <div id="intro-letters" className="flex justify-center items-center gap-1">
            {name.split('').map((char, index) => (
              <span
                key={index}
                id={`il${index}`}
                className={`intro-letter ${index === 0 ? 'cyan' : ''} ${revealedLetters.includes(index) ? 'drop' : ''}`}
              >
                {char}
              </span>
            ))}
          </div>
          <div id="intro-sub-text" className={revealedLetters.length === name.length ? 'show' : ''}>
            {subtitle}
          </div>
        </div>
      )}
    </div>
  );
};

export default Preloader;
