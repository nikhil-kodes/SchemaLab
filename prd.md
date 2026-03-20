# SchemaLab — Product Requirements Document (PRD) v2

## 1. Product Overview

**Product Name:** SchemaLab  
**Tagline:** Design your database visually. Generate production-ready code instantly.  
**Target Users:** Full-stack developers, backend engineers, indie hackers, students learning databases  
**Framework:** Next.js 14 (App Router) — full-stack, single repository  
**Database & Auth:** Supabase (PostgreSQL + Auth + Realtime) — free tier  
**Deployment:** Vercel — hobby/free tier  
**Current Pricing:** Completely free. No paywalls. Pricing tiers reserved for a future version.  
**SEO:** Full technical SEO — sitemap, robots.txt, structured data, meta tags, OpenGraph

---

## 2. Problem Statement

Developers writing database schemas from scratch face three core pain points:

1. **Syntax overhead** — Recalling exact syntax for `FOREIGN KEY`, `@relation`, `Schema()` across ORMs wastes time and causes errors.
2. **Mental mapping** — Visualising how tables relate in plain text is cognitively expensive for schemas with 5+ tables.
3. **Collaboration gap** — No free tool lets multiple developers design a database schema together in real time with shared cursors and comments.

SchemaLab eliminates all three — draw visually, generate instantly, collaborate in real time.

---

## 3. Infrastructure Constraints (Free Tier)

### Vercel Hobby Tier
- Maximum **12 serverless API routes** (we use 7 — well within limit)
- 100GB bandwidth/month
- Serverless function timeout: 10 seconds
- No always-on server — all backend logic is serverless API routes

### Supabase Free Tier
- 500MB database storage
- 2GB bandwidth
- **200 concurrent Realtime connections** — this caps simultaneous collaboration sessions
- 50,000 monthly active users
- Auth: unlimited users, Google OAuth included
- Row Level Security: fully supported

**Design decisions driven by these constraints:**
- Real-time collaboration capped to sessions of max 10 users per room (well within the 200 connection ceiling)
- Canvas state stored as JSONB (compact, no file storage needed)
- No video/audio features — text comments and cursors only
- Code generation is pure frontend computation — zero serverless function load

---

## 4. Complete User Journey

### 4.1 Landing Page → Auth
```
/ (Landing Page)
  ↓  Click any CTA ("Start Building Free")
/auth  →  Google OAuth OR Email/Password
  ↓  Successful auth
/dashboard  (first-time: empty state)
```

### 4.2 Dashboard → Editor
```
/dashboard
  ↓  Click "New Project" tile
  Modal: enter project name
  ↓  Project created in Supabase
/editor/[projectId]  (new empty canvas)

  OR

/dashboard
  ↓  Click existing project tile
/editor/[projectId]  (canvas loads from saved JSONB)
```

### 4.3 Collaboration Flow
```
Project Owner in /editor/[projectId]:
  ↓  Clicks "Share" in top bar
  Modal shows: Room ID (auto-generated UUID fragment) + Copy Link button

Collaborator in /dashboard:
  ↓  Clicks "Join Project" button
  Modal: Enter Room ID
  ↓  Joins the shared canvas session
  Both users see each other's cursors, edits, and comments in real time
```

### 4.4 Export Flow
```
User finishes designing schema on canvas
  ↓  Right panel: select language (SQL / PostgreSQL / Prisma / Drizzle / Mongoose)
  ↓  Click "Generate"  →  code appears instantly (pure frontend computation)
  ↓  Click "Copy" OR "Download"
  Download filename = [projectName].[ext]  e.g. "ecommerce-db.prisma"
```

---

## 5. Pages and Features

### 5.1 Landing Page (`/`)

A single-page marketing site. Minimal, dark, developer-aesthetic. Black/white/gray palette.

**Section 1 — Floating Navbar**
- Floats above the page content, centered, pill-shaped with blur backdrop
- Contains: SchemaLab logo (left), nav links (Features, How It Works, GitHub), CTA button "Start Building Free" (right)
- On mobile: hamburger menu (Sheet component from shadcn)
- Sticky on scroll — stays at top with reduced opacity background

