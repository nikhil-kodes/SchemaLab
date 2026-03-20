"use client"

import type { PresenceUser } from "@/types/collaboration"

interface CollaboratorCursorProps {
  user: PresenceUser
}

export function CollaboratorCursor({ user }: CollaboratorCursorProps) {
  if (!user.cursor) return null

  return (
    <div
      style={{
        position: "absolute",
        left: user.cursor.x,
        top: user.cursor.y,
        pointerEvents: "none",
        transform: "translate(-2px, -2px)",
        zIndex: 999,
        transition: "all 80ms linear",
      }}
    >
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
        <path d="M0 0L16 12L6 14L4 20L0 0Z" fill={user.color} />
      </svg>
      <span
        className="text-[10px] text-white px-1.5 py-0.5 rounded-full ml-3 -mt-1 whitespace-nowrap inline-block"
        style={{ background: user.color }}
      >
        {user.displayName}
      </span>
    </div>
  )
}
