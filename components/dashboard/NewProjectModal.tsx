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

interface NewProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProjectCreate: (name: string) => void
  projectName: string
  setProjectName: (name: string) => void
}

export function NewProjectModal({
  open,
  onOpenChange,
  onProjectCreate,
  projectName,
  setProjectName,
}: NewProjectModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Give your schema project a name to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <Input
            placeholder="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onProjectCreate(projectName)}
            autoFocus
          />
          <Button onClick={() => onProjectCreate(projectName)} className="w-full">
            Create Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
