import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCarousel } from '../../hooks/useCarousel';
import CarouselDots from '../ui/CarouselDots';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
          initial={{ opacity: 0, y: 40 }}
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
    <section id={id} className="hero">
      <AnimatePresence mode="wait">
        <motion.div
          className="hero-slide"
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.8 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* TODO: Replace with actual hero images — Recommended: 1920×1080px JPEG */}
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
        <LetterStagger text="Crafting Spaces. Creating Legacies." className="hero-title" />
        <AnimatePresence mode="wait">
          <motion.p
            key={slide.id}
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : 0.3 }}
          >
            {slide.subtitle}
          </motion.p>
        </AnimatePresence>
      </div>

      <button
        className="hero-arrow hero-arrow--prev"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        &#8249;
      </button>
      <button
        className="hero-arrow hero-arrow--next"
        onClick={handleNext}
        aria-label="Next slide"
      >
        &#8250;
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
          background: rgba(0,0,0,0.38);
        }
        .hero-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: white;
          z-index: 1;
          width: 90%;
          max-width: 900px;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: var(--text-hero);
          font-weight: 700;
          margin-bottom: var(--space-sm);
          line-height: 1.1;
        }
        .hero-subtitle {
          font-family: var(--font-body);
          font-size: clamp(1rem, 2vw, 1.5rem);
          font-weight: 300;
          opacity: 0.9;
        }
        .hero-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.2);
          border: none;
          color: white;
          font-size: 2rem;
          width: 56px;
          height: 56px;
          cursor: pointer;
          border-radius: 50%;
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
        .hero-arrow--prev { left: var(--space-md); }
        .hero-arrow--next { right: var(--space-md); }
        @media (max-width: 768px) {
          .hero-arrow { display: none; }
        }
      `}</style>
    </section>
  );
}
