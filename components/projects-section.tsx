"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, Star, Github, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const projects = [
  {
    id: 1,
    title: "E-commerce Test Automation Framework",
    description:
      "Developed a production-style automation framework for e-commerce workflow validation using Playwright and TypeScript, simulating real QA automation practices with CI/CD integration.",
    highlights: [
      "Automated login, cart, checkout, sorting, navigation, and end-to-end purchase workflows",
      "Built modular Page Object Model framework for maintainability and scalability",
      "Implemented dual CI pipelines: PR smoke suite and manually triggered full regression suite",
      "Integrated Playwright reporting with execution artifacts for debugging and traceability",
      "Enabled reusable locators, assertions, and utility-driven framework design",
    ],
    tech: ["Playwright", "TypeScript", "GitHub Actions", "Node.js", "CI/CD", "Playwright Reports"],
    category: "Automation",
    image: "/projects/playwright-ecommerce.png",
    github: "https://github.com/abhishek-midha/playwright-ecommerce-automation",
    featured: true,
  },
  {
    id: 2,
    title: "REST API Automation Framework",
    description:
      "Developed an API automation framework to validate RESTful services using Rest Assured and Postman, focusing on CRUD operations, response structure, and authentication mechanisms for reliable backend testing.",
    highlights: [
      "Automated GET, POST, PUT, and DELETE API requests",
      "Implemented JSON schema validation and response assertions",
      "Tested Bearer Token and API key authentication",
      "Chained API requests for end-to-end workflow validation",
      "Created comprehensive test reports with detailed logs and failure analysis",
    ],
    tech: ["Java", "Rest Assured", "TestNG", "Postman", "JSON"],
    category: "API",
    image: "/inprogress.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "Mobile App Automation Framework",
    description:
      "Created a mobile automation framework using Appium to test core functionalities of an Android application, including login, navigation, and form submissions on emulators and real devices.",
    highlights: [
      "Automated end-to-end user flows on Android devices and emulators",
      "Implemented Page Object Model for maintainable test design",
      "Used XPath, ID, and Accessibility ID locators",
      "Handled gestures, waits, and dynamic elements",
      "Executed tests on parallel devices with robust reporting and failure screenshots",
    ],
    tech: ["Java", "Appium", "TestNG", "Android Studio"],
    category: "Mobile",
    image: "/inprogress.jpg",
    featured: true,
  },
]

const categories = ["All", "Automation", "API", "Mobile"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
    },
  },
}

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-400/5 to-pink-400/5 dark:from-cyan-600/10 dark:via-purple-600/10 dark:to-pink-600/10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold font-sans mb-4">
              <span className="gradient-text">Featured Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground font-sans">
              Showcasing my latest work in test automation and quality engineering
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={`glass-button font-medium px-6 py-2 ${selectedCategory === category ? "glow-effect" : ""}`}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {category}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className="relative"
                >
                  {project.featured && (
                    <motion.div
                      className="absolute -top-2 -right-2 z-10"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <div className="glass-card rounded-full p-2 glow-effect">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      </div>
                    </motion.div>
                  )}

                  <Card className="glass-card h-full glow-effect group overflow-hidden flex flex-col">
                    <CardHeader className="p-0 relative">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-48 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {project.github && (
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors duration-200 backdrop-blur-sm"
                              title="View on GitHub"
                            >
                              <Github className="h-4 w-4" />
                              <span className="text-xs font-medium">GitHub</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col flex-grow">
                      <CardTitle className="mb-3 text-xl font-sans group-hover:gradient-text transition-all duration-300">
                        {project.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm mb-4 font-sans">{project.description}</p>

                      <ul className="space-y-2 mb-4 text-sm text-muted-foreground font-sans flex-grow">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2">
                            <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-cyan-500" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="glass-card text-xs font-medium">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
