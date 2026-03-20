"use client"

import { memo, useState, useCallback } from "react"
import { Handle, Position, type NodeProps } from "@xyflow/react"
import { MoreVertical, X, Plus, Trash2, GripVertical, MessageSquare } from "lucide-react"
import { useSchemaStore } from "@/store/schemaStore"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import type { TableNodeData, FieldType, Constraint, OnAction } from "@/types/schema"

const fieldTypes: FieldType[] = [
  "Int", "String", "VarChar", "Boolean", "DateTime", "Float", "UUID", "Text", "JSON",
]

const constraintConfig: { key: Constraint; label: string; full: string; className: string }[] = [
  { key: "PRIMARY_KEY", label: "PK", full: "Primary Key", className: "badge-pk" },
  { key: "FOREIGN_KEY", label: "FK", full: "Foreign Key", className: "badge-fk" },
  { key: "UNIQUE", label: "UQ", full: "Unique Constraint", className: "badge-uq" },
  { key: "NOT_NULL", label: "NN", full: "Not Null", className: "badge-nn" },
  { key: "AUTO_INCREMENT", label: "AI", full: "Auto Increment", className: "badge-ai" },
]

const onActions: OnAction[] = ["CASCADE", "SET_NULL", "RESTRICT", "NO_ACTION"]

