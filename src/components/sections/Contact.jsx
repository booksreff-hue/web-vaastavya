import { motion } from 'framer-motion';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const transition = { duration: prefersReduced ? 0 : 0.5 };

const contactInfo = [
  {
    label: 'Studio Address',
    value: '4, Gulmohar Grace, Plot No-129, Lane No-2, Opp. Bharat Petroleum, Lulla Nagar, Pune - 411036',
    link: 'https://maps.app.goo.gl/nTdEcN2sZFpHABey5',
    linkLabel: 'View on Google Maps',
  },
  {
    label: 'Phone',
    value: (
      <>
        Ar. Nilay Parekh: <a href="tel:+919850092122" className="contact-link">+91 985 009 2122</a><br />
        Ar. Nidhi Parekh: <a href="tel:+919822440515" className="contact-link">+91 982 244 0515</a>
      </>
    ),
  },
  {
    label: 'Email',
    value: (
      <>
        <a href="mailto:vaastavya@gmail.com" className="contact-link">vaastavya@gmail.com</a><br />
        <a href="mailto:info.vaastavya@gmail.com" className="contact-link">info.vaastavya@gmail.com</a>
      </>
    ),
  },
];

export default function Contact({ id }) {
  return (
    <section id={id} className="contact-section">
      <div className="container">
        <motion.h2
          className="section-title contact-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
        >
          Get in Touch
        </motion.h2>

        <div className="contact-grid">
          {contactInfo.map((item, i) => (
            <motion.div
              key={item.label}
              className="contact-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ ...transition, delay: i * 0.1 }}
            >
              <h3 className="contact-item-label">{item.label}</h3>
              <div className="contact-item-value">{item.value}</div>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="contact-map-link">
                  {item.linkLabel} &rarr;
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="contact-cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.3 }}
        >
          <a href="mailto:info.vaastavya@gmail.com" className="contact-btn">
            Start Your Project
          </a>
        </motion.div>

        <div className="contact-social">
          <span className="contact-social-label">Follow us</span>
          <div className="contact-social-links">
            <a href="https://www.facebook.com/VAASTAVYA" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://www.instagram.com/vaastavya/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/vaastavya-architects-3a1aa328b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background: var(--color-near-black);
          color: var(--color-off-white);
        }
        .contact-title {
          color: white;
          border-bottom-color: var(--color-red);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-md);
          margin-bottom: var(--space-lg);
        }
        .contact-item {
          background: rgba(255,255,255,0.06);
          padding: var(--space-md);
          border-radius: var(--radius-md);
          backdrop-filter: blur(8px);
        }
        .contact-item-label {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 600;
          margin-bottom: var(--space-xs);
          color: white;
        }
        .contact-item-value {
          font-size: var(--text-sm);
          line-height: 1.7;
          color: rgba(255,255,255,0.8);
        }
        .contact-link {
          color: var(--color-gold);
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .contact-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
        .contact-map-link {
          display: inline-block;
          margin-top: var(--space-xs);
          font-size: var(--text-sm);
          color: var(--color-red);
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .contact-map-link:hover {
          opacity: 0.8;
        }
        .contact-cta {
          text-align: center;
          margin-bottom: var(--space-lg);
        }
        .contact-btn {
          display: inline-block;
          font-family: var(--font-body);
          font-size: var(--text-lg);
          font-weight: 500;
          color: white;
          border: 2px solid white;
          padding: var(--space-sm) var(--space-lg);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.3s, color 0.3s;
          text-decoration: none;
        }
        .contact-btn:hover {
          background: var(--color-red);
          border-color: var(--color-red);
          color: white;
        }
        .contact-social {
          text-align: center;
          padding-top: var(--space-md);
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .contact-social-label {
          display: block;
          font-size: var(--text-sm);
          color: rgba(255,255,255,0.5);
          margin-bottom: var(--space-sm);
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .contact-social-links {
          display: flex;
          justify-content: center;
          gap: var(--space-sm);
        }
        .contact-social-links a {
          color: rgba(255,255,255,0.6);
          transition: color 0.2s;
          display: flex;
          padding: 0.5rem;
        }
        .contact-social-links a:hover {
          color: var(--color-red);
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
