"use client"

import { motion } from "framer-motion"
import { MousePointer2, Link2, Code2, ArrowRight } from "lucide-react"

const steps = [
  {
    icon: MousePointer2,
    step: "1",
    title: "Draw",
    description: "Add tables to the canvas and define your fields",
  },
  {
    icon: Link2,
    step: "2",
    title: "Connect",
    description: "Drag lines between tables to define relationships",
  },
  {
    icon: Code2,
    step: "3",
    title: "Generate",
    description: "Select your language and instantly get production-ready code",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-4">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">Three steps to production-ready database code</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className="flex flex-col items-center text-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Connector arrow (between steps on desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute right-0 top-8 translate-x-1/2 z-10">
                  <ArrowRight className="h-5 w-5 text-zinc-300 dark:text-zinc-700" />
                </div>
              )}

              {/* Icon in bordered circle */}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-950">
                <step.icon className="h-6 w-6 text-zinc-900 dark:text-white" />
              </div>

              {/* Step number */}
              <span className="mt-4 text-xs font-mono text-zinc-400 dark:text-zinc-500">Step {step.step}</span>

              {/* Title */}
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-white">{step.title}</h3>

              {/* Description */}
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-[200px]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
