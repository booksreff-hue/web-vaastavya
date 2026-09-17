import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const transition = { duration: prefersReduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] };

export default function ProjectCard({ project, index, total }) {
  const [imgIndex, setImgIndex] = useState(0);

  const { title, location, year, description, images, imageAlt } = project;

  const currentImg = images[imgIndex];

  const goNext = useCallback(() => setImgIndex((i) => (i + 1 + images.length) % images.length), [images.length]);
  const goPrev = useCallback(() => setImgIndex((i) => (i - 1 + images.length) % images.length), [images.length]);

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px', amount: 0.3 }}
      transition={{ ...transition, delay: index * 0.12 }}
    >
      <div className="project-header">
        <span className="project-index">
          <span className="project-index-current">{String(index + 1).padStart(2, '0')}</span>
          <span className="project-index-separator">/</span>
          <span className="project-index-total">{String(total).padStart(2, '0')}</span>
        </span>
        <h3 className="project-title">{title}</h3>
        <p className="project-location">
          {location}{location && year ? ' · ' : ''}{year}
        </p>
      </div>

      <div className="project-visual">
        <div className="project-carousel">
          <div className="project-carousel-stage">
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIndex}
                src={currentImg}
                alt={`${imageAlt} - view ${imgIndex + 1}`}
                className="project-main-img"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={transition}
                loading="lazy"
              />
            </AnimatePresence>
          </div>
          <div className="project-watermark" aria-hidden="true">
            <img src={logo} alt="" loading="lazy" />
          </div>
          {images.length > 1 && (
            <>
              <button
                className="carousel-arrow carousel-arrow--prev"
                onClick={goPrev}
                aria-label="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="carousel-arrow carousel-arrow--next"
                onClick={goNext}
                aria-label="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="project-thumbs" role="tablist" aria-label="Project images">
            {images.map((src, i) => (
              <button
                key={i}
                className={`project-thumb${i === imgIndex ? ' active' : ''}`}
                onClick={() => setImgIndex(i)}
                aria-label={`View image ${i + 1}`}
                role="tab"
                aria-selected={i === imgIndex}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {description && (
        <div className="project-description-wrapper">
          <p className="project-description">{description}</p>
        </div>
      )}

      <style>{`
        .project-card {
          background: transparent;
          border-radius: 0;
          box-shadow: none;
          overflow: visible;
        }
        .project-header {
          text-align: center;
          margin-bottom: var(--space-lg);
          padding: 0 var(--space-sm);
        }
        .project-index {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--color-stone-light);
          margin-bottom: var(--space-sm);
        }
        .project-index-separator {
          color: var(--color-stone-light);
        }
        .project-title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: var(--space-xs);
          color: var(--color-graphite);
        }
        .project-location {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--color-stone);
          font-weight: 400;
        }
        .project-visual {
          position: relative;
        }
        .project-carousel {
          position: relative;
          border-radius: var(--radius-md);
          overflow: hidden;
          background: var(--color-concrete);
          aspect-ratio: 4 / 3;
        }
        .project-carousel-stage {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .project-main-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .project-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-30deg);
          pointer-events: none;
          user-select: none;
          z-index: 1;
          opacity: 0.1;
        }
        .project-watermark img {
          width: clamp(140px, 30vw, 240px);
          height: auto;
          filter: grayscale(1);
        }
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(10, 10, 10, 0.5);
          color: var(--color-white);
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          opacity: 0;
          z-index: 2;
        }
        .project-carousel:hover .carousel-arrow {
          opacity: 1;
        }
        .carousel-arrow:hover {
          background: rgba(10, 10, 10, 0.75);
          transform: translateY(-50%) scale(1.05);
        }
        .carousel-arrow:focus-visible {
          opacity: 1;
          outline: 2px solid var(--color-white);
          outline-offset: 2px;
        }
        .carousel-arrow--prev { left: var(--space-sm); }
        .carousel-arrow--next { right: var(--space-sm); }
        .project-thumbs {
          display: flex;
          gap: var(--space-xs);
          overflow-x: auto;
          padding: var(--space-sm) var(--space-xs) var(--space-xs);
          scrollbar-width: thin;
          justify-content: center;
          -webkit-overflow-scrolling: touch;
        }
        .project-thumbs::-webkit-scrollbar {
          height: 4px;
        }
        .project-thumbs::-webkit-scrollbar-track {
          background: transparent;
        }
        .project-thumbs::-webkit-scrollbar-thumb {
          background: var(--color-concrete);
          border-radius: 2px;
        }
        .project-thumb {
          flex: 0 0 auto;
          width: 72px;
          height: 54px;
          border: 2px solid transparent;
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          background: var(--color-concrete);
          transition: all var(--transition-fast);
          opacity: 0.5;
        }
        .project-thumb:hover {
          opacity: 0.8;
          border-color: var(--color-stone-light);
        }
        .project-thumb.active {
          opacity: 1;
          border-color: var(--color-graphite);
        }
        .project-thumb:focus-visible {
          opacity: 1;
          outline: 2px solid var(--color-graphite);
          outline-offset: 2px;
        }
        .project-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .project-description-wrapper {
          max-width: var(--max-width-narrow);
          margin: var(--space-lg) auto 0;
          padding: 0 var(--space-sm);
          text-align: center;
        }
        .project-description {
          font-family: var(--font-body);
          font-size: var(--text-base);
          line-height: 1.8;
          color: var(--color-graphite-light);
          font-weight: 300;
        }
        @media (max-width: 768px) {
          .project-title {
            font-size: var(--text-2xl);
          }
          .project-carousel {
            aspect-ratio: 3 / 2;
            border-radius: var(--radius-sm);
          }
          .carousel-arrow {
            opacity: 1;
            width: 36px;
            height: 36px;
          }
          .carousel-arrow--prev { left: var(--space-xs); }
          .carousel-arrow--next { right: var(--space-xs); }
          .project-thumb {
            width: 64px;
            height: 48px;
          }
        }
      `}</style>
    </motion.article>
  );
}