**Section 2 — Hero**
- Full-screen section with a CSS grid/tile background (gray lines crossing, like graph paper)
- Badge pill at top: "Free forever — no credit card required"
- Headline (large, bold): "Stop Writing Schema Code. Draw It."
- Subheadline: "Design your database visually on an infinite canvas. Connect tables, define fields, and generate production-ready SQL, Prisma, Drizzle or Mongoose code — instantly."
- Two CTAs: "Start Building Free →" (primary, black bg) + "See How It Works" (ghost/outline)
- Below CTAs: trust strip — "Works with: [SQL] [PostgreSQL] [Prisma] [Drizzle] [Mongoose]" as small pill badges
- Hero image/GIF: a screenshot or animated GIF of the SchemaLab whiteboard canvas showing connected table nodes, with a right panel showing generated Prisma code. Framed in a slightly rounded bordered container with a subtle gradient fade at the bottom.

**Section 3 — How It Works (3-Step)**
```
[1. Draw]           [2. Connect]          [3. Generate]
Add tables to       Drag lines between    Select your language
the canvas and      tables to define      and copy production
define fields       relationships         code instantly
```

**Section 4 — Features (Bento Grid)**
Inspired by the `features-8` component — a CSS grid of cards with varying sizes:
- Large card: "Visual Canvas" — shows a mini mockup of the node-based canvas
- Medium card: "5 Languages" — shows the language badges (SQL, Prisma, Drizzle, Mongoose, PostgreSQL)
- Medium card: "Real-Time Collaboration" — shows two cursor icons on a canvas, "Work together, live"
- Large card: "Instant Code Generation" — shows a code snippet animating into view
- Medium card: "Save & Revisit" — shows project tiles from the dashboard
- Medium card: "Download Any Format" — shows download icon with file extensions

**Section 5 — Feature Deep Dive**
Two alternating rows (text left / visual right, then text right / visual left):
- Row 1: "An infinite canvas that thinks like a database" — explains node structure, handles, dot grid
- Row 2: "Code generation with zero compromise" — explains the pure-function generators, all 5 languages
- Row 3: "Collaborate in real time, for free" — explains room IDs, shared cursors, live comments

**Section 6 — Testimonials (Stagger Carousel)**
Uses the `StaggerTestimonials` component pattern. Testimonials rewritten for SchemaLab:
1. "I designed our entire microservices DB schema in 20 minutes. Would've taken me a day in SQL." — Aryan K., Backend Engineer
2. "Finally a tool that speaks both Prisma and SQL. The code it generates is cleaner than what I write manually." — Sofia M., Full-Stack Dev
3. "The real-time collab feature is insane for a free tool. My team used it to design our startup's DB live on a call." — Ravi T., CTO at EarlyStage
4. "I'm a CS student and this helped me understand foreign keys better than any textbook." — Priya N., CS Student
5. "Switched from dbdiagram.io the day I found this. Never looked back." — James L., Senior Engineer
6. "Pulled up SchemaLab during a system design interview to sketch my DB. Interviewer was impressed." — Daniel W., SWE
7. "The Drizzle export is perfect. Saves me 30 minutes every new project." — Emma R., Next.js Dev
8. "I use it every single sprint planning session to model new features with my team." — Marcus P., Tech Lead
9. "The dot-grid canvas feels exactly like a professional design tool. Incredible UX." — Yuki S., Designer turned Dev
10. "It's the Figma of database design. Simple statement, completely true." — Niamh C., Platform Engineer

**Section 7 — Pricing**
Single pricing card inspired by `single-pricing-card-1`:
- Title: "Completely Free"
- Large price display: "$0 / forever"
- Subtext: "No credit card. No hidden fees. Use it as much as you want."
- Feature list: Unlimited projects, All 5 language exports, Real-time collaboration, Save & revisit schemas, Download files in any format, Up to 10 collaborators per session
- CTA Button: "Start Building — It's Free"
- Below card: "Pricing may be introduced in the future as SchemaLab grows. Early users will always get a generous free tier."
- Grid/tile background behind the card (same as hero section)

**Section 8 — Final CTA**
- Dark section, centered
- Headline: "Your database schema is 3 minutes away."
- Subheadline: "No setup. No credit card. Just open the canvas and start building."
- Large CTA button: "Open SchemaLab →"

