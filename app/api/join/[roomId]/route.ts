import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET — look up a project by room_id
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("projects")
    .select("id, name, room_id")
    .eq("room_id", roomId)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 })
  }

  return NextResponse.json(data)
}
