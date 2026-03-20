"use client"

import { memo } from "react"
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from "@xyflow/react"

function RelationshipEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style,
  markerEnd,
}: EdgeProps & { data?: { relationshipType?: string; sourceField?: string; targetField?: string } }) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  })

  const label = data?.relationshipType
    ? data.relationshipType.replace(/_/g, " ")
    : ""

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: "#3a3a3a",
          strokeWidth: 2,
          ...style,
        }}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: "all",
            }}
            className="rounded-lg border border-white/10 bg-zinc-900 px-2 py-0.5 text-[10px] font-mono text-zinc-400 shadow-lg"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}

export const RelationshipEdge = memo(RelationshipEdgeComponent)
