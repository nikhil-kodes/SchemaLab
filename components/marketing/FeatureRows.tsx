"use client"

import { motion } from "framer-motion"

export function FeatureRows() {
  return (
    <div className="flex flex-col">
      {/* Row 1 */}
      <section className="py-20 md:py-28 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              An infinite canvas that thinks like a database.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Drag and drop tables onto the grid. Add fields, define primary keys, and establish foreign key relationships with a single drag. No more reading 500-line migration files just to understand your schema.
            </p>
          </motion.div>
          
          <motion.div
            className="bg-card border border-border rounded-2xl p-6 overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-muted/50 rounded-xl h-64 sm:h-80 w-full relative overflow-hidden border border-border">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle, var(--canvas-dot) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
              
              <div className="absolute left-8 top-12 w-40 rounded-lg border border-border bg-card shadow-2xl">
                <div className="bg-muted px-3 py-1.5 rounded-t-lg">
                  <span className="text-xs font-mono text-foreground font-semibold">orders</span>
                </div>
                <div className="p-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-foreground">id</span>
                    <span className="text-[8px] text-muted-foreground">UUID</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-foreground">amount</span>
                    <span className="text-[8px] text-muted-foreground">Int</span>
                  </div>
                </div>
              </div>

              <div className="absolute right-8 bottom-12 w-48 rounded-lg border border-border bg-card shadow-2xl">
                <div className="bg-muted px-3 py-1.5 rounded-t-lg">
                  <span className="text-xs font-mono text-foreground font-semibold">customers</span>
                </div>
                <div className="p-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-foreground">id</span>
                    <span className="text-[8px] text-muted-foreground">UUID</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-foreground">email</span>
                    <span className="text-[8px] text-muted-foreground">String</span>
                  </div>
                </div>
              </div>

              {/* Connecting line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path d="M 120 130 C 150 180, 200 170, 250 190" stroke="#60a5fa" strokeWidth="2" fill="none" />
                <circle cx="120" cy="130" r="4" fill="#60a5fa" />
                <circle cx="250" cy="190" r="4" fill="#60a5fa" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Row 2 */}
      <section className="py-20 md:py-28 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            className="order-2 md:order-1 bg-card border border-border rounded-2xl p-6 overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-muted/50 rounded-xl p-6 font-mono text-sm border border-border overflow-hidden relative min-h-[250px] sm:min-h-[320px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <path fill="currentColor" d="M10,10 L90,10 L90,90 L10,90 Z" />
                </svg>
              </div>
              <div className="z-10 leading-loose">
                <div>
                  <span className="text-purple-500">CREATE TABLE</span>{" "}
                  <span className="text-emerald-500">"orders"</span> {"("}
                </div>
                <div className="pl-6">
                  <span className="text-foreground">"id"</span>{" "}
                  <span className="text-blue-500">UUID</span>{" "}
                  <span className="text-amber-500">PRIMARY KEY</span>,
                </div>
                <div className="pl-6">
                  <span className="text-foreground">"amount"</span>{" "}
                  <span className="text-blue-500">INTEGER</span>{" "}
                  <span className="text-rose-500">NOT NULL</span>,
                </div>
                <div className="pl-6">
                  <span className="text-foreground">"user_id"</span>{" "}
                  <span className="text-blue-500">UUID</span>{" "}
                  <span className="text-purple-500">REFERENCES</span>{" "}
                  <span className="text-emerald-500">"users"</span>
                </div>
                <div>{");"}</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Code that works the first time, every time.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Don't manually sync your codebase and your mental model. SchemaLab writes syntactically perfect Prisma schemas, raw SQL migrations, and Drizzle definitions in milliseconds.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Row 3 */}
      <section className="py-20 md:py-28 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Collaborate without a subscription.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Need a second pair of eyes on your database architecture? Send a link to your DevOps team and design your microservices schema together on an infinite canvas.
            </p>
          </motion.div>
          
          <motion.div
            className="bg-card border border-border rounded-2xl p-6 overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-muted/50 rounded-xl h-64 sm:h-80 w-full relative overflow-hidden border border-border flex items-center justify-center">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle, var(--canvas-dot) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              
              {/* Simulated multiplayer cursors */}
              <motion.div 
                className="absolute z-10"
                animate={{ x: [0, 100, 50, -50, 0], y: [0, -50, 80, 20, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-purple-500 transform -rotate-12">
                  <path d="M5.65376 3.1251C5.16109 2.76672 4.45339 3.14912 4.49479 3.75338L5.92212 24.5912C5.9575 25.1075 6.6432 25.2638 6.94273 24.8239L11.5583 18.0416C11.666 17.8833 11.8398 17.7818 12.0308 17.7656L20.2195 17.0709C20.7228 17.0282 20.9416 16.3687 20.5592 16.0354L5.65376 3.1251Z" fill="currentColor"/>
                </svg>
                <span className="ml-4 mt-2 bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">Reviewing index...</span>
              </motion.div>

              <motion.div 
                className="absolute z-10"
                animate={{ x: [100, -80, 20, 100], y: [50, 20, -60, 50] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cyan-500 transform rotate-12">
                  <path d="M5.65376 3.1251C5.16109 2.76672 4.45339 3.14912 4.49479 3.75338L5.92212 24.5912C5.9575 25.1075 6.6432 25.2638 6.94273 24.8239L11.5583 18.0416C11.666 17.8833 11.8398 17.7818 12.0308 17.7656L20.2195 17.0709C20.7228 17.0282 20.9416 16.3687 20.5592 16.0354L5.65376 3.1251Z" fill="currentColor"/>
                </svg>
                <span className="ml-4 mt-2 bg-cyan-500 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap">Adding table_2</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