**Section 9 — Footer**
Inspired by `footer-section` component:
- Columns: About SchemaLab, Quick Links (Features / How It Works / GitHub / Auth), Languages (SQL / Prisma / Drizzle / Mongoose / PostgreSQL), Connect (GitHub link, Twitter/X)
- Newsletter signup row (email input — collect early adopters)
- Bottom bar: "© 2025 SchemaLab. All rights reserved." + Privacy Policy + Terms
- Very bottom center: "Built with ❤️ by Nikhil Singh"

---

### 5.2 Auth Page (`/auth`)

Minimal shadcn-style centered card. Black/white/gray only.

- No navbar, no sidebar. Just the card centered on a dark background.
- SchemaLab logo + wordmark at top of card
- Heading: "Welcome to SchemaLab" / "Create your account"
- Google OAuth button (primary — most users will use this)
- Divider: "or continue with email"
- Email + Password fields
- Toggle: "Sign in" / "Create account" (single page, toggle between modes)
- On success: redirect to `/dashboard`
- Subtle animated grid background (same as hero)

---

### 5.3 Dashboard (`/dashboard`)

**Exact layout reference: the Supabase projects dashboard shown in the screenshot.**

**Left Icon Sidebar (narrow, ~48px wide)**
- SchemaLab icon at top (logo mark only, no wordmark)
- Nav icons (vertically stacked): Projects (home), Settings, Help
- User avatar at the very bottom

**Main Content Area**
- Top header row: "Projects" heading (left) + search bar (center) + Status filter + Sort + View toggle (grid/list) + "New Project" green/black button (right)
- Project grid (cards):
  - Each card shows: project name, last edited date, collaborator count, a status badge (ACTIVE / SAVED)
  - Three-dot context menu on each card: Open, Rename, Duplicate, Share (copy room ID), Delete
  - First card in grid OR a dedicated button: "+ New Project"
  - Also: "Join Project" button — opens modal for entering a room ID

**Empty state:**
```
[Database icon illustration]
No projects yet
Create your first schema to get started
[ + New Project ]
```

---

### 5.4 Editor / Whiteboard (`/editor/[projectId]`)

Inspired by Excalidraw and Eraser.io. Dark canvas, minimal chrome.

**Top Bar (40px)**
```
[← Back]  [Project Name ✏️]        [Collaborator avatars]  [Share]  [●Saved]
```
- Project name inline editable (click to rename)
- Collaborator avatars: stacked circles showing who is currently in the session (live presence)
- Share button: opens modal with Room ID + "Copy Link" + "Copy Room ID" options
- Save status dot: green (saved), amber (saving…), red (error)

**Canvas (full remaining screen)**
- Background: dark (`#0d0d0d`) with dot grid (React Flow `<Background variant="dots">`)
- Infinite canvas with smooth pan and zoom
- Min zoom: 10%, Max zoom: 200%
- React Flow renders all nodes and edges
- Live collaboration: other users' cursors are visible as colored floating cursors with their name label

**Floating Dock (bottom center, above canvas)**
```
┌────────────────────────────────────────────────────────┐
│  [⊞ Add Table]  │  [↖ Select]  [✋ Pan]  │  [+ Zoom] [- Zoom] [⊡ Fit]  │  [↺ Undo] [↻ Redo]  │  [💬 Comment]  │
└────────────────────────────────────────────────────────┘
```
- Fixed at `bottom: 24px`, `left: 50%`, `translateX(-50%)`
- Glass morphism: dark background + backdrop blur
- Tooltips on all buttons (keyboard shortcut shown)

**Table Node Design (Custom React Flow Node):**
```
○ ─────────────────────────────────── ○   ← connection handles
│  ▣  users                     [⋮] [×]  │   ← header: name + menu + delete
├─────────────────────────────────────────┤
│  ◆  id          Int      [PK] [AI]      │   ← PK field (gold)
│     email       String   [UQ] [NN]      │
│     username    String   [NN]           │
│     createdAt   DateTime                │
├─────────────────────────────────────────┤
│  + Add Field                            │   ← footer
○ ─────────────────────────────────── ○
```
- All text inline editable (click to focus)
- Type is a dropdown: Int, String, Boolean, DateTime, Float, UUID, Text, JSON
- Constraint toggles: PK (gold), FK (blue), UQ (purple), NN (gray), AI (green)
- Node context menu (three-dot): Edit name, Duplicate table, Add field, Delete table
- Selected state: accent border + glow

