"use client"

import { useState } from "react"
import { MessageSquare, Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Comment } from "@/types/comment"

interface CommentPinProps {
  comment: Comment
  onResolve: (id: string) => void
}

export function CommentPin({ comment, onResolve }: CommentPinProps) {
  if (comment.resolved) return null

  return (
    <div
      style={{
        position: "absolute",
        left: comment.canvas_x,
        top: comment.canvas_y,
        zIndex: 50,
      }}
    >
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex items-center justify-center h-7 w-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/30 transition-colors cursor-pointer">
            <MessageSquare className="h-3.5 w-3.5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64" side="right">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-zinc-700 flex items-center justify-center text-[10px] text-white">
                {comment.user?.display_name?.charAt(0) || "?"}
              </div>
              <div>
                <p className="text-xs font-medium text-white">
                  {comment.user?.display_name || "Unknown"}
                </p>
                <p className="text-[10px] text-zinc-500">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="text-sm text-zinc-300">{comment.content}</p>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs gap-1.5"
              onClick={() => onResolve(comment.id)}
            >
              <Check className="h-3 w-3" />
              Resolve
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
