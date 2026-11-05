import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { animate, createDrawable, createTimeline, onScroll, stagger } from 'animejs';
import nilayPhoto from '../../assets/team/team-principal.png';

const SESSION_KEY = 'vaastavya-birthday-seen';
const TARGET_DATE = '2026-11-06';
const TARGET_DAY = 6;
const TARGET_MONTH = 10;
const TARGET_YEAR = 2026;
const DAY_MS = 86400000;
const ROW_HEIGHT = 56;
const REVEAL_THRESHOLD = 0.68;

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const istDateFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const weekdayFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  timeZone: 'UTC',
});

const longDateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

function buildDates() {
  const start = Date.UTC(2026, 9, 6, 12);
  const end = Date.UTC(2026, 10, 30, 12);
  const dates = [];
  for (let time = start; time <= end; time += DAY_MS) {
    dates.push(new Date(time));
  }
  return dates;
}

const DATES = buildDates();

function isTargetDate(date) {
  return (
    date.getUTCDate() === TARGET_DAY &&
    date.getUTCMonth() === TARGET_MONTH &&
    date.getUTCFullYear() === TARGET_YEAR
  );
}

function formatShortDate(date) {
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${day} / ${month} / ${date.getUTCFullYear()}`;
}

function readSeen() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    return;
  }
}

export default function BirthdayOverlay() {
  const [enabled] = useState(
    () => istDateFormatter.format(new Date()) === TARGET_DATE && !readSeen(),
  );
  const [phase, setPhase] = useState(() => (prefersReduced ? 'picker' : 'intro'));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [photoIn, setPhotoIn] = useState(false);
  const rootRef = useRef(null);
  const reelRef = useRef(null);
  const surpriseScrollRef = useRef(null);
  const surpriseInnerRef = useRef(null);

  const selectedDate = DATES[selectedIndex] || DATES[0];

  const close = useCallback((remember = true) => {
    if (remember) markSeen();
    setPhase('closed');
  }, []);

  useEffect(() => {
    if (!enabled || phase === 'closed') return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [enabled, phase]);

  useEffect(() => {
    if (!enabled || phase === 'closed') return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enabled, phase, close]);

  useEffect(() => {
    if (!enabled || phase === 'closed') return undefined;
    const interval = setInterval(() => {
      if (istDateFormatter.format(new Date()) !== TARGET_DATE) setPhase('closed');
    }, 60000);
    return () => clearInterval(interval);
  }, [enabled, phase]);

  useEffect(() => {
    rootRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!enabled || phase !== 'intro') return undefined;
    const root = rootRef.current;
    if (!root) return undefined;

    const timeline = createTimeline({
      onComplete: () => setPhase('picker'),
    })
      .add(root.querySelectorAll('.birthday-tick'), { y: '-=6', duration: 50 }, stagger(10))
      .add(root.querySelector('.birthday-ticker'), { rotate: 360, duration: 1920 }, '<');

    return () => {
      timeline.revert?.();
    };
  }, [enabled, phase]);

  useEffect(() => {
    if (phase !== 'missed') return undefined;
    const timer = setTimeout(() => setPhase('closed'), 2600);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'surprise') return undefined;
    const container = surpriseScrollRef.current;
    const inner = surpriseInnerRef.current;
    if (!container || !inner) return undefined;

    container.scrollTop = 0;
    setPhotoIn(prefersReduced);

    const handleScroll = () => {
      const max = container.scrollHeight - container.clientHeight;
      const progress = max > 0 ? container.scrollTop / max : 1;
      if (progress > REVEAL_THRESHOLD) setPhotoIn(true);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let drawing;
    if (!prefersReduced) {
      drawing = animate(createDrawable('.birthday-draw'), {
        draw: ['0 0', '0 1'],
        delay: stagger(40),
        ease: 'inOut(3)',
        autoplay: onScroll({
          container,
          target: inner,
          enter: 'top top',
          leave: 'bottom bottom',
          sync: true,
        }),
      });
    }

    return () => {
      container.removeEventListener('scroll', handleScroll);
      drawing?.revert?.();
      setPhotoIn(false);
    };
  }, [phase]);

  const handleReelScroll = useCallback(() => {
    const reel = reelRef.current;
    if (!reel) return;
    const index = Math.round(reel.scrollTop / ROW_HEIGHT);
    const clamped = Math.min(DATES.length - 1, Math.max(0, index));
    setSelectedIndex(clamped);
  }, []);

  const selectIndex = useCallback((index) => {
    const clamped = Math.min(DATES.length - 1, Math.max(0, index));
    setSelectedIndex(clamped);
    const reel = reelRef.current;
    if (reel) {
      reel.scrollTo({ top: clamped * ROW_HEIGHT, behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  }, []);

  const handleReelKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectIndex(selectedIndex + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectIndex(selectedIndex - 1);
    }
  };

  const handleGo = () => {
    if (isTargetDate(selectedDate)) {
      setPhase('surprise');
    } else {
      setPhase('missed');
    }
  };

  if (!enabled || phase === 'closed') return null;

  return createPortal(
    <div
      className="birthday-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Birthday surprise"
      ref={rootRef}
      tabIndex={-1}
    >
      <style>{`
        .birthday-overlay {
          position: fixed;
          inset: 0;
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(0.75rem, 3vw, 2rem);
          background: rgba(241, 241, 241, 0.72);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          overflow: hidden;
          outline: none;
        }
        .birthday-panel {
          position: relative;
          width: min(560px, 100%);
          max-height: calc(100dvh - 2rem);
          overflow: hidden auto;
          background: rgba(250, 249, 246, 0.94);
          border: 1px solid rgba(38, 38, 38, 0.08);
          border-radius: var(--radius-lg);
          box-shadow: 0 40px 120px rgba(10, 10, 10, 0.18);
          padding: clamp(1.75rem, 5vw, 3.25rem);
          text-align: center;
        }
        .birthday-eyebrow {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-stone);
          margin: 0;
        }
        .birthday-intro {
          position: relative;
          min-height: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .birthday-ticker {
          --ticker-radius: 150px;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 320px;
          height: 320px;
          margin: -160px 0 0 -160px;
          opacity: 0.5;
          pointer-events: none;
        }
        .birthday-tick-slot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 1px;
          height: 12px;
          transform-origin: 0 0;
          transform: rotate(var(--tick-angle)) translateY(calc(-1 * var(--ticker-radius)));
        }
        .birthday-tick {
          display: block;
          width: 1px;
          height: 12px;
          background: var(--color-stone-light);
        }
        .birthday-question {
          position: relative;
          font-family: var(--font-display);
          font-size: clamp(1.85rem, 5.4vw, 2.75rem);
          font-weight: 400;
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: var(--color-graphite);
          margin: 0;
          max-width: 12em;
        }
        .birthday-heading {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 4.6vw, 2.25rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: var(--color-graphite);
          margin: 0.6rem 0 0;
        }
        .birthday-reel-wrap {
          position: relative;
          margin: 1.5rem 0 0.75rem;
        }
        .birthday-reel {
          height: 280px;
          overflow-y: auto;
          scroll-snap-type: y mandatory;
          padding: calc((280px - ${ROW_HEIGHT}px) / 2) 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
          outline: none;
          mask-image: linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 24%, #000 76%, transparent 100%);
        }
        .birthday-reel::-webkit-scrollbar { display: none; }
        .birthday-reel:focus-visible {
          box-shadow: 0 0 0 2px rgba(38, 38, 38, 0.18);
          border-radius: var(--radius-sm);
        }
        .birthday-date-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          width: 100%;
          height: ${ROW_HEIGHT}px;
          border: 0;
          background: none;
          cursor: pointer;
          color: var(--color-stone-light);
          opacity: 0.35;
          transform: scale(0.92);
          transition: opacity 200ms ease, transform 200ms ease, color 200ms ease;
          scroll-snap-align: center;
        }
        .birthday-date-row.is-active {
          color: var(--color-graphite);
          opacity: 1;
          transform: scale(1.05);
        }
        .birthday-date-row:focus-visible {
          outline: none;
          color: var(--color-graphite);
          box-shadow: inset 0 0 0 2px rgba(38, 38, 38, 0.16);
          border-radius: var(--radius-sm);
        }
        .birthday-date-weekday {
          min-width: 2.6rem;
          text-align: right;
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .birthday-date-value {
          font-family: var(--font-display);
          font-size: 1.35rem;
          letter-spacing: 0.04em;
        }
        .birthday-reel-marker {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: ${ROW_HEIGHT}px;
          margin-top: -${ROW_HEIGHT / 2}px;
          border-top: 1px solid rgba(38, 38, 38, 0.12);
          border-bottom: 1px solid rgba(38, 38, 38, 0.12);
          pointer-events: none;
        }
        .birthday-hint {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-stone-light);
          margin: 0;
        }
        .birthday-go {
          width: 100%;
          margin-top: 1.25rem;
          padding: 0.95rem 1.5rem;
          border: 0;
          border-radius: var(--radius-sm);
          background: var(--color-black);
          color: var(--color-white);
          font-family: var(--font-body);
          font-weight: 500;
          font-size: var(--text-sm);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background var(--transition-fast), transform var(--transition-fast);
        }
        .birthday-go:hover { background: var(--color-graphite); }
        .birthday-go:active { transform: translateY(1px); }
        .birthday-skip {
          position: fixed;
          right: clamp(1rem, 3vw, 2rem);
          bottom: clamp(1rem, 3vw, 2rem);
          background: none;
          border: 0;
          padding: 0.5rem;
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-stone);
          transition: color var(--transition-fast);
        }
        .birthday-skip:hover { color: var(--color-graphite); }
        .birthday-missed {
          text-align: center;
          padding: 2rem;
        }
        .birthday-missed p {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 5vw, 3rem);
          letter-spacing: 0.02em;
          color: var(--color-graphite);
          margin: 0;
          animation: birthdayMissed 2.6s ease forwards;
        }
        @keyframes birthdayMissed {
          0% { opacity: 0; transform: translateY(12px); }
          15%, 72% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        .birthday-scroll {
          position: fixed;
          inset: 0;
          overflow-y: auto;
          overscroll-behavior: contain;
        }
        .birthday-scroll-inner {
          position: relative;
          min-height: 220vh;
        }
        .birthday-sticky {
          position: sticky;
          top: 0;
          height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(1rem, 3vh, 1.75rem);
          padding: clamp(1.5rem, 6vh, 3.5rem) 1.5rem;
          text-align: center;
        }
        .birthday-portrait {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .birthday-drawing {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 165%;
          height: 145%;
          transform: translate(-50%, -50%);
          color: var(--color-stone-light);
          pointer-events: none;
        }
        .birthday-photo {
          position: relative;
          z-index: 2;
          height: clamp(170px, 32vh, 290px);
          aspect-ratio: 3 / 4;
          padding: 0.55rem;
          background: var(--color-white);
          border: 1px solid rgba(38, 38, 38, 0.12);
          border-radius: 999px 999px 6px 6px;
          box-shadow: 0 24px 60px rgba(10, 10, 10, 0.16);
          opacity: 0;
          transform: translateY(24px) scale(0.88) rotate(-2deg);
          transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .birthday-photo.is-visible {
          opacity: 1;
          transform: translateY(0) scale(1) rotate(0deg);
        }
        .birthday-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 999px 999px 2px 2px;
          filter: saturate(0.95);
        }
        .birthday-message {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 700ms 150ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms 150ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .birthday-message.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .birthday-wish {
          font-family: var(--font-display);
          font-size: clamp(2.25rem, 7vw, 4rem);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--color-graphite);
          margin: 0.25rem 0;
        }
        .birthday-name {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-stone);
          margin: 0;
        }
        .birthday-signoff {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--color-stone);
          margin: 0.2rem 0 0;
        }
        .birthday-enter {
          margin-top: 0.9rem;
          padding: 0.8rem 2.25rem;
          border: 0;
          border-radius: var(--radius-sm);
          background: var(--color-black);
          color: var(--color-white);
          font-family: var(--font-body);
          font-weight: 500;
          font-size: var(--text-sm);
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: background var(--transition-fast), transform var(--transition-fast);
        }
        .birthday-enter:hover { background: var(--color-graphite); }
        .birthday-enter:active { transform: translateY(1px); }
        .birthday-scroll-hint {
          position: absolute;
          bottom: clamp(1.25rem, 4vh, 2.5rem);
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-stone);
          white-space: nowrap;
          transition: opacity 400ms ease;
        }
        .birthday-scroll-hint.is-hidden { opacity: 0; }
        .birthday-scroll-hint::after {
          content: '';
          display: block;
          width: 1px;
          height: 22px;
          margin: 0.55rem auto 0;
          background: currentColor;
          animation: birthdayPulse 1.8s ease-in-out infinite;
        }
        @keyframes birthdayPulse {
          0%, 100% { transform: scaleY(0.4); opacity: 0.3; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        .birthday-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        @media (max-width: 520px) {
          .birthday-panel { padding: 1.75rem 1.25rem 2rem; }
          .birthday-intro { min-height: 280px; }
          .birthday-ticker {
            --ticker-radius: 112px;
            width: 250px;
            height: 250px;
            margin: -125px 0 0 -125px;
            opacity: 0.4;
          }
          .birthday-reel { height: 232px; padding: calc((232px - ${ROW_HEIGHT}px) / 2) 0; }
          .birthday-reel-marker { height: ${ROW_HEIGHT}px; margin-top: -${ROW_HEIGHT / 2}px; }
          .birthday-drawing { width: 185%; height: 160%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .birthday-photo,
          .birthday-message,
          .birthday-scroll-hint { transition: none; }
          .birthday-scroll-hint::after { animation: none; }
        }
      `}</style>

      {phase === 'intro' && (
        <div className="birthday-panel">
          <div className="birthday-intro">
            <div className="birthday-ticker" aria-hidden="true">
              {Array.from({ length: 60 }, (_, index) => (
                <span
                  key={index}
                  className="birthday-tick-slot"
                  style={{ '--tick-angle': `${index * 6}deg` }}
                >
                  <span className="birthday-tick" />
                </span>
              ))}
            </div>
            <p className="birthday-eyebrow">wait wait wait....</p>
            <h1 className="birthday-question">What&apos;s the date today?</h1>
          </div>
        </div>
      )}

      {phase === 'picker' && (
        <div className="birthday-panel">
          <p className="birthday-eyebrow">one date before you enter</p>
          <h2 className="birthday-heading">Pick the date</h2>
          <div className="birthday-reel-wrap">
            <div
              className="birthday-reel"
              ref={reelRef}
              onScroll={handleReelScroll}
              onKeyDown={handleReelKeyDown}
              tabIndex={0}
              role="group"
              aria-label="Scroll to set the date"
            >
              {DATES.map((date, index) => (
                <button
                  key={date.toISOString()}
                  type="button"
                  className={`birthday-date-row${index === selectedIndex ? ' is-active' : ''}`}
                  onClick={() => selectIndex(index)}
                  aria-current={index === selectedIndex ? 'date' : undefined}
                >
                  <span className="birthday-date-weekday">{weekdayFormatter.format(date)}</span>
                  <span className="birthday-date-value">{formatShortDate(date)}</span>
                </button>
              ))}
            </div>
            <span className="birthday-reel-marker" aria-hidden="true" />
          </div>
          <p className="birthday-hint">Scroll to set the date</p>
          <p className="birthday-sr-only" aria-live="polite">
            {longDateFormatter.format(selectedDate)} selected
          </p>
          <button type="button" className="birthday-go" onClick={handleGo}>
            Go
          </button>
        </div>
      )}

      {phase === 'missed' && (
        <div className="birthday-missed" role="status">
          <p>YOU MISSED THE SURPRISE!</p>
        </div>
      )}

      {phase === 'surprise' && (
        <div className="birthday-scroll" ref={surpriseScrollRef}>
          <div className="birthday-scroll-inner" ref={surpriseInnerRef}>
            <div className="birthday-sticky">
              <div className="birthday-portrait">
                <svg className="birthday-drawing" viewBox="0 0 600 620" fill="none" aria-hidden="true">
                  <path
                    className="birthday-draw"
                    d="M300 50a250 250 0 1 1-0.1 0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    className="birthday-draw"
                    d="M150 560V310a150 150 0 0 1 300 0v250"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path className="birthday-draw" d="M470 130l30-30" stroke="currentColor" strokeWidth="1.5" />
                  <path className="birthday-draw" d="M130 130l-30-30" stroke="currentColor" strokeWidth="1.5" />
                  <path className="birthday-draw" d="M520 470l30 30" stroke="currentColor" strokeWidth="1.5" />
                  <path className="birthday-draw" d="M80 470l-30 30" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    className="birthday-draw"
                    d="M170 590c70-14 190-14 260 0"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                <div className={`birthday-photo${photoIn ? ' is-visible' : ''}`}>
                  <img src={nilayPhoto} alt="Ar. Nilay Parekh" />
                </div>
              </div>
              <div className={`birthday-message${photoIn ? ' is-visible' : ''}`}>
                <p className="birthday-eyebrow">06 / 11 / 2026</p>
                <h2 className="birthday-wish">Happy Birthday!</h2>
                <p className="birthday-name">Ar. Nilay Parekh</p>
                <p className="birthday-signoff">From all of us at VAASTAVYA</p>
                <button type="button" className="birthday-enter" onClick={() => close()}>
                  Enter site
                </button>
              </div>
              <p className={`birthday-scroll-hint${photoIn ? ' is-hidden' : ''}`}>Scroll to reveal</p>
            </div>
          </div>
        </div>
      )}

      {phase !== 'missed' && (
        <button type="button" className="birthday-skip" onClick={() => close()}>
          Skip to site
        </button>
      )}
    </div>,
    document.body,
  );
}
