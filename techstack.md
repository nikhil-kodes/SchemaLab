# SchemaLab — Tech Stack v2

## Stack at a Glance

| Layer | Technology | Version | Why |
|---|---|---|---|
| Framework | Next.js | 14 (App Router) | Full-stack in one repo, API routes, SSR, Vercel-native |
| Language | TypeScript | 5.x | Type safety across canvas, generators, and API |
| Canvas | @xyflow/react (React Flow) | Latest | Purpose-built for node-edge diagrams |
| State | Zustand | 4.x | Lightweight, no boilerplate, syncs with React Flow |
| Database + Auth + Realtime | Supabase | Free tier | PostgreSQL + Auth + Realtime in one platform |
| Styling | Tailwind CSS | 3.x | Utility-first, fast iteration |
| UI Components | shadcn/ui | Latest | Copy-paste, fully customisable, accessible |
| Animation | Framer Motion | Latest | Page transitions, hero animations, floating dock |
| Code Highlighting | react-syntax-highlighter | Latest | Syntax-colored code output panel |
| SEO | next-sitemap | Latest | Auto-generates sitemap.xml + robots.txt |
| Deployment | Vercel | Hobby (free) | Zero-config Next.js, 12 API routes, 100GB bandwidth |

---

## Detailed Breakdown

### 1. Next.js 14 App Router

**File structure:**
```
app/
├── (marketing)/
│   ├── layout.tsx                  # Marketing layout (no sidebar)
│   └── page.tsx                    # Landing page — all sections
├── auth/
│   └── page.tsx                    # Login / Signup
├── dashboard/
│   └── page.tsx                    # Project dashboard
├── editor/
│   └── [projectId]/
│       └── page.tsx                # Whiteboard editor
├── join/
│   └── [roomId]/
│       └── page.tsx                # Collaboration join redirect
├── settings/
│   └── page.tsx                    # User settings
├── layout.tsx                      # Root layout (fonts, providers)
└── api/
    ├── generate/
    │   └── route.ts                # POST — code generation (all 5 languages)
    ├── projects/
    │   ├── route.ts                # GET (list), POST (create)
    │   └── [id]/
    │       ├── route.ts            # GET, PATCH, DELETE
    │       └── comments/
    │           └── route.ts        # GET, POST comments
    ├── join/
    │   └── [roomId]/
    │       └── route.ts            # GET — look up project by room_id
    └── auth/
        └── callback/
            └── route.ts            # Supabase OAuth callback
```

**Middleware (`middleware.ts`):**
```typescript
// Protects /dashboard, /editor, /settings, /join routes
// Reads Supabase session from cookies
// Redirects unauthenticated users to /auth
```

**Server vs Client components:**
- `app/dashboard/page.tsx` — Server Component (initial project list fetch)
- `app/editor/[projectId]/page.tsx` — Server Component (initial canvas data fetch), hands off to Client Component
- All interactive UI (canvas, forms, modals) — Client Components (`"use client"`)

---

### 2. TypeScript — Key Type Definitions

```typescript
// types/schema.ts
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

// types/project.ts
export type Project = {
  id: string
  user_id: string
  name: string
  canvas_data: { nodes: TableNode[]; edges: RelationshipEdge[] } | null
  room_id: string
  created_at: string
  updated_at: string
}

// types/collaboration.ts
export type PresenceUser = {
  userId: string
  displayName: string
  avatarUrl: string | null
  cursor: { x: number; y: number } | null
  color: string
}

export type CanvasEventType = 
  | "NODE_MOVED" | "NODE_ADDED" | "NODE_DELETED" | "NODE_UPDATED"
  | "EDGE_ADDED" | "EDGE_DELETED" | "COMMENT_ADDED"

export type CanvasEvent = {
  type: CanvasEventType
  payload: unknown
  senderId: string
}

// types/comment.ts
export type Comment = {
  id: string
  project_id: string
  user_id: string
  canvas_x: number
  canvas_y: number
  content: string
  resolved: boolean
  created_at: string
  user?: { display_name: string; avatar_url: string }
}
```

---

### 3. React Flow (@xyflow/react)

**Custom components built on top of React Flow:**

```typescript
// components/editor/TableNode.tsx — Custom Node
// components/editor/RelationshipEdge.tsx — Custom Edge  
// components/editor/FlowCanvas.tsx — Main canvas wrapper
// components/editor/FloatingDock.tsx — Bottom toolbar
// components/editor/CollaboratorCursor.tsx — Live cursors overlay
// components/editor/CommentPin.tsx — Canvas comment pin
```

