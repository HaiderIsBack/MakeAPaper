// useLenis.js
import { useEffect } from 'react';
import Lenis from 'lenis';

const useLenis = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      smoothWheel: true,
      smoothTouch: true,
    });

    // Define an animation frame loop
    const update = (time) => {
      lenis.raf(time);
      requestAnimationFrame(update);
    };

    // Start the loop
    requestAnimationFrame(update);

    // Clean up on component unmount
    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useLenis;