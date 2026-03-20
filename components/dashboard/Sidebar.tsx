"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Database, FolderOpen, Settings, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ThemeToggle"

const navItems = [
  { icon: FolderOpen, label: "Projects", href: "/dashboard" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help", href: "#" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <div className="fixed left-0 top-0 h-full w-14 bg-card border-r border-border flex flex-col items-center py-4 gap-2 z-40">
        {/* Logo */}
        <Link href="/dashboard" className="w-9 h-9 flex items-center justify-center mb-4 overflow-hidden rounded-lg transition-transform active:scale-95">
          <img src="/logo-black.png" alt="Logo" className="w-6 h-6 object-contain dark:hidden" />
          <img src="/logo-white.png" alt="Logo" className="w-6 h-6 object-contain hidden dark:block" />
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all",
                      isActive && "bg-muted text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            )
          })}
        </nav>

        {/* Tool and Theme at bottom */}
        <div className="mt-auto flex flex-col items-center gap-4 mb-2">
          <ThemeToggle />
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/settings"
                className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-[10px] text-foreground font-medium"
              >
                U
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Account</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
