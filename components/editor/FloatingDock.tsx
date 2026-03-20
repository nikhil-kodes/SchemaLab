"use client"

import { motion } from "framer-motion"
import {
  LayoutGrid,
  MousePointer2,
  Hand,
  ZoomIn,
  ZoomOut,
  Maximize,
  Undo2,
  Redo2,
  MessageSquare,
} from "lucide-react"
import { useStore } from "zustand"
import { useSchemaStore } from "@/store/schemaStore"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ThemeToggle"

interface FloatingDockProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onFitView: () => void
}

export function FloatingDock({ onZoomIn, onZoomOut, onFitView }: FloatingDockProps) {
  const { addTable, activeTool, setActiveTool } = useSchemaStore()
  const { undo, redo } = useStore(useSchemaStore.temporal, (state: any) => state)

  const groups = [
    [
      {
        icon: LayoutGrid,
        label: "Add Table (T)",
        onClick: addTable,
        showText: true,
        text: "Table",
      },
    ],
    [
      {
        icon: MousePointer2,
        label: "Select (V)",
        onClick: () => setActiveTool("select"),
        isActive: activeTool === "select",
      },
      {
        icon: Hand,
        label: "Pan (H)",
        onClick: () => setActiveTool("hand"),
        isActive: activeTool === "hand",
      },
    ],
    [
      { icon: ZoomIn, label: "Zoom In (+)", onClick: onZoomIn },
      { icon: ZoomOut, label: "Zoom Out (-)", onClick: onZoomOut },
      { icon: Maximize, label: "Fit View", onClick: onFitView },
    ],
    [
      { icon: Undo2, label: "Undo (Ctrl+Z)", onClick: () => undo() },
      { icon: Redo2, label: "Redo (Ctrl+Y)", onClick: () => redo() },
    ],
    [
      {
        icon: MessageSquare,
        label: "Comment (C)",
        onClick: () => setActiveTool("comment"),
        isActive: activeTool === "comment",
      },
    ],
  ]

  return (
    <TooltipProvider delayDuration={0}>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 rounded-2xl border border-border bg-card/90 px-4 py-2.5 shadow-2xl backdrop-blur-xl">
          {groups.map((group, gi) => (
            <div key={gi} className="flex items-center gap-1">
              {gi > 0 && <div className="w-px h-5 bg-border mx-1" />}
              {group.map((item) => (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className={cn(
                        "flex items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all cursor-pointer",
                        (item as { isActive?: boolean }).isActive && "bg-muted text-foreground",
                        (item as { showText?: boolean }).showText
                          ? "gap-1.5 px-3 h-9 text-xs"
                          : "w-9 h-9"
                      )}
                      onClick={item.onClick}
                    >
                      <item.icon className="h-4 w-4" />
                      {(item as { text?: string }).text && (
                        <span className="text-xs font-medium">
                          {(item as { text?: string }).text}
                        </span>
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="top">{item.label}</TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
          <div className="w-px h-5 bg-border mx-2" />
          <ThemeToggle />
        </div>
      </div>
    </TooltipProvider>
  )
}