**Relationship Edges:**
- Bezier curves connecting table handles
- On connection: modal asks for relationship type (ONE_TO_ONE, ONE_TO_MANY, MANY_TO_MANY)
- Label displayed on midpoint of edge
- Custom arrowheads

**Right Panel — Code Generator (360px, collapsible)**
```
┌──────────────────────────────────────────────────┐
│  [SQL] [PostgreSQL] [Prisma] [Drizzle] [Mongoose] │
├──────────────────────────────────────────────────┤
│  (syntax-highlighted generated code)             │
├──────────────────────────────────────────────────┤
│  [Generate]      [⎘ Copy]    [↓ Download]        │
└──────────────────────────────────────────────────┘
```
- Language tabs persist in user's localStorage
- Generate button sends nodes+edges to `/api/generate` backend route
- Download filename: `[projectName].[ext]` where ext is `.sql`, `.prisma`, `.ts`, `.js`

**Comment System:**
- "Comment" tool in floating dock: click to activate, then click anywhere on canvas to drop a comment pin
- Comment pins are yellow sticky-note icons
- Clicking a pin opens a small popover with a text input and the comment thread
- Comments are stored in Supabase and broadcast in real time to all collaborators
- Each comment shows: avatar, name, timestamp, text
- Comments can be resolved (hidden) by clicking "Resolve"

---

### 5.5 Settings Page (`/settings`)

- Display name, Avatar
- Email (read-only if Google OAuth)
- Change password (only for email/password users)
- Danger zone: Delete account (with confirmation modal, cascades delete all projects)

---

## 6. Real-Time Collaboration — Technical Spec

### How It Works

SchemaLab uses **Supabase Realtime** with two features:
- **Broadcast** — for canvas state changes (node moves, field edits, edge connections)
- **Presence** — for cursor positions and active user tracking

### Room ID System
- Each project has a `room_id` (UUID, stored in `projects` table)
- Room ID is auto-generated on project creation
- Owner can share the room ID or a deep link: `schemalab.io/join/[roomId]`
- Any authenticated user who enters the room ID joins as a collaborator with EDIT access
- The project owner can revoke collaboration by regenerating the room ID

### Broadcast Events
```typescript
type CanvasEvent =
  | { type: "NODE_MOVED";    payload: { id: string; position: {x,y} } }
  | { type: "NODE_ADDED";    payload: { node: TableNode } }
  | { type: "NODE_DELETED";  payload: { id: string } }
  | { type: "NODE_UPDATED";  payload: { id: string; data: Partial<TableNodeData> } }
  | { type: "EDGE_ADDED";    payload: { edge: RelationshipEdge } }
  | { type: "EDGE_DELETED";  payload: { id: string } }
  | { type: "COMMENT_ADDED"; payload: { comment: Comment } }
```

### Presence Events
```typescript
type PresenceState = {
  userId: string
  displayName: string
  avatarUrl: string
  cursor: { x: number; y: number } | null   // Canvas coordinates
  color: string                              // Assigned unique color per user
}
```

### Free Tier Safety
- **200 concurrent connections** max on Supabase free tier
- We cap each collaboration room at **10 users max** — this means we can support up to 20 simultaneous rooms with no risk of hitting the ceiling
- If room is full, joining user sees a "Room is full" message

---

## 7. Data Models (Supabase)

### `projects` table
```sql
CREATE TABLE projects (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name         VARCHAR(255) NOT NULL DEFAULT 'Untitled Project',
  canvas_data  JSONB,
  room_id      UUID DEFAULT gen_random_uuid(),  -- for collaboration
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_room_id ON projects(room_id);

-- RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Owner full access
CREATE POLICY "owner_all" ON projects FOR ALL
  USING (auth.uid() = user_id);

-- Collaborator read/write via room_id (any authenticated user with the room_id can access)
CREATE POLICY "collaborator_access" ON projects FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "collaborator_update" ON projects FOR UPDATE
  USING (auth.role() = 'authenticated');
```

