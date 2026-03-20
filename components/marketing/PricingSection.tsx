"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"

const features = [
  "Unlimited projects",
  "All 5 language exports",
  "Real-time collaboration",
  "Save & revisit schemas",
  "Download any format",
  "Up to 10 collaborators per session",
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 md:py-32 px-6 flex flex-col items-center border-t border-border">
      <div className="mx-auto max-w-6xl w-full">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-4xl font-bold text-foreground mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-center text-muted-foreground text-lg max-w-xl mx-auto">
            Design, connect, and generate database schemas without worrying about limits or paywalls.
          </p>
        </motion.div>

        <div className="flex justify-center w-full">
          <motion.div
            className="w-full max-w-lg bg-card border border-border rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Corner ornaments */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-border/50 rounded-tl-2xl m-[1px]" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-border/50 rounded-tr-2xl m-[1px]" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-border/50 rounded-bl-2xl m-[1px]" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-border/50 rounded-br-2xl m-[1px]" />

            <h3 className="text-center text-xl font-semibold text-foreground mb-2">Completely Free</h3>
            <div className="mt-4 text-center flex items-baseline justify-center">
              <span className="text-center text-8xl font-extrabold text-foreground tracking-tighter">$0</span>
              <span className="text-muted-foreground text-xl ml-2">/ forever</span>
            </div>
            <p className="text-center text-muted-foreground text-sm mt-2 mb-8">
              No credit card. No hidden fees.
              <br />
              Use it as much as you want.
            </p>

            <div className="mt-8 space-y-3 flex flex-col items-center sm:items-start max-w-[280px] mx-auto text-left">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-sm text-foreground py-1 w-full">
                  <Check className="text-green-500 w-4 h-4 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Link 
              href="/auth" 
              className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl py-3 font-medium mt-8 inline-flex items-center justify-center transition-colors"
            >
              Start Building — It&apos;s Free
            </Link>
          </motion.div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 max-w-xs mx-auto leading-relaxed">
          Pricing may be introduced in the future as SchemaLab grows. Early users
          will always receive a generous free tier.
        </p>
      </div>
    </section>
  )
}
