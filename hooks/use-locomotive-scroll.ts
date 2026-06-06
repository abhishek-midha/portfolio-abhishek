'use client';

import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

export const useLocomotiveScroll = () => {
  const scrollRef = useRef<LocomotiveScroll | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
      el: containerRef.current || window.document.documentElement,
      smooth: true,
      smartphone: {
        smooth: true,
      },
      tablet: {
        smooth: true,
      },
      reloadOnContext: true,
      multiplier: 1,
      firefoxMultiplier: 50,
      touchMultiplier: 2,
      class: 'is-reveal',
    });

    scrollRef.current = scroll;

    // Update scroll on window resize
    const handleResize = () => {
      scroll.update();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      scroll.destroy();
    };
  }, []);

  const scrollTo = (element: HTMLElement | string, options?: any) => {
    scrollRef.current?.scrollTo(element, options);
  };

  const update = () => {
    scrollRef.current?.update();
  };

  const destroy = () => {
    scrollRef.current?.destroy();
  };

  return {
    containerRef,
    scrollRef,
    scrollTo,
    update,
    destroy,
  };
};
