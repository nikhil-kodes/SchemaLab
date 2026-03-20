"use client"

import { motion } from "framer-motion"

const rows = [
  {
    title: "An infinite canvas that thinks like a database",
    description:
      "Every table is a node. Every relationship is an edge. Drag, drop, and connect your entire schema on a beautiful dot-grid canvas with smooth pan and zoom. Add fields with a click, toggle constraints inline, and watch your database come to life visually.",
    visual: (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-4 h-64 sm:h-72 relative overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-20 dark:opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle, #a1a1aa 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div
          className="absolute inset-0 opacity-20 hidden dark:block"
          style={{
            backgroundImage: "radial-gradient(circle, #2a2a2a 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative w-full max-w-[340px] h-[200px]">
          <div className="absolute left-0 sm:left-2 top-0 w-36 sm:w-44 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 shadow-lg z-10">
            <div className="rounded-t-xl bg-zinc-100 dark:bg-zinc-900 px-3 py-2">
              <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-900 dark:text-white">products</span>
            </div>
            <div className="p-2 space-y-1.5">
              <div className="flex justify-between"><span className="font-mono text-[9px] sm:text-[10px] text-zinc-600 dark:text-zinc-300">id</span><span className="text-[8px] sm:text-[9px] badge-pk px-1 rounded">PK</span></div>
              <div className="flex justify-between"><span className="font-mono text-[9px] sm:text-[10px] text-zinc-600 dark:text-zinc-300">name</span><span className="text-[8px] sm:text-[9px] text-zinc-400 dark:text-zinc-500">String</span></div>
              <div className="flex justify-between"><span className="font-mono text-[9px] sm:text-[10px] text-zinc-600 dark:text-zinc-300">price</span><span className="text-[8px] sm:text-[9px] text-zinc-400 dark:text-zinc-500">Float</span></div>
            </div>
          </div>
          <motion.div
            className="absolute right-0 sm:right-2 bottom-0 w-36 sm:w-44 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 shadow-lg"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="rounded-t-xl bg-zinc-100 dark:bg-zinc-900 px-3 py-2">
              <span className="font-mono text-[10px] sm:text-xs font-semibold text-zinc-900 dark:text-white">orders</span>
            </div>
            <div className="p-2 space-y-1.5">
              <div className="flex justify-between"><span className="font-mono text-[9px] sm:text-[10px] text-zinc-600 dark:text-zinc-300">id</span><span className="text-[8px] sm:text-[9px] badge-pk px-1 rounded">PK</span></div>
              <div className="flex justify-between"><span className="font-mono text-[9px] sm:text-[10px] text-zinc-600 dark:text-zinc-300">productId</span><span className="text-[8px] sm:text-[9px] badge-fk px-1 rounded">FK</span></div>
              <div className="flex justify-between"><span className="font-mono text-[9px] sm:text-[10px] text-zinc-600 dark:text-zinc-300">quantity</span><span className="text-[8px] sm:text-[9px] text-zinc-400 dark:text-zinc-500">Int</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    ),
    reverse: false,
  },
  {
    title: "Code that works the first time you paste it",
    description:
      "Every generator produces clean, idiomatic code for its target framework. Prisma schemas with proper @relation directives, Drizzle ORM with correct column helpers, SQL with proper foreign key constraints. No placeholders, no TODOs — real, production-ready code.",
    visual: (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50">
          <div className="px-3 py-2 text-[10px] font-mono text-zinc-900 dark:text-white border-b-2 border-zinc-900 dark:border-white">Prisma</div>
          <div className="px-3 py-2 text-[10px] font-mono text-zinc-400 dark:text-zinc-500">SQL</div>
        </div>
        <div className="bg-zinc-50 dark:bg-black p-4 font-mono text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
          <div><span className="text-purple-500 dark:text-purple-400">model</span> <span className="text-green-600 dark:text-green-400">Product</span> {"{"}</div>
          <div className="pl-4"><span className="text-zinc-700 dark:text-zinc-200">id</span>    <span className="text-blue-500 dark:text-blue-400">Int</span>    <span className="text-yellow-600 dark:text-yellow-400">@id @default(autoincrement())</span></div>
          <div className="pl-4"><span className="text-zinc-700 dark:text-zinc-200">name</span>  <span className="text-blue-500 dark:text-blue-400">String</span></div>
          <div className="pl-4"><span className="text-zinc-700 dark:text-zinc-200">price</span> <span className="text-blue-500 dark:text-blue-400">Float</span></div>
          <div className="pl-4"><span className="text-zinc-700 dark:text-zinc-200">orders</span> <span className="text-blue-500 dark:text-blue-400">Order[]</span></div>
          <div>{"}"}</div>
          <div className="mt-2"><span className="text-purple-500 dark:text-purple-400">model</span> <span className="text-green-600 dark:text-green-400">Order</span> {"{"}</div>
          <div className="pl-4"><span className="text-zinc-700 dark:text-zinc-200">id</span>        <span className="text-blue-500 dark:text-blue-400">Int</span>     <span className="text-yellow-600 dark:text-yellow-400">@id @default(autoincrement())</span></div>
          <div className="pl-4"><span className="text-zinc-700 dark:text-zinc-200">productId</span> <span className="text-blue-500 dark:text-blue-400">Int</span></div>
          <div className="pl-4"><span className="text-zinc-700 dark:text-zinc-200">product</span>   <span className="text-blue-500 dark:text-blue-400">Product</span> <span className="text-yellow-600 dark:text-yellow-400">@relation(fields: [productId], references: [id])</span></div>
          <div>{"}"}</div>
        </div>
      </div>
    ),
    reverse: true,
  },
  {
    title: "Collaborate without a subscription",
    description:
      "Invite teammates by sharing a Room ID. Everyone sees live cursors, edits, and field changes in real time. Drop comments anywhere on the canvas to discuss design decisions. Up to 10 collaborators per session — completely free.",
    visual: (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900/50 p-6 h-48 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle, #a1a1aa 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div
          className="absolute inset-0 opacity-15 hidden dark:block"
          style={{
            backgroundImage: "radial-gradient(circle, #2a2a2a 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <motion.div
          className="absolute"
          animate={{ x: [20, 80, 60, 20], y: [20, 50, 80, 20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M0 0L16 12L6 14L4 20L0 0Z" fill="#f87171" />
          </svg>
          <span className="ml-3 -mt-1 inline-block rounded-full bg-red-400 px-2 py-0.5 text-[10px] text-white whitespace-nowrap">
            You
          </span>
        </motion.div>
        <motion.div
          className="absolute"
          animate={{ x: [140, 100, 130, 140], y: [60, 30, 90, 60] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path d="M0 0L16 12L6 14L4 20L0 0Z" fill="#60a5fa" />
          </svg>
          <span className="ml-3 -mt-1 inline-block rounded-full bg-blue-400 px-2 py-0.5 text-[10px] text-white whitespace-nowrap">
            Teammate
          </span>
        </motion.div>
        {/* Comment pin */}
        <div className="absolute right-6 bottom-6 flex items-center gap-1">
          <span className="text-lg">📌</span>
          <span className="rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 px-2 py-1 text-[10px] text-zinc-600 dark:text-zinc-400">
            Should this be many-to-many?
          </span>
        </div>
      </div>
    ),
    reverse: false,
  },
]

export function FeatureRows() {
  return (
    <section className="py-28 px-4">
      <div className="mx-auto max-w-6xl space-y-28">
        {rows.map((row, i) => (
          <motion.div
            key={row.title}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={row.reverse ? "md:order-2" : ""}>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{row.title}</h3>
              <p className="mt-4 text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">{row.description}</p>
            </div>
            <div className={row.reverse ? "md:order-1" : ""}>
              {row.visual}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
