# Repository Guidelines

## Project Structure & Module Organization

This is a Vite React/TypeScript component library. Public UI components live in `src/components/ui`, theme utilities in `src/components/theme`, hooks in `src/hooks`, and shared helpers in `src/lib`. The package entry point is `src/index.ts`; export new public components there. Demo/showcase code is in `src/showcases`, documentation pages are in `docs`, and tests are in `tests`. Build output is generated in `dist` and should not be edited directly.

## Build, Test, and Development Commands

Use `pnpm` to match the checked-in lockfile and package manager metadata.

- `pnpm dev` starts the Vite development server for the showcase app.
- `pnpm build` runs TypeScript project builds and creates the app bundle.
- `pnpm build:lib` builds the publishable library with `vite.lib.config.ts`.
- `pnpm lint` runs ESLint across the repository.
- `pnpm test` runs Vitest with coverage in watch-capable mode.
- `pnpm test:coverage` runs the coverage suite once for CI-style checks.
- `pnpm preview` serves the production build locally.

## Coding Style & Naming Conventions

Write TypeScript and React function components. Prefer existing Radix UI, Tailwind CSS v4, `class-variance-authority`, and `cn` utility patterns before adding new abstractions. Component filenames use kebab case, for example `alert-dialog.tsx`; exported component names use PascalCase. Keep aliases such as `@/lib/utils` for source imports. Follow the surrounding file style for quote and semicolon usage, and run `pnpm lint` before submitting changes.

## Testing Guidelines

Tests use Vitest, jsdom, Testing Library, and `tests/setup.ts`. Add or update `tests/<component>.test.tsx` for UI components and `tests/<hook-or-util>.test.ts` for hooks or utilities. Prefer user-visible queries such as `screen.getByRole` and cover behavior, variants, accessibility states, and disabled/error paths. Coverage reports are produced by V8 in text, JSON, and HTML formats.

## Commit & Pull Request Guidelines

Recent history uses short imperative subjects such as `fix up default padding...` and occasional conventional prefixes like `feat(docs): add details`. Keep commits focused and descriptive. Pull requests should explain the change, list verification commands run, link relevant issues, and include screenshots or recordings for visual component or documentation changes.

## Security & Configuration Tips

Do not commit secrets, generated credentials, or local environment files. Review `SECURITY.md` for vulnerability reporting expectations. When touching Docker, Kubernetes, or release files under `k8s` and `release`, call out deployment impact in the pull request.
