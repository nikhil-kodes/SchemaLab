"use client"

import { Check, Copy, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface ShareModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  roomId: string
  copied: string | null
  onCopy: (text: string, type: string) => void
}

export function ShareModal({
  open,
  onOpenChange,
  roomId,
  copied,
  onCopy,
}: ShareModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                onClick={() => onCopy(roomId, "room")}
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
                  onCopy(
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
  )
}
