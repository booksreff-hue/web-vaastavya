import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const transition = { duration: prefersReduced ? 0 : 0.4, ease: 'easeInOut' };

export default function ProjectCard({ project, index }) {
  const [imgIndex, setImgIndex] = useState(0);

  const { title, location, year, description, images, imageAlt } = project;

  const currentImg = images[imgIndex];

  const goNext = () => setImgIndex((i) => (i + 1 + images.length) % images.length);
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
          {description && <p className="project-description">{description}</p>}
          <p className="project-location">{location}{location && year ? ' | ' : ''}{year}</p>
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
            <div className="project-watermark">
              <img src={logo} alt="Vaastava" loading="lazy" />
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
      <style>`
        .project-card {
          background: white;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-card);
          margin-bottom: var(--space-lg);
          overflow: hidden;
        }
        .project-card-content {
          max-width: 800px;
          margin: 0 auto;
          padding: var(--space-lg) var(--space-md);
          text-align: center;
        }
        .project-info {
          padding: var(--space-xs) 0 var(--space-sm);
        }
        .project-title {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 600;
          letter-spacing: 0.02em;
          margin-bottom: var(--space-xs);
          color: var(--color-near-black);
        }
        .project-description {
          font-size: var(--text-base);
          line-height: 1.7;
          color: var(--color-near-black);
          margin-bottom: var(--space-md);
        }
        .project-location {
          color: var(--color-grey);
          font-size: var(--text-sm);
        }
        .project-visual {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .project-carousel {
          position: relative;
          border-radius: var(--radius-sm);
          background: #f5f5f5;
          overflow: hidden;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }
        .project-carousel-stage {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 66.67%;
          overflow: hidden;
          margin: 0 auto;
        }
        .project-main-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .project-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          user-select: none;
          z-index: 1;
          opacity: 0.06;
        }
        .project-watermark img {
          width: clamp(120px, 25vw, 200px);
          height: auto;
          filter: grayscale(1);
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
          opacity: 0;
          z-index: 2;
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
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
          scrollbar-width: thin;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }
        .project-thumb {
          flex: 0 0 auto;
          width: 58px;
          height: 58px;
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
          border-color: var(--color-graphite);
        }
        .project-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        @media (max-width: 1024px) {
          .project-card-content {
            padding: var(--space-sm);
          }
          .project-title {
            font-size: var(--text-xl);
          }
          .project-carousel-stage {
            padding-bottom: 66.67%;
          }
          .carousel-arrow {
            opacity: 1;
          }
        }
        @media (max-width: 768px) {
          .project-card-content {
            padding: var(--space-sm);
          }
          .project-title {
            font-size: var(--text-lg);
          }
          .project-carousel-stage {
            padding-bottom: 60%;
          }
          .carousel-arrow {
            opacity: 1;
          }
        }
      `</style>
    </motion.div>
  );
}