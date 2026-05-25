# Repository Guidelines

This file is the single source of truth for AI coding assistants (Claude Code, Copilot, Cursor, etc.) working in this repository.

## Commands

```bash
pnpm dev                   # Start Vite dev server with hot reload
pnpm build                 # TypeScript check + build demo app
pnpm build:lib             # Build publishable library (vite.lib.config.ts)
pnpm preview               # Serve production build locally
pnpm lint                  # ESLint (typescript-eslint + react-hooks + react-refresh)
pnpm test                  # Vitest with coverage (watch mode)
pnpm test:coverage         # Vitest coverage run (CI-style, exits after)
pnpm docker:push           # Build and push multi-arch Docker image
```

### Running a Single Test

```bash
pnpm vitest run tests/button.test.tsx          # Run one test file
pnpm vitest run -t "renders correctly"         # Run tests matching name
```

## Architecture

### Overview

This is `@clidey/ux` (v0.43.0) — a React component library built on Radix UI primitives with Tailwind CSS v4 styling. It exports 38 UI components, a theme system, hooks, and utility functions as an ES module package on npm.

### Key Directories

- `src/components/ui/` — All 38 UI components (kebab-case filenames, PascalCase exports)
- `src/components/theme/` — `ThemeProvider`, `useTheme`, and `ModeToggle`
- `src/hooks/use-mobile.ts` — `useIsMobile()` hook (breakpoint: 768px)
- `src/lib/utils.ts` — `cn()` (class merging), `toTitleCase`, `formatDate`
- `src/lib/use-resize-observer.ts` — `useResizeObserver` hook (used by Tree component)
- `src/index.ts` — **Package entry point; new public components MUST be exported here**
- `src/index.tsx` — Demo app entry (renders `<ThemeProvider>` + `<App>`)
- `src/app.tsx` — Showcase dashboard with tabbed navigation
- `src/showcases/` — Demo pages (excluded from lib build and coverage)
- `tests/` — Vitest test files (`<component>.test.tsx`)
- `k8s/` — Kubernetes manifests and Dockerfile
- `docs/` — Documentation and logo assets

### Build Configuration

Three Vite configs serve different purposes:

- `vite.config.ts` — Dev server and demo app (uses `@vitejs/plugin-react-swc`)
- `vite.lib.config.ts` — Library build: ES modules only, externalizes all deps (React, Radix, utilities, maplibre-gl), emits TypeScript declarations via `vite-plugin-dts` using `tsconfig.lib.json`, bundles CSS
- `vitest.config.ts` — Test runner with jsdom, `@/*` path alias, v8 coverage

### Core Technologies

- **React 18/19** (peer dependency, `>=18.3.0`)
- **Tailwind CSS v4** with `@tailwindcss/vite` plugin and `tw-animate-css`
- **Radix UI** for accessible primitives (14 packages)
- **TypeScript 5.8** in strict mode (`noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`)
- **class-variance-authority (cva)** for type-safe variant management
- **cmdk** — Command palette
- **sonner** — Toast notifications
- **vaul** — Drawer component
- **recharts** — Charts (Bar, Line, Area, Pie)
- **react-resizable-panels** — Resizable split views
- **react-map-gl + maplibre-gl** — Interactive maps with markers, lines, arcs, polygons, circle layers, heatmaps
- **next-themes pattern** — Custom ThemeProvider (not using next-themes directly; uses localStorage key `@clidey/ux/theme`)
- **lucide-react** — Icon library

### Path Aliases

`@/*` maps to `./src/*` (configured in all tsconfigs and Vite configs).

## Component Patterns

