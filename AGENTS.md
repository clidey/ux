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

This is `@clidey/ux` — a React component library built on Radix UI primitives with Tailwind CSS v4 styling. It exports 38 UI components, a theme system, and utility functions as an ES module package on npm.

### Key Directories

- `src/components/ui/` — All UI components (kebab-case filenames, PascalCase exports)
- `src/components/theme/` — ThemeProvider and ModeToggle
- `src/hooks/` — Custom hooks (e.g., `use-mobile.ts`)
- `src/lib/utils.ts` — `cn()` class merging utility, `toTitleCase`, `formatDate`
- `src/index.ts` — **Package entry point; new public components must be exported here**
- `src/showcases/` — Demo/showcase pages (excluded from lib build and coverage)
- `tests/` — Vitest test files (`<component>.test.tsx`)
- `k8s/` — Kubernetes and Docker deployment config
- `docs/` — Documentation assets

### Build Configuration

Three Vite configs serve different purposes:

- `vite.config.ts` — Dev server and demo app (uses `@vitejs/plugin-react-swc`)
- `vite.lib.config.ts` — Library build: ES modules only, externalizes all deps, emits TypeScript declarations via `vite-plugin-dts`, bundles CSS
- `vitest.config.ts` — Test runner with jsdom, `@/*` path alias, v8 coverage

### Core Technologies

- **React 18/19** (peer dependency)
- **Tailwind CSS v4** with `@tailwindcss/vite` plugin
- **Radix UI** for accessible primitives
- **TypeScript** in strict mode (`tsconfig.lib.json` for lib, `tsconfig.app.json` for demo)
- **class-variance-authority (cva)** for type-safe variant management
- **cmdk / sonner / vaul / recharts / react-resizable-panels / react-map-gl + maplibre-gl** — integrated component deps

### Path Aliases

`@/*` maps to `./src/*` (configured in all tsconfigs and Vite configs).

## Component Patterns

- Built on Radix UI primitives for accessibility
- Use `forwardRef` for ref forwarding
- Use `cva()` for variant definitions with `cn()` for className merging
- Accept `className` prop for consumer customization
- Sub-component composition pattern (e.g., `Card` → `CardHeader`, `CardContent`, `CardFooter`)
- File naming: kebab-case (`alert-dialog.tsx`); export names: PascalCase

## Coding Style

- Use existing patterns (Radix, Tailwind v4, `cn`, `cva`) before introducing new abstractions
- Follow surrounding file style for quotes and semicolons
- Use `@/` alias for source imports
- Run `pnpm lint` before submitting changes

## Testing Guidelines

- Tests use Vitest + jsdom + Testing Library (`tests/setup.ts` for global config)
- Test file naming: `tests/<component>.test.tsx`
- Prefer user-visible queries (`screen.getByRole`, `screen.getByText`)
- Cover: behavior, variants, accessibility states, disabled/error paths
- Coverage: v8 provider, outputs text + JSON + HTML

## Commit Style

Short imperative subjects. Keep commits focused. Occasional conventional prefixes (`feat(docs):`, `fix:`). Pull requests should explain the change, list verification commands run, and include screenshots for visual changes.
