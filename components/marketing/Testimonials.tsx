"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    text: "I designed our entire microservices DB schema in 20 minutes. Would've taken me a day in SQL.",
    name: "Aryan K.",
    role: "Backend Engineer",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    text: "Finally a tool that speaks both Prisma and SQL. The code it generates is cleaner than what I write manually.",
    name: "Sofia M.",
    role: "Full-Stack Dev",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    text: "The real-time collab feature is insane for a free tool. My team used it to design our startup's DB live on a call.",
    name: "Ravi T.",
    role: "CTO at EarlyStage",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    text: "I'm a CS student and this helped me understand foreign keys better than any textbook.",
    name: "Priya N.",
    role: "CS Student",
    avatar: "https://i.pravatar.cc/100?img=9",
  },
  {
    text: "Switched from dbdiagram.io the day I found this. Never looked back.",
    name: "James L.",
    role: "Senior Engineer",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    text: "Pulled up SchemaLab during a system design interview to sketch my DB. Interviewer was impressed.",
    name: "Daniel W.",
    role: "SWE",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    text: "The Drizzle export is perfect. Saves me 30 minutes every new project.",
    name: "Emma R.",
    role: "Next.js Dev",
    avatar: "https://i.pravatar.cc/100?img=16",
  },
  {
    text: "I use it every single sprint planning session to model new features with my team.",
    name: "Marcus P.",
    role: "Tech Lead",
    avatar: "https://i.pravatar.cc/100?img=14",
  },
  {
    text: "The dot-grid canvas feels exactly like a professional design tool. Incredible UX.",
    name: "Yuki S.",
    role: "Designer turned Dev",
    avatar: "https://i.pravatar.cc/100?img=20",
  },
  {
    text: "It's the Figma of database design. Simple statement, completely true.",
    name: "Niamh C.",
    role: "Platform Engineer",
    avatar: "https://i.pravatar.cc/100?img=23",
  },
]

export function Testimonials() {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  // Show 3 cards on desktop centered around `index`
  const getVisibleIndices = () => {
    const total = testimonials.length
    return [
      (index - 1 + total) % total,
      index,
      (index + 1) % total,
    ]
  }

  const visibleIndices = getVisibleIndices()

  return (
    <section className="py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            Loved by developers
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">
            Hear from engineers who use SchemaLab every day
          </p>
        </motion.div>

        {/* Mobile: single card */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl border-2 border-zinc-900 dark:border-white bg-white dark:bg-white p-6 text-zinc-900 dark:text-black"
            >
              <Quote className="h-6 w-6 text-zinc-300 mb-3" />
              <p className="text-sm leading-relaxed">{testimonials[index].text}</p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={testimonials[index].avatar}
                  alt={testimonials[index].name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold">{testimonials[index].name}</p>
                  <p className="text-xs text-zinc-500">{testimonials[index].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop: stagger carousel */}
        <div className="hidden md:flex items-center justify-center gap-6 relative min-h-[280px]">
          {visibleIndices.map((idx, pos) => {
            const isCenter = pos === 1
            return (
              <motion.div
                key={`${idx}-${pos}`}
                layout
                className={`rounded-xl p-6 w-80 transition-all duration-300 ${
                  isCenter
                    ? "border-2 border-zinc-900 dark:border-white bg-white text-black scale-105 shadow-2xl z-10"
                    : "border-2 border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-black text-zinc-900 dark:text-white scale-95 opacity-60"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: isCenter ? 1 : 0.6, scale: isCenter ? 1.05 : 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Quote className={`h-6 w-6 mb-3 ${isCenter ? "text-zinc-300" : "text-zinc-300 dark:text-zinc-700"}`} />
                <p className="text-sm leading-relaxed">{testimonials[idx].text}</p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={testimonials[idx].avatar}
                    alt={testimonials[idx].name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">{testimonials[idx].name}</p>
                    <p className={`text-xs ${isCenter ? "text-zinc-500" : "text-zinc-400 dark:text-zinc-600"}`}>
                      {testimonials[idx].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
            {index + 1} / {testimonials.length}
          </span>
          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/10 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
