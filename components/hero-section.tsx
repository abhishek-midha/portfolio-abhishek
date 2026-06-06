"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Eye, Sparkles, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Create GSAP timeline for hero animations
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 0.8 },
    });

    // Animate title with staggered letter effect
    if (titleRef.current) {
      const titleText = titleRef.current.querySelectorAll(".gradient-text");
      tl.fromTo(
        titleText,
        { opacity: 0, y: 80, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
        0
      );
    }

    // Animate description
    if (descRef.current) {
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.2
      );
    }

    // Animate buttons with stagger
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll("button, a");
      tl.fromTo(
        buttons,
        { opacity: 0, y: 30, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6 },
        0.3
      );
    }

    // Animate arrow with continuous bounce
    if (arrowRef.current) {
      gsap.fromTo(
        arrowRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, delay: 0.8 }
      );

      gsap.to(arrowRef.current, {
        y: 15,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.02;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.02;

      gsap.to(heroRef.current.querySelectorAll(".parallax-element"), {
        x: x * 0.5,
        y: y * 0.5,
        duration: 0.5,
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector("#projects");
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, autoKill: false },
        duration: 1.5,
        ease: "power3.inOut",
      });
    }
  };

  const scrollToExperience = () => {
    const element = document.querySelector("#experience");
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, autoKill: false },
        duration: 1.5,
        ease: "power3.inOut",
      });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-pink-400/10 to-blue-400/20 dark:from-purple-600/30 dark:via-pink-600/20 dark:to-blue-600/30 parallax-element" />
        <div className="absolute inset-0 bg-gradient-to-tl from-cyan-400/10 via-transparent to-violet-400/10 dark:from-cyan-600/20 dark:to-violet-600/20 parallax-element" />

        {/* Floating Elements with GSAP */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary to-pink-500 rounded-full opacity-60 parallax-element"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6"
          >
            <Sparkles className="mx-auto h-12 w-12 text-primary mb-4 animate-pulse" />
          </motion.div>

          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 font-sans"
          >
            <span className="gradient-text block mb-2 p-5">
              Software Engineer in Test (SDET)
            </span>
          </h1>

          <p
            ref={descRef}
            className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto font-sans font-light"
          >
            Quality isn't an afterthought — it's the architecture.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 flex-wrap">
            <Button
              size="lg"
              onClick={scrollToExperience}
              className="glass-button glow-effect group font-medium px-8 py-3 relative overflow-hidden bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-600"
            >
              <Briefcase className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform" />
              View Experience
            </Button>
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="glass-button glow-effect group font-medium px-8 py-3"
            >
              <Eye className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              View Projects
            </Button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="glass-button group font-medium px-8 py-3"
              >
                <Download className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                View Resume
              </Button>
            </a>
          </div>

          <div ref={arrowRef} className="relative">
            <div
              className="glass-card rounded-full p-3 inline-block group-hover:glow-effect transition-all duration-300 cursor-pointer group"
              onClick={scrollToProjects}
            >
              <ArrowDown className="h-6 w-6 text-primary group-hover:text-pink-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
