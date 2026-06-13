import { motion } from 'framer-motion';
import { teamMembers } from '../../data/team';
import TeamMemberCard from '../ui/TeamMemberCard';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const transition = { duration: prefersReduced ? 0 : 0.5 };

export default function About({ id }) {
  return (
    <section id={id} className="about-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
        >
          We Are Vaastavya
        </motion.h2>

        <div className="about-story">
          <p>
            A partnership firm started in Pune in 2006. We have worked on diverse typologies — residential apartments,
            housing societies, commercial complexes, hospitals, resorts, religious buildings, bungalows, farm houses,
            hotels, and institutional projects across India and Africa.
          </p>
          <p>
            With offices in Pune, Vapi, and Kinshasa (DRC), our practice spans continents and cultures, bringing
            rigorous architectural thinking to every context we work in.
          </p>
          <blockquote className="about-quote">
            Design is about creating elegant solutions to address user needs.
          </blockquote>
          <p>
            Every project begins with a deep understanding of place, purpose, and people. We craft architectural
            solutions that are aesthetically compelling and environmentally conscious — from the hills of Lonavla
            to the urban fabric of Mumbai, Ahmedabad, Bangalore, and beyond.
          </p>
        </div>

        <motion.h3
          className="team-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
        >
          Meet the Team
        </motion.h3>

        <div className="team-grid">
          {teamMembers.map((member, i) => (
            <TeamMemberCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* 
          ── TEAM PHOTO PLACEHOLDER ──────────────────────────────────────────
          To add Ar. Nilay Parekh's photo:
            1. Add the portrait image to: src/assets/team/nilay-parekh.jpg
               (Recommended: 600×600px square crop, high resolution)
            2. Import it at the top of this file:
               import nilayPhoto from '../assets/team/nilay-parekh.jpg'
            3. Replace `image: null` in src/data/team.js with: image: nilayPhoto
          ── SAME STEPS FOR Ar. Nidhi Parekh → nidhi-parekh.jpg ─────────────
        */}
      </div>

      <style>{`
        .about-section {
          background: var(--color-off-white);
        }
        .about-story {
          max-width: 800px;
          margin: 0 auto var(--space-xl);
        }
        .about-story p {
          font-size: var(--text-lg);
          line-height: 1.8;
          margin-bottom: var(--space-sm);
          color: var(--color-near-black);
        }
        .about-quote {
          font-family: var(--font-display);
          font-size: var(--text-xl);
          font-style: italic;
          font-weight: 300;
          color: var(--color-near-black);
          border-left: 4px solid var(--color-red);
          padding: var(--space-sm) var(--space-md);
          margin: var(--space-md) 0;
          background: rgba(178,34,34,0.04);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        }
        .team-heading {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: 700;
          text-align: center;
          margin-bottom: var(--space-lg);
          color: var(--color-near-black);
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-md);
          max-width: 900px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr;
          }
          .about-story p {
            font-size: var(--text-base);
          }
        }
      `}</style>
    </section>
  );
}