- Built on Radix UI primitives for accessibility
- Use `forwardRef` for ref forwarding (newer components use function components with `React.ComponentProps`)
- Use `cva()` for variant definitions with `cn()` for className merging
- Accept `className` prop for consumer customization
- Sub-component composition pattern (e.g., `Card` → `CardHeader`, `CardContent`, `CardFooter`)
- Context providers for complex components: `Table` auto-wraps in `TableProvider` (drawer for overflow preview), `MapContainer` provides `MapContext`, `ChartContainer` provides `ChartContext`, `SidebarProvider` manages sidebar state
- File naming: kebab-case (`alert-dialog.tsx`); export names: PascalCase
- Components use `data-slot` attributes for DOM identification

### Adding a New Component

1. Create `src/components/ui/<name>.tsx` following existing patterns
2. Export all public symbols from `src/index.ts`
3. Add a test at `tests/<name>.test.tsx`
4. Add showcase demo in the appropriate `src/showcases/*-showcase.tsx` file
5. Run `pnpm lint && pnpm test:coverage` to verify

### Notable Component Features

- **Table**: Built-in virtualization (`VirtualizedTableBody`) with O(1)/O(log n) row lookup, overflow detection with eye-icon drawer preview for truncated cells, auto-width sync between header and body
- **Map**: Declarative MapLibre GL components (`MapContainer`, `MapMarker`, `MapLine`, `MapArc`, `MapPolygon`, `MapCircleLayer`, `MapHeatmap`) with dark/light style auto-detection and `configKey` pattern for theming
- **SearchSelect**: Combobox combining Popover + Command with search filtering, icon support, controlled/uncontrolled modes
- **Sidebar**: Full sidebar system with `icon`/`offcanvas` collapse modes, mobile sheet fallback, cookie persistence, keyboard shortcut (B), supports left and right placement
- **Tree**: File-explorer tree using Radix Accordion with `useResizeObserver` for dynamic sizing
- **Input**: Includes `showPasswordToggle` prop for password fields
- **ButtonGroup**: Supports `horizontal`/`vertical` orientation with separators and text labels

## Coding Style

- Use existing patterns (Radix, Tailwind v4, `cn`, `cva`) before introducing new abstractions
- Follow surrounding file style for quotes and semicolons
- Use `@/` alias for source imports
- All source files include Apache 2.0 license header
- Run `pnpm lint` before submitting changes

## Testing Guidelines

- Tests use Vitest + jsdom + Testing Library (`tests/setup.ts` for global config)
- Test file naming: `tests/<component>.test.tsx` (or `.test.ts` for hooks/utils)
- Prefer user-visible queries (`screen.getByRole`, `screen.getByText`)
- Cover: behavior, variants, accessibility states, disabled/error paths
- Coverage: v8 provider, outputs text + JSON + HTML
- Excluded from coverage: `src/showcases/`, `src/app.tsx`, `src/index.tsx`, `src/index.ts`, config files

## Commit Style

Short imperative subjects. Keep commits focused. Occasional conventional prefixes (`feat(docs):`, `fix:`). Pull requests should explain the change, list verification commands run, and include screenshots for visual changes.

## Showcase Dashboard

The dev server (`pnpm dev`) serves a tabbed showcase at localhost with these sections:

- **Buttons** — Variants, sizes, states, Icon component, ButtonGroup
- **Forms** — Input, TextArea, Checkbox, Switch, Select
- **Navigation** — Accordion, Tabs, Breadcrumb, Sidebar (basic + embedded dual-sidebar)
- **Overlays** — Dialog, AlertDialog, Sheet, Drawer, DropdownMenu, ContextMenu, Popover, Tooltip
- **Feedback** — Alert, Badge, Skeleton, EmptyState, Toast (Sonner), Progress
- **Data** — Table, Pagination, Command palette, Tree, StackList, VirtualizedTable
- **Charts** — Bar, Line, Area, Pie (via Recharts + ChartContainer)
- **Maps** — Markers, Lines, Polygons, CircleLayer, Heatmap, Arcs (globe projection)
- **Layout** — ResizablePanels, ScrollArea

Each showcase is lazy-loaded with `React.lazy()` for performance.
