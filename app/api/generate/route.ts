import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateSQL } from "@/lib/generators/sql"
import { generatePostgres } from "@/lib/generators/postgres"
import { generatePrisma } from "@/lib/generators/prisma"
import { generateDrizzle } from "@/lib/generators/drizzle"
import { generateMongoose } from "@/lib/generators/mongoose"
import type { Language, TableNode, RelationshipEdge } from "@/types/schema"

type Generator = (nodes: TableNode[], edges: RelationshipEdge[]) => string

const generators: Record<Language, Generator> = {
  sql: generateSQL,
  postgres: generatePostgres,
  prisma: generatePrisma,
  drizzle: generateDrizzle,
  mongoose: generateMongoose,
}

export async function POST(req: Request) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { nodes, edges, language } = await req.json()

  if (!generators[language as Language]) {
    return NextResponse.json({ error: "Unknown language" }, { status: 400 })
  }

  const code = generators[language as Language](nodes, edges)
  return NextResponse.json({ code })
}
