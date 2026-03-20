"use client"

import { motion } from "framer-motion"
import { LayoutGrid, Languages, Users, Zap, FolderOpen, Download } from "lucide-react"

const features = [
  {
    icon: LayoutGrid,
    title: "Visual Canvas",
    description: "Drag-and-drop infinite canvas for designing database schemas",
    className: "md:col-span-2 md:row-span-2",
    visual: (
      <div className="mt-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-3 h-32 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, #a1a1aa 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="absolute inset-0 opacity-30 hidden dark:block"
          style={{
            backgroundImage: "radial-gradient(circle, #2a2a2a 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute left-4 top-4 w-20 h-14 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1.5">
          <div className="h-2.5 w-10 rounded bg-zinc-300 dark:bg-zinc-700 mb-1" />
          <div className="h-1.5 w-14 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-1.5 w-12 rounded bg-zinc-200 dark:bg-zinc-800 mt-0.5" />
        </div>
        <div className="absolute right-8 top-6 w-20 h-14 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-1.5">
          <div className="h-2.5 w-8 rounded bg-zinc-300 dark:bg-zinc-700 mb-1" />
          <div className="h-1.5 w-14 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-1.5 w-10 rounded bg-zinc-200 dark:bg-zinc-800 mt-0.5" />
        </div>
      </div>
    ),
  },
  {
    icon: Languages,
    title: "5 Languages",
    description: "Export to SQL, PostgreSQL, Prisma, Drizzle, and Mongoose",
    className: "md:col-span-2",
    visual: (
      <div className="mt-4 flex flex-wrap gap-2">
        {["SQL", "PostgreSQL", "Prisma", "Drizzle", "Mongoose"].map((lang) => (
          <span
            key={lang}
            className="rounded-full border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1 text-xs font-mono text-zinc-600 dark:text-zinc-300"
          >
            {lang}
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Users,
    title: "Real-Time Collaboration",
    description: "Work together, live — shared cursors, edits, and comments",
    className: "md:col-span-2 md:row-span-2",
    visual: (
      <div className="mt-4 relative h-20">
        <div className="absolute left-6 top-2">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M0 0L16 12L6 14L4 20L0 0Z" fill="#f87171" />
          </svg>
          <span className="ml-4 -mt-1 inline-block rounded-full bg-red-400 px-2 py-0.5 text-[10px] text-white">
            Alice
          </span>
        </div>
        <div className="absolute left-20 top-8">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M0 0L16 12L6 14L4 20L0 0Z" fill="#60a5fa" />
          </svg>
          <span className="ml-4 -mt-1 inline-block rounded-full bg-blue-400 px-2 py-0.5 text-[10px] text-white">
            Bob
          </span>
        </div>
      </div>
    ),
  },
  {
    icon: Zap,
    title: "Instant Code Generation",
    description: "Generate production-ready code in milliseconds",
    className: "md:col-span-3",
    visual: (
      <div className="mt-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-black p-3 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
        <div>
          <span className="text-purple-500 dark:text-purple-400">CREATE TABLE</span>{" "}
          <span className="text-green-600 dark:text-green-400">users</span> (
        </div>
        <div className="pl-4">
          <span className="text-zinc-700 dark:text-zinc-200">id</span>{" "}
          <span className="text-blue-500 dark:text-blue-400">SERIAL</span>{" "}
          <span className="text-yellow-600 dark:text-yellow-400">PRIMARY KEY</span>,
        </div>
        <div className="pl-4">
          <span className="text-zinc-700 dark:text-zinc-200">email</span>{" "}
          <span className="text-blue-500 dark:text-blue-400">VARCHAR(255)</span>{" "}
          <span className="text-yellow-600 dark:text-yellow-400">NOT NULL UNIQUE</span>
        </div>
        <div>);</div>
      </div>
    ),
  },
  {
    icon: FolderOpen,
    title: "Save & Revisit",
    description: "All your schemas saved securely, always accessible",
    className: "md:col-span-3",
    visual: (
      <div className="mt-4 flex gap-2">
        {["E-commerce DB", "Blog Schema", "SaaS App"].map((name) => (
          <div
            key={name}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 px-3 py-2 text-xs text-zinc-600 dark:text-zinc-400"
          >
            {name}
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Download,
    title: "Download Any Format",
    description: "Download your schema as .sql, .prisma, .ts, or .js",
    className: "md:col-span-3",
    visual: (
      <div className="mt-4 flex flex-wrap gap-2">
        {[".sql", ".prisma", ".ts", ".js"].map((ext) => (
          <span
            key={ext}
            className="rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 px-2 py-0.5 text-xs font-mono text-zinc-600 dark:text-zinc-400"
          >
            {ext}
          </span>
        ))}
      </div>
    ),
  },
]

export function FeaturesBento() {
  return (
    <section id="features" className="py-28 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
            Everything you need to design databases
          </h2>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400">
            A complete toolkit for visual database schema design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={`rounded-xl border border-black/5 dark:border-white/5 bg-white dark:bg-zinc-950 p-6 ${feature.className}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-zinc-100 dark:bg-white/5">
                  <feature.icon className="h-4 w-4 text-zinc-900 dark:text-white" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
              </div>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{feature.description}</p>
              {feature.visual}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
