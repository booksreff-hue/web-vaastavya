import { teamMembers } from '../../data/team';
import TeamMemberCard from '../ui/TeamMemberCard';

export default function About({ id }) {
  const featuredMembers = teamMembers.filter(m => m.featured);
  const associates = teamMembers.filter(m => !m.featured);

  return (
    <section id={id} className="about" aria-labelledby="about-title">
      <div className="container">
        <div className="about-intro">
          <h2 id="about-title" className="section-title">
            We Are VAASTAVYA
          </h2>
          <div className="about-story">
            <p>
              A partnership firm started in Pune in 2006. We have worked on diverse typologies, including residential apartments,
              housing societies, commercial complexes, hospitals, resorts, religious buildings, bungalows, farm houses,
              hotels, and institutional projects across India, the Middle East, and Africa.
            </p>
            <p>
              With offices in Pune and Vapi, our practice spans continents and cultures, bringing
              rigorous architectural thinking to every context we work in.
            </p>
            <blockquote className="about-quote">
              Design is about creating elegant solutions to address user needs.
            </blockquote>
            <p>
              Every project begins with a deep understanding of place, purpose, and people. We craft architectural
              solutions that are aesthetically compelling and environmentally conscious, from the hills of Lonavla
              to the urban fabric of Mumbai, Ahmedabad, Bangalore, and beyond.
            </p>
          </div>
        </div>

        <div className="team-section">
          <div className="team-header">
            <h3 className="section-title section-title-sm">Meet the Team</h3>
            <p className="team-intro">
              The architects and designers behind VAASTAVYA.
            </p>
          </div>

          <div className="team-grid">
            {featuredMembers.map((member, i) => (
              <TeamMemberCard key={member.id} member={member} index={i} />
            ))}
          </div>

          {associates.length > 0 && (
            <div className="team-associates">
              <h4 className="team-subheading">Associates & Team</h4>
              <div className="team-grid-small">
                {associates.map((member, i) => (
                  <TeamMemberCard key={member.id} member={member} index={i} isAssociate />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .about {
          background: var(--color-ivory);
        }
        .about-intro {
          max-width: var(--max-width-narrow);
          margin: 0 auto var(--space-3xl);
          text-align: center;
        }
        .about-story {
          margin-top: var(--space-xl);
          text-align: left;
        }
        .about-story p {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          line-height: 1.8;
          margin-bottom: var(--space-md);
          color: var(--color-graphite-light);
          font-weight: 300;
        }
        .about-quote {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-style: italic;
          font-weight: 300;
          color: var(--color-graphite);
          border-left: 2px solid var(--color-graphite);
          padding-left: var(--space-md);
          margin: var(--space-lg) 0;
          line-height: 1.6;
        }
        .team-section {
          max-width: var(--max-width-wide);
          margin: 0 auto;
        }
        .team-header {
          text-align: center;
          margin-bottom: var(--space-xl);
        }
        .team-intro {
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--color-stone);
          margin-top: var(--space-sm);
          font-weight: 300;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--grid-gutter);
          margin-bottom: var(--space-2xl);
        }
        .team-associates {
          padding-top: var(--space-xl);
          border-top: 1px solid var(--color-concrete);
        }
        .team-subheading {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-weight: 400;
          text-align: center;
          margin-bottom: var(--space-lg);
          color: var(--color-graphite);
          position: relative;
        }
        .team-subheading::after {
          content: '';
          display: block;
          width: 60px;
          height: 1px;
          background: var(--color-graphite);
          margin: var(--space-sm) auto 0;
        }
        .team-grid-small {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--grid-gutter-sm);
        }
        @media (max-width: 1024px) {
          .team-grid-small {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
          .team-grid-small {
            grid-template-columns: repeat(2, 1fr);
          }
          .about-story p {
            font-size: var(--text-base);
          }
        }
        @media (max-width: 480px) {
          .team-grid-small {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}