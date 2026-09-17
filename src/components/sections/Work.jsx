import { projects } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';

export default function Work({ id }) {
  return (
    <section id={id} className="work" aria-labelledby="work-title">
      <div className="container">
        <div className="work-header">
          <h2 id="work-title" className="section-title">
            Selected Work
          </h2>
          <p className="work-intro">
            Interior design projects that balance function, materiality, and human experience.
          </p>
        </div>

        <div className="work-grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} total={projects.length} />
          ))}
        </div>
      </div>

      <style>{`
        .work {
          background: var(--color-warm-white);
        }
        .work-header {
          max-width: var(--max-width-narrow);
          margin: 0 auto var(--space-2xl);
          text-align: center;
        }
        .work-intro {
          font-family: var(--font-body);
          font-size: var(--text-lg);
          line-height: 1.7;
          color: var(--color-stone);
          margin-top: var(--space-md);
          font-weight: 300;
        }
        .work-grid {
          display: flex;
          flex-direction: column;
          gap: var(--space-2xl);
          max-width: 900px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .work-grid {
            gap: var(--space-xl);
          }
        }
      `}</style>
    </section>
  );
}