**React Flow configuration:**
```typescript
<ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={{ tableNode: TableNode }}
  edgeTypes={{ relationship: RelationshipEdge }}
  onConnect={handleConnect}
  onNodesChange={handleNodesChange}
  onEdgesChange={handleEdgesChange}
  onMouseMove={broadcastCursorPosition}  // collaboration
  fitView
  snapToGrid
  snapGrid={[16, 16]}
  minZoom={0.1}
  maxZoom={2}
>
  <Background variant="dots" gap={24} size={1.5} color="#2a2a2a" />
  <MiniMap nodeColor="#333" maskColor="#111" />
  <Controls showInteractive={false} />  {/* hidden — using custom FloatingDock instead */}
</ReactFlow>
```

**Installation:**
```bash
npm install @xyflow/react
```

---

### 4. Zustand — Store Architecture

```typescript
// store/schemaStore.ts
import { create } from "zustand"
import { temporal } from "zundo"   // undo/redo middleware

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
  addField: (tableId: string) => void
  updateField: (tableId: string, fieldId: string, updates: Partial<Field>) => void
  deleteField: (tableId: string, fieldId: string) => void
  
  // Code generation
  setSelectedLanguage: (lang: Language) => void
  setGeneratedCode: (code: string) => void
  
  // Collaboration
  setCollaborators: (users: PresenceUser[]) => void
  updateCollaboratorCursor: (userId: string, cursor: { x: number; y: number }) => void
}

export const useSchemaStore = create<SchemaStore>()(
  temporal(   // wraps store for undo/redo
    (set, get) => ({
      // ... implementation
    })
  )
)
```

**Undo/Redo with `zundo`:**
```bash
npm install zundo
```
```typescript
import { useTemporalStore } from "zundo"
const { undo, redo, pastStates, futureStates } = useTemporalStore(useSchemaStore)
```

---

### 5. Supabase — Full Configuration

#### 5.1 Auth Setup
```typescript
// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr"
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// lib/supabase/server.ts  
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
export const createClient = () => createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { cookies: { get: (name) => cookies().get(name)?.value } }
)
```

#### 5.2 Realtime — Collaboration Hook
```typescript
// hooks/useCollaboration.ts
export function useCollaboration(projectId: string, userId: string) {
  const channel = supabase.channel(`project:${projectId}`, {
    config: { presence: { key: userId } }
  })

  // Broadcast canvas events to all collaborators
  const broadcastEvent = (event: CanvasEvent) => {
    channel.send({ type: "broadcast", event: "canvas_change", payload: event })
  }

  // Track cursor position
  const updateCursor = (x: number, y: number) => {
    channel.track({ cursor: { x, y }, userId, displayName, color })
  }

  // Listen for incoming events
  channel
    .on("broadcast", { event: "canvas_change" }, ({ payload }) => {
      applyRemoteEvent(payload as CanvasEvent)
    })
    .on("presence", { event: "sync" }, () => {
      const state = channel.presenceState()
      setCollaborators(Object.values(state).flat())
    })
    .subscribe()

  return { broadcastEvent, updateCursor }
}
```

#### 5.3 Free Tier Monitoring
- Realtime connections capped at 10 per room in application logic
- Auto-disconnect on browser tab close (`beforeunload` event)
- Presence heartbeat every 30s to clean up stale cursors

---

### 6. API Route Architecture

All 5 code generators are ONE route. This is the most important backend architecture decision.

```typescript
// app/api/generate/route.ts
import { generateSQL }      from "@/lib/generators/sql"
import { generatePostgres } from "@/lib/generators/postgres"
import { generatePrisma }   from "@/lib/generators/prisma"
import { generateDrizzle }  from "@/lib/generators/drizzle"
import { generateMongoose } from "@/lib/generators/mongoose"

const generators: Record<Language, Generator> = {
  sql:      generateSQL,
  postgres: generatePostgres,
  prisma:   generatePrisma,
  drizzle:  generateDrizzle,
  mongoose: generateMongoose,
}

export async function POST(req: Request) {
  // 1. Verify Supabase session (no unauthenticated generation)
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 })

  // 2. Parse and validate request
  const { nodes, edges, language } = await req.json()
  if (!generators[language]) return Response.json({ error: "Unknown language" }, { status: 400 })

  // 3. Run generator
  const code = generators[language](nodes, edges)
  return Response.json({ code })
}
```

**Generator file locations:**
```
lib/generators/
├── sql.ts       # generateSQL(nodes, edges): string
├── postgres.ts  # generatePostgres(nodes, edges): string
├── prisma.ts    # generatePrisma(nodes, edges): string
├── drizzle.ts   # generateDrizzle(nodes, edges): string
└── mongoose.ts  # generateMongoose(nodes, edges): string
```

Each generator is a pure TypeScript function. Same input always gives same output. Fully unit-testable.

---

### 7. SEO — next-sitemap

