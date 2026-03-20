"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Pencil, Share2, Check, Copy, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useSchemaStore } from "@/store/schemaStore"

interface TopBarProps {
  projectId: string
  projectName: string
  roomId: string
  onNameChange: (name: string) => void
}

export function TopBar({ projectId, projectName, roomId, onNameChange }: TopBarProps) {
  const router = useRouter()
  const { isSaving, hasUnsavedChanges, lastSaved, collaborators } = useSchemaStore()
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(projectName)
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const handleNameBlur = useCallback(() => {
    setEditing(false)
    if (name.trim() && name !== projectName) {
      onNameChange(name.trim())
    }
  }, [name, projectName, onNameChange])

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const saveStatusDot = isSaving
    ? "bg-amber-400 pulse-save"
    : hasUnsavedChanges
    ? "bg-amber-400"
    : "bg-green-400"

  const saveStatusText = isSaving
    ? "Saving..."
    : hasUnsavedChanges
    ? "Unsaved"
    : lastSaved
    ? `Saved ${getTimeAgo(lastSaved)}`
    : "Saved"

  return (
    <>
      <div className="flex items-center justify-between h-11 border-b border-white/5 bg-zinc-950 px-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-sm cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Projects</span>
          </button>

          <div className="w-px h-4 bg-white/10" />

          {editing ? (
            <input
              className="bg-transparent text-sm font-medium text-white outline-none border-b border-white/20"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameBlur}
              onKeyDown={(e) => e.key === "Enter" && handleNameBlur()}
              autoFocus
            />
          ) : (
            <button
              className="flex items-center gap-1.5 text-sm text-white hover:text-zinc-300 transition-colors cursor-pointer"
              onClick={() => setEditing(true)}
            >
              {projectName}
              <Pencil className="h-3 w-3 text-zinc-500" />
            </button>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Collaborator avatars */}
          {collaborators.length > 0 && (
            <div className="flex -space-x-2">
              {collaborators.slice(0, 3).map((user) => (
                <div
                  key={user.userId}
                  className="h-7 w-7 rounded-full border-2 flex items-center justify-center text-[10px] font-medium text-white"
                  style={{ borderColor: user.color, backgroundColor: user.color + "20" }}
                  title={user.displayName}
                >
                  {user.displayName?.charAt(0).toUpperCase() || "?"}
                </div>
              ))}
              {collaborators.length > 3 && (
                <div className="h-7 w-7 rounded-full border-2 border-zinc-700 bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">
                  +{collaborators.length - 3}
                </div>
              )}
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShareOpen(true)}
            className="gap-1.5 text-xs"
          >
            <Share2 className="h-3 w-3" />
            Share
          </Button>

          {/* Save status */}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <span className={`h-2 w-2 rounded-full ${saveStatusDot}`} />
            <span className="hidden sm:inline">{saveStatusText}</span>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Project</DialogTitle>
            <DialogDescription>
              Share this Room ID or link with collaborators to work together.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <label className="text-xs text-zinc-400 mb-1.5 block">Room ID</label>
              <div className="flex gap-2">
                <Input value={roomId} readOnly className="font-mono text-xs" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(roomId, "room")}
                  className="shrink-0"
                >
                  {copied === "room" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
            <div>
              <label className="text-xs text-zinc-400 mb-1.5 block">Share Link</label>
              <div className="flex gap-2">
                <Input
                  value={`${typeof window !== "undefined" ? window.location.origin : ""}/join/${roomId}`}
                  readOnly
                  className="font-mono text-xs"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    copyToClipboard(
                      `${window.location.origin}/join/${roomId}`,
                      "link"
                    )
                  }
                  className="shrink-0"
                >
                  {copied === "link" ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Link2 className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return "just now"
  if (diffMins < 60) return `${diffMins}m ago`
  return `${Math.floor(diffMins / 60)}h ago`
}
