"use client"

import { MoreVertical, Pencil, Copy, Share2, Trash2, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface ProjectCardProps {
  id: string
  name: string
  updatedAt: string
  roomId: string
  onDelete: (id: string) => void
  onRename: (id: string) => void
  onDuplicate: (id: string) => void
}

export function ProjectCard({
  id,
  name,
  updatedAt,
  roomId,
  onDelete,
  onRename,
  onDuplicate,
}: ProjectCardProps) {
  const router = useRouter()

  const timeAgo = getTimeAgo(updatedAt)

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId)
  }

  return (
    <div
      className="bg-card border border-border rounded-xl p-5 hover:border-border-strong transition-all cursor-pointer group"
      onClick={() => router.push(`/editor/${id}`)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 flex flex-col items-start">
          <h3 className="text-base font-semibold text-foreground mb-1 truncate">{name}</h3>
          <p className="text-xs text-muted-foreground mb-3">Last edited {timeAgo}</p>
          <span className="inline-flex items-center text-xs bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-full px-2 py-0.5 mb-1">
            ACTIVE
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-opacity opacity-0 group-hover:opacity-100"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <DropdownMenuItem onClick={() => router.push(`/editor/${id}`)}>
              <ExternalLink className="mr-2 h-3.5 w-3.5" />
              Open
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRename(id)}>
              <Pencil className="mr-2 h-3.5 w-3.5" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate(id)}>
              <Copy className="mr-2 h-3.5 w-3.5" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyRoomId}>
              <Share2 className="mr-2 h-3.5 w-3.5" />
              Copy Room ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-400 focus:text-red-300" onClick={() => onDelete(id)}>
              <Trash2 className="mr-2 h-3.5 w-3.5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function getTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "just now"
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}
