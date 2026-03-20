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
    <section id="how-it-works" className="py-24 md:py-32 px-6 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">Three steps to production-ready database code</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-4xl mx-auto items-start">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              className="flex flex-col items-center text-center gap-4 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Connector arrow (between steps on desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-8 translate-x-1/2 text-muted-foreground z-10">
                  <ArrowRight className="h-5 w-5" />
                </div>
              )}

              {/* Icon in bordered circle */}
              <div className="w-16 h-16 rounded-full border-2 border-border bg-background flex items-center justify-center text-foreground shadow-sm">
                <step.icon className="w-6 h-6 text-foreground" />
              </div>

              {/* Step number */}
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Step {step.step}</span>

              {/* Title */}
              <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[12rem] mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
