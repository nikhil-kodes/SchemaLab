"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32 px-6 text-center border-t border-border">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          Your database schema is
          <br />
          <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            3 minutes away.
          </span>
        </h2>
        <p className="text-muted-foreground text-lg mb-10">
          No setup. No credit card. Just open the canvas and start building.
        </p>
        <Link 
          href="/auth" 
          className="bg-foreground text-background hover:bg-foreground/90 px-10 py-4 rounded-xl text-base font-medium inline-flex items-center gap-2 transition-colors"
        >
          Open SchemaLab <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </section>
  )
}
