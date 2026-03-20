"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const languages = ["SQL", "PostgreSQL", "Prisma", "Drizzle", "Mongoose"]

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center px-4 pt-24 pb-20 text-center overflow-hidden">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-400" />
          Free forever — no credit card required
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="mt-8 max-w-4xl text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl md:text-6xl lg:text-[56px] leading-[1.05]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Stop Writing{" "}
        <br className="hidden sm:block" />
        Schema Code.{" "}
        <br className="hidden sm:block" />
        <span className="bg-gradient-to-r from-zinc-900 dark:from-white to-zinc-400 bg-clip-text text-transparent">
          Draw It.
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        className="mt-6 max-w-2xl text-base text-zinc-500 dark:text-zinc-400 sm:text-lg leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Design your database visually on an infinite canvas. Connect tables,
        define fields, and generate production-ready SQL, Prisma, Drizzle or
        Mongoose code — instantly.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Button size="lg" asChild>
          <Link href="/auth" className="gap-2">
            Start Building Free <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="#how-it-works">See How It Works</Link>
        </Button>
      </motion.div>

      {/* Language strip */}
      <motion.div
        className="mt-10 flex flex-wrap items-center justify-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <span className="text-xs text-zinc-400 dark:text-zinc-500 mr-2">Works with:</span>
        {languages.map((lang) => (
          <span
            key={lang}
            className="rounded-full border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 px-3 py-1 text-xs text-zinc-600 dark:text-zinc-400 font-mono"
          >
            {lang}
          </span>
        ))}
      </motion.div>

      {/* Canvas Preview */}
      <motion.div
        className="relative mt-20 w-full max-w-5xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-zinc-950 p-2 shadow-2xl overflow-hidden">
          {/* Simulated canvas preview */}
          <div className="relative h-[250px] sm:h-[400px] md:h-[500px] rounded-xl bg-zinc-50 dark:bg-[#0a0a0a] overflow-hidden">
            {/* Dot grid background */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, #d4d4d8 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div
              className="absolute inset-0 hidden dark:block"
              style={{
                backgroundImage: "radial-gradient(circle, #1f1f1f 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            {/* Light mode needs the light dot removed */}
            <style>{`.dark .hero-dots-light { display: none; }`}</style>
            <div
              className="absolute inset-0 dark:hidden"
              style={{
                backgroundImage: "radial-gradient(circle, #d4d4d8 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Simulated table nodes container centered */}
            <div className="absolute inset-0 flex items-center justify-center lg:justify-start lg:ml-12 overflow-hidden pointer-events-none">
              <div className="relative w-full max-w-[500px] h-[300px]">
                <div className="absolute left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-4 top-4 sm:top-12 w-48 sm:w-56 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl pointer-events-auto">
                  <div className="rounded-t-xl bg-zinc-100 dark:bg-zinc-900 px-4 py-2.5 text-left">
                    <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white">users</span>
                  </div>
                  <div className="divide-y divide-zinc-200 dark:divide-zinc-900">
                    <div className="flex items-center gap-2 px-4 py-2">
                      <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-yellow-500 dark:bg-yellow-400" />
                      <span className="font-mono text-[10px] sm:text-xs text-zinc-700 dark:text-zinc-200">id</span>
                      <span className="ml-auto font-mono text-[8px] sm:text-[10px] text-zinc-400 dark:text-zinc-500">Int</span>
                      <span className="rounded border border-yellow-500/30 bg-yellow-500/10 px-1 py-0.5 text-[8px] sm:text-[9px] font-mono text-yellow-600 dark:text-yellow-400">PK</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2">
                      <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-transparent" />
                      <span className="font-mono text-[10px] sm:text-xs text-zinc-700 dark:text-zinc-200">email</span>
                      <span className="ml-auto font-mono text-[8px] sm:text-[10px] text-zinc-400 dark:text-zinc-500">String</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2">
                      <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-transparent" />
                      <span className="font-mono text-[10px] sm:text-xs text-zinc-700 dark:text-zinc-200">name</span>
                      <span className="ml-auto font-mono text-[8px] sm:text-[10px] text-zinc-400 dark:text-zinc-500">String</span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block absolute right-4 top-24 w-56 rounded-xl border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl pointer-events-auto">
                  <div className="rounded-t-xl bg-zinc-100 dark:bg-zinc-900 px-4 py-2.5 text-left">
                    <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-white">posts</span>
                  </div>
                  <div className="divide-y divide-zinc-200 dark:divide-zinc-900">
                    <div className="flex items-center gap-2 px-4 py-2">
                      <span className="h-2 w-2 rounded-full bg-yellow-500 dark:bg-yellow-400" />
                      <span className="font-mono text-xs text-zinc-700 dark:text-zinc-200">id</span>
                      <span className="ml-auto font-mono text-[10px] text-zinc-400 dark:text-zinc-500">Int</span>
                      <span className="rounded border border-yellow-500/30 bg-yellow-500/10 px-1 py-0.5 text-[9px] font-mono text-yellow-600 dark:text-yellow-400">PK</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400" />
                      <span className="font-mono text-xs text-zinc-700 dark:text-zinc-200">userId</span>
                      <span className="ml-auto font-mono text-[10px] text-zinc-400 dark:text-zinc-500">Int</span>
                      <span className="rounded border border-blue-500/30 bg-blue-500/10 px-1 py-0.5 text-[9px] font-mono text-blue-600 dark:text-blue-400">FK</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2">
                      <span className="h-2 w-2 rounded-full bg-transparent" />
                      <span className="font-mono text-xs text-zinc-700 dark:text-zinc-200">title</span>
                      <span className="ml-auto font-mono text-[10px] text-zinc-400 dark:text-zinc-500">String</span>
                    </div>
                  </div>
                </div>

                {/* Simulated connection line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none hidden sm:block" style={{ zIndex: 1 }}>
                  <path
                    d="M 230 60 C 280 60, 240 140, 310 140"
                    stroke="#a1a1aa"
                    className="dark:stroke-[#3a3a3a]"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* Simulated code panel on the right */}
            <div className="absolute right-0 top-0 bottom-0 w-60 border-l border-black/5 dark:border-white/5 bg-white/90 dark:bg-zinc-950/90 backdrop-blur hidden lg:flex flex-col z-10">
              <div className="border-b border-black/5 dark:border-white/5 px-3 py-2 flex gap-2">
                <span className="text-[10px] font-mono text-zinc-900 dark:text-white bg-zinc-200 dark:bg-white/5 px-2 py-0.5 rounded">Prisma</span>
                <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 px-2 py-0.5 rounded">SQL</span>
              </div>
              <div className="flex-1 p-3 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                <div><span className="text-purple-500 dark:text-purple-400">model</span> <span className="text-green-600 dark:text-green-400">User</span> {"{"}</div>
                <div className="pl-3"><span className="text-zinc-700 dark:text-zinc-200">id</span> <span className="text-blue-500 dark:text-blue-400">Int</span> <span className="text-yellow-600 dark:text-yellow-400">@id</span></div>
                <div className="pl-3"><span className="text-zinc-700 dark:text-zinc-200">email</span> <span className="text-blue-500 dark:text-blue-400">String</span></div>
                <div className="pl-3"><span className="text-zinc-700 dark:text-zinc-200">name</span> <span className="text-blue-500 dark:text-blue-400">String</span></div>
                <div>{"}"}</div>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-black to-transparent pointer-events-none" />
      </motion.div>
    </section>
  )
}