### `comments` table
```sql
CREATE TABLE comments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  canvas_x     FLOAT NOT NULL,
  canvas_y     FLOAT NOT NULL,
  content      TEXT NOT NULL,
  resolved     BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "authenticated_access" ON comments FOR ALL
  USING (auth.role() = 'authenticated');
```

---

## 8. API Routes (7 total — within Vercel's 12 limit)

| Route | Method(s) | Description |
|---|---|---|
| `/api/generate` | POST | Accepts nodes + edges + language. Returns generated code string. Auth required. |
| `/api/projects` | GET, POST | List user's projects / Create new project |
| `/api/projects/[id]` | GET, PATCH, DELETE | Get / update / delete a single project |
| `/api/projects/[id]/comments` | GET, POST | List / create comments for a project |
| `/api/join/[roomId]` | GET | Look up a project by room_id — returns project id for the collaborator to join |
| `/api/auth/callback` | GET | Supabase OAuth callback handler |

**Total: 6 route files, 7 HTTP methods — well within Vercel's 12 limit.**

---

## 9. SEO Strategy

### On-Page SEO
Every page uses Next.js 14's `generateMetadata()` with:
- `title`: "SchemaLab — Visual Database Schema Designer"
- `description`: "Design your database visually. Generate SQL, Prisma, Drizzle, and Mongoose code instantly. Free, collaborative, and open source."
- `keywords`: "database schema designer, visual database tool, SQL generator, Prisma schema generator, Drizzle ORM generator, Mongoose schema generator, database diagram tool, ER diagram tool, free database design tool, schema builder"
- `openGraph`: full og:title, og:description, og:image (screenshot of the canvas), og:url
- `twitter`: Twitter card with large image

### Sitemap (`/sitemap.xml`)
Generated automatically via `next-sitemap` package:
```
https://schemalab.io/
https://schemalab.io/auth
https://schemalab.io/features
https://schemalab.io/pricing
```

### `robots.txt`
```
User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /editor
Disallow: /api
Disallow: /settings

Sitemap: https://schemalab.io/sitemap.xml
```

### Structured Data (JSON-LD)
On the landing page, include `SoftwareApplication` schema:
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SchemaLab",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Visual database schema designer...",
  "url": "https://schemalab.io"
}
```

### Target Keywords
**Primary:** "database schema designer online", "visual database design tool", "SQL schema generator"  
**Secondary:** "Prisma schema generator", "Drizzle ORM schema tool", "ER diagram free", "database diagram tool free"  
**Long-tail:** "how to design database schema visually", "free alternative to dbdiagram.io", "drag drop database design"

---

## 10. Download File Formats

| Language | File Extension | MIME Type |
|---|---|---|
| SQL | `.sql` | `text/plain` |
| PostgreSQL | `.sql` | `text/plain` |
| Prisma | `.prisma` | `text/plain` |
| Drizzle | `.ts` | `text/typescript` |
| Mongoose | `.js` | `text/javascript` |

Download is triggered client-side via `URL.createObjectURL(new Blob([code]))` — zero backend involvement.

---

## 11. Project Sharing Features

| Feature | How |
|---|---|
| Share Room ID | Copy room ID to clipboard from Share modal |
| Share Link | Copy `schemalab.io/join/[roomId]` deep link |
| Join via Dashboard | "Join Project" button → enter Room ID → redirects to `/editor/[projectId]` |
| Join via Link | Visiting `/join/[roomId]` auto-redirects to the editor after auth check |
| Revoke Access | Owner can "Regenerate Room ID" — old ID stops working |

---

## 12. Out of Scope for V1

- Video/audio in collaboration sessions
- Schema versioning / history / git-style diffs
- Import existing SQL files to generate diagrams
- Pricing tiers / paywalled features
- Dark/light mode toggle (dark only for V1)
- Mobile editor (marketing pages are responsive; editor is desktop-only with a "Please open on desktop" message on mobile)

---

## 13. Success Metrics

- User can go from signup → generated Prisma schema in under 3 minutes
- Real-time cursor updates propagate in under 200ms
- Canvas handles 30+ table nodes at 60fps
- Generated code is valid and pasteable directly into a project without modification
- Zero data loss on refresh (auto-save works correctly)
- Google Lighthouse score: 90+ on Performance, 100 on SEO, 100 on Accessibility
