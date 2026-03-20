"use client"

import { useEffect, useRef, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { useSchemaStore } from "@/store/schemaStore"
import type { CanvasEvent } from "@/types/collaboration"
import type { RealtimeChannel } from "@supabase/supabase-js"

const CURSOR_COLORS = [
  "#f87171", "#fb923c", "#facc15", "#4ade80",
  "#60a5fa", "#c084fc", "#f472b6", "#2dd4bf",
]

export function useCollaboration(
  projectId: string,
  userId: string,
  displayName: string
) {
  const channelRef = useRef<RealtimeChannel | null>(null)
  const { setCollaborators, updateCollaboratorCursor } = useSchemaStore()

  const colorIndex = userId
    ? userId.charCodeAt(0) % CURSOR_COLORS.length
    : 0
  const color = CURSOR_COLORS[colorIndex]

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase.channel(`project:${projectId}`, {
      config: { presence: { key: userId } },
    })

    channel
      .on("broadcast", { event: "canvas_change" }, ({ payload }) => {
        const event = payload as CanvasEvent
        if (event.senderId === userId) return
        applyRemoteEvent(event)
      })
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState()
        const users = Object.values(state)
          .flat()
          .map((u: Record<string, unknown>) => ({
            userId: (u.userId as string) || "",
            displayName: (u.displayName as string) || "Unknown",
            avatarUrl: (u.avatarUrl as string) || null,
            cursor: u.cursor as { x: number; y: number } | null,
            color: (u.color as string) || CURSOR_COLORS[0],
          }))
          .filter((u) => u.userId !== userId)

        setCollaborators(users)
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            userId,
            displayName,
            avatarUrl: null,
            cursor: null,
            color,
          })
        }
      })

    channelRef.current = channel

    return () => {
      channel.unsubscribe()
    }
  }, [projectId, userId, displayName, color, setCollaborators])

  const broadcastEvent = useCallback(
    (event: CanvasEvent) => {
      channelRef.current?.send({
        type: "broadcast",
        event: "canvas_change",
        payload: event,
      })
    },
    []
  )

  const updateCursor = useCallback(
    (x: number, y: number) => {
      channelRef.current?.track({
        userId,
        displayName,
        avatarUrl: null,
        cursor: { x, y },
        color,
      })
    },
    [userId, displayName, color]
  )

  return { broadcastEvent, updateCursor }
}

function applyRemoteEvent(event: CanvasEvent) {
  const store = useSchemaStore.getState()
  const payload = event.payload as Record<string, unknown>

  switch (event.type) {
    case "NODE_ADDED":
      store.setNodes([...store.nodes, payload.node as typeof store.nodes[0]])
      break
    case "NODE_DELETED":
      store.setNodes(store.nodes.filter((n) => n.id !== payload.id))
      break
    case "NODE_MOVED":
      store.setNodes(
        store.nodes.map((n) =>
          n.id === payload.id
            ? { ...n, position: payload.position as { x: number; y: number } }
            : n
        )
      )
      break
    case "NODE_UPDATED":
      store.setNodes(
        store.nodes.map((n) =>
          n.id === payload.id ? { ...n, data: { ...n.data, ...payload.data as object } } : n
        )
      )
      break
    case "EDGE_ADDED":
      store.setEdges([...store.edges, payload.edge as typeof store.edges[0]])
      break
    case "EDGE_DELETED":
      store.setEdges(store.edges.filter((e) => e.id !== payload.id))
      break
  }
}
