import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import logo from '../../assets/logo.png';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const transition = { duration: prefersReduced ? 0 : 0.3 };

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'media', label: 'Media' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS, 80);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 50);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const headerBg = scrolled
    ? 'rgba(250,249,246,0.97)'
    : 'transparent';
  const textColor = scrolled ? '#262626' : '#FFFFFF';
  const shadow = scrolled ? '0 1px 0 rgba(38,38,38,0.08)' : 'none';

  return (
    <motion.header
      className="header"
      animate={{ background: headerBg, boxShadow: shadow }}
      transition={transition}
    >
      <div className="header-inner">
        <button onClick={() => scrollTo('home')} className="header-logo-btn" aria-label="VAASTAVYA - go to top">
          <img src={logo} alt="VAASTAVYA" className="header-logo" />
        </button>

        <nav className="header-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`header-link${activeId === item.id ? ' active' : ''}`}
              onClick={() => scrollTo(item.id)}
              style={{ color: textColor }}
            >
              {item.label}
            </button>
          ))}
          <button
            className={`header-cta${scrolled ? ' header-cta--dark' : ''}`}
            onClick={() => scrollTo('contact')}
          >
            Start a Project
          </button>
        </nav>

        <button
          className="hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <motion.span
            className="hamburger-line"
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            style={{ background: textColor }}
          />
          <motion.span
            className="hamburger-line"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            style={{ background: textColor }}
          />
          <motion.span
            className="hamburger-line"
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            style={{ background: textColor }}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transition}
          >
            <div className="mobile-menu-links">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  className={`mobile-link${activeId === item.id ? ' active' : ''}`}
                  onClick={() => { scrollTo(item.id); setMenuOpen(false); }}
                >
                  {item.label}
                </button>
              ))}
              <button
                className="mobile-link mobile-link--cta"
                onClick={() => { scrollTo('contact'); setMenuOpen(false); }}
              >
                Start a Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: var(--header-height);
          display: flex;
          align-items: center;
        }
        .header-inner {
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--space-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-md);
        }
        .header-logo-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          flex-shrink: 0;
        }
        .header-logo-btn:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 4px;
        }
        .header-logo {
          height: 36px;
          width: auto;
        }
        .header-nav {
          display: flex;
          align-items: center;
          gap: var(--space-md);
        }
        .header-link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          background: none;
          border: none;
          padding: 0.5rem 0;
          cursor: pointer;
          position: relative;
          transition: color var(--transition-fast);
          white-space: nowrap;
        }
        .header-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width var(--transition-fast);
        }
        .header-link.active::after,
        .header-link:hover::after {
          width: 100%;
        }
        .header-link:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 4px;
        }
        .header-cta {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #FFFFFF;
          border: 1px solid #FFFFFF;
          background: transparent;
          padding: 0.6rem 1.25rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          white-space: nowrap;
          transition: background var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast);
        }
        .header-cta--dark {
          color: var(--color-graphite);
          border-color: var(--color-graphite);
        }
        .header-cta:hover {
          background: var(--color-graphite);
          border-color: var(--color-graphite);
          color: var(--color-warm-white);
        }
        .header-cta--dark:hover {
          background: var(--color-graphite);
          color: var(--color-warm-white);
        }
        .header-cta:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 4px;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 1001;
        }
        .hamburger-line {
          display: block;
          width: 24px;
          height: 2px;
          border-radius: 2px;
          transform-origin: center;
        }
        .mobile-menu {
          overflow: hidden;
          background: var(--color-warm-white);
          border-bottom: 1px solid var(--color-concrete);
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
        }
        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          padding: var(--space-sm) var(--space-md) var(--space-md);
          gap: var(--space-xs);
        }
        .mobile-link {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 400;
          background: none;
          border: none;
          border-bottom: 1px solid var(--color-concrete);
          padding: 0.75rem 0;
          text-align: left;
          cursor: pointer;
          color: var(--color-graphite);
        }
        .mobile-link.active {
          font-style: italic;
        }
        .mobile-link--cta {
          border-bottom: none;
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        @media (max-width: 860px) {
          .header-nav { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
    </motion.header>
  );
}