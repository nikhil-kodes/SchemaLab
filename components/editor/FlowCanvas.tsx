"use client"

import { useCallback, useEffect, useRef } from "react"
import {
  ReactFlow,
  Background,
  MiniMap,
  applyNodeChanges,
  applyEdgeChanges,
  useReactFlow,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type Node,
  type Edge,
  ReactFlowProvider,
} from "@xyflow/react"
import { TableNode } from "./TableNode"
import { RelationshipEdge } from "./RelationshipEdge"
import { FloatingDock } from "./FloatingDock"
import { useSchemaStore } from "@/store/schemaStore"
import type { RelationshipType, RelationshipEdge as RelationshipEdgeType } from "@/types/schema"

const nodeTypes = { tableNode: TableNode }
const edgeTypes = { relationship: RelationshipEdge }

function FlowCanvasInner() {
  const { fitView, zoomIn, zoomOut } = useReactFlow()
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    addEdge,
    activeTool,
    setIsDragging,
    isDragging,
  } = useSchemaStore()

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const updated = applyNodeChanges(changes, nodes as Node[]) as typeof nodes
      setNodes(updated)
    },
    [nodes, setNodes]
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      const updated = applyEdgeChanges(changes, edges as Edge[]) as typeof edges
      setEdges(updated)
    },
    [edges, setEdges]
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.sourceHandle || !connection.targetHandle) return

      const type: RelationshipType = "ONE_TO_MANY"
      const newEdge: RelationshipEdgeType = {
        id: `edge-${Date.now()}`,
        source: connection.source!,
        target: connection.target!,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
        data: {
          relationshipType: type,
          sourceField: connection.sourceHandle,
          targetField: connection.targetHandle,
        },
      }
      addEdge(newEdge)
    },
    [addEdge]
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement
      if (isInput) return

      const store = useSchemaStore.getState()
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const modifier = isMac ? e.metaKey : e.ctrlKey

      // Tool shortcuts
      if (e.key.toLowerCase() === "t" && !modifier) store.addTable()
      if (e.key.toLowerCase() === "v" && !modifier) store.setActiveTool("select")
      if (e.key.toLowerCase() === "h" && !modifier) store.setActiveTool("hand")
      if (e.key.toLowerCase() === "c" && !modifier) store.setActiveTool("comment")

      // Undo/Redo
      if (modifier && e.key.toLowerCase() === "z") {
        e.preventDefault()
        if (e.shiftKey) useSchemaStore.temporal.getState().redo()
        else useSchemaStore.temporal.getState().undo()
      }
      if (modifier && e.key.toLowerCase() === "y") {
        e.preventDefault()
        useSchemaStore.temporal.getState().redo()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="relative flex-1 h-full">
      <ReactFlow
        nodes={nodes as Node[]}
        edges={edges as Edge[]}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        snapToGrid
        snapGrid={[16, 16]}
        minZoom={0.1}
        maxZoom={2}
        panOnDrag={activeTool !== "comment"}
        className="bg-background select-none"
        onNodeDragStart={() => setIsDragging(true)}
        onNodeDragStop={() => setIsDragging(false)}
        defaultEdgeOptions={{
          type: "relationship",
        }}
        // Connection line style
        connectionLineStyle={{ 
          stroke: "var(--foreground)", 
          strokeWidth: 2,
          strokeDasharray: "4 4"
        }}
      >
        <Background variant={"dots" as never} gap={24} size={1.5} color="var(--canvas-dot)" />
        {isDragging && (
          <MiniMap
            nodeColor="var(--node-border)"
            maskColor="rgba(0,0,0,0.4)"
            className="!bg-card !border !border-border !rounded-lg animate-in fade-in"
          />
        )}
      </ReactFlow>

      {/* Constraints Legend */}
      <div className="absolute top-6 right-6 z-50 p-3 bg-card/80 backdrop-blur-md border border-border rounded-xl shadow-xl max-w-[160px]">
        <h4 className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Constraints Guide</h4>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="badge-pk px-1 rounded">PK</span>
            <span className="text-muted-foreground">Primary Key</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="badge-fk px-1 rounded">FK</span>
            <span className="text-muted-foreground">Foreign Key</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="badge-ai px-1 rounded">AI</span>
            <span className="text-muted-foreground">Auto Inc.</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="badge-uq px-1 rounded">UQ</span>
            <span className="text-muted-foreground">Unique</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="badge-nn px-1 rounded">NN</span>
            <span className="text-muted-foreground">Not Null</span>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Drag a table onto the canvas to get started.
            </p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              Press <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground text-xs font-mono mx-1 border border-border">T</kbd> to add a table, or click &quot;Add Table&quot; below.
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <FloatingDock
          onZoomIn={() => zoomIn()}
          onZoomOut={() => zoomOut()}
          onFitView={() => fitView()}
        />
      </div>
    </div>
  )
}

export function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner />
    </ReactFlowProvider>
  )
}
