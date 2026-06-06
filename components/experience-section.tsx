"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Calendar, CheckCircle } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    id: 1,
    role: "Quality Engineer (Automation)",
    company: "Accenture",
    client: "The Hartford",
    duration: "January 2025 – Present",
    location: "Remote",
    type: "Full-time",
    description:
      "Automation-focused Quality Engineer designing and executing comprehensive E2E test scenarios, building scalable automation frameworks, and leading quality assurance across multiple product sprints.",
    highlights: [
      "Designed and executed 150+ E2E test scenarios using Playwright, achieving 95%+ functional coverage consistently across every production release",
      "Built and maintained a scalable Playwright automation framework using Page Object Model and reusable component architecture, covering 50+ test scenarios",
      "Built cross-platform mobile automation framework using Appium for Android and iOS, improving test coverage by 40% and reducing manual effort per sprint",
      "Led regression testing cycles across 10+ sprints, maintaining 95%+ pre-production bug catch rate with zero critical escapes to production",
      "Integrated Playwright test suites with GitHub Actions CI/CD pipeline, enabling automated test execution on every pull request",
      "Partnered with Product Owners and Business Analysts to refine requirements and improve release quality across 10+ sprints",
      "Managed full defect lifecycle — logging, triage, root cause analysis, and resolution tracking — maintaining zero critical bug escapes",
    ],
    skills: ["Playwright", "Appium", "Selenium", "GitHub Actions", "CI/CD", "TestNG", "JIRA", "Page Object Model"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
}

const highlightVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
    },
  },
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)

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

    // Animate experience cards
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll("[data-exp-card]")
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          duration: 0.8,
          scrollTrigger: {
            trigger: cardsContainerRef.current,
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
    // Add hover animation to highlight items
    const highlights = document.querySelectorAll("[data-highlight]")
    highlights.forEach(highlight => {
      highlight.addEventListener("mouseenter", () => {
        gsap.to(highlight, {
          x: 10,
          duration: 0.3,
        })
      })
      highlight.addEventListener("mouseleave", () => {
        gsap.to(highlight, {
          x: 0,
          duration: 0.3,
        })
      })
    })

    return () => {
      highlights.forEach(highlight => {
        highlight.removeEventListener("mouseenter", () => {})
        highlight.removeEventListener("mouseleave", () => {})
      })
    }
  }, [])
  return (
    <section ref={sectionRef} id="experience" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-pink-400/5 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-pink-600/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16 section-title">
            <h2 className="text-4xl sm:text-5xl font-bold font-sans mb-4">
              <span className="gradient-text">Professional Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground font-sans">
              Delivering quality through strategic automation and continuous improvement
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div ref={cardsContainerRef} className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div key={exp.id} data-exp-card variants={itemVariants}>
                <Card className="glass-card glow-effect overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
                      <div>
                        <CardTitle className="text-2xl font-bold mb-2 gradient-text">{exp.role}</CardTitle>
                        <div className="flex flex-wrap gap-3">
                          <div className="flex items-center text-muted-foreground gap-1">
                            <Briefcase className="h-4 w-4 text-primary" />
                            <span className="font-medium">{exp.company}</span>
                            {exp.client && <span className="text-sm text-muted-foreground">({exp.client})</span>}
                          </div>
                          <div className="flex items-center text-muted-foreground gap-1">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-sm">{exp.duration}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="glass-card h-fit">{exp.type}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                    {/* Highlights */}
                    <div>
                      <h4 className="font-semibold mb-4 text-foreground">Key Achievements:</h4>
                      <motion.div
                        className="space-y-3"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                          hidden: { opacity: 0 },
                          visible: {
                            opacity: 1,
                            transition: {
                              staggerChildren: 0.1,
                            },
                          },
                        }}
                      >
                        {exp.highlights.map((highlight, idx) => (
                          <motion.div
                            key={idx}
                            variants={highlightVariants}
                            className="flex gap-3 items-start"
                            data-highlight
                          >
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground text-sm leading-relaxed">{highlight}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </div>

                    {/* Skills Used */}
                    <div>
                      <h4 className="font-semibold mb-3 text-foreground">Skills & Tools:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <motion.div
                            key={skill}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge variant="secondary" className="glass-card font-medium">
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
