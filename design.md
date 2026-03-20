# SchemaLab — Design Document v2

## 1. Design Philosophy

**Three words: Minimal. Dark. Developer.**

SchemaLab looks like a tool built by a developer, for developers. No gradients, no stock illustrations, no color overload. Black, white, and gray with surgical use of a single accent. Every visual decision is justified by function.

The design language pulls inspiration from:
- **Linear** — product-focused, zero decoration
- **Vercel** — deep dark, crisp white typography
- **Excalidraw** — canvas-first, tools stay out of the way
- **shadcn/ui** — components that feel native and correct

---

## 2. Color System

```css
:root {
  /* Core backgrounds */
  --bg-base:        #000000;   /* True black — page background */
  --bg-surface:     #0a0a0a;   /* Panels, sidebar, cards */
  --bg-elevated:    #111111;   /* Hover states, dropdowns */
  --bg-input:       #141414;   /* Input fields */
  --bg-border:      #1a1a1a;   /* Subtle borders */

  /* Borders */
  --border-subtle:  #1f1f1f;   /* Dividers, card edges at rest */
  --border-default: #2a2a2a;   /* Active borders */
  --border-strong:  #3a3a3a;   /* Focused inputs, selected states */

  /* Text */
  --text-primary:   #ffffff;   /* Headings, primary labels */
  --text-secondary: #a1a1aa;   /* Supporting text — zinc-400 */
  --text-muted:     #52525b;   /* Placeholder, disabled — zinc-600 */

  /* Accent — single accent color, used sparingly */
  --accent:         #ffffff;   /* White — primary action in dark theme */
  --accent-hover:   #e4e4e7;   /* zinc-200 on hover */

  /* Semantic */
  --success:        #22c55e;   /* Saved indicator */
  --warning:        #f59e0b;   /* Unsaved changes */
  --error:          #ef4444;   /* Errors */

  /* Canvas */
  --canvas-bg:      #0a0a0a;
  --canvas-dot:     #1f1f1f;
  --canvas-grid:    #1a1a1a;   /* The tile/crosshatch lines */

  /* Table node specific */
  --node-bg:        #111111;
  --node-border:    #2a2a2a;
  --node-header:    #161616;
  --node-selected:  #ffffff;   /* White border on selected */
  --pk-color:       #fbbf24;   /* Gold — primary key */
  --fk-color:       #60a5fa;   /* Blue — foreign key */
  --uq-color:       #a78bfa;   /* Purple — unique */
  --nn-color:       #6b7280;   /* Gray — not null */

  /* Collaboration cursors — assigned per user */
  --cursor-1: #f87171;
  --cursor-2: #fb923c;
  --cursor-3: #facc15;
  --cursor-4: #4ade80;
  --cursor-5: #60a5fa;
  --cursor-6: #c084fc;
  --cursor-7: #f472b6;
  --cursor-8: #2dd4bf;
}
```

---

## 3. Typography

```css
/* Fonts loaded via next/font */
--font-sans: "Inter", system-ui, sans-serif;          /* UI text */
--font-mono: "JetBrains Mono", "Fira Code", monospace; /* Code, field types */

/* Scale */
--text-xs:   11px / 1.4   /* Constraint badges, meta */
--text-sm:   13px / 1.5   /* Labels, secondary text */
--text-base: 14px / 1.6   /* Body, node field names */
--text-md:   16px / 1.5   /* Node table names */
--text-lg:   20px / 1.4   /* Section subheadings */
--text-xl:   28px / 1.3   /* Page headings */
--text-2xl:  36px / 1.2   /* Dashboard title */
--text-hero: 56px / 1.05  /* Landing headline */
--text-mega: 72px / 1.0   /* Large hero number ("$0") */

/* Weights */
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
Extrabold: 800
```

---

## 4. Landing Page — Section by Section

### 4.1 Page Background

The entire landing page uses a **CSS crosshatch tile pattern** as its background:

