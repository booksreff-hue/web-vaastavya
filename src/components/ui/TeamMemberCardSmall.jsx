import { motion } from 'framer-motion';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function SmallInitialsAvatar({ name }) {
  const initials = name
    .replace(/^Ar\.\s*/i, '')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="team-avatar-small">
      <span className="team-avatar-small-initials">{initials}</span>
    </div>
  );
}

export default function TeamMemberCardSmall({ member, index }) {
  return (
    <motion.div
      className="team-card-small"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: prefersReduced ? 0 : 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
    >
      {member.image ? (
        <img src={member.image} alt={member.imageAlt} className="team-photo-small" loading="lazy" />
      ) : (
        <SmallInitialsAvatar name={member.name} />
      )}
      <div className="team-info-small">
        <h4 className="team-name-small">{member.name}</h4>
        <p className="team-role-small">{member.role}</p>
        {member.education && <p className="team-edu-small">{member.education}</p>}
      </div>
      <style>{`
        .team-card-small {
          background: white;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-card);
          overflow: hidden;
          transition: box-shadow 0.3s;
        }
        .team-card-small:hover {
          box-shadow: var(--shadow-hover);
        }
        .team-avatar-small {
          width: 100%;
          aspect-ratio: 1;
          background: var(--color-near-black);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .team-avatar-small-initials {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 700;
          color: var(--color-gold);
          line-height: 1;
        }
        .team-photo-small {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
        }
        .team-info-small {
          padding: var(--space-xs) var(--space-sm) var(--space-sm);
        }
        .team-name-small {
          font-family: var(--font-display);
          font-size: var(--text-sm);
          font-weight: 600;
          margin-bottom: 0.1rem;
          color: var(--color-near-black);
        }
        .team-role-small {
          font-size: var(--text-xs);
          color: var(--color-red);
          font-weight: 500;
          margin-bottom: 0.15rem;
        }
        .team-edu-small {
          font-size: 0.7rem;
          color: var(--color-grey);
          font-style: italic;
          font-weight: 300;
          line-height: 1.3;
        }
      `}</style>
    </motion.div>
  );
}
