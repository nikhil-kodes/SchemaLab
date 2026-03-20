export type FieldType =
  | "Int" | "String" | "Boolean" | "DateTime"
  | "Float" | "UUID" | "Text" | "JSON"

export type Constraint =
  | "PRIMARY_KEY" | "FOREIGN_KEY" | "NOT_NULL"
  | "UNIQUE" | "AUTO_INCREMENT" | "DEFAULT"

export type Field = {
  id: string
  name: string
  type: FieldType
  constraints: Constraint[]
  defaultValue?: string
}

export type TableNodeData = {
  tableName: string
  fields: Field[]
}

export type TableNode = {
  id: string
  type: "tableNode"
  position: { x: number; y: number }
  data: TableNodeData
}

export type RelationshipType = "ONE_TO_ONE" | "ONE_TO_MANY" | "MANY_TO_MANY"

export type RelationshipEdge = {
  id: string
  source: string
  target: string
  sourceHandle: string
  targetHandle: string
  data: {
    relationshipType: RelationshipType
    sourceField: string
    targetField: string
  }
}

export type Language = "sql" | "postgres" | "prisma" | "drizzle" | "mongoose"
