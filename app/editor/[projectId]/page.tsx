"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { useParams } from "next/navigation"
import { TopBar } from "@/components/editor/TopBar"
import { FlowCanvas } from "@/components/editor/FlowCanvas"
import { CodePanel } from "@/components/editor/CodePanel"
import { useSchemaStore } from "@/store/schemaStore"
import type { Project } from "@/types/project"

export default function EditorPage() {
  const params = useParams()
  const projectId = params.projectId as string
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const { setNodes, setEdges, nodes, edges, hasUnsavedChanges, setIsSaving, setHasUnsavedChanges, setLastSaved, isRightPanelOpen } = useSchemaStore()
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fetch project
  useEffect(() => {
    async function fetchProject() {
      const res = await fetch(`/api/projects/${projectId}`)
      if (res.ok) {
        const data: Project = await res.json()
        setProject(data)
        if (data.canvas_data) {
          setNodes(data.canvas_data.nodes || [])
          setEdges(data.canvas_data.edges || [])
        }
        setHasUnsavedChanges(false)
      }
      setLoading(false)
    }
    fetchProject()
  }, [projectId, setNodes, setEdges, setHasUnsavedChanges])

  // Auto-save with debounce
  useEffect(() => {
    if (!hasUnsavedChanges || !project) return

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(async () => {
      setIsSaving(true)
      try {
        await fetch(`/api/projects/${projectId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            canvas_data: { nodes, edges },
          }),
        })
        setHasUnsavedChanges(false)
        setLastSaved(new Date())
      } catch (err) {
        console.error("Auto-save failed:", err)
      } finally {
        setIsSaving(false)
      }
    }, 2000)

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    }
  }, [hasUnsavedChanges, nodes, edges, projectId, project, setIsSaving, setHasUnsavedChanges, setLastSaved])

  // Save on page close
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (hasUnsavedChanges && project) {
        navigator.sendBeacon?.(
          `/api/projects/${projectId}`,
          new Blob(
            [
              JSON.stringify({
                canvas_data: { nodes, edges },
              }),
            ],
            { type: "application/json" }
          )
        )
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [hasUnsavedChanges, nodes, edges, projectId, project])

  const handleNameChange = useCallback(
    async (name: string) => {
      await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      })
      setProject((prev) => (prev ? { ...prev, name } : prev))
    },
    [projectId]
  )

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <p className="text-sm text-zinc-500">Loading editor...</p>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <p className="text-sm text-zinc-500">Project not found</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar
        projectId={projectId}
        projectName={project.name}
        roomId={project.room_id}
        onNameChange={handleNameChange}
      />
      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 flex overflow-hidden">
          <FlowCanvas />
        </div>

        {isRightPanelOpen && (
          <div className="absolute inset-0 z-50 bg-background md:relative md:inset-auto md:z-auto md:w-[400px] border-l border-border transition-all animate-in slide-in-from-right md:animate-none">
            <CodePanel projectName={project.name} />
          </div>
        )}
      </div>
    </div>
  )
}
