import { motion } from 'framer-motion';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const transition = { duration: prefersReduced ? 0 : 0.4 };

export default function MediaCard({ item, index }) {
  return (
    <motion.div
      className="media-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...transition, delay: index * 0.12 }}
      whileHover={{ y: -5 }}
    >
      <img src={item.image} alt={item.imageAlt} className="media-card-img" loading="lazy" />
      <div className="media-card-body">
        <span className="media-category">{item.category}</span>
        <h3 className="media-title">{item.title}</h3>
        <p className="media-source">{item.source} | {item.year}</p>
        <p className="media-desc">{item.description}</p>
      </div>
      <style>{`
        .media-card {
          background: white;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-card);
          overflow: hidden;
          transition: box-shadow 0.3s;
        }
        .media-card:hover {
          box-shadow: var(--shadow-hover);
        }
        .media-card-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .media-card-body {
          padding: var(--space-sm) var(--space-md) var(--space-md);
        }
        .media-category {
          display: inline-block;
          font-size: var(--text-xs);
          font-weight: 500;
          color: var(--color-red);
          background: rgba(178,34,34,0.08);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-sm);
          margin-bottom: var(--space-xs);
        }
        .media-title {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        .media-source {
          font-size: var(--text-sm);
          color: var(--color-grey);
          margin-bottom: var(--space-xs);
        }
        .media-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--color-near-black);
        }
      `}</style>
    </motion.div>
  );
}
