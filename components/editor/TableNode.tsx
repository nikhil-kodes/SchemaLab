"use client"

import { memo, useState, useCallback } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { MoreVertical, X, Plus, Trash2, GripVertical } from "lucide-react"
import { useSchemaStore } from "@/store/schemaStore"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { TableNodeData, FieldType, Constraint } from "@/types/schema"

const fieldTypes: FieldType[] = [
  "Int", "String", "Boolean", "DateTime", "Float", "UUID", "Text", "JSON",
]

const constraintConfig: { key: Constraint; label: string; className: string }[] = [
  { key: "PRIMARY_KEY", label: "PK", className: "badge-pk" },
  { key: "FOREIGN_KEY", label: "FK", className: "badge-fk" },
  { key: "UNIQUE", label: "UQ", className: "badge-uq" },
  { key: "NOT_NULL", label: "NN", className: "badge-nn" },
  { key: "AUTO_INCREMENT", label: "AI", className: "badge-ai" },
]

function TableNodeComponent({ id, data, selected }: NodeProps & { data: TableNodeData }) {
  const { updateTableName, addField, updateField, deleteField, deleteTable, duplicateTable, toggleFieldConstraint } = useSchemaStore()
  const [editingName, setEditingName] = useState(false)
  const [nameValue, setNameValue] = useState(data.tableName)
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null)
  const [fieldNameValue, setFieldNameValue] = useState("")

  const handleNameBlur = useCallback(() => {
    updateTableName(id, nameValue)
    setEditingName(false)
  }, [id, nameValue, updateTableName])

  const handleFieldNameBlur = useCallback(
    (fieldId: string) => {
      updateField(id, fieldId, { name: fieldNameValue })
      setEditingFieldId(null)
    },
    [id, fieldNameValue, updateField]
  )

  return (
    <div
      className={`rounded-xl border bg-zinc-950 shadow-xl w-72 transition-all ${
        selected ? "border-white ring-1 ring-white/20" : "border-zinc-800"
      }`}
    >
      {/* Connection handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !rounded-full !bg-zinc-700 !border-2 !border-zinc-500 hover:!bg-white hover:!border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !rounded-full !bg-zinc-700 !border-2 !border-zinc-500 hover:!bg-white hover:!border-white"
      />

      {/* Header */}
      <div className="flex items-center justify-between rounded-t-xl bg-zinc-900 px-4 py-3">
        <div className="flex items-center gap-2">
          <GripVertical className="h-3.5 w-3.5 text-zinc-600 cursor-grab" />
          {editingName ? (
            <input
              className="bg-transparent text-sm font-semibold text-white font-mono outline-none border-b border-white/20 w-32"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={handleNameBlur}
              onKeyDown={(e) => e.key === "Enter" && handleNameBlur()}
              autoFocus
            />
          ) : (
            <span
              className="text-sm font-semibold text-white font-mono cursor-text"
              onClick={() => {
                setNameValue(data.tableName)
                setEditingName(true)
              }}
            >
              {data.tableName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-6 w-6 items-center justify-center rounded text-zinc-500 hover:text-white hover:bg-white/5 transition-colors">
              <MoreVertical className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => addField(id)}>
                <Plus className="mr-2 h-3 w-3" />
                Add field
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => duplicateTable(id)}>
                Duplicate table
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-400"
                onClick={() => deleteTable(id)}
              >
                <Trash2 className="mr-2 h-3 w-3" />
                Delete table
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            className="flex h-6 w-6 items-center justify-center rounded text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            onClick={() => deleteTable(id)}
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="divide-y divide-zinc-900">
        {data.fields.map((field) => {
          const isPK = field.constraints.includes("PRIMARY_KEY")

          return (
            <div
              key={field.id}
              className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-900/50 group"
            >
              {/* PK indicator */}
              <span
                className={`h-2 w-2 rounded-full shrink-0 ${
                  isPK ? "bg-yellow-400" : "bg-transparent"
                }`}
              />

              {/* Field name */}
              {editingFieldId === field.id ? (
                <input
                  className="bg-transparent text-xs text-zinc-200 font-mono outline-none border-b border-white/20 flex-1 min-w-0"
                  value={fieldNameValue}
                  onChange={(e) => setFieldNameValue(e.target.value)}
                  onBlur={() => handleFieldNameBlur(field.id)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleFieldNameBlur(field.id)
                  }
                  autoFocus
                />
              ) : (
                <span
                  className="text-xs text-zinc-200 font-mono flex-1 min-w-0 cursor-text truncate"
                  onClick={() => {
                    setFieldNameValue(field.name)
                    setEditingFieldId(field.id)
                  }}
                >
                  {field.name}
                </span>
              )}

              {/* Field type dropdown */}
              <Select
                value={field.type}
                onValueChange={(val) =>
                  updateField(id, field.id, { type: val as FieldType })
                }
              >
                <SelectTrigger className="h-6 w-20 border-0 bg-zinc-900 text-[10px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Constraint badges */}
              <div className="flex gap-0.5 shrink-0">
                {constraintConfig.map(({ key, label, className }) => {
                  const active = field.constraints.includes(key)
                  if (!active) return null
                  return (
                    <button
                      key={key}
                      onClick={() => toggleFieldConstraint(id, field.id, key)}
                      className={`${className} text-[9px] font-mono px-1 py-0.5 rounded cursor-pointer`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>

              {/* Delete field */}
              <button
                className="h-5 w-5 flex items-center justify-center rounded text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                onClick={() => deleteField(id, field.id)}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )
        })}
      </div>

      {/* Add field footer */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 transition-colors cursor-pointer border-t border-zinc-900 rounded-b-xl"
        onClick={() => addField(id)}
      >
        <Plus className="h-3 w-3" />
        <span className="text-xs">Add Field</span>
      </div>
    </div>
  )
}

export const TableNode = memo(TableNodeComponent)
