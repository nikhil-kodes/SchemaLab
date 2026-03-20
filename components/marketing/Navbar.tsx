"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
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
    <nav className="sticky top-0 z-50 w-full pt-4 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between rounded-xl border border-border bg-background/80 backdrop-blur-md px-6 py-3 shadow-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-foreground font-semibold text-base transition-transform active:scale-95">
            <img src="/logo-black.png" alt="SchemaLab Logo" className="h-6 w-6 object-contain dark:hidden" />
            <img src="/logo-white.png" alt="SchemaLab Logo" className="h-6 w-6 object-contain hidden dark:block" />
            <span className="tracking-tight text-lg">SchemaLab</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/auth"
              className="rounded-full bg-foreground text-background text-sm px-4 py-1.5 hover:bg-foreground/90 transition-colors"
            >
              Start Building Free
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="text-foreground p-2">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-background text-foreground">
                <div className="flex flex-col gap-6 mt-8">
                  <Link href="/" className="flex items-center gap-2 text-foreground font-semibold">
                    <img src="/logo-black.png" alt="SchemaLab Logo" className="h-6 w-6 object-contain dark:hidden" />
                    <img src="/logo-white.png" alt="SchemaLab Logo" className="h-6 w-6 object-contain hidden dark:block" />
                    <span>SchemaLab</span>
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/auth"
                    className="rounded-full bg-foreground text-background text-sm px-4 py-2 text-center hover:bg-foreground/90 transition-colors mt-4"
                  >
                    Start Building Free
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
