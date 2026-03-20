"use client"

import { motion } from "framer-motion"
import { LayoutDashboard, Zap, Code2, Users, Download, Lock, MousePointer2 } from "lucide-react"

const languages = ["SQL", "Prisma", "Drizzle", "Mongoose", "Sequelize"]

export function FeaturesBento() {
  return (
    <section id="features" className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything you need to design databases
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features wrapped in an intuitive, minimalist interface.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {/* Card 1: Visual Canvas (Large, spans 4 cols) */}
          <motion.div
            className="md:col-span-4 bg-card border border-border rounded-2xl p-6 md:p-8 overflow-hidden flex flex-col group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-foreground" />
              Visual Canvas
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              Drag-and-drop infinite canvas. Connect foreign keys visually instead of writing
              complex migration scripts.
            </p>
            {/* Mockup */}
            <div className="mt-4 flex-1 bg-muted rounded-xl border border-border p-4 relative overflow-hidden flex items-center justify-center min-h-[160px]">
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle, var(--canvas-dot) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              <div className="relative flex gap-12 sm:gap-16">
                {/* Simulated nodes */}
                <div className="w-32 h-26 bg-card rounded-lg border border-border shadow-md overflow-hidden">
                  <div className="bg-muted px-2 py-1 border-b border-border text-[8px] font-mono font-bold">orders</div>
                  <div className="p-1.5 space-y-1">
                    <div className="h-1 w-full bg-muted-foreground/20 rounded" />
                    <div className="h-1 w-3/4 bg-muted-foreground/10 rounded" />
                    <div className="h-1 w-1/2 bg-muted-foreground/10 rounded" />
                  </div>
                </div>
                <div className="w-32 h-22 bg-card rounded-lg border border-border shadow-md mt-6 overflow-hidden relative">
                  <div className="bg-muted px-2 py-1 border-b border-border text-[8px] font-mono font-bold">products</div>
                  <div className="p-1.5 space-y-1">
                    <div className="h-1 w-full bg-muted-foreground/20 rounded" />
                    <div className="h-1 w-2/3 bg-muted-foreground/10 rounded" />
                  </div>
                  {/* Connection point */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-blue-500 -translate-x-1/2" />
                </div>
                {/* Line */}
                <svg className="absolute left-[128px] top-[40px] w-24 h-40 text-blue-500/60 overflow-visible">
                  <path d="M 0 10 Q 30 10, 30 40 T 64 40" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Card 2: 5 Languages (Medium, spans 2 cols) */}
          <motion.div
            className="md:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8 overflow-hidden flex flex-col group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-foreground" />
              5 Languages
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Export your schema to any major ORM or directly to SQL.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {languages.map((l) => (
                <span key={l} className="bg-background border border-border rounded-full px-2.5 py-1 text-xs text-foreground font-mono">
                  {l}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Real-time Collab */}
          <motion.div
            className="md:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8 overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <Users className="h-5 w-5 text-foreground" />
              Real-time Collab
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Share a link and design with your team in real-time. See their cursors and changes instantly.
            </p>
            {/* Simulated multiplayer cursors */}
            <div className="mt-6 relative h-16 w-full opacity-60">
              <div className="absolute top-2 left-4 flex items-center gap-1">
                <MousePointer2 className="h-4 w-4 text-green-500 fill-green-500/20" />
                <span className="bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded">Dan</span>
              </div>
              <div className="absolute bottom-2 right-8 flex items-center gap-1">
                <MousePointer2 className="h-4 w-4 text-purple-500 fill-purple-500/20" />
                <span className="bg-purple-500 text-white text-[9px] px-1.5 py-0.5 rounded">Sarah</span>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Lightning Fast Code */}
          <motion.div
            className="md:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8 overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <Zap className="h-5 w-5 text-foreground" />
              Lightning Fast
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Get clean, optimized code right as you connect nodes.
            </p>
            <div className="bg-background rounded-xl p-4 font-mono text-xs text-foreground border border-border mt-4 overflow-hidden relative">
              <div className="absolute -left-12 -top-12 w-24 h-24 bg-blue-500/20 blur-2xl rounded-full" />
              <div className="relative">
                <div><span className="text-blue-500">model</span> <span className="text-green-500">Post</span> {"{"}</div>
                <div className="pl-3"><span className="text-foreground">id</span> <span className="text-blue-500">Int</span> <span className="text-yellow-500">@id</span></div>
                <div className="pl-3"><span className="text-foreground">title</span> <span className="text-blue-500">String</span></div>
                <div>{"}"}</div>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Secure & Private */}
          <motion.div
            className="md:col-span-2 bg-card border border-border rounded-2xl p-6 md:p-8 overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
              <Download className="h-5 w-5 text-foreground" />
              Download Ready
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Hit command-S to instantly copy code to clipboard, or export everything as a zip.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 opacity-80">
              <span className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground font-mono flex items-center gap-1.5">
                schema.prisma
              </span>
              <span className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs text-foreground font-mono flex items-center gap-1.5">
                init.sql
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
