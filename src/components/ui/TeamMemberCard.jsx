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
    <div className="team-avatar" aria-hidden="true">
      <span className="team-avatar-initials">{initials}</span>
      <style>{`
        .team-avatar {
          width: 100%;
          aspect-ratio: 1;
          background: var(--color-graphite);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .team-avatar-initials {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 4rem);
          font-weight: 400;
          font-style: italic;
          color: var(--color-white);
          line-height: 1;
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
}

export default function TeamMemberCard({ member, index, isAssociate }) {
  const cardClass = isAssociate ? 'team-card-small' : 'team-card';

  return (
    <motion.article
      className={cardClass}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px', amount: 0.3 }}
      transition={{ duration: prefersReduced ? 0 : 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: isAssociate ? -4 : -6 }}
      whileTap={{ scale: 0.98 }}
    >
      {member.image ? (
        <img
          src={member.image}
          alt={member.imageAlt}
          className={isAssociate ? 'team-photo-small' : 'team-photo'}
          loading="lazy"
        />
      ) : (
        <InitialsAvatar name={member.name} />
      )}
      <div className={isAssociate ? 'team-info-small' : 'team-info'}>
        <h4 className={isAssociate ? 'team-name-small' : 'team-name'}>{member.name}</h4>
        <p className={isAssociate ? 'team-role-small' : 'team-role'}>{member.role}</p>
        {member.education && !isAssociate && (
          <p className="team-edu">{member.education}</p>
        )}
        {!isAssociate && member.bio && (
          <p className="team-bio">{member.bio}</p>
        )}
        {!isAssociate && member.phone && (
          <p className="team-phone">
            <a href={`tel:${member.phone.replace(/\s+/g, '')}`} className="team-phone-link">{member.phone}</a>
          </p>
        )}
      </div>
      <style>{`
        .team-card,
        .team-card-small {
          background: var(--color-white);
          border-radius: var(--radius-md);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: box-shadow var(--transition-base), transform var(--transition-fast);
        }
        .team-card:hover,
        .team-card-small:hover {
          box-shadow: var(--shadow-hover);
        }
        .team-photo,
        .team-photo-small {
          width: 100%;
          aspect-ratio: 1;
          object-fit: cover;
          flex-shrink: 0;
        }
        .team-info,
        .team-info-small {
          padding: var(--space-md);
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .team-info-small {
          padding: var(--space-sm) var(--space-md);
        }
        .team-name,
        .team-name-small {
          font-family: var(--font-display);
          font-weight: 400;
          color: var(--color-graphite);
          margin-bottom: var(--space-xs);
        }
        .team-name {
          font-size: var(--text-xl);
        }
        .team-name-small {
          font-size: var(--text-lg);
        }
        .team-role,
        .team-role-small {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--color-stone);
          font-weight: 400;
          margin-bottom: var(--space-sm);
        }
        .team-role-small {
          margin-bottom: var(--space-xs);
        }
        .team-edu {
          font-family: var(--font-body);
          font-size: var(--text-xs);
          color: var(--color-stone-light);
          font-style: italic;
          font-weight: 300;
          margin-bottom: var(--space-sm);
        }
        .team-bio {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          line-height: 1.7;
          color: var(--color-graphite-light);
          font-weight: 300;
          flex-grow: 1;
          margin-bottom: var(--space-sm);
        }
        .team-phone {
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--color-stone);
        }
        .team-phone-link {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color var(--transition-fast);
        }
        .team-phone-link:hover {
          border-color: currentColor;
        }
        @media (max-width: 768px) {
          .team-name {
            font-size: var(--text-lg);
          }
        }
      `}</style>
    </motion.article>
  );
}