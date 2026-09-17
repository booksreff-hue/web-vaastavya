import { motion } from 'framer-motion';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ease = [0.16, 1, 0.3, 1];

export default function Hero({ id }) {
  return (
    <section id={id} className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <motion.img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=85"
          alt=""
          loading="eager"
          initial={prefersReduced ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: prefersReduced ? 0 : 1.6, ease }}
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <motion.span
            className="hero-eyebrow"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.6, ease }}
          >
            Architecture & Interior Design
          </motion.span>
          <h1 id="hero-title" className="hero-title">
            <motion.span
              className="hero-title-line"
              initial={prefersReduced ? false : { opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.7, delay: prefersReduced ? 0 : 0.1, ease }}
            >
              Crafting Spaces.
            </motion.span>
            <motion.span
              className="hero-title-line"
              initial={prefersReduced ? false : { opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.7, delay: prefersReduced ? 0 : 0.22, ease }}
            >
              Creating Legacies.
            </motion.span>
          </h1>
          <motion.p
            className="hero-description"
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.6, delay: prefersReduced ? 0 : 0.36, ease }}
          >
            VAASTAVYA is a multi-disciplinary design studio creating architectural
            and interior experiences across India, Africa, and the Middle East since 2006.
          </motion.p>
          <motion.div
            className="hero-cta-group"
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.6, delay: prefersReduced ? 0 : 0.48, ease }}
          >
            <a href="#contact" className="hero-cta">
              <span>Start a Project</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>

        <div className="hero-scroll-indicator" aria-hidden="true">
          <span>Scroll</span>
          <svg width="16" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-bg img {
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
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--space-md);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--grid-gutter);
          align-items: center;
          min-height: 100dvh;
        }
        .hero-text {
          color: var(--color-white);
          padding-top: calc(var(--header-height) + var(--space-xl));
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
          margin-bottom: var(--space-lg);
        }
        .hero-title-line {
          display: block;
        }
        .hero-title-line:first-child {
          font-weight: 500;
        }
        .hero-description {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          line-height: 1.7;
          color: rgba(255,255,255,0.85);
          max-width: 480px;
          margin-bottom: var(--space-xl);
          font-weight: 300;
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
        .hero-scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-xs);
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.5);
          position: absolute;
          bottom: var(--space-xl);
          left: var(--space-md);
        }
        @media (prefers-reduced-motion: no-preference) {
          .hero-scroll-indicator {
            animation: hero-scroll-bounce 2s ease-in-out infinite;
          }
          .hero-scroll-indicator svg {
            animation: hero-arrow-bounce 1.5s ease-in-out infinite;
          }
        }
        @keyframes hero-scroll-bounce {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50% { opacity: 0.8; transform: translateY(4px); }
        }
        @keyframes hero-arrow-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @media (max-width: 1024px) {
          .hero-content {
            grid-template-columns: 1fr;
            text-align: center;
            padding-top: var(--space-2xl);
            padding-bottom: var(--space-2xl);
          }
          .hero-text {
            padding-top: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-description {
            max-width: 100%;
          }
          .hero-cta-group {
            justify-content: center;
          }
          .hero-scroll-indicator {
            left: 50%;
            transform: translateX(-50%);
          }
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(2.5rem, 12vw, 4rem);
          }
          .hero-description {
            font-size: var(--text-base);
          }
        }
      `}</style>
    </section>
  );
}