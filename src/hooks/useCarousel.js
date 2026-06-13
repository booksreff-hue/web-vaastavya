import { useState, useEffect, useCallback, useRef } from 'react';

export function useCarousel(items, { autoAdvance = true, interval = 5000 } = {}) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (!autoAdvance || isPaused) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [autoAdvance, isPaused, interval, next]);

  return { current, goTo, next, prev, setIsPaused, isPaused };
}
