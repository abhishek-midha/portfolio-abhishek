'use client';

import { useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function GsapScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Refresh ScrollTrigger on page load
    ScrollTrigger.refresh();

    // Handle window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Smooth scroll animation using GSAP
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      e.preventDefault();

      const element = document.querySelector(href);
      if (!element) return;

      gsap.to(window, {
        scrollTo: {
          y: element,
          autoKill: false,
          offsetY: 80,
        },
        duration: 1.2,
        ease: 'power3.inOut',
      });
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