```bash
npm install --save-dev next-sitemap
```

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: "https://schemalab.io",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/dashboard", "/editor", "/api", "/settings"] }
    ],
    additionalSitemaps: ["https://schemalab.io/sitemap.xml"]
  },
  exclude: ["/dashboard", "/editor/*", "/settings", "/api/*", "/join/*"]
}
```

```json
// package.json — add to postbuild
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

**Structured Data component:**
```typescript
// components/seo/JsonLd.tsx
export function SchemaLabJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "SchemaLab",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web Browser",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "description": "Visual database schema designer. Generate SQL, Prisma, Drizzle and Mongoose schemas by drag-and-drop.",
          "url": "https://schemalab.io",
          "screenshot": "https://schemalab.io/og-image.png",
          "featureList": [
            "Visual drag-and-drop canvas",
            "SQL code generation",
            "Prisma schema generation",
            "Drizzle ORM generation",
            "Mongoose schema generation",
            "Real-time collaboration"
          ]
        })
      }}
    />
  )
}
```

**generateMetadata in root layout:**
```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://schemalab.io"),
  title: {
    default: "SchemaLab — Visual Database Schema Designer",
    template: "%s | SchemaLab"
  },
  description: "Design your database visually. Generate SQL, Prisma, Drizzle, and Mongoose code instantly. Free, collaborative, open source.",
  keywords: [
    "database schema designer", "visual database tool", "SQL generator",
    "Prisma schema generator", "Drizzle ORM generator", "Mongoose schema generator",
    "database diagram tool", "ER diagram online", "free database design tool",
    "schema builder", "database visualizer", "drag drop database design"
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://schemalab.io",
    siteName: "SchemaLab",
    title: "SchemaLab — Visual Database Schema Designer",
    description: "Design your database visually. Generate production code instantly.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "SchemaLab — Visual Database Schema Designer",
    description: "Design your database visually. Generate production code instantly.",
    images: ["/og-image.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" }
  }
}
```

---

### 8. Animation — Framer Motion

Used for:
- Hero section staggered entrance (text + buttons fade up)
- Landing page section scroll-triggered animations (`whileInView`)
- Floating dock button press micro-interaction (`whileTap: { scale: 0.92 }`)
- Node add animation (`initial: { scale: 0.8, opacity: 0 }`)
- Pricing card entrance
- Page transitions

```bash
npm install framer-motion
```

---

### 9. Complete Package List

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "@xyflow/react": "latest",
    "zustand": "^4.5.0",
    "zundo": "^2.2.0",
    "@supabase/supabase-js": "^2.43.0",
    "@supabase/ssr": "^0.3.0",
    "framer-motion": "^11.0.0",
    "react-syntax-highlighter": "^15.5.0",
    "lucide-react": "latest",
    "tailwind-merge": "^2.3.0",
    "clsx": "^2.1.0",
    "class-variance-authority": "^0.7.0",
    "@radix-ui/react-dialog": "latest",
    "@radix-ui/react-dropdown-menu": "latest",
    "@radix-ui/react-tabs": "latest",
    "@radix-ui/react-tooltip": "latest",
    "@radix-ui/react-select": "latest",
    "@radix-ui/react-switch": "latest",
    "@radix-ui/react-label": "latest",
    "@radix-ui/react-separator": "latest",
    "@radix-ui/react-slot": "latest",
    "@radix-ui/react-popover": "latest"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/react-syntax-highlighter": "^15.5.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "next-sitemap": "^4.2.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

---

### 10. Environment Variables

```env
# .env.local

# Supabase (public — safe for browser)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Supabase (private — only in API routes)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=https://schemalab.io

# SEO (used by next-sitemap)
NEXT_PUBLIC_SITE_URL=https://schemalab.io
```

---

### 11. Vercel Free Tier — Deployment Checklist

Before deploying, verify all of these are within free tier limits:

| Resource | Free Tier Limit | Our Usage | Status |
|---|---|---|---|
| API Routes | 12 max | 6 route files | ✅ |
| Serverless timeout | 10 seconds | All routes < 2s | ✅ |
| Bandwidth | 100GB/month | Estimated <5GB/month (no file storage) | ✅ |
| Build time | 45 min/deployment | Next.js build ~2-3 min | ✅ |

### 12. Supabase Free Tier — Deployment Checklist

| Resource | Free Tier Limit | Our Usage | Status |
|---|---|---|---|
| Database | 500MB | JSONB canvas data ~10-50KB per project | ✅ |
| Realtime connections | 200 concurrent | Max 10 per room, app-enforced | ✅ |
| Monthly active users | 50,000 | Target for V1 launch | ✅ |
| Bandwidth | 2GB/month | Text-based data only | ✅ |
| Auth users | Unlimited | N/A | ✅ |

---

### 13. Development Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "postbuild": "next-sitemap",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```
