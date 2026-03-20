"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface JoinProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProjectJoin: (roomId: string) => void
  roomIdInput: string
  setRoomIdInput: (roomId: string) => void
}

export function JoinProjectModal({
  open,
  onOpenChange,
  onProjectJoin,
  roomIdInput,
  setRoomIdInput,
}: JoinProjectModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join a Project</DialogTitle>
          <DialogDescription>
            Enter the Room ID shared by the project owner.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <Input
            placeholder="Room ID"
            value={roomIdInput}
            onChange={(e) => setRoomIdInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onProjectJoin(roomIdInput)}
            autoFocus
          />
          <Button onClick={() => onProjectJoin(roomIdInput)} className="w-full">
            Join Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
