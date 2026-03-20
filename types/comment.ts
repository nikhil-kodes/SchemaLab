export type Comment = {
  id: string
  project_id: string
  user_id: string
  canvas_x: number
  canvas_y: number
  content: string
  resolved: boolean
  created_at: string
  user?: { display_name: string; avatar_url: string }
}
