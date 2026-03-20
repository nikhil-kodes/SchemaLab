export type FieldType =
  | "Int" | "String" | "Boolean" | "DateTime"
  | "Float" | "UUID" | "Text" | "JSON"
  | "VarChar"

export type Constraint =
  | "PRIMARY_KEY" | "FOREIGN_KEY" | "NOT_NULL"
  | "UNIQUE" | "AUTO_INCREMENT" | "DEFAULT"

export type OnAction = "CASCADE" | "SET_NULL" | "RESTRICT" | "NO_ACTION"

export type Field = {
  id: string
  name: string
  type: FieldType
  constraints: Constraint[]
  defaultValue?: string
  length?: number // for VarChar
  onDelete?: OnAction
  onUpdate?: OnAction
}

export type TableNodeData = {
  tableName: string
  fields: Field[]
  comment?: string // table comment
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
    onDelete?: OnAction
    onUpdate?: OnAction
  }
}

export type Language = "sql" | "postgres" | "prisma" | "drizzle" | "mongoose"
