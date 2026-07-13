import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const transition = { duration: prefersReduced ? 0 : 0.4, ease: 'easeInOut' };

export default function ProjectCard({ project, index }) {
  const [imgIndex, setImgIndex] = useState(0);

  const { title, location, year, description, images, imageAlt } = project;

  const currentImg = images[imgIndex];

  const goNext = () => setImgIndex((i) => (i + 1) % images.length);
  const goPrev = () => setImgIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ ...transition, delay: index * 0.15 }}
    >
      <div className="project-card-content">
        <div className="project-info">
          <h3 className="project-title">{title}</h3>
          <p className="project-location">{location}{location && year ? ' | ' : ''}{year}</p>
          {description && <p className="project-description">{description}</p>}
        </div>
        <div className="project-visual">
          <div className="project-carousel">
            <div className="project-carousel-stage">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  src={currentImg}
                  alt={`${imageAlt} — view ${imgIndex + 1}`}
                  className="project-main-img"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={transition}
                  loading="lazy"
                />
              </AnimatePresence>
            </div>
            <button className="carousel-arrow carousel-arrow--prev" onClick={goPrev} aria-label="Previous image">&#8249;</button>
            <button className="carousel-arrow carousel-arrow--next" onClick={goNext} aria-label="Next image">&#8250;</button>
          </div>
          <div className="project-thumbs">
            {images.map((src, i) => (
              <button
                key={i}
                className={`project-thumb${i === imgIndex ? ' active' : ''}`}
                onClick={() => setImgIndex(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .project-card {
          background: white;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-card);
          margin-bottom: var(--space-lg);
          overflow: hidden;
        }
        .project-card-content {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: var(--space-lg);
          padding: var(--space-md);
        }
        .project-info {
          padding-top: var(--space-xs);
        }
        .project-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          margin-bottom: 0.25rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .project-location {
          color: var(--color-grey);
          margin-bottom: var(--space-sm);
          font-size: var(--text-sm);
        }
        .project-description {
          font-size: var(--text-base);
          line-height: 1.7;
          color: var(--color-near-black);
        }
        .project-visual {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .project-carousel {
          position: relative;
          border-radius: var(--radius-sm);
          background: #f5f5f5;
          overflow: hidden;
        }
        .project-carousel-stage {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 200px;
          max-height: 55vh;
        }
        .project-main-img {
          max-width: 100%;
          height: auto;
          max-height: 55vh;
          object-fit: contain;
          display: block;
        }
        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.45);
          color: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 1.3rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          line-height: 1;
          z-index: 2;
          opacity: 0;
          transition: opacity 0.2s, background 0.2s;
        }
        .project-carousel:hover .carousel-arrow {
          opacity: 1;
        }
        .carousel-arrow:hover {
          background: rgba(0,0,0,0.65);
        }
        .carousel-arrow--prev { left: 0.75rem; }
        .carousel-arrow--next { right: 0.75rem; }
        .project-thumbs {
          display: flex;
          gap: 0.4rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
          scrollbar-width: thin;
        }
        .project-thumb {
          flex: 0 0 auto;
          width: 54px;
          height: 54px;
          border: 2px solid transparent;
          border-radius: var(--radius-sm);
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          background: none;
          transition: border-color 0.2s;
          opacity: 0.6;
          transition: opacity 0.2s, border-color 0.2s;
        }
        .project-thumb:hover {
          opacity: 0.85;
        }
        .project-thumb.active {
          opacity: 1;
          border-color: var(--color-red);
        }
        .project-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 1024px) {
          .project-card-content {
            grid-template-columns: 1fr;
            gap: var(--space-md);
          }
          .project-info {
            order: -1;
          }
          .project-carousel-stage {
            max-height: 50vh;
          }
          .project-main-img {
            max-width: 100%;
            max-height: 50vh;
          }
          .carousel-arrow {
            opacity: 1;
          }
        }
        @media (max-width: 768px) {
          .project-card-content {
            padding: var(--space-sm);
            gap: var(--space-sm);
          }
          .project-title {
            font-size: var(--text-xl);
          }
          .project-carousel-stage {
            min-height: 160px;
            max-height: 42vh;
          }
          .project-main-img {
            max-width: 100%;
            max-height: 42vh;
          }
        }
      `}</style>
    </motion.div>
  );
}
