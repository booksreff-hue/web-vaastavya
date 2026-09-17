import { mediaItems } from '../../data/media';
import MediaCard from '../ui/MediaCard';

export default function MediaCoverage({ id }) {
  return (
    <section id={id} className="media" aria-labelledby="media-title">
      <div className="container">
        <div className="media-header">
          <h2 id="media-title" className="section-title">Media Coverage</h2>
          <p className="media-intro">
            Features, interviews, and publications showcasing our work and perspective.
          </p>
        </div>

        <div className="media-grid">
          {mediaItems.map((item, i) => (
            <MediaCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .media {
          background: var(--color-warm-white);
        }
        .media-header {
          max-width: var(--max-width-narrow);
          margin: 0 auto var(--space-2xl);
          text-align: center;
        }
        .media-intro {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          line-height: 1.7;
          color: var(--color-stone);
          margin-top: var(--space-md);
          font-weight: 300;
        }
        .media-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--grid-gutter);
        }
        @media (max-width: 1024px) {
          .media-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 768px) {
          .media-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}