import { motion } from 'framer-motion';
import { mediaItems } from '../../data/media';
import MediaCard from '../ui/MediaCard';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const transition = { duration: prefersReduced ? 0 : 0.5 };

export default function MediaCoverage({ id }) {
  return (
    <section id={id}>
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
        >
          Media Coverage
        </motion.h2>

        <div className="media-grid">
          {mediaItems.map((item, i) => (
            <MediaCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--space-md);
        }
      `}</style>
    </section>
  );
}
