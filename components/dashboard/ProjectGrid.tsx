"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Plus, UserPlus, Search, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProjectCard } from "./ProjectCard"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"
import type { Project } from "@/types/project"

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [newProjectModal, setNewProjectModal] = useState(false)
  const [joinModal, setJoinModal] = useState(false)
  const [renameModal, setRenameModal] = useState<string | null>(null)
  const [newProjectName, setNewProjectName] = useState("")
  const [roomIdInput, setRoomIdInput] = useState("")
  const [renameName, setRenameName] = useState("")
  const router = useRouter()

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects")
      if (res.ok) {
        const data = await res.json()
        setProjects(data)
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const createProject = async () => {
    const name = newProjectName.trim() || "Untitled Project"
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
    if (res.ok) {
      const project = await res.json()
      setNewProjectModal(false)
      setNewProjectName("")
      router.push(`/editor/${project.id}`)
    }
  }

  const joinProject = async () => {
    const roomId = roomIdInput.trim()
    if (!roomId) return
    const res = await fetch(`/api/join/${roomId}`)
    if (res.ok) {
      const data = await res.json()
      setJoinModal(false)
      setRoomIdInput("")
      router.push(`/editor/${data.id}`)
    }
  }

  const deleteProject = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" })
    setProjects((p) => p.filter((proj) => proj.id !== id))
  }

  const duplicateProject = async (id: string) => {
    const project = projects.find((p) => p.id === id)
    if (!project) return
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: `${project.name} (copy)` }),
    })
    if (res.ok) {
      fetchProjects()
    }
  }

  const renameProject = async () => {
    if (!renameModal || !renameName.trim()) return
    await fetch(`/api/projects/${renameModal}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: renameName.trim() }),
    })
    setProjects((p) =>
      p.map((proj) =>
        proj.id === renameModal ? { ...proj, name: renameName.trim() } : proj
      )
    )
    setRenameModal(null)
    setRenameName("")
  }

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-zinc-950 px-6 py-3">
        <h1 className="text-xl font-semibold text-white">Projects</h1>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/5 px-6 py-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
          <Input
            placeholder="Search for a project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs h-9"
          />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setJoinModal(true)}
            className="gap-1.5"
          >
            <UserPlus className="h-3.5 w-3.5" />
            Join Project
          </Button>
          <Button size="sm" onClick={() => setNewProjectModal(true)} className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            New Project
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-sm text-zinc-500">Loading projects...</div>
          </div>
        ) : filteredProjects.length === 0 && !search ? (
          // Empty state
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Database className="h-12 w-12 text-zinc-600 mb-4" />
            <h3 className="text-lg font-medium text-white">No projects yet</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Create your first schema to get started.
            </p>
            <div className="mt-6 flex gap-3">
              <Button size="sm" onClick={() => setNewProjectModal(true)} className="gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                New Project
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setJoinModal(true)}
                className="gap-1.5"
              >
                <UserPlus className="h-3.5 w-3.5" />
                Join a Project
              </Button>
            </div>
          </div>
        ) : filteredProjects.length === 0 && search ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-sm text-zinc-500">
              No projects match &quot;{search}&quot;
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                updatedAt={project.updated_at}
                roomId={project.room_id}
                onDelete={deleteProject}
                onRename={(id) => {
                  const p = projects.find((proj) => proj.id === id)
                  if (p) {
                    setRenameName(p.name)
                    setRenameModal(id)
                  }
                }}
                onDuplicate={duplicateProject}
              />
            ))}
          </div>
        )}
      </div>

      {/* New Project Modal */}
      <Dialog open={newProjectModal} onOpenChange={setNewProjectModal}>
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
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createProject()}
              autoFocus
            />
            <Button onClick={createProject} className="w-full">
              Create Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Join Project Modal */}
      <Dialog open={joinModal} onOpenChange={setJoinModal}>
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
              onKeyDown={(e) => e.key === "Enter" && joinProject()}
              autoFocus
            />
            <Button onClick={joinProject} className="w-full">
              Join Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Rename Modal */}
      <Dialog open={!!renameModal} onOpenChange={() => setRenameModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Project</DialogTitle>
            <DialogDescription>Enter a new name for this project.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <Input
              placeholder="New name"
              value={renameName}
              onChange={(e) => setRenameName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && renameProject()}
              autoFocus
            />
            <Button onClick={renameProject} className="w-full">
              Rename
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
