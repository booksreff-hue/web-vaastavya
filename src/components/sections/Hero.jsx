import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCarousel } from '../../hooks/useCarousel';
import CarouselDots from '../ui/CarouselDots';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease = [0.16, 1, 0.3, 1];

const UNSPLASH = 'https://images.unsplash.com';
const WHATSAPP_NUMBER = '919850092122';

const heroSlides = [
  {
    id: 1,
    title: 'UNHEARD',
    subtitle: "I design to hear the music I haven't heard yet.",
    image: `${UNSPLASH}/photo-1600596542815-ffad4c1539a9?w=1920&q=85`,
  },
  {
    id: 2,
    title: 'UNSEEN',
    subtitle: "I don't always seek the unknown. Sometimes, I discover the extraordinary within the familiar.",
    image: `${UNSPLASH}/photo-1600585154526-990dced4db0d?w=1920&q=85`,
  },
  {
    id: 3,
    title: 'UNFELT',
    subtitle: "I don't believe architecture belongs to an era. I believe it belongs to an imagination.",
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
      <style>{`.hero-letter { display: inline-block; white-space: pre; } .hero-title-stagger { display: block; white-space: nowrap; }`}</style>
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

  const [waOpen, setWaOpen] = useState(false);
  const [waName, setWaName] = useState('');
  const [waPhone, setWaPhone] = useState('');
  const [waMessage, setWaMessage] = useState('');

  const handleWaSubmit = (e) => {
    e.preventDefault();
    const text = `Name: ${waName}\nPhone: ${waPhone}\nMessage: ${waMessage}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    setWaOpen(false);
    setWaName('');
    setWaPhone('');
    setWaMessage('');
  };

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
        <motion.div
          className="hero-text"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReduced ? 0 : 0.7, ease }}
        >
          <h1 id="hero-title" className="hero-title">
            <LetterStagger text={slide.title} className="hero-title-stagger" />
          </h1>
          <motion.p
            key={slide.id}
            className="hero-subtitle"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.6, delay: prefersReduced ? 0 : 0.15, ease }}
          >
            {slide.subtitle}
          </motion.p>
          <motion.div
            className="hero-cta-group"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.5, delay: prefersReduced ? 0 : 0.3, ease }}
          >
            <button className="hero-cta" onClick={() => setWaOpen(true)}>
              <span>Start a Project</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
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
          height: 90vh;
          min-height: 540px;
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
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.8vw, 5rem);
          font-weight: 600;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: var(--space-md);
          color: var(--color-white);
          max-width: 100%;
          overflow: visible;
        }
        .hero-title-stagger {
          display: block;
          white-space: nowrap;
        }
        .hero-subtitle {
          font-family: var(--font-body);
          font-size: clamp(1.125rem, 2.2vw, 1.75rem);
          font-weight: 400;
          line-height: 1.7;
          color: var(--color-white);
          margin-bottom: var(--space-xl);
          min-height: 3em;
          opacity: 1;
        }
        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-sm);
          margin-top: var(--space-lg);
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
            font-size: clamp(1.6rem, 7vw, 3rem);
            white-space: normal;
          }
          .hero-title-stagger {
            white-space: nowrap;
          }
        }
        .wa-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10, 10, 10, 0.6);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 4vw, 2rem);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .wa-modal {
          background: var(--color-warm-white);
          border: 1px solid var(--color-concrete);
          border-radius: var(--radius-lg);
          padding: clamp(1.5rem, 4vw, 2.5rem);
          width: min(520px, 100%);
          max-height: calc(100dvh - 2rem);
          overflow-y: auto;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.18);
          position: relative;
        }
        .wa-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--color-graphite);
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--transition-fast), color var(--transition-fast);
        }
        .wa-modal-close:hover {
          background: var(--color-concrete);
          color: var(--color-black);
        }
        .wa-modal-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 600;
          color: var(--color-graphite);
          letter-spacing: -0.02em;
          margin: 0 0 var(--space-xs) 0;
          padding-right: 2.5rem;
        }
        .wa-modal-subtitle {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          line-height: 1.6;
          color: var(--color-stone);
          margin: 0 0 var(--space-md) 0;
        }
        .wa-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .wa-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .wa-field label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-stone);
        }
        .wa-field input,
        .wa-field textarea {
          font-family: var(--font-body);
          font-size: var(--text-base);
          padding: 0.8rem 1rem;
          border: 1px solid var(--color-concrete);
          border-radius: var(--radius-sm);
          background: var(--color-white);
          color: var(--color-graphite);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        .wa-field input::placeholder,
        .wa-field textarea::placeholder {
          color: var(--color-stone-light);
        }
        .wa-field input:focus,
        .wa-field textarea:focus {
          outline: none;
          border-color: var(--color-graphite);
          box-shadow: 0 0 0 3px rgba(38, 38, 38, 0.08);
        }
        .wa-field textarea {
          min-height: 110px;
          resize: vertical;
        }
        .wa-submit {
          margin-top: var(--space-xs);
          width: 100%;
          background: var(--color-black);
          color: var(--color-white);
          border: none;
          padding: 0.95rem 1.5rem;
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
          font-weight: 500;
          font-size: var(--text-sm);
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: background var(--transition-fast), transform var(--transition-fast);
        }
        .wa-submit:hover {
          background: var(--color-graphite);
        }
        .wa-submit:active {
          transform: translateY(1px);
        }
      `}</style>

      <AnimatePresence>
        {waOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="wa-modal-overlay"
            onClick={(e) => { if (e.target === e.currentTarget) setWaOpen(false); }}
          >
            <motion.div
              className="wa-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="wa-modal-title"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="wa-modal-close" onClick={() => setWaOpen(false)} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              <h3 className="wa-modal-title" id="wa-modal-title">Start a Project</h3>
              <p className="wa-modal-subtitle">Tell us a little about your space and we'll continue the conversation on WhatsApp.</p>
            <form className="wa-form" onSubmit={handleWaSubmit}>
              <div className="wa-field">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  value={waName}
                  onChange={(e) => setWaName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="wa-field">
                <label>Phone Number</label>
                <input
                  type="tel"
                  required
                  value={waPhone}
                  onChange={(e) => setWaPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
              <div className="wa-field">
                <label>Message</label>
                <textarea
                  required
                  rows={4}
                  value={waMessage}
                  onChange={(e) => setWaMessage(e.target.value)}
                  placeholder="Tell us about your project"
                />
              </div>
              <button type="submit" className="wa-submit">Send via WhatsApp</button>
            </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
