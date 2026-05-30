# Product

## Register

product

## Users

Full-stack developers shipping products who need polished, accessible UI without building a design system from scratch. They work across the stack, value speed and consistency, and reach for a component library so they can focus on their product logic rather than re-implementing dropdowns and data tables. Their context: mid-build, under deadline pressure, integrating components into an existing React + Tailwind codebase.

## Product Purpose

@clidey/ux provides a complete set of production-ready React components built on Radix UI primitives with Tailwind CSS v4 styling. It exists so developers get accessible, composable, dark-mode-ready components that look good out of the box and adapt to any brand through token overrides. Success looks like: a developer installs the package, imports a component, and ships a polished interface the same day.

## Brand Personality

Precise, understated, trustworthy. The library communicates through quiet confidence: components feel solid, predictable, and well-engineered. No unnecessary flourish, no visual noise. Every detail earns its place. Voice is direct and technical without being cold.

## Anti-references

- **Material UI / MUI**: Too much visual weight, too opinionated, hard to escape its look. Avoid wrapper-heavy DOM, forced elevation patterns, and the "Google product" aesthetic.
- **Bootstrap / generic templates**: No "starter kit" energy. Components should feel crafted, not generated. Avoid the sameness of default Bootstrap spacing and color.
- **Overly minimal / headless**: Should look good immediately on install. Consumers shouldn't need to style everything from scratch. Radix primitives are the foundation, not the finished product.

## Design Principles

1. **Quiet confidence** — Components communicate reliability through precision, not decoration. Every pixel is intentional; nothing is there for show.
2. **Earn your complexity** — Start simple. Add density, variants, and features only when the use case demands it. The simple path should be the default path.
3. **Invisible accessibility** — A11y is structural, not cosmetic. Screen readers, keyboard navigation, and contrast work without the developer thinking about them.
4. **Adapt without breaking** — Components flex to fit any brand (tokens, className overrides, composition) without losing their internal coherence or accessibility guarantees.
5. **Ship today** — The library optimizes for developer velocity. Sensible defaults, minimal configuration, clear APIs. A component should work correctly on first render.

## Accessibility & Inclusion

WCAG 2.1 AAA compliance target. 7:1 contrast ratio for normal text, 4.5:1 for large text. All components keyboard navigable and screen reader compatible (inherited from Radix UI primitives). Explicit `prefers-reduced-motion` handling for any animated components. Color-blind safe palettes for data visualization (charts, maps). Focus indicators visible in all themes.
