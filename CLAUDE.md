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
pnpm test                  # Run Vitest tests
pnpm test path/to/test.tsx # Run a specific test file
pnpm lint                  # Run ESLint checks (uses typescript-eslint)
```

### Publishing

```bash
pnpm prepublishOnly        # Automatically runs build:lib before npm publish
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

### Key Directories

- `src/components/ui/`: All UI components (40+ components)
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

Two separate Vite configs:

- `vite.config.ts`: Development and demo app
- `vite.lib.config.ts`: Library build with proper externalization

The library build:

- Outputs ES modules only
- Externalizes all dependencies
- Includes TypeScript definitions via vite-plugin-dts
- Bundles CSS with components

### Testing Strategy

- Uses Vitest with jsdom environment
- Tests located in `tests/` directory
- Setup file at `tests/setup.ts` for global configuration
- Focus on component rendering and basic interactions

### Path Aliases

Uses `@/*` alias mapping to `./src/*` for clean imports across the codebase.