export default function Unseen({ id }) {
  return (
    <section id={id} className="philosophy-page" aria-labelledby="unseen-title">
      <div className="container">
        <span className="philosophy-label">UNSEEN</span>
        <h2 id="unseen-title" className="philosophy-page-title">Unseen</h2>
        <p className="philosophy-page-text">
          I don't always seek the unknown. Sometimes, I discover the extraordinary within the familiar.
        </p>
      </div>
      <style>{`
        .philosophy-page {
          background: var(--color-ivory);
          padding: var(--space-3xl) 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }
        .container {
          max-width: var(--max-width-wide);
          margin: 0 auto;
          padding: 0 var(--space-md);
          text-align: center;
        }
        .philosophy-label {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--color-graphite);
          margin-bottom: var(--space-md);
          display: block;
        }
        .philosophy-page-title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: var(--color-graphite);
          margin: 0 0 var(--space-xl) 0;
        }
        .philosophy-page-text {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.6vw, 1.25rem);
          font-weight: 400;
          line-height: 1.8;
          color: var(--color-graphite-light);
          margin: 0;
        }
      `}</style>
    </section>
  );
}