```css
.page-bg {
  background-color: #000000;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

This creates the subtle graph-paper grid visible throughout the landing page. It's very dark — present but not distracting.

---

### 4.2 Floating Navbar

Based on the `AcmeHero` navbar pattern:

```
┌──────────────────────────────────────────────────────────────────┐
│ border rounded-xl bg-black/80 backdrop-blur px-6 py-3 shadow-lg │
│                                                                  │
│ ◈ SchemaLab      Features   How It Works   GitHub    [Start Building Free →] │
└──────────────────────────────────────────────────────────────────┘
```

- **Container**: `max-w-5xl mx-auto`, floating (not full-width)
- **Background**: `bg-black/80 backdrop-blur-md border border-white/10`
- **Border radius**: `rounded-xl`
- **Position**: `sticky top-4 z-50` with `mt-4` — floats above the page grid with a gap
- **Logo**: `◈ SchemaLab` — the ◈ is the database icon from Lucide in white, wordmark in white semibold
- **Nav links**: `text-sm text-zinc-400 hover:text-white transition-colors` — Features, How It Works, GitHub
- **CTA Button**: `rounded-full bg-white text-black text-sm px-4 py-1.5 hover:bg-zinc-200` — "Start Building Free"
- **Mobile**: Hamburger icon → shadcn Sheet from right side with nav links

---

### 4.3 Hero Section

```
[Badge pill]: ◎ Free forever — no credit card required

[Headline 56px bold white]:
Stop Writing
Schema Code.
Draw It.

[Subheadline 18px zinc-400]:
Design your database visually on an infinite canvas.
Connect tables, define fields, and generate production-ready
SQL, Prisma, Drizzle or Mongoose — instantly.

[CTA row]:
[ Start Building Free → ]    [ See How It Works ↓ ]
   black bg, white text        ghost, white border

[Language strip]:
Works with: [SQL] [PostgreSQL] [Prisma] [Drizzle] [Mongoose]
           all as small rounded pill badges in zinc-800 border

[Canvas Preview]:
┌─────────────────────────────────────────────────────────┐
│ border border-white/10 rounded-2xl p-2 bg-zinc-950      │
│                                                         │
│ [Screenshot or GIF of the SchemaLab whiteboard]         │
│ showing connected table nodes + right panel with code   │
│                                                         │
└─────────────────────────────────────────────────────────┘
└── gradient fade at bottom: bg-gradient-to-t from-black
```

- Headline uses Framer Motion staggered fade-up: `initial={{ opacity:0, y:20 }}` with delay increments of 0.1s
- CTA buttons enter after headline (delay 0.4s)
- Canvas preview enters last (delay 0.6s, `y:40`)
- The canvas preview image is `w-full` inside a padded frame with a soft border and inner drop shadow

---

### 4.4 "How It Works" — 3 Steps

Centered section, 3 columns on desktop, stacked on mobile:

```
         [1]                    [2]                    [3]
   [cursor icon]          [link-2 icon]           [code-2 icon]
                                                  
   Draw                   Connect                Generate
   Add tables to          Drag lines between     Select your language
   the canvas and         tables to define       and instantly get
   define your fields     relationships          production-ready code
```

- Each step: icon in a small bordered circle, bold number, title, description
- `text-sm text-zinc-400` for description
- Between each step: a subtle right arrow `→` (hidden on mobile)
- Section has no background — the grid tile bleeds through

---

### 4.5 Features Bento Grid

Inspired by `features-8` bento grid. 6-column CSS grid, cards of varying sizes:

```
┌────────────────────┬───────────────┬───────────────┐
│                    │               │               │
│  Visual Canvas     │  5 Languages  │  Real-Time    │
│  (col-span 2)      │  (col-span 2) │  Collab       │
│                    │               │  (col-span 2) │
├────────────────────┴───────────────┤               │
│                                    ├───────────────┘
│  Instant Code Gen  (col-span 3)    │
│                                    ├───────────────┐
├────────────────────────────────────┤  Download Any │
│  Save & Revisit    (col-span 3)    │  Format       │
│                                    │  (col-span 3) │
└────────────────────────────────────┴───────────────┘
```

Each card: `bg-zinc-950 border border-white/5 rounded-xl p-6`
Cards include a visual element (icon, mini-diagram, or number) + title + 1-line description.

**Card contents:**
- "Visual Canvas" — React Flow node diagram mockup drawn in SVG inside the card
- "5 Languages" — Five pill badges stacked/scattered: SQL, PostgreSQL, Prisma, Drizzle, Mongoose
- "Real-Time Collaboration" — Two colored cursor arrows overlapping on a mini canvas
- "Instant Code Generation" — Monospace code snippet with syntax colors (static display)
- "Save & Revisit" — Mini dashboard project tiles
- "Download Any Format" — Download icon + `.sql .prisma .ts .js` extensions listed

---

### 4.6 Feature Deep Dive (3 alternating rows)

Each row: full-width, `py-24`, alternating text/visual arrangement.

**Row 1 — "An infinite canvas that thinks like a database"**
- Left: text block (headline + 3-4 sentences)  
- Right: animated mock of the canvas showing a table node being built

**Row 2 — "Code that works the first time you paste it"**
- Left: two-tab code block (Prisma / SQL) showing the same schema in both languages
- Right: text block

**Row 3 — "Collaborate without a subscription"**
- Left: text block about real-time collab, room IDs, cursors
- Right: visual of two cursors (different colors) moving on a canvas

Text style: `text-2xl font-bold text-white` for headline, `text-base text-zinc-400` for body.

---

### 4.7 Testimonials Section

Uses the `StaggerTestimonials` component pattern — staggered overlapping cards with navigation arrows.

Content rewritten for SchemaLab (from the PRD — 10 testimonials about the product). Cards use:
- `bg-black border-2 border-white/10` at rest
- `bg-white text-black border-white` when center/active
- Polygon clip-path for the cut-corner aesthetic
- User photos from `i.pravatar.cc`

---

### 4.8 Pricing Section

Single pricing card centered on the grid background. Inspired by `single-pricing-card-1`.

```
                    ┌──────────────────────────────┐
                    │                              │
                    │       Completely Free        │
                    │                              │
                    │            $0                │
                    │         / forever            │
                    │                              │
                    │  No credit card. No fees.    │
                    │  Use it as much as you want. │
                    │                              │
                    │  ✓ Unlimited projects        │
                    │  ✓ All 5 language exports    │
                    │  ✓ Real-time collaboration   │
                    │  ✓ Save & revisit schemas    │
                    │  ✓ Download any format       │
                    │  ✓ Up to 10 collaborators    │
                    │                              │
                    │  [ Start Building — Free  ]  │
                    │                              │
                    └──────────────────────────────┘

   "Pricing may be introduced in the future as SchemaLab grows.
    Early users will always receive a generous free tier."
```

- Card: `bg-zinc-950 border border-white/10 rounded-2xl p-8`
- BorderTrail animation runs around the card border (white glow trail)
- "$0" in `text-mega` (72px) white bold
- Feature list: checkmarks in white/green, items in `text-sm text-zinc-300`
- CTA: `bg-white text-black rounded-xl w-full py-3`
- `+` corner ornaments at card corners (matching `single-pricing-card-1` style)

---

### 4.9 Final CTA Section

```
Your database schema is
3 minutes away.

No setup. No credit card.
Just open the canvas and start building.

[ Open SchemaLab → ]
```

- Black section, centered
- Headline: 40px bold white
- Subheadline: `text-zinc-400`
- Button: large, `rounded-xl bg-white text-black px-8 py-4 text-base font-medium`

---

### 4.10 Footer

Based on `footer-section` pattern with custom SchemaLab content:

4-column grid:
1. **About** — SchemaLab logo + 1-line description + newsletter email input
2. **Quick Links** — Features, How It Works, GitHub, Auth/Sign In
3. **Languages** — SQL, PostgreSQL, Prisma, Drizzle, Mongoose (each a small link)
4. **Connect** — GitHub icon button, Twitter/X icon button

Bottom bar:
```
© 2025 SchemaLab. All rights reserved.    Privacy Policy   Terms
─────────────────────────────────────────────────────────────────
              Built with ❤️ by Nikhil Singh
```

- "Built with ❤️ by Nikhil Singh" — centered, `text-sm text-zinc-500`, the ❤️ is red (#ef4444)

---

## 5. Auth Page (`/auth`)

Minimal centered card. No navbar. No sidebar.

```
                         ◈ SchemaLab
                    
                    Welcome back
                    Sign in to continue building
                    
          ┌──────────────────────────────────────┐
          │                                      │
          │  [G]  Continue with Google           │
          │                                      │
          │  ──────────── or ────────────        │
          │                                      │
          │  Email address                       │
          │  [                              ]    │
          │                                      │
          │  Password                            │
          │  [                              ]    │
          │                                      │
          │  [          Sign In             ]    │
          │                                      │
          │  Don't have an account? Sign up →    │
          └──────────────────────────────────────┘