function TableNodeComponent({ id, data, selected }: NodeProps & { data: TableNodeData }) {
  const { 
    updateTableName, addField, updateField, deleteField, 
    deleteTable, duplicateTable, toggleFieldConstraint,
    updateTableComment 
  } = useSchemaStore()
  
  const [editingName, setEditingName] = useState(false)
  const [nameValue, setNameValue] = useState(data.tableName)
  const [editingFieldId, setEditingFieldId] = useState<string | null>(null)
  const [fieldNameValue, setFieldNameValue] = useState("")
  const [showComment, setShowComment] = useState(false)
  const [commentValue, setCommentValue] = useState(data.comment || "")

  const handleNameBlur = useCallback(() => {
    updateTableName(id, nameValue)
    setEditingName(false)
  }, [id, nameValue, updateTableName])

  const handleCommentBlur = useCallback(() => {
    updateTableComment(id, commentValue)
    setShowComment(false)
  }, [id, commentValue, updateTableComment])

  const handleFieldNameBlur = useCallback(
    (fieldId: string) => {
      updateField(id, fieldId, { name: fieldNameValue })
      setEditingFieldId(null)
    },
    [id, fieldNameValue, updateField]
  )

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className={`rounded-xl border bg-card shadow-xl w-80 transition-all ${
          selected ? "border-foreground ring-1 ring-foreground/20" : "border-border"
        }`}
      >
        {/* Connection handles */}
        <Handle
          type="target"
          position={Position.Left}
          id="id"
          className="!w-3 !h-3 !rounded-full !bg-muted !border-2 !border-border-strong !-left-1.5 opacity-0"
        />
        <Handle
          type="source"
          position={Position.Right}
          id="id"
          className="!w-3 !h-3 !rounded-full !bg-muted !border-2 !border-border-strong !-right-1.5 opacity-0"
        />

        {/* Header */}
        <div className="flex flex-col rounded-t-xl bg-muted/50 border-b border-border transition-colors">
          <div className="flex items-center justify-between px-4 py-3 relative">
            <div className="flex items-center gap-2">
              <GripVertical className="h-3.5 w-3.5 text-muted-foreground cursor-grab" />
              {editingName ? (
                <Input
                  className="h-7 bg-transparent text-sm font-semibold text-foreground font-mono outline-none border-border w-32 px-1 focus-visible:ring-0"
                  value={nameValue}
                  onChange={(e) => setNameValue(e.target.value)}
                  onBlur={handleNameBlur}
                  onKeyDown={(e) => e.key === "Enter" && handleNameBlur()}
                  autoFocus
                />
              ) : (
                <span
                  className="text-sm font-semibold text-foreground font-mono cursor-text"
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
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className={`flex h-6 w-6 items-center justify-center rounded transition-colors ${
                      data.comment || showComment ? "text-blue-500 bg-blue-500/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                    onClick={() => {
                      setCommentValue(data.comment || "")
                      setShowComment(!showComment)
                    }}
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[200px] break-words text-[10px]">
                  {data.comment || "Add a comment to this table"}
                </TooltipContent>
              </Tooltip>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
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
                    className="text-error"
                    onClick={() => deleteTable(id)}
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Delete table
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {showComment && (
            <div className="px-4 pb-3">
              <Input
                className="h-8 bg-background/50 text-[11px] text-muted-foreground font-sans outline-none border-border py-1 px-2 focus-visible:ring-1 focus-visible:ring-blue-500/50 italic"
                placeholder="Write a table comment..."
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                onBlur={handleCommentBlur}
                onKeyDown={(e) => e.key === "Enter" && handleCommentBlur()}
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Fields */}
        <div className="divide-y divide-border">
          {data.fields.map((field) => {
            const isPK = field.constraints.includes("PRIMARY_KEY")

            return (
              <div
                key={field.id}
                className="flex flex-col hover:bg-muted/30 group relative"
              >
                <div className="flex items-center gap-2 px-4 py-2">
                  <Handle
                    type="target"
                    position={Position.Left}
                    id={field.id}
                    className="!w-2 !h-2 !rounded-full !bg-muted !border !border-border-strong !-left-1"
                  />
                  <Handle
                    type="source"
                    position={Position.Right}
                    id={field.id}
                    className="!w-2 !h-2 !rounded-full !bg-muted !border !border-border-strong !-right-1"
                  />

                  <span
                    className={`h-2 w-2 rounded-full shrink-0 ${
                      isPK ? "bg-[var(--pk-color)]" : "bg-transparent"
                    }`}
                  />

                  <div className="flex-1 min-w-0 flex items-center gap-1">
                    {editingFieldId === field.id ? (
                      <input
                        className="bg-transparent text-xs text-foreground font-mono outline-none border-b border-border w-full"
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
                        className="text-xs text-foreground font-mono truncate cursor-text"
                        onClick={() => {
                          setFieldNameValue(field.name)
                          setEditingFieldId(field.id)
                        }}
                      >
                        {field.name}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Select
                      value={field.type}
                      onValueChange={(val) =>
                        updateField(id, field.id, { type: val as FieldType })
                      }
                    >
                      <SelectTrigger className="h-6 w-20 border-0 bg-muted text-[10px] text-foreground">
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

                    <DropdownMenu>
                      <DropdownMenuTrigger className="h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0">
                        <Plus className="h-3 w-3" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        {constraintConfig.map(({ key, label, full }) => (
                          <DropdownMenuItem
                            key={key}
                            onClick={() => toggleFieldConstraint(id, field.id, key)}
                            className="flex items-center justify-between text-xs"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{full}</span>
                              <span className="text-[10px] text-muted-foreground">{label}</span>
                            </div>
                            {field.constraints.includes(key) && (
                              <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
                            )}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="text-xs">Relationship Actions</DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent className="w-48">
                              <div className="px-2 py-1.5 text-[10px] uppercase font-bold text-muted-foreground">On Delete</div>
                              {onActions.map(action => (
                                <DropdownMenuItem key={`del-${action}`} className="text-xs" onClick={() => updateField(id, field.id, { onDelete: action })}>{action}</DropdownMenuItem>
                              ))}
                              <DropdownMenuSeparator />
                              <div className="px-2 py-1.5 text-[10px] uppercase font-bold text-muted-foreground">On Update</div>
                              {onActions.map(action => (
                                <DropdownMenuItem key={`upd-${action}`} className="text-xs" onClick={() => updateField(id, field.id, { onUpdate: action })}>{action}</DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <button
                      className="h-5 w-5 flex items-center justify-center rounded text-muted-foreground hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                      onClick={() => deleteField(id, field.id)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* Sub-row for Length and active constraints */}
                {(field.type === "VarChar" || field.constraints.length > 0 || field.onDelete) && (
                  <div className="flex items-center gap-2 px-8 pb-2">
                    {field.type === "VarChar" && (
                      <div className="flex items-center gap-1 mr-2">
                        <span className="text-[8px] text-muted-foreground uppercase font-mono">Len:</span>
                        <input 
                           type="number"
                           className="w-12 h-4 bg-muted text-[9px] text-foreground border border-border rounded px-1 outline-none font-mono focus:border-foreground/30 transition-colors"
                           value={field.length || 255}
                           onChange={(e) => updateField(id, field.id, { length: parseInt(e.target.value) || undefined })}
                        />
                      </div>
                    )}
                    <div className="flex gap-0.5 overflow-hidden">
                      {constraintConfig.map(({ key, label, full, className }) => {
                        const active = field.constraints.includes(key)
                        if (!active) return null
                        return (
                          <Tooltip key={key}>
                            <TooltipTrigger asChild>
                              <div className={`${className} text-[8px] font-mono px-1 rounded`}>{label}</div>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="text-[10px] py-1 px-2">{full}</TooltipContent>
                          </Tooltip>
                        )
                      })}
                      {field.onDelete && (
                        <div className="bg-orange-500/20 text-orange-500 text-[8px] font-mono px-1 rounded uppercase">ON {field.onDelete}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div
          className="flex items-center gap-2 px-4 py-2.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer border-t border-border rounded-b-xl"
          onClick={() => addField(id)}
        >
          <Plus className="h-3 w-3" />
          <span className="text-xs">Add Field</span>
        </div>
      </div>
    </TooltipProvider>
  )
}

export const TableNode = memo(TableNodeComponent)
