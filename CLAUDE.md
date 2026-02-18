# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
pnpm dev                   # Start development server with hot reload (Vite)
pnpm build                 # Build the demo app
pnpm build:lib             # Build the library for npm publishing
pnpm preview               # Preview production build locally
```

### Testing & Quality

```bash
pnpm test                  # Run Vitest tests with coverage
pnpm test:coverage         # Run tests with coverage report
pnpm lint                  # Run ESLint checks (uses typescript-eslint)
```

### Publishing

```bash
pnpm prepublishOnly        # Automatically runs build:lib before npm publish
```

### Docker

```bash
pnpm docker:push           # Build and push multi-arch Docker image
```

## Architecture

### Component Library Structure

This is a React UI component library built on Radix UI primitives with Tailwind CSS v4 styling. The library exports both
individual components and utility functions.

### Core Technologies

- **React 18/19**: Peer dependency with wide version support
- **Tailwind CSS v4**: Uses new @tailwindcss/vite plugin for styling
- **Radix UI**: Provides accessible, unstyled primitives
- **TypeScript**: Full type safety with strict mode
- **Vite**: For both development and library building

### Key Dependencies

Additional libraries integrated into the component system:

- **cmdk**: Command menu component
- **sonner**: Toast notifications
- **vaul**: Drawer component
- **recharts**: Charts and data visualization
- **react-resizable-panels**: Resizable layout panels
- **next-themes**: Theme management with system preference detection
- **lucide-react**: Icon library
- **class-variance-authority**: Type-safe variant management

### Key Directories

- `src/components/ui/`: All UI components (35+ components)
- `src/components/theme/`: Theme provider and toggle components
- `src/lib/`: Shared utilities (cn function for class merging)
- `tests/`: Vitest tests for components and utilities

### Component Patterns

Components follow consistent patterns:

- Built on Radix UI primitives for accessibility
- Use forwardRef for proper ref forwarding
- Utilize class-variance-authority (cva) for variant management
- Accept className prop for custom styling via cn() utility

### Build Configuration

Three separate configs:

- `vite.config.ts`: Development and demo app (uses @vitejs/plugin-react-swc)
- `vite.lib.config.ts`: Library build with proper externalization
- `vitest.config.ts`: Test configuration with coverage settings

The library build:

- Outputs ES modules only
- Externalizes all dependencies (React, Radix UI, utilities)
- Includes TypeScript definitions via vite-plugin-dts
- Bundles CSS with components

### Testing Strategy

- Uses Vitest with jsdom environment
- Tests located in `tests/` directory
- Setup file at `tests/setup.ts` for global configuration
- Coverage reporting with v8 provider (text, JSON, and HTML formats)
- Excludes `src/showcases/`, demo files, and config files from coverage
- Focus on component rendering and basic interactions

### Path Aliases

Uses `@/*` alias mapping to `./src/*` for clean imports across the codebase.