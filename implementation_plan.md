# SchemaLab Implementation Plan

## Project Overview
SchemaLab is a visual database schema designer with real-time collaboration, code generation for 5 languages, and Supabase-powered auth/DB/realtime.

## Tech Reality
- **Installed**: Next.js 16, React 19, Tailwind CSS v4 (we adapt PRD's Next.js 14 patterns to work with the installed version)
- **To install**: @xyflow/react, zustand, zundo, @supabase/supabase-js, @supabase/ssr, framer-motion, react-syntax-highlighter, lucide-react, shadcn/ui Radix primitives, clsx, tailwind-merge, class-variance-authority, next-sitemap

## Build Order (Phases)

### Phase 1: Foundation
1. Install all dependencies
2. Set up tailwind.config, globals.css with design system colors
3. Create `/lib/utils.ts` (cn helper)
4. Create `/types/*.ts` (schema, project, collaboration, comment)
5. Root layout with Inter + JetBrains Mono fonts, metadata, SEO

### Phase 2: Shared UI Components (shadcn-style)
- Button, Input, Dialog, DropdownMenu, Tabs, Tooltip, Select, Switch, Label, Separator, Popover, Sheet
- All in `/components/ui/`

### Phase 3: Landing Page
- Navbar, HeroSection, HowItWorks, FeaturesBento, FeatureRows, Testimonials, PricingSection, FinalCTA, Footer
- JSON-LD component
- Marketing layout at `app/(marketing)/layout.tsx` and `app/(marketing)/page.tsx`

### Phase 4: Auth
- Supabase client/server helpers (`lib/supabase/`)
- Auth page at `app/auth/page.tsx`
- AuthForm component
- OAuth callback route `app/api/auth/callback/route.ts`
- Middleware for protected routes

### Phase 5: Dashboard
- Dashboard page `app/dashboard/page.tsx`
- Sidebar, ProjectGrid, ProjectCard, NewProjectModal, JoinProjectModal
- API routes: `app/api/projects/route.ts`, `app/api/projects/[id]/route.ts`

### Phase 6: Editor
- FlowCanvas, TableNode, FieldRow, RelationshipEdge
- FloatingDock, CodePanel, EditorTopBar
- ShareModal, CollaboratorCursor, CommentPin
- Zustand store with zundo undo/redo

### Phase 7: Code Generators
- `lib/generators/` — sql.ts, postgres.ts, prisma.ts, drizzle.ts, mongoose.ts
- API route: `app/api/generate/route.ts`

### Phase 8: Collaboration
- `hooks/useCollaboration.ts` — Supabase Realtime broadcast + presence
- Comments API: `app/api/projects/[id]/comments/route.ts`
- Join route: `app/api/join/[roomId]/route.ts`
- Join page: `app/join/[roomId]/page.tsx`

### Phase 9: Settings & Polish
- Settings page
- SEO: next-sitemap config, robots.txt, sitemap.xml
- OG image
- Responsive polish
- Build verification
