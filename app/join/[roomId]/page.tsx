"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Database, Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function JoinPage() {
  const router = useRouter()
  const params = useParams()
  const roomId = params.roomId as string
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function joinRoom() {
      try {
        const res = await fetch(`/api/join/${roomId}`)
        if (res.ok) {
          const project = await res.json()
          // Success, redirect to the editor
          router.replace(`/editor/${project.id}`)
        } else {
          const data = await res.json()
          setError(data.error || "Failed to join project.")
        }
      } catch (err) {
        setError("An unexpected error occurred.")
      }
    }

    if (roomId) {
      joinRoom()
    }
  }, [roomId, router])

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-6">
          <Database className="h-10 w-10 text-white" />
        </div>
        
        {!error ? (
          <>
            <h1 className="text-xl font-semibold text-white mb-2">Joining Project...</h1>
            <p className="text-zinc-400 text-sm flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Connecting to room {roomId}
            </p>
          </>
        ) : (
          <>
            <div className="mb-4 flex justify-center text-red-400">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h1 className="text-xl font-semibold text-white mb-2">Unable to Join</h1>
            <p className="text-zinc-400 text-sm mb-6">{error}</p>
            <Button asChild>
              <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
