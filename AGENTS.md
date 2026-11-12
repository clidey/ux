# Repository Guidelines

This file is the single source of truth for AI coding assistants working in this repository.

`@clidey/ux` is a React component library (Radix UI primitives, Tailwind CSS v4, `cva` variants) published to npm; `src/index.tsx` and `src/showcases/` are a demo app, and `k8s/` builds the docs image. Design tokens and visual rules are in `DESIGN.md`, product context in `PRODUCT.md`.

## Team Rules

These apply in every clidey repository, for people and agents alike.

- **Commits and pushes:** never commit or push without the user explicitly asking in that turn ("please commit this for me" or unambiguously equivalent). "Implement it" or "merge it into main locally" means change the files, not commit. If a commit seems necessary, stop and ask.
- **No AI attribution:** commit messages and PR descriptions carry no AI attribution: no `Co-Authored-By:` trailers for Claude, Codex, or any other agent, and no "Generated with" lines.
- **Untracked files:** never delete untracked or gitignored files without asking first; they often hold secrets or local state.
- **Agent replies:** lead with the answer or result. No preamble, no restating the question, no recap unless asked. Keep it short and explain only what isn't obvious; if you need something from the user, ask in one line.
- **Clarify first:** before starting, ask about anything where a different answer would change the work: scope, behaviour, which repo or environment, or anything hard to undo. Ask all your questions at once, then wait. Don't ask what the code or docs already answer; for small choices that are easy to change later, pick one and say which in your reply.

## Commands

```bash
pnpm dev                     # demo/showcase dev server
pnpm build                   # tsc -b + demo build
pnpm build:lib               # publishable library (vite.lib.config.ts, tsconfig.lib.json)
pnpm lint                    # oxlint (.oxlintrc.json)
pnpm fmt                     # oxfmt --write src/
pnpm test:coverage           # vitest run --coverage (CI-style; `pnpm test` is the same in watch mode)
pnpm vitest run tests/button.test.tsx    # one file; add -t "name" to filter by test name
UX_DOCS_VERSION=<v> pnpm docker:push     # multi-arch clidey/ux-docs image
```

## Rules

- Adding a component: `src/components/ui/<name>.tsx` (kebab-case file, PascalCase exports) with a demo in the matching `src/showcases/*-showcase.tsx`. `scripts/check-components.mjs` (agent Stop hook and CI) requires the `src/index.ts` export, `tests/<name>.test.tsx` and the license header.
- Trigger `asChild` inference depends on slot-safety markers in `src/lib/slot.ts`. Mark a component with `markSlottable` only if it forwards its `ref` and spreads unknown props onto the DOM node; use `markNotSlottable` for components that swallow them. Consumers rely on this when they omit `asChild`.
- Use the `@/` alias for source imports.
- `ThemeProvider` is custom (not `next-themes`) and persists to the localStorage key `@clidey/ux/theme`; consumers depend on that key.
- Tests run on Vitest with happy-dom and Testing Library; global setup is `tests/setup.ts`. `src/showcases/`, `src/app.tsx`, `src/index.tsx`, and `src/index.ts` are excluded from coverage.
- Pull requests list the verification commands run and include screenshots for visual changes.
