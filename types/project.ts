import { TableNode, RelationshipEdge } from "./schema"

export type Project = {
  id: string
  user_id: string
  name: string
  canvas_data: { nodes: TableNode[]; edges: RelationshipEdge[] } | null
  room_id: string
  created_at: string
  updated_at: string
}
