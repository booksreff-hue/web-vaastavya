import { motion } from 'framer-motion';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function MediaCard({ item, index }) {
  const Wrapper = item.url ? 'a' : 'div';
  const wrapperProps = item.url
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Read ${item.title} on ${item.source}` }
    : {};

  return (
    <motion.article
      className="media-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px', amount: 0.3 }}
      transition={{ duration: prefersReduced ? 0 : 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      <Wrapper className="media-card-link" {...wrapperProps}>
        <div className="media-card-image">
          <img src={item.image} alt="" loading="lazy" />
        </div>
        <div className="media-card-body">
          <span className="media-category">{item.category}</span>
          <h3 className="media-title">{item.title}</h3>
          <p className="media-meta">{item.source} · {item.year}</p>
          <p className="media-desc">{item.description}</p>
          <span className="media-arrow" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Wrapper>
      <style>{`
        .media-card {
          background: var(--color-white);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: box-shadow var(--transition-base), transform var(--transition-fast);
          text-decoration: none;
          color: inherit;
        }
        .media-card:hover {
          box-shadow: var(--shadow-hover);
        }
        .media-card:focus-visible {
          outline: 2px solid var(--color-graphite);
          outline-offset: 2px;
        }
        .media-card-link {
          display: flex;
          flex-direction: column;
          height: 100%;
          text-decoration: none;
          color: inherit;
        }
        .media-card-image {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: var(--color-concrete);
        }
        .media-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-slow);
        }
        .media-card:hover .media-card-image img {
          transform: scale(1.03);
        }
        .media-card-body {
          padding: var(--space-md);
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .media-category {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-stone);
          margin-bottom: var(--space-xs);
          display: inline-block;
          width: fit-content;
        }
        .media-title {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 400;
          line-height: 1.25;
          color: var(--color-graphite);
          margin-bottom: var(--space-xs);
        }
        .media-meta {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--color-stone);
          font-weight: 300;
          margin-bottom: var(--space-sm);
        }
        .media-desc {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          line-height: 1.6;
          color: var(--color-graphite-light);
          font-weight: 300;
          flex-grow: 1;
          margin-bottom: var(--space-md);
        }
        .media-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid var(--color-graphite);
          border-radius: 50%;
          color: var(--color-graphite);
          margin-top: auto;
          transition: all var(--transition-fast);
          align-self: flex-start;
        }
        .media-card:hover .media-arrow {
          background: var(--color-graphite);
          color: var(--color-white);
          border-color: var(--color-graphite);
          transform: translateX(4px);
        }
      `}</style>
    </motion.article>
  );
}