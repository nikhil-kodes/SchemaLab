"use client"

import { useState } from "react"
import Link from "next/link"

const quickLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "https://github.com/nikhil-kodes/SchemaLab", label: "GitHub" },
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
    <footer className="bg-zinc-950 text-zinc-400 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-white font-semibold text-base mb-3 select-none">
              <img src="/logo-white.png" alt="Logo" className="h-5 w-5 object-contain" />
              <span>SchemaLab</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed mb-4 max-w-sm">
              Visual database schema designer. Design, connect, and generate
              production-ready code in seconds.
            </p>
            <form className="flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email for updates"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-zinc-600 flex-1 w-full focus:outline-none focus:ring-1 focus:ring-white/30 transition-shadow"
              />
              <button 
                type="submit"
                className="bg-white text-black rounded-lg px-4 py-2 text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest">Languages</h4>
            <ul className="space-y-1">
              {languages.map((lang) => (
                <li key={lang.label}>
                  <Link
                    href={lang.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors block py-1 font-mono"
                  >
                    {lang.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600">
            © 2026 SchemaLab. All rights reserved.
          </p>
          <p className="text-sm text-zinc-500 text-center">
            Built with <span className="text-red-500">❤️</span> by Nikhil Singh
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-sm text-zinc-600 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-zinc-600 hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