```

- Page: `bg-black` with the same subtle tile grid
- Card: `bg-zinc-950 border border-white/10 rounded-2xl p-8 w-full max-w-md`
- Google button: `border border-white/20 bg-transparent text-white hover:bg-white/5 w-full rounded-xl`
- Input fields: `bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-500 rounded-xl`
- Primary button: `bg-white text-black hover:bg-zinc-200 w-full rounded-xl`
- Toggle "Sign in / Sign up" changes heading and button text only — same card

---

## 6. Dashboard (`/dashboard`)

Exact reference: the Supabase projects screenshot.

### Left Icon Sidebar (48px wide)
```
┌────┐
│ ◈  │  ← SchemaLab icon at top
├────┤
│ ⊞  │  ← Projects (active — white icon)
│ 👤 │  ← Team (grayed)
│ 📊 │  ← Analytics (grayed)
│ 🗄  │  ← Database (grayed)
│ 📝 │  ← Logs (grayed)
│ ⚙  │  ← Settings (grayed)
├────┤
│ 🙂 │  ← User avatar at bottom
└────┘
```

- `bg-zinc-950 border-r border-white/5`
- Each icon: 36x36 area, centered, `text-zinc-500 hover:text-white transition-colors`
- Active: `text-white bg-white/5 rounded-lg`
- Tooltip on hover: shadcn Tooltip showing page name

### Main Content (fills remaining width)

**Top bar:**
```
Projects                                              [Feedback] [Search ⌘K] [?] [Avatar]
```
- `bg-zinc-950 border-b border-white/5 px-6 py-3`
- Title: `text-xl font-semibold text-white`
- Right: ghost icon buttons for Feedback, Search, Help, User avatar

**Filter row (below top bar):**
```
[🔍 Search for a project...]   [Status ▾]   [⇅ Sorted by name]      [⊞] [≡]   [+ New project]
```
- Search: `bg-zinc-900 border border-white/10 rounded-lg text-sm`
- New project button: `bg-white text-black rounded-lg px-4 py-2 text-sm font-medium`
- Join Project button (secondary): `border border-white/20 text-white rounded-lg px-4 py-2 text-sm` — right of the New project button

**Project Grid:**
Cards at `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6`:

Each card: `bg-zinc-950 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors cursor-pointer`

```
┌──────────────────────────────────────────┐
│  Project name                    [⋮]     │
│  Last edited 2 hours ago                 │
│                                          │
│  [ACTIVE]  [2 collaborators]             │
└──────────────────────────────────────────┘
```

- Project name: `text-sm font-medium text-white`
- Meta: `text-xs text-zinc-500`
- ACTIVE badge: `text-xs bg-green-500/10 text-green-400 border border-green-500/20 rounded px-1.5 py-0.5`
- Three-dot menu: `DropdownMenu` → Open, Rename, Duplicate, Share (Copy Room ID), Delete

---

## 7. Editor / Whiteboard (`/editor/[projectId]`)

### Top Bar (44px)
```
[← Projects]  [Project Name ✏️]   [avatar][avatar][+2]  [Share]  [●Saved 2m ago]
```
- `bg-zinc-950 border-b border-white/5 px-4`
- Back button: `text-zinc-400 hover:text-white`
- Project name: click to enter edit mode → becomes `<input>` with same styling
- Collaborator avatars: `flex -space-x-2` with colored borders matching cursor colors
- Share button: `border border-white/20 rounded-lg px-3 py-1.5 text-sm text-white hover:bg-white/5`
- Save status: colored dot + text in `text-xs text-zinc-400`

### Canvas
- `bg-zinc-950` with React Flow dot grid `color="#1f1f1f" gap={24} size={1.5}`
- Live collaborator cursors float above the canvas as absolutely positioned elements
- Each cursor: SVG arrow + name pill in user's assigned color

### Table Node
```
○ ────────────────────────────────────────── ○
│                                            │
│  ▣  users                       [⋮]  [×]  │  ← zinc-900 header
├────────────────────────────────────────────┤
│  ◆ id           Int       [PK] [AI]        │  ← gold ◆ for PK
│    email        String    [UQ] [NN]        │
│    username     String    [NN]             │
│    createdAt    DateTime                   │
│    bio          Text                       │
├────────────────────────────────────────────┤
│  + Add Field                               │  ← muted text, hover bg
│                                            │
○ ────────────────────────────────────────── ○
```

Node styling:
- Container: `bg-zinc-950 border border-zinc-800 rounded-xl w-72 shadow-xl`
- Selected: `border-white ring-1 ring-white/20`
- Header: `bg-zinc-900 rounded-t-xl px-4 py-3 flex items-center justify-between`
- Table name: `font-mono text-sm font-semibold text-white`
- Field row: `px-4 py-2 flex items-center gap-2 border-t border-zinc-900 hover:bg-zinc-900/50`
- Field name: `font-mono text-sm text-zinc-200 flex-1` — click to edit inline
- Field type: `font-mono text-xs text-zinc-500 bg-zinc-900 px-1.5 rounded` — click opens dropdown
- Constraint badges: `text-[10px] font-mono px-1 py-0.5 rounded border`
  - PK: `bg-yellow-500/10 text-yellow-400 border-yellow-500/30`
  - FK: `bg-blue-500/10 text-blue-400 border-blue-500/30`
  - UQ: `bg-purple-500/10 text-purple-400 border-purple-500/30`
  - NN: `bg-zinc-700/50 text-zinc-400 border-zinc-600`
- Connection handles: `w-3 h-3 rounded-full bg-zinc-700 border-2 border-zinc-500 hover:bg-white hover:border-white`

### Floating Dock

```
         ┌──────────────────────────────────────────────────────┐
         │                                                      │
         │  [⊞ Table]  │  [↖]  [✋]  │  [+] [-] [⊡]  │  [↺] [↻]  │  [💬]  │
         │                                                      │
         └──────────────────────────────────────────────────────┘
