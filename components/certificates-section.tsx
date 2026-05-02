"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Award, X, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const certificates = [
  {
    id: 1,
    title: "Google Cloud Digital Leader",
    issuer: "Google Cloud",
    date: "2025",
    image: "certificates/gcp.jpg",
    credentialUrl: "https://cloud.google.com/",
    description: "Verified foundational cloud concepts, services, and the Google Cloud platform.",
  },
  {
    id: 2,
    title: "Databricks Generative AI Associate",
    issuer: "Databricks",
    date: "2026",
    image: "certificates/databricks.png",
    credentialUrl: "https://credentials.databricks.com/1b4fd220-02c4-489a-910f-8d101cfbbc89#acc.t43QzH6x",
    description: "Demonstrated core generative AI knowledge, model evaluation, and data-driven intelligence workflows.",
  },
  {
    id: 3,
    title: "Java Certification",
    issuer: "Pantech E-Learning",
    date: "2023",
    image: "certificates/java.jpg",
    credentialUrl: "https://www.pantechelearning.com/",
    description: "Confirmed foundational Java programming skills including OOP, exception handling, and collections.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function CertificatesSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<(typeof certificates)[0] | null>(null)

  return (
    <section id="certificates" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
          <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Certifications
          </motion.h2>

          <div className="grid gap-10">
            <motion.div variants={itemVariants}>
              <div className="max-w-3xl mx-auto text-center mb-10">
                <p className="text-base sm:text-lg text-muted-foreground">
                  Explore my verified credentials and professional learning achievements.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert) => (
                  <motion.div
                    key={cert.id}
                    variants={itemVariants}
                    whileHover={{ y: -6, scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Card
                      className="cursor-pointer bg-background/60 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/5 hover:border-primary/50 transition-all duration-300 h-full"
                      onClick={() => setSelectedCertificate(cert)}
                    >
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="relative rounded-3xl overflow-hidden mb-5 h-44 bg-slate-950/10">
                          <img
                            src={cert.image || "/placeholder.svg"}
                            alt={cert.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold leading-tight mb-2">{cert.title}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
                        </div>
                        <div className="mt-auto flex items-center justify-between gap-3">
                          <Badge variant="outline" className="text-xs px-3 py-1">
                            {cert.date}
                          </Badge>
                          <Button size="sm" variant="outline" className="px-4 py-2">
                            View
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedCertificate(null)}
        >
          <motion.div
            className="bg-background rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{selectedCertificate.title}</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedCertificate(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <img
              src={selectedCertificate.image || "/placeholder.svg"}
              alt={selectedCertificate.title}
              className="w-full rounded-md mb-4"
            />
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground">{selectedCertificate.issuer}</p>
                <p className="text-sm text-muted-foreground">{selectedCertificate.date}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selectedCertificate.description}</p>
              <Button asChild>
                <a href={selectedCertificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Credential
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
