import { create } from "zustand"
import { temporal } from "zundo"
import type { TableNode, RelationshipEdge, Language, Field, Constraint } from "@/types/schema"
import type { PresenceUser } from "@/types/collaboration"

type SchemaStore = {
  // Canvas state
  nodes: TableNode[]
  edges: RelationshipEdge[]

  // UI state
  selectedLanguage: Language
  generatedCode: string
  isGenerating: boolean
  isRightPanelOpen: boolean
  activeTool: "select" | "hand" | "comment"

  // Save state
  isSaving: boolean
  hasUnsavedChanges: boolean
  lastSaved: Date | null

  // Collaboration
  collaborators: PresenceUser[]

  // Node actions
  setNodes: (nodes: TableNode[]) => void
  setEdges: (edges: RelationshipEdge[]) => void
  addTable: () => void
  deleteTable: (id: string) => void
  updateTableName: (id: string, name: string) => void
  duplicateTable: (id: string) => void
  addField: (tableId: string) => void
  updateField: (tableId: string, fieldId: string, updates: Partial<Field>) => void
  deleteField: (tableId: string, fieldId: string) => void
  toggleFieldConstraint: (tableId: string, fieldId: string, constraint: Constraint) => void
  updateTableComment: (id: string, comment: string) => void

  // Edge actions
  addEdge: (edge: RelationshipEdge) => void
  deleteEdge: (id: string) => void

  // Code generation
  setSelectedLanguage: (lang: Language) => void
  setGeneratedCode: (code: string) => void
  setIsGenerating: (val: boolean) => void

  // UI
  setActiveTool: (tool: "select" | "hand" | "comment") => void
  setIsRightPanelOpen: (open: boolean) => void

  // Save
  setIsSaving: (val: boolean) => void
  setHasUnsavedChanges: (val: boolean) => void
  setLastSaved: (date: Date | null) => void

  // Collaboration
  setCollaborators: (users: PresenceUser[]) => void
  updateCollaboratorCursor: (userId: string, cursor: { x: number; y: number }) => void
}

let tableCounter = 0

export const useSchemaStore = create<SchemaStore>()(
  temporal(
    (set, get) => ({
      nodes: [],
      edges: [],
      selectedLanguage: "sql",
      generatedCode: "",
      isGenerating: false,
      isRightPanelOpen: true,
      activeTool: "select",
      isSaving: false,
      hasUnsavedChanges: false,
      lastSaved: null,
      collaborators: [],

      setNodes: (nodes) => set({ nodes, hasUnsavedChanges: true }),
      setEdges: (edges) => set({ edges, hasUnsavedChanges: true }),

      addTable: () => {
        tableCounter++
        const newNode: TableNode = {
          id: `table-${Date.now()}-${tableCounter}`,
          type: "tableNode",
          position: {
            x: 100 + Math.random() * 400,
            y: 100 + Math.random() * 300,
          },
          data: {
            tableName: `table_${tableCounter}`,
            fields: [
              {
                id: `field-${Date.now()}-1`,
                name: "id",
                type: "Int",
                constraints: ["PRIMARY_KEY", "AUTO_INCREMENT"],
              },
            ],
          },
        }
        set((state) => ({
          nodes: [...state.nodes, newNode],
          hasUnsavedChanges: true,
        }))
      },

      deleteTable: (id) =>
        set((state) => ({
          nodes: state.nodes.filter((n) => n.id !== id),
          edges: state.edges.filter((e) => e.source !== id && e.target !== id),
          hasUnsavedChanges: true,
        })),

      updateTableName: (id, name) =>
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === id ? { ...n, data: { ...n.data, tableName: name } } : n
          ),
          hasUnsavedChanges: true,
        })),

      duplicateTable: (id) => {
        const node = get().nodes.find((n) => n.id === id)
        if (!node) return
        tableCounter++
        const newNode: TableNode = {
          ...node,
          id: `table-${Date.now()}-${tableCounter}`,
          position: { x: node.position.x + 40, y: node.position.y + 40 },
          data: {
            ...node.data,
            tableName: `${node.data.tableName}_copy`,
            fields: node.data.fields.map((f) => ({
              ...f,
              id: `field-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            })),
          },
        }
        set((state) => ({
          nodes: [...state.nodes, newNode],
          hasUnsavedChanges: true,
        }))
      },

      addField: (tableId) =>
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === tableId
              ? {
                  ...n,
                  data: {
                    ...n.data,
                    fields: [
                      ...n.data.fields,
                      {
                        id: `field-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                        name: `field_${n.data.fields.length + 1}`,
                        type: "String" as const,
                        constraints: [],
                      },
                    ],
                  },
                }
              : n
          ),
          hasUnsavedChanges: true,
        })),

      updateField: (tableId, fieldId, updates) =>
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === tableId
              ? {
                  ...n,
                  data: {
                    ...n.data,
                    fields: n.data.fields.map((f) =>
                      f.id === fieldId ? { ...f, ...updates } : f
                    ),
                  },
                }
              : n
          ),
          hasUnsavedChanges: true,
        })),

      deleteField: (tableId, fieldId) =>
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === tableId
              ? {
                  ...n,
                  data: {
                    ...n.data,
                    fields: n.data.fields.filter((f) => f.id !== fieldId),
                  },
                }
              : n
          ),
          hasUnsavedChanges: true,
        })),

      toggleFieldConstraint: (tableId, fieldId, constraint) =>
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === tableId
              ? {
                  ...n,
                  data: {
                    ...n.data,
                    fields: n.data.fields.map((f) =>
                      f.id === fieldId
                        ? {
                            ...f,
                            constraints: f.constraints.includes(constraint)
                              ? f.constraints.filter((c) => c !== constraint)
                              : [...f.constraints, constraint],
                          }
                        : f
                    ),
                  },
                }
              : n
          ),
          hasUnsavedChanges: true,
        })),

      updateTableComment: (id, comment) =>
        set((state) => ({
          nodes: state.nodes.map((n) =>
            n.id === id ? { ...n, data: { ...n.data, comment } } : n
          ),
          hasUnsavedChanges: true,
        })),

      addEdge: (edge) =>
        set((state) => ({
          edges: [...state.edges, edge],
          hasUnsavedChanges: true,
        })),

      deleteEdge: (id) =>
        set((state) => ({
          edges: state.edges.filter((e) => e.id !== id),
          hasUnsavedChanges: true,
        })),

      setSelectedLanguage: (lang) => set({ selectedLanguage: lang }),
      setGeneratedCode: (code) => set({ generatedCode: code }),
      setIsGenerating: (val) => set({ isGenerating: val }),
      setActiveTool: (tool) => set({ activeTool: tool }),
      setIsRightPanelOpen: (open) => set({ isRightPanelOpen: open }),
      setIsSaving: (val) => set({ isSaving: val }),
      setHasUnsavedChanges: (val) => set({ hasUnsavedChanges: val }),
      setLastSaved: (date) => set({ lastSaved: date }),
      setCollaborators: (users) => set({ collaborators: users }),
      updateCollaboratorCursor: (userId, cursor) =>
        set((state) => ({
          collaborators: state.collaborators.map((c) =>
            c.userId === userId ? { ...c, cursor } : c
          ),
        })),
    }),
    {
      limit: 50,
      partialize: (state) => ({
        nodes: state.nodes,
        edges: state.edges,
      }),
    }
  )
)
