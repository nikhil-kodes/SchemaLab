export type PresenceUser = {
  userId: string
  displayName: string
  avatarUrl: string | null
  cursor: { x: number; y: number } | null
  color: string
}

export type CanvasEventType =
  | "NODE_MOVED" | "NODE_ADDED" | "NODE_DELETED" | "NODE_UPDATED"
  | "EDGE_ADDED" | "EDGE_DELETED" | "COMMENT_ADDED"

export type CanvasEvent = {
  type: CanvasEventType
  payload: unknown
  senderId: string
}
