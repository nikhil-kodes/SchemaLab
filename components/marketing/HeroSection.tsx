"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, LayoutGrid, MousePointer2, Hand, ZoomIn, ZoomOut, Maximize, MessageSquare, Plus, ChevronDown, Wand2 } from "lucide-react"

const languages = ["SQL", "PostgreSQL", "Prisma", "Drizzle", "Mongoose"]

export function HeroSection() {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-center py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            Free forever — no credit card required
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Stop Writing{" "}
          <br className="hidden sm:block" />
          Schema Code.{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Draw It.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
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
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link 
            href="/auth" 
            className="group bg-foreground text-background hover:bg-foreground/90 px-8 py-3 rounded-xl text-base font-medium transition-all inline-flex items-center justify-center gap-2 w-full sm:w-auto hover:shadow-xl hover:shadow-foreground/10"
          >
            Start Building Free <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link 
            href="#how-it-works" 
            className="border border-border text-foreground hover:bg-accent px-8 py-3 rounded-xl text-base font-medium transition-colors w-full sm:w-auto"
          >
            See How It Works
          </Link>
        </motion.div>

        {/* Language strip */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <span className="text-xs text-muted-foreground mr-2 self-center">Works with:</span>
          {languages.map((lang) => (
            <span
              key={lang}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground font-mono"
            >
              {lang}
            </span>
          ))}
        </motion.div>

        {/* Canvas Preview Mockup */}
        <motion.div
          className="relative w-full max-w-6xl mx-auto rounded-2xl border border-border bg-muted p-2 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-full h-full rounded-xl overflow-hidden bg-background relative flex flex-col min-h-[500px] border border-border">
            
            {/* Toolbar Top */}
            <div className="h-12 border-b border-border bg-background/80 backdrop-blur-sm flex items-center justify-between px-4 z-30">
                <div className="flex items-center gap-2">
                  <img src="/logo-black.png" alt="Logo" className="h-3.5 w-3.5 object-contain ml-1 dark:hidden" />
                  <img src="/logo-white.png" alt="Logo" className="h-3.5 w-3.5 object-contain ml-1 hidden dark:block" />
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="ml-1 text-[10px] font-mono text-muted-foreground opacity-70">workspace / database_schema.v1</span>
                </div>
               <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-lg border border-border">
                    <span className="text-[10px] font-medium">PostgreSQL</span>
                    <ChevronDown className="h-2 w-2" />
                  </div>
                  <button className="bg-foreground text-background text-[10px] font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                    <Wand2 className="h-2.5 w-2.5" /> Generate
                  </button>
               </div>
            </div>

            <div className="flex-1 relative overflow-hidden flex">
                {/* Simulated Dot grid background */}
                <div
                    className="absolute inset-0 opacity-[0.15] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, var(--canvas-dot) 1.5px, transparent 1.5px)",
                        backgroundSize: "24px 24px",
                    }}
                />

                {/* Main Canvas Area */}
                <div className="flex-1 relative overflow-hidden">
                    {/* Floating Dock Mockup */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-card/90 backdrop-blur-xl border border-border rounded-xl px-3 py-1.5 flex items-center gap-2 shadow-2xl">
                        <div className="flex items-center gap-1.5 border-r border-border pr-2">
                           <LayoutGrid className="h-3.5 w-3.5 text-foreground" />
                           <span className="text-[9px] font-medium text-foreground">Table</span>
                        </div>
                        <MousePointer2 className="h-3 w-3 text-muted-foreground" />
                        <Hand className="h-3 w-3 text-muted-foreground" />
                        <div className="w-px h-3 bg-border" />
                        <ZoomIn className="h-3 w-3 text-muted-foreground" />
                        <ZoomOut className="h-3 w-3 text-muted-foreground" />
                        <Maximize className="h-3 w-3 text-muted-foreground" />
                    </div>

                    {/* Table 1: Users */}
                    <div className="absolute left-[5%] md:left-[8%] top-[10%] md:top-[15%] w-44 md:w-60 rounded-xl border border-border bg-card shadow-2xl z-20 overflow-hidden scale-90 md:scale-100">
                        <div className="bg-muted/50 px-3 py-2 border-b border-border flex items-center justify-between">
                            <span className="text-[10px] md:text-[11px] font-bold font-mono">users</span>
                            <div className="flex items-center gap-1">
                                <MessageSquare className="h-2 w-2 md:h-2.5 md:w-2.5 text-blue-500" />
                                <div className="h-2.5 w-2.5 md:h-3 md:w-3 bg-muted rounded border border-border flex items-center justify-center"><Plus className="h-1.5 w-1.5 md:h-2 md:w-2" /></div>
                            </div>
                        </div>
                        <div className="divide-y divide-border/50">
                            <div className="flex items-center gap-2 px-3 py-1 md:py-1.5">
                                <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-[var(--pk-color)]" />
                                <span className="font-mono text-[9px] md:text-[10px]">id</span>
                                <span className="ml-auto text-[8px] md:text-[9px] text-muted-foreground bg-muted/30 px-1 rounded font-mono">UUID</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 md:py-1.5 relative">
                                <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-transparent" />
                                <span className="font-mono text-[9px] md:text-[10px]">email</span>
                                <span className="ml-auto text-[8px] md:text-[9px] text-muted-foreground bg-muted/30 px-1 rounded font-mono">VarChar</span>
                                <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-foreground border border-background shadow-sm" />
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 md:py-1.5">
                                <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-transparent" />
                                <span className="font-mono text-[9px] md:text-[10px]">name</span>
                                <span className="ml-auto text-[8px] md:text-[9px] text-muted-foreground bg-muted/30 px-1 rounded font-mono">String</span>
                            </div>
                        </div>
                    </div>

                    {/* Table 2: Profiles - Hidden on very small screens to avoid clutter */}
                    <div className="absolute right-[5%] md:right-[25%] top-[25%] md:top-[30%] w-44 md:w-60 rounded-xl border border-border bg-card shadow-2xl z-10 overflow-hidden scale-90 md:scale-100 hidden sm:block">
                        <div className="bg-muted/50 px-3 py-2 border-b border-border flex items-center justify-between">
                            <span className="text-[10px] md:text-[11px] font-bold font-mono">profiles</span>
                            <div className="flex items-center gap-1">
                                <div className="h-2.5 w-2.5 md:h-3 md:w-3 bg-muted rounded border border-border flex items-center justify-center"><Plus className="h-1.5 w-1.5 md:h-2 md:w-2" /></div>
                            </div>
                        </div>
                        <div className="divide-y divide-border/50">
                            <div className="flex items-center gap-2 px-3 py-1 md:py-1.5">
                                <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-[var(--pk-color)]" />
                                <span className="font-mono text-[9px] md:text-[10px]">id</span>
                                <span className="ml-auto text-[8px] md:text-[9px] text-muted-foreground bg-muted/30 px-1 rounded font-mono">UUID</span>
                            </div>
                            <div className="flex flex-col px-3 py-1 md:py-1.5 relative">
                                <div className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 -ml-0.5 rounded-full bg-[var(--fk-color)]" />
                                    <span className="font-mono text-[9px] md:text-[10px]">user_email</span>
                                    <span className="ml-auto text-[8px] md:text-[9px] text-muted-foreground bg-muted/30 px-1 rounded font-mono">VarChar</span>
                                </div>
                                <div className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-foreground border border-background shadow-sm" />
                            </div>
                        </div>
                    </div>

                    {/* Svg Connection - Responsive path */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden sm:block">
                        <path 
                            d="M 210 185 C 280 185, 250 250, 400 250" 
                            stroke="var(--foreground)" 
                            strokeWidth="1.5" 
                            fill="none" 
                            strokeDasharray="4 4" 
                            className="opacity-40"
                        />
                    </svg>
                </div>

                {/* Right Side Code Panel Mockup - Hidden on small screens */}
                <div className="w-56 border-l border-border bg-muted/20 backdrop-blur-xl hidden lg:flex flex-col z-30 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
                   <div className="px-3 py-2 border-b border-border bg-background flex items-center gap-2">
                       <span className="text-[10px] font-bold text-foreground">PRISMA</span>
                       <span className="text-[9px] text-muted-foreground">Preview</span>
                   </div>
                   <div className="p-3 font-mono text-[9px] leading-tight space-y-1 overflow-hidden">
                       <div className="text-blue-500">model <span className="text-green-500">User</span> {"{"}</div>
                       <div className="pl-3"><span className="text-foreground">id</span> <span className="text-blue-500">String</span> <span className="text-orange-400">@id</span></div>
                       <div className="pl-3"><span className="text-foreground">email</span> <span className="text-blue-500">String</span> <span className="text-orange-400">@unique</span></div>
                       <div className="pl-3"><span className="text-foreground">name</span> <span className="text-blue-500">String?</span></div>
                       <div className="pl-3 text-muted-foreground/40 mt-1">// Relations...</div>
                       <div className="text-blue-500">{"}"}</div>
                       <div className="h-4" />
                       <div className="text-blue-500">model <span className="text-green-500">Profile</span> {"{"}</div>
                       <div className="pl-3"><span className="text-foreground">id</span> <span className="text-blue-500">String</span> <span className="text-orange-400">@id</span></div>
                       <div className="pl-3"><span className="text-foreground">user_email</span> <span className="text-blue-500">String</span></div>
                       <div className="text-blue-500">{"}"}</div>
                   </div>
                </div>
            </div>

            {/* Bottom gradient fade overlay */}
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none rounded-b-2xl z-50" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
