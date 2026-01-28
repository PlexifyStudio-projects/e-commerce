import { useState, useEffect } from 'react';

/**
 * Tracks window scroll position for scroll-aware components.
 * Returns { y, direction, isAtTop }
 */
export const useScrollPosition = (threshold = 10) => {
  const [scroll, setScroll] = useState({
    y: 0,
    direction: 'up',
    isAtTop: true,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const updateScroll = () => {
      const currentY = window.scrollY;
      const direction = currentY > lastY ? 'down' : 'up';

      setScroll({
        y: currentY,
        direction,
        isAtTop: currentY < threshold,
      });

      lastY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scroll;
};
