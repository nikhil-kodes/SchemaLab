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
import type { RelationshipType } from "@/types/schema"

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
      const type: RelationshipType = "ONE_TO_MANY" // default, user can change later
      const newEdge = {
        id: `edge-${Date.now()}`,
        source: connection.source!,
        target: connection.target!,
        sourceHandle: connection.sourceHandle || "source",
        targetHandle: connection.targetHandle || "target",
        type: "relationship",
        data: {
          relationshipType: type,
          sourceField: "id",
          targetField: "id",
        },
      }
      addEdge(newEdge)
    },
    [addEdge]
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.key === "t" || e.key === "T") {
        useSchemaStore.getState().addTable()
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
        className="bg-zinc-950"
        defaultEdgeOptions={{
          type: "relationship",
        }}
      >
        <Background variant={"dots" as never} gap={24} size={1.5} color="#1f1f1f" />
        <MiniMap
          nodeColor="#333"
          maskColor="rgba(0,0,0,0.8)"
          className="!bg-zinc-900 !border !border-white/5 !rounded-lg"
        />
      </ReactFlow>

      {/* Empty state */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-sm text-zinc-500">
              Drag a table onto the canvas to get started.
            </p>
            <p className="text-sm text-zinc-600 mt-1">
              Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-xs font-mono mx-1">T</kbd> to add a table, or click &quot;Add Table&quot; below.
            </p>
          </div>
        </div>
      )}

      <FloatingDock
        onZoomIn={() => zoomIn()}
        onZoomOut={() => zoomOut()}
        onFitView={() => fitView()}
      />
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
