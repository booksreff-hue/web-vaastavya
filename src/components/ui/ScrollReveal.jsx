import { motion } from 'framer-motion';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const reveal = {
  initial: prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: prefersReduced ? 0 : 0.6,
    ease: [0.16, 1, 0.3, 1],
  },
};

export default function ScrollReveal({ children, className = '', delay = 0, once = true, margin = '-100px', amount = 0.3 }) {
  return (
    <motion.div
      className={className}
      {...reveal}
      transition={{ ...reveal.transition, delay }}
      whileInView={prefersReduced ? false : { opacity: 1, y: 0 }}
      viewport={{ once, margin, amount }}
    >
      {children}
    </motion.div>
  );
}
