"use client"

import { useState } from "react"
import Link from "next/link"
import { Database, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ThemeToggle"

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "https://github.com", label: "GitHub" },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-4 z-50 mx-auto mt-4 w-full max-w-5xl px-4">
      <div className="flex items-center justify-between rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 px-6 py-3 shadow-lg backdrop-blur-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-sm">
          <Database className="h-5 w-5" />
          <span>SchemaLab</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button variant="pill" size="sm" asChild>
            <Link href="/auth">Start Building Free</Link>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/" className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold">
                  <Database className="h-5 w-5" />
                  <span>SchemaLab</span>
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link href="/auth">Start Building Free</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
