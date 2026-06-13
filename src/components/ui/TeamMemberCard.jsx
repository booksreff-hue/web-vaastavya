import { motion } from 'framer-motion';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function InitialsAvatar({ name }) {
  const initials = name
    .replace(/^Ar\.\s*/i, '')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="team-avatar">
      <span className="team-avatar-initials">{initials}</span>
      <style>{`
        .team-avatar {
          width: 100%;
          aspect-ratio: 1;
          background: var(--color-near-black);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
        }
        .team-avatar-initials {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 4rem);
          font-weight: 700;
          color: var(--color-gold);
          line-height: 1;
        }
      `}</style>
    </div>
  );
}

export default function TeamMemberCard({ member, index }) {
  return (
    <motion.div
      className="team-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: prefersReduced ? 0 : 0.5, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
    >
      {member.image ? (
        <img
          src={member.image}
          alt={member.imageAlt}
          className="team-photo"
          loading="lazy"
        />
      ) : (
        <InitialsAvatar name={member.name} />
      )}
      <div className="team-info">
        <h3 className="team-name">{member.name}</h3>
        <p className="team-role">{member.role}</p>
        <p className="team-edu">{member.education}</p>
        <p className="team-bio">{member.bio}</p>
        <p className="team-phone">{member.phone}</p>
      </div>
      <style>{`
        .team-card {
          background: white;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-card);
          overflow: hidden;
          transition: box-shadow 0.3s;
        }
        .team-card:hover {
          box-shadow: var(--shadow-hover);
        }
        .team-photo {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
        }
        .team-info {
          padding: var(--space-sm) var(--space-md) var(--space-md);
        }
        .team-name {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 600;
          margin-bottom: 0.2rem;
        }
        .team-role {
          font-size: var(--text-sm);
          color: var(--color-red);
          font-weight: 500;
          margin-bottom: 0.3rem;
        }
        .team-edu {
          font-size: var(--text-xs);
          color: var(--color-grey);
          font-style: italic;
          font-weight: 300;
          margin-bottom: var(--space-sm);
        }
        .team-bio {
          font-size: 0.95rem;
          line-height: 1.7;
          margin-bottom: var(--space-xs);
        }
        .team-phone {
          font-size: var(--text-sm);
          color: var(--color-grey);
        }
      `}</style>
    </motion.div>
  );
}
