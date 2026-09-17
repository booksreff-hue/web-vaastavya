import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCarousel } from '../../hooks/useCarousel';
import CarouselDots from '../ui/CarouselDots';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease = [0.16, 1, 0.3, 1];

const UNSPLASH = 'https://images.unsplash.com';

const heroSlides = [
  {
    id: 1,
    title: 'Modern Architecture',
    subtitle: 'Innovative design solutions that transform skylines',
    image: `${UNSPLASH}/photo-1600596542815-ffad4c1539a9?w=1920&q=85`,
  },
  {
    id: 2,
    title: 'Sustainable Living',
    subtitle: 'Eco-friendly spaces that endure for generations',
    image: `${UNSPLASH}/photo-1600585154526-990dced4db0d?w=1920&q=85`,
  },
  {
    id: 3,
    title: 'Commercial Excellence',
    subtitle: 'Redefining workspaces for the future',
    image: `${UNSPLASH}/photo-1600573472550-8090b5e0745e?w=1920&q=85`,
  },
];

function LetterStagger({ text, className }) {
  const letters = text.split('');
  return (
    <span className={className}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="hero-letter"
          initial={prefersReduced ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReduced ? 0 : 0.5,
            delay: prefersReduced ? 0 : i * 0.04,
            ease: 'easeOut',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
      <style>{`.hero-letter { display: inline-block; }`}</style>
    </span>
  );
}

export default function Hero({ id }) {
  const { current, goTo, next, prev, setIsPaused } = useCarousel(heroSlides, {
    autoAdvance: true,
    interval: 5000,
  });

  const slide = heroSlides[current];

  const handleNext = useCallback(() => next(), [next]);
  const handlePrev = useCallback(() => prev(), [prev]);

  return (
    <section id={id} className="hero" aria-labelledby="hero-title">
      <AnimatePresence mode="wait">
        <motion.div
          className="hero-slide"
          key={slide.id}
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.8, ease }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="hero-bg"
            loading="eager"
          />
          <div className="hero-overlay" />
        </motion.div>
      </AnimatePresence>

      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-eyebrow">Architecture & Interior Design</span>
          <h1 id="hero-title" className="hero-title">
            <LetterStagger text="Crafting Spaces. Creating Legacies." className="hero-title-stagger" />
          </h1>
          <AnimatePresence mode="wait">
            <motion.p
              key={slide.id}
              className="hero-subtitle"
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: prefersReduced ? 0 : 0.5, ease }}
            >
              {slide.subtitle}
            </motion.p>
          </AnimatePresence>
          <div className="hero-cta-group">
            <a href="#contact" className="hero-cta">
              <span>Start a Project</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <button
        className="hero-arrow hero-arrow--prev"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      <button
        className="hero-arrow hero-arrow--next"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      <CarouselDots total={heroSlides.length} active={current} onDotClick={goTo} />

      <style>{`
        .hero {
          position: relative;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
        }
        .hero-slide {
          position: absolute;
          inset: 0;
        }
        .hero-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(10, 10, 10, 0.45) 0%,
            rgba(10, 10, 10, 0.25) 50%,
            rgba(10, 10, 10, 0.15) 100%
          );
        }
        .hero-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--space-md);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--grid-gutter);
          align-items: center;
        }
        .hero-text {
          color: var(--color-white);
        }
        .hero-eyebrow {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: rgba(255,255,255,0.7);
          margin-bottom: var(--space-md);
          display: block;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: var(--space-md);
        }
        .hero-title-stagger {
          display: block;
        }
        .hero-subtitle {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2vw, 1.5rem);
          font-weight: 300;
          color: rgba(255,255,255,0.85);
          margin-bottom: var(--space-xl);
          min-height: 2.5em;
        }
        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-white);
          border: 1px solid var(--color-white);
          padding: var(--space-sm) var(--space-lg);
          border-radius: var(--radius-sm);
          transition: background var(--transition-base), color var(--transition-base), transform var(--transition-fast);
          background: transparent;
        }
        .hero-cta:hover {
          background: var(--color-white);
          color: var(--color-graphite);
          border-color: var(--color-white);
          transform: translateX(4px);
        }
        .hero-cta:focus-visible {
          outline: 2px solid var(--color-white);
          outline-offset: 4px;
        }
        .hero-cta svg {
          transition: transform var(--transition-fast);
          flex-shrink: 0;
        }
        .hero-cta:hover svg {
          transform: translateX(4px);
        }
        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          cursor: pointer;
          border-radius: 50%;
          width: 56px;
          height: 56px;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s, transform 0.2s;
          line-height: 1;
        }
        .hero-arrow:hover {
          background: rgba(255,255,255,0.35);
          transform: translateY(-50%) scale(1.1);
        }
        .hero-arrow:focus-visible {
          outline: 2px solid white;
          outline-offset: 2px;
        }
        .hero-arrow--prev { left: var(--space-md); }
        .hero-arrow--next { right: var(--space-md); }
        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .hero-text {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-cta-group {
            justify-content: center;
          }
        }
        @media (max-width: 768px) {
          .hero-arrow { display: none; }
          .hero-title {
            font-size: clamp(2.5rem, 12vw, 4rem);
          }
        }
      `}</style>
    </section>
  );
}
