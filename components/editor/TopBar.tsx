"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
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
import type { PresenceUser } from "@/types/collaboration"

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
      <div className="flex items-center justify-between px-4 py-2.5 bg-background border-b border-border h-11">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2 mr-2 transition-transform active:scale-95">
            <img src="/logo-black.png" alt="Logo" className="h-5 w-5 object-contain dark:hidden" />
            <img src="/logo-white.png" alt="Logo" className="h-5 w-5 object-contain hidden dark:block" />
          </Link>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-muted-foreground hover:text-foreground text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Projects</span>
          </button>

          <div className="w-px h-4 bg-border" />

          {editing ? (
            <input
              className="bg-transparent text-foreground text-sm font-medium border-0 outline-0 focus:bg-muted rounded px-2 py-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={handleNameBlur}
              onKeyDown={(e) => e.key === "Enter" && handleNameBlur()}
              autoFocus
            />
          ) : (
            <button
              className="flex items-center gap-1.5 text-sm text-foreground hover:text-muted-foreground transition-colors cursor-pointer"
              onClick={() => setEditing(true)}
            >
              {projectName}
              <Pencil className="h-3 w-3 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Collaborator avatars */}
          {collaborators.length > 0 && (
            <div className="flex -space-x-2">
              {collaborators.slice(0, 3).map((user: PresenceUser) => (
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

          {/* Save status */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-2">
            <span className={`h-2 w-2 rounded-full ${saveStatusDot === "bg-green-400" ? "bg-green-500" : saveStatusDot}`} />
            <span className="hidden sm:inline">{saveStatusText}</span>
          </div>

          <button
            onClick={() => setShareOpen(true)}
            className="border border-border text-foreground text-sm rounded-lg px-3 py-1.5 hover:bg-muted flex items-center gap-2"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
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
