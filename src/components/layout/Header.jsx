import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS, 80);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const headerBg = scrolled
    ? 'rgba(255,255,255,0.97)'
    : 'transparent';
  const textColor = scrolled ? '#1A1A1A' : '#FFFFFF';
  const shadow = scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none';

  return (
    <motion.header
      className="header"
      animate={{ background: headerBg, boxShadow: shadow }}
      transition={transition}
    >
      <div className="header-inner">
        <button onClick={() => scrollTo('home')} className="header-logo-btn" aria-label="Go to top">
          <img src={logo} alt="Vaastavya" className="header-logo" />
        </button>

        <nav className="header-nav">
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
          padding: 0.75rem 0;
        }
        .header-inner {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 0 var(--space-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-logo-btn {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .header-logo {
          height: 40px;
          width: auto;
        }
        .header-nav {
          display: flex;
          gap: var(--space-md);
        }
        .header-link {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          background: none;
          border: none;
          padding: 0.5rem 0;
          cursor: pointer;
          position: relative;
          transition: color 0.3s;
        }
        .header-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--color-red);
          transition: width 0.3s;
        }
        .header-link.active::after,
        .header-link:hover::after {
          width: 100%;
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
          background: rgba(255,255,255,0.98);
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
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
          font-weight: 600;
          background: none;
          border: none;
          padding: 0.75rem 0;
          text-align: left;
          cursor: pointer;
          color: var(--color-near-black);
          border-bottom: 1px solid #eee;
        }
        .mobile-link.active {
          color: var(--color-red);
        }
        @media (max-width: 768px) {
          .header-nav { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>
    </motion.header>
  );
}
