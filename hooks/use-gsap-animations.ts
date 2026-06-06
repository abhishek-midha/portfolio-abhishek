'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimation = () => {
  const elementRef = useRef<HTMLDivElement>(null);

  const fadeInUp = (duration = 0.8, delay = 0) => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
      }
    );
  };

  const fadeInUpOnScroll = (duration = 0.8, delay = 0) => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none none',
        },
      }
    );
  };

  const scaleInOnScroll = (duration = 0.8) => {
    if (!elementRef.current) return;

    gsap.fromTo(
      elementRef.current,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration,
        ease: 'back.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  };

  const parallax = (speed = 0.5) => {
    if (!elementRef.current) return;

    gsap.to(elementRef.current, {
      y: window.innerHeight * speed,
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
    });
  };

  return {
    elementRef,
    fadeInUp,
    fadeInUpOnScroll,
    scaleInOnScroll,
    parallax,
  };
};

export const useGsapTimeline = () => {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const createTimeline = (options?: gsap.core.TimelineConfigArgs) => {
    timelineRef.current = gsap.timeline(options);
    return timelineRef.current;
  };

  const getTimeline = () => {
    if (!timelineRef.current) {
      timelineRef.current = gsap.timeline();
    }
    return timelineRef.current;
  };

  return {
    createTimeline,
    getTimeline,
    timelineRef,
  };
};

export const useScrollTriggerAnimation = (callback: (trigger: any) => void) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => callback(trigger),
      onLeaveBack: () => callback(trigger),
    });

    return () => {
      trigger.kill();
    };
  }, [callback]);

  return containerRef;
};

export const useStaggerAnimation = (
  elements: HTMLElement[],
  duration = 0.6,
  stagger = 0.1
) => {
  useEffect(() => {
    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elements[0]?.parentElement,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, [elements, duration, stagger]);
};
