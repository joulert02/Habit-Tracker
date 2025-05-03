import { RefObject, useEffect } from 'react';

interface ResizeOptions {
  onResize: () => void;
  elementRef?: RefObject<HTMLElement>;
  useWindow?: boolean;
}

export const useResizeObserver = ({ onResize, elementRef, useWindow = false }: ResizeOptions) => {
  useEffect(() => {
    if (!elementRef?.current && !useWindow) return;

    const updateSize = () => {
      onResize();
    };

    // Set up window resize listener if needed
    if (useWindow) {
      window.addEventListener('resize', updateSize);
    }

    // Set up ResizeObserver if element reference is provided
    let resizeObserver: ResizeObserver | undefined;
    if (elementRef?.current) {
      resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(elementRef.current);
    }

    // Initial size update
    updateSize();

    return () => {
      if (useWindow) {
        window.removeEventListener('resize', updateSize);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [elementRef, onResize, useWindow]);
}; 