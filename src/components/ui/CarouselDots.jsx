import { motion } from 'framer-motion';

export default function CarouselDots({ total, active, onDotClick }) {
  return (
    <div className="carousel-dots">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          className={`dot${i === active ? ' active' : ''}`}
          onClick={() => onDotClick(i)}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
      <style>{`
        .carousel-dots {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 10px;
          z-index: 2;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          border: none;
          padding: 0;
          transition: background 0.3s;
        }
        .dot.active {
          background: white;
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
