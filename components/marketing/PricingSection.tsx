"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
    <section id="pricing" className="py-28 px-4 relative overflow-hidden">
      {/* Grid background behind card */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 dark:opacity-100"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-md">
        <motion.div
          className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 p-8 text-center shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Corner ornaments */}
          <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-black/20 dark:border-white/20 rounded-tl-2xl" />
          <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-black/20 dark:border-white/20 rounded-tr-2xl" />
          <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-black/20 dark:border-white/20 rounded-bl-2xl" />
          <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-black/20 dark:border-white/20 rounded-br-2xl" />

          {/* Animated border trail */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <div
              className="absolute w-20 h-20 rounded-full blur-xl opacity-30"
              style={{
                background: "radial-gradient(circle, white 0%, transparent 70%)",
                animation: "border-trail 5s linear infinite",
                offsetPath: "rect(0 100% 100% 0 round 16px)",
              }}
            />
          </div>

          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Completely Free</h3>
          <div className="mt-4">
            <span className="text-7xl font-extrabold text-zinc-900 dark:text-white">$0</span>
            <span className="ml-2 text-lg text-zinc-500 dark:text-zinc-400">/ forever</span>
          </div>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            No credit card. No hidden fees.
            <br />
            Use it as much as you want.
          </p>

          <div className="mt-8 space-y-3 text-left">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check className="h-4 w-4 text-green-500 dark:text-green-400 shrink-0" />
                <span className="text-sm text-zinc-600 dark:text-zinc-300">{feature}</span>
              </div>
            ))}
          </div>

          <Button className="mt-8 w-full" size="lg" asChild>
            <Link href="/auth">Start Building — It&apos;s Free</Link>
          </Button>
        </motion.div>

        <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-500 max-w-sm mx-auto">
          Pricing may be introduced in the future as SchemaLab grows. Early users
          will always receive a generous free tier.
        </p>
      </div>
    </section>
  )
}
