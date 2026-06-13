import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const transition = { duration: prefersReduced ? 0 : 0.5 };

export default function Work({ id }) {
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
          Our Work
        </motion.h2>

        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