```

- `fixed bottom-6 left-1/2 -translate-x-1/2`
- `bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2.5 flex items-center gap-1 shadow-2xl`
- Button: `w-9 h-9 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all`
- Active tool: `bg-white/10 text-white`
- Divider: `w-px h-5 bg-white/10 mx-1`
- "Add Table" is labeled with text + icon (not just icon)
- Framer Motion `whileTap={{ scale: 0.9 }}`

### Right Panel
```
┌────────────────────────────────────────────────────┐
│  [SQL] [PostgreSQL] [Prisma] [Drizzle] [Mongoose]  │  ← tabs
├────────────────────────────────────────────────────┤
│                                                    │
│  -- Generated by SchemaLab                         │
│  CREATE TABLE users (                              │  ← syntax highlighted
│    id SERIAL NOT NULL PRIMARY KEY,                 │     react-syntax-highlighter
│    ...                                             │     theme: "vscDarkPlus"
│                                                    │
├────────────────────────────────────────────────────┤
│  [Generate Code]    [⎘ Copy]    [↓ Download]       │
└────────────────────────────────────────────────────┘
```
- `bg-zinc-950 border-l border-white/5 w-80 flex flex-col`
- Tabs: `text-xs font-mono text-zinc-500 hover:text-white` — active has white text + border-b
- Code block: `bg-black font-mono text-xs flex-1 overflow-y-auto p-4`
- Generate button: `bg-white text-black text-sm font-medium rounded-xl w-full`
- Copy/Download: `border border-white/10 text-zinc-400 hover:text-white text-sm rounded-xl flex-1`

### Collaborator Cursors
```tsx
// Rendered as absolute div over the canvas
<div style={{ 
  position: 'absolute', 
  left: cursor.x, 
  top: cursor.y, 
  pointerEvents: 'none',
  transform: 'translate(-2px, -2px)',
  zIndex: 999
}}>
  <svg> {/* arrow cursor shape in user's color */} </svg>
  <span style={{ background: user.color }} className="text-xs text-white px-1.5 py-0.5 rounded-full ml-3 -mt-1 whitespace-nowrap">
    {user.displayName}
  </span>
</div>
```

### Comment Pins
- Yellow pin icon (`📌` or custom SVG) dropped on canvas
- Clicking shows a popover card:
  ```
  ┌─────────────────────────────┐
  │ [avatar] Nikhil Singh       │
  │ 2 min ago                   │
  │                             │
  │ Check this relation —       │
  │ should this be many-to-many?│
  │                             │
  │ [Reply...]    [✓ Resolve]   │
  └─────────────────────────────┘
  ```
- Resolved comments: pin turns gray, hidden by default, "Show resolved" toggle

---

## 8. Component Inventory

| Component | Path | Notes |
|---|---|---|
| `Navbar` | `components/marketing/Navbar.tsx` | Floating, shadcn Sheet for mobile |
| `HeroSection` | `components/marketing/HeroSection.tsx` | Framer stagger animations |
| `HowItWorks` | `components/marketing/HowItWorks.tsx` | 3-step layout |
| `FeaturesBento` | `components/marketing/FeaturesBento.tsx` | CSS grid cards |
| `FeatureRows` | `components/marketing/FeatureRows.tsx` | Alternating rows |
| `Testimonials` | `components/marketing/Testimonials.tsx` | StaggerTestimonials pattern |
| `PricingSection` | `components/marketing/PricingSection.tsx` | Free card + border trail |
| `FinalCTA` | `components/marketing/FinalCTA.tsx` | Last push to sign up |
| `Footer` | `components/marketing/Footer.tsx` | 4 columns + "built by Nikhil Singh ❤️" |
| `AuthForm` | `components/auth/AuthForm.tsx` | Shadcn-style, sign in / sign up toggle |
| `DashboardSidebar` | `components/dashboard/Sidebar.tsx` | Icon-only sidebar |
| `ProjectGrid` | `components/dashboard/ProjectGrid.tsx` | Grid of cards |
| `ProjectCard` | `components/dashboard/ProjectCard.tsx` | Single card with context menu |
| `NewProjectModal` | `components/dashboard/NewProjectModal.tsx` | Name input, create CTA |
| `JoinProjectModal` | `components/dashboard/JoinProjectModal.tsx` | Room ID input |
| `EditorTopBar` | `components/editor/TopBar.tsx` | Name, save status, share, avatars |
| `FlowCanvas` | `components/editor/FlowCanvas.tsx` | React Flow wrapper |
| `TableNode` | `components/editor/TableNode.tsx` | Custom RF node |
| `FieldRow` | `components/editor/FieldRow.tsx` | Inline editable field |
| `RelationshipEdge` | `components/editor/RelationshipEdge.tsx` | Custom RF edge |
| `FloatingDock` | `components/editor/FloatingDock.tsx` | Bottom toolbar |
| `CodePanel` | `components/editor/CodePanel.tsx` | Right panel |
| `CollaboratorCursor` | `components/editor/CollaboratorCursor.tsx` | Live cursor overlay |
| `CommentPin` | `components/editor/CommentPin.tsx` | Canvas comment marker |
| `ShareModal` | `components/editor/ShareModal.tsx` | Room ID + copy link |
| `JsonLd` | `components/seo/JsonLd.tsx` | Structured data for SEO |

---

## 9. Animations and Micro-Interactions

| Interaction | Animation | Duration |
|---|---|---|
| Landing page text entrance | `opacity: 0→1, y: 20→0` staggered | 500ms each |
| Canvas preview entrance | `opacity: 0→1, y: 40→0` | 800ms, delay 600ms |
| Section scroll trigger | `whileInView` fade+slide | 600ms |
| Dock button press | `scale: 0.92` on tap | 100ms |
| Node add to canvas | `scale: 0.8→1, opacity: 0→1` | 150ms |
| Node delete | `scale: 1→0.8, opacity: 1→0` | 150ms |
| Modal open | shadcn Dialog default | 150ms |
| Save status dot | slow pulse when saving | 1.5s loop |
| Code panel generate | code fades out, new code fades in | 200ms |
| BorderTrail on pricing card | rotating glow around border | 5s loop |
| Collaborator cursor move | `transition: all 80ms linear` | 80ms (feels live) |
| Project card hover | `translateY(-2px), border brighten` | 150ms |

---

## 10. Responsive Behavior

| Section | Mobile (<640px) | Tablet (640–1024px) | Desktop (>1024px) |
|---|---|---|---|
| Navbar | Hamburger + Sheet | Hamburger + Sheet | Full floating nav |
| Hero | Single column, text smaller | Single column | Full two-section |
| Features bento | Single column cards | 2-column grid | 6-col bento |
| Testimonials | Single card | Single card | Stagger carousel |
| Dashboard sidebar | Bottom tab bar (icons) | Icon sidebar | Icon sidebar |
| Dashboard grid | 1 column | 2 columns | 3 columns |
| Editor canvas | "Open on desktop" message | Limited support | Full feature |
| Code panel | Hidden, toggle button in dock | Toggleable drawer | Fixed right panel |

---

## 11. Empty States

**Dashboard — no projects:**
```
     [Database icon, large, zinc-600]
     
     No projects yet
     
     Create your first schema to get started.
     
     [ + New Project ]   [ Join a Project ]
```

**Canvas — empty:**
```
     Drag a table onto the canvas to get started.
     Press  T  to add a table, or click "Add Table" below.
```
Centered in the canvas, `text-zinc-500 text-sm`, disappears once the first node is added.

**Code panel — not generated:**
```
     [Code icon, zinc-600]
     
     Add some tables to the canvas,
     then click Generate to see your code.
```

---

## 12. SEO-Specific Pages

No extra pages are needed — all SEO is handled in the root layout and landing page metadata. The `/sitemap.xml` and `/robots.txt` are auto-generated at build time by `next-sitemap`.

**Page titles per route:**
- `/` → "SchemaLab — Visual Database Schema Designer | Free"
- `/auth` → "Sign In | SchemaLab" (noindex)
- `/dashboard` → "Dashboard | SchemaLab" (noindex)
- `/editor/[id]` → "Editor | SchemaLab" (noindex)

**OG Image** (`/og-image.png`, 1200×630):
A static image showing the SchemaLab canvas with a couple of connected tables and the code panel open — the clearest possible "this is what the product does" visual for social sharing.
