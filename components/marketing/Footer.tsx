"use client"

import { useState } from "react"
import Link from "next/link"
import { Database, Github, Twitter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const quickLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "https://github.com", label: "GitHub" },
  { href: "/auth", label: "Sign In" },
]

const languages = [
  { href: "#", label: "SQL" },
  { href: "#", label: "PostgreSQL" },
  { href: "#", label: "Prisma" },
  { href: "#", label: "Drizzle" },
  { href: "#", label: "Mongoose" },
]

export function Footer() {
  const [email, setEmail] = useState("")

  return (
    <footer className="border-t border-black/5 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold">
              <Database className="h-5 w-5" />
              <span>SchemaLab</span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Visual database schema designer. Design, connect, and generate
              production-ready code.
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Email for updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-xs h-9"
              />
              <Button size="sm" className="shrink-0 h-9 text-xs">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Languages</h4>
            <ul className="space-y-2.5">
              {languages.map((lang) => (
                <li key={lang.label}>
                  <Link
                    href={lang.href}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors font-mono"
                  >
                    {lang.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-4">Connect</h4>
            <div className="flex gap-2">
              <Link
                href="https://github.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 transition-colors"
                target="_blank"
              >
                <Github className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 transition-colors"
                target="_blank"
              >
                <Twitter className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            © 2025 SchemaLab. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-400 dark:text-zinc-500">
          Built with <span className="text-red-500">❤️</span> by Nikhil Singh
        </p>
      </div>
    </footer>
  )
}
