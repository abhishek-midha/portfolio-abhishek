"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Brain, Zap } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const techStack = [
  { name: "Playwright", category: "Test Automation", icon: "🎭" },
  { name: "Selenium", category: "Test Automation", icon: "🦁" },
  { name: "Appium", category: "Mobile Testing", icon: "📱" },
  { name: "Java", category: "Programming", icon: "☕" },
  { name: "JavaScript/TypeScript", category: "Programming", icon: "📜" },
  { name: "TestNG", category: "Framework", icon: "✓" },
  { name: "Cucumber", category: "BDD", icon: "🥒" },
  { name: "REST Assured", category: "API Testing", icon: "🔌" },
  { name: "Postman", category: "API Testing", icon: "📮" },
  { name: "GitHub", category: "Tools", icon: "🐙" }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

const techVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
    },
  },
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const techStackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    // Animate section title
    const title = sectionRef.current.querySelector(".section-title")
    gsap.fromTo(
      title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    )

    // Animate card with parallax
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: -60, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      )
    }

    // Animate tech stack with stagger
    if (techStackRef.current) {
      const techBadges = techStackRef.current.querySelectorAll("[data-tech-badge]")
      gsap.fromTo(
        techBadges,
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: techStackRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  useEffect(() => {
    // Add hover animation to tech badges
    const techBadges = document.querySelectorAll("[data-tech-badge]")
    techBadges.forEach(badge => {
      badge.addEventListener("mouseenter", () => {
        gsap.to(badge, {
          y: -8,
          boxShadow: "0 15px 30px rgba(168, 85, 247, 0.4)",
          duration: 0.3,
        })
      })
      badge.addEventListener("mouseleave", () => {
        gsap.to(badge, {
          y: 0,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          duration: 0.3,
        })
      })
    })

    return () => {
      techBadges.forEach(badge => {
        badge.removeEventListener("mouseenter", () => {})
        badge.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])
  return (
    <section ref={sectionRef} id="about" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-pink-600/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16 section-title">
            <h2 className="text-4xl sm:text-5xl font-bold font-sans mb-4">
              <span className="gradient-text">About Me</span>
            </h2>
            <p className="text-lg text-muted-foreground font-sans">
              Automation-focused QE with expertise in building scalable test frameworks
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div ref={cardRef} variants={itemVariants}>
              <Card className="glass-card p-8 glow-effect">
                <CardContent className="p-0">
                  <div className="flex items-center mb-8">
                    <motion.div
                      className="w-28 h-28 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl font-bold text-white mr-6 shadow-2xl overflow-hidden"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img src="/profile.jpg" alt="Profile img" className="w-full h-full object-cover" />
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-2 font-sans">Abhishek Midha</h3>
                      <p className="text-muted-foreground font-sans">Software Engineer in Test (SDET)</p>
                      <div className="flex gap-2 mt-3">
                        <Code className="h-5 w-5 text-primary" />
                        <Zap className="h-5 w-5 text-purple-500" />
                        <Brain className="h-5 w-5 text-pink-500" />
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-sans text-lg">
                    Automation-focused Quality Engineer with hands-on experience in Playwright, Selenium, and Appium. Specialized in building scalable automation frameworks, integrating test suites with CI/CD pipelines, and ensuring high-quality releases. Passionate about improving test coverage, reducing manual effort, and delivering reliable products through strategic testing and continuous quality improvement.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-semibold mb-8 font-sans">
                <span className="gradient-text">Tech Stack</span>
              </h3>
              <motion.div ref={techStackRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4" variants={containerVariants}>
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    variants={techVariants}
                    data-tech-badge
                  >
                    <Badge
                      variant="secondary"
                      className="glass-card w-full justify-center py-3 px-4 hover:glow-effect transition-all duration-300 cursor-pointer group"
                    >
                      <span className="mr-2 text-lg group-hover:scale-125 transition-transform">{tech.icon}</span>
                      <span className="font-medium">{tech.name}</span>
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
