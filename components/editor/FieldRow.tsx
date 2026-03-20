"use client"

import { useState, useCallback } from "react"
import { X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSchemaStore } from "@/store/schemaStore"
import type { Field, FieldType, Constraint } from "@/types/schema"

interface FieldRowProps {
  tableId: string
  field: Field
}

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

export function FieldRow({ tableId, field }: FieldRowProps) {
  const { updateField, deleteField, toggleFieldConstraint } = useSchemaStore()
  const [editing, setEditing] = useState(false)
  const [nameValue, setNameValue] = useState(field.name)

  const handleBlur = useCallback(() => {
    updateField(tableId, field.id, { name: nameValue })
    setEditing(false)
  }, [tableId, field.id, nameValue, updateField])

  const isPK = field.constraints.includes("PRIMARY_KEY")

  return (
    <div className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-900/50 group">
      {/* PK indicator */}
      <span
        className={`h-2 w-2 rounded-full shrink-0 ${
          isPK ? "bg-yellow-400" : "bg-transparent"
        }`}
      />

      {/* Field name */}
      {editing ? (
        <input
          className="bg-transparent text-xs text-zinc-200 font-mono outline-none border-b border-white/20 flex-1 min-w-0"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
          autoFocus
        />
      ) : (
        <span
          className="text-xs text-zinc-200 font-mono flex-1 min-w-0 cursor-text truncate"
          onClick={() => {
            setNameValue(field.name)
            setEditing(true)
          }}
        >
          {field.name}
        </span>
      )}

      {/* Field type dropdown */}
      <Select
        value={field.type}
        onValueChange={(val) =>
          updateField(tableId, field.id, { type: val as FieldType })
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
              onClick={() => toggleFieldConstraint(tableId, field.id, key)}
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
        onClick={() => deleteField(tableId, field.id)}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}
