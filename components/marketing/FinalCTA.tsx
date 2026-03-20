"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  return (
    <section className="py-28 px-4">
      <motion.div
        className="mx-auto max-w-2xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
          Your database schema is
          <br />
          <span className="bg-gradient-to-r from-zinc-900 dark:from-white to-zinc-400 bg-clip-text text-transparent">
            3 minutes away.
          </span>
        </h2>
        <p className="mt-6 text-zinc-500 dark:text-zinc-400">
          No setup. No credit card. Just open the canvas and start building.
        </p>
        <Button size="xl" className="mt-8" asChild>
          <Link href="/auth" className="gap-2">
            Open SchemaLab <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>
    </section>
  )
}
