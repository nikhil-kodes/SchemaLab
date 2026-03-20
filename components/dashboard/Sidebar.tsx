"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Database, FolderOpen, Settings, HelpCircle, User } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: FolderOpen, label: "Projects", href: "/dashboard" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help", href: "#" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen w-12 flex-col items-center border-r border-white/5 bg-zinc-950 py-3">
        {/* Logo */}
        <Link href="/dashboard" className="mb-6">
          <Database className="h-5 w-5 text-white" />
        </Link>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:text-white",
                      isActive && "bg-white/5 text-white"
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

        {/* User avatar at bottom */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 hover:text-white transition-colors"
            >
              <User className="h-4 w-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Account</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
