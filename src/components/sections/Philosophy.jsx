export default function Philosophy({ id }) {
  const quotes = [
    {
      label: 'UNHEARD',
      text: 'I design to hear the music I haven\'t heard yet.',
    },
    {
      label: 'UNSEEN',
      text: 'I don\'t always seek the unknown. Sometimes, I discover the extraordinary within the familiar.',
    },
    {
      label: 'UNFELT',
      text: 'I don\'t believe architecture belongs to an era. I believe it belongs to an imagination.',
    },
  ];

  return (
    <section id={id} className="philosophy" aria-labelledby="philosophy-title">
      <div className="container">
        <h2 id="philosophy-title" className="philosophy-title">Design Philosophy</h2>
        <div className="philosophy-grid">
          {quotes.map((q) => (
            <blockquote key={q.label} className="philosophy-quote">
              <span className="philosophy-label">{q.label}</span>
              <p className="philosophy-text">{q.text}</p>
            </blockquote>
          ))}
        </div>
      </div>

      <style>{`
        .philosophy {
          background: var(--color-ivory);
          padding: var(--space-3xl) 0;
        }
        .philosophy-title {
          font-family: var(--font-display);
          font-size: var(--text-3xl);
          font-weight: 400;
          letter-spacing: -0.02em;
          text-align: center;
          color: var(--color-graphite);
          margin-bottom: var(--space-2xl);
        }
        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-lg);
          max-width: var(--max-width-wide);
          margin: 0 auto;
        }
        .philosophy-quote {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: var(--space-xl) var(--space-md);
        }
        .philosophy-label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--color-stone);
          margin-bottom: var(--space-md);
          display: block;
        }
        .philosophy-text {
          font-family: var(--font-display);
          font-size: var(--text-lg);
          font-weight: 300;
          line-height: 1.7;
          color: var(--color-graphite);
          margin: 0;
        }
        @media (max-width: 1024px) {
          .philosophy-grid {
            grid-template-columns: 1fr;
            gap: var(--space-xl);
          }
        }
      `}</style>
    </section>
  );
}
