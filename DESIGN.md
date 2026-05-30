---
name: Clidey UX
description: Production-ready React components built on Radix UI and Tailwind CSS v4.
colors:
  primary-violet: "#3b1f7a"
  primary-foreground: "#fcfcfc"
  icon-teal: "#2eb8a8"
  destructive-red: "#d4402b"
  background-light: "#ffffff"
  foreground-ink: "#1a1a1a"
  muted-surface: "#f5f5f5"
  muted-foreground: "#737373"
  border-neutral: "#e8e8e8"
  card-surface: "#ffffff"
  sidebar-surface: "#fafafa"
typography:
  body:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary-violet}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-primary-hover:
    backgroundColor: "{colors.primary-violet}"
  button-outline:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.foreground-ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground-ink}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  card-default:
    backgroundColor: "{colors.card-surface}"
    rounded: "{rounded.xl}"
    padding: "24px"
  input-default:
    backgroundColor: "transparent"
    textColor: "{colors.foreground-ink}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    height: "36px"
---

# Design System: Clidey UX

## 1. Overview

**Creative North Star: "The Precision Instrument"**

Clidey UX is engineered like a well-machined tool: every surface considered, every edge deliberate, nothing decorative. The system communicates through structural clarity and mechanical precision rather than ornamentation. Components are functional objects that earn trust through predictable behavior and dimensional consistency.

The aesthetic philosophy is subtractive. Start with nothing and add only what the interaction requires. Color is rare and meaningful. Typography carries hierarchy. Spacing is the primary tool for visual grouping. When a component appears on screen, it should feel like it was always meant to be there: no entrance fanfare, no competing for attention.

This system explicitly rejects the visual weight of Material UI, the generic sameness of Bootstrap templates, and the bare-bones abandonment of headless libraries. It occupies the narrow band between those failures: polished enough to ship immediately, neutral enough to adapt to any brand.

**Key Characteristics:**
- Achromatic neutrals with one deliberate accent
- Tight, consistent radius scale (6px-14px)
- Typography-driven hierarchy (weight and scale, not color)
- State changes through opacity and subtle shadow shifts, not color flooding
- Dark mode as a true inversion, not a separate design language

## 2. Colors

The palette is deliberately achromatic with surgical applications of chromatic color. Neutrals do the structural work; the violet primary marks interactive affordances; the teal icon color provides navigational anchoring.

### Primary
- **Deep Instrument Violet** (oklch(0.32 0.06 282.5) / #3b1f7a): Interactive elements in light mode only. Buttons, focused rings, active indicators. Low chroma keeps it serious rather than playful.

### Secondary
- **Signal Teal** (oklch(0.715 0.164 191.7) / #2eb8a8): Icon color across both modes. Provides a cool-temperature wayfinding signal distinct from the warm-adjacent violet. Never used as a background.

### Tertiary
- **Alert Red** (oklch(0.577 0.245 27.325) / #d4402b): Destructive actions only. High chroma, reserved for genuine danger states.

### Neutral
- **Pure White** (oklch(1 0 0) / #ffffff): Light mode background. Zero chroma, zero hue.
- **Ink Black** (oklch(0.145 0 0) / #1a1a1a): Primary text in light mode. Not pure black; the slight lightness prevents harsh vibration against white.
- **Muted Surface** (oklch(0.97 0 0) / #f5f5f5): Secondary backgrounds, muted fills, accent containers. Achromatic.
- **Mid Gray** (oklch(0.556 0 0) / #737373): Muted foreground text, placeholders, secondary labels.
- **Border Gray** (oklch(0.922 0 0) / #e8e8e8): All borders, dividers, input strokes. Subtle enough to define edges without competing for attention.

### Named Rules
**The Achromatic Backbone Rule.** Neutrals carry zero chroma. No warm tinting, no cool tinting. The system's neutrality is what allows it to adapt to any consumer's brand colors via token overrides.

**The Surgical Color Rule.** Chromatic color appears on less than 5% of any given screen. Its rarity is what makes it meaningful. If a surface is flooded with the primary, the hierarchy has collapsed.

## 3. Typography

**Body Font:** system-ui, -apple-system, sans-serif (native stack)

**Character:** The system font stack is a deliberate non-choice. It inherits the operating system's native sans-serif, which means components look native on every platform. The library never competes with the consumer's typography decisions.

### Hierarchy
- **Body** (400, 0.875rem / 14px, 1.5 line-height): All content text. The md:text-sm responsive adjustment means 16px on mobile (touch targets), 14px on desktop (density).
- **Label** (500, 0.875rem / 14px, 1.0 line-height): Form labels, menu items, button text. Medium weight distinguishes from body without adding size.
- **Card Title** (600, 1rem, leading-none): Card headers, section titles. Semibold at body size creates hierarchy through weight alone.
- **Muted** (400, 0.875rem / 14px, 1.5): Descriptions, secondary text. Same metrics as body but colored with muted-foreground.

### Named Rules
**The Weight-Not-Size Rule.** Hierarchy is created through weight contrast (400 → 500 → 600), not size jumps. The entire component library operates within a 14px-16px band. Size variation belongs to the consumer's layout, not the component internals.

**The System Stack Rule.** No custom fonts are bundled or assumed. The library inherits the consumer's font decisions. Components that assume a specific font width or x-height are broken.

## 4. Elevation

The system uses flat-by-default surfaces with minimal shadow vocabulary. Depth is conveyed through border separation and background tonal shifts, not through lifted planes.

### Shadow Vocabulary
- **shadow-xs** (`0 1px 2px rgba(0,0,0,0.05)`): Buttons, inputs. A barely-visible grounding that separates the element from the page without lifting it.
- **shadow-sm** (`0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`): Cards at rest. Defines the container edge more than suggesting depth.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadow exists to define edges, not to imply floating planes. If removing the shadow makes the component harder to identify, the component's border or background contrast is insufficient.

**The Border-First Rule.** Overlays (popovers, dropdowns, sheets) use border + background contrast as the primary separation mechanism. Shadow is additive reinforcement, never the only depth cue. This ensures dark mode works without shadow recalculation.

## 5. Components

### Buttons
- **Shape:** Gently curved edges (8px / rounded-md). Consistent across all variants.
- **Primary:** Deep Instrument Violet background, white text. 36px height, 16px horizontal padding. Subtle xs shadow.
- **Hover:** 90% opacity of primary background. No color shift, no scale change.
- **Focus:** 3px ring in ring color (50% opacity), border shifts to ring color. Keyboard-only via focus-visible.
- **Secondary:** Muted surface background, dark text. Same dimensions as primary.
- **Ghost:** Transparent at rest. Accent background on hover. No border, no shadow.
- **Outline:** White background, border stroke, xs shadow. Dark mode adds 30% input tint for subtle fill.
- **Destructive:** Alert Red background, white text. Focus ring uses destructive color at 20% opacity.
- **Disabled:** 50% opacity, pointer-events-none. No variant-specific disabled style.

### Cards
- **Corner Style:** Generous curves (10px-14px / rounded-xl). The largest radius in the system, marking cards as containers rather than interactive elements.
- **Background:** Card surface (white in light, near-black in dark).
- **Border:** 1px border-neutral. The primary edge definition.
- **Shadow:** shadow-sm. Reinforces the border, does not replace it.
- **Internal Padding:** 24px vertical (py-6), 24px horizontal (px-6 on content/header/footer). 6px gap between card sections.

### Inputs
- **Style:** Transparent background with 1px border stroke, rounded-md (8px). 36px height. In dark mode, a subtle 30% white tint fills the background.
- **Focus:** Border shifts to ring color, 3px ring appears at 50% opacity. Box-shadow transition for smooth state change.
- **Error:** Ring shifts to destructive at 20% opacity, border shifts to destructive color.
- **Disabled:** 50% opacity, not-allowed cursor, pointer-events disabled.
- **Search variant:** Leading search icon in muted-foreground. Uses focus-within for wrapper-level focus ring.
- **Password variant:** Trailing eye/eye-off toggle button. Same focus-within pattern.

### Navigation (Sidebar)
- **Width:** 16rem collapsed to icon-only mode (icon width + padding).
- **Background:** Sidebar surface (slightly off-white in light, elevated dark in dark mode).
- **Items:** Ghost-button-style menu items. Accent background on hover/active. Muted foreground for inactive, full foreground for active.
- **Border:** Right border separates sidebar from content area. Uses sidebar-border token.
- **Mobile:** Transforms to a Sheet overlay below 768px breakpoint.
- **Keyboard:** `B` shortcut toggles sidebar visibility.

### Tooltips
- **Style:** Dark background (primary in light, near-black with border in dark). White text. Small (12px) text. Tight padding (6px 12px). Rounded-md.
- **Behavior:** Radix-managed: delayed show, instant hide. No arrow by default.

## 6. Do's and Don'ts

### Do:
- **Do** use the semantic token names (primary, muted, accent, destructive) in all component styling. Never hardcode color values that bypass the token system.
- **Do** maintain the 36px interactive element height for all touchable controls (buttons, inputs, selects). Consistency in hit targets is a11y-critical.
- **Do** use focus-visible (not focus) for focus rings. Keyboard users see them; mouse users don't.
- **Do** test every component in both light and dark modes. The dark mode inversion is structural (primary flips from violet to near-white); verify that hierarchy survives the flip.
- **Do** use the achromatic neutral tokens (zero chroma) for all non-interactive surfaces. Consumer brand colors layer on top; the library's neutrals never fight them.
- **Do** include data-slot attributes on every component root element for DOM identification and testing.

### Don't:
- **Don't** add visual weight through multiple borders, heavy shadows, or nested containers. This is not Material UI. Single border, minimal shadow, flat surfaces.
- **Don't** assume specific font families or font metrics. The system font stack is intentional. Components that break at different x-heights are defective.
- **Don't** use color to create hierarchy within a single component. Use weight and opacity. The primary color is an interactive signal, not a typographic tool.
- **Don't** ship components that look like Bootstrap. If a button, card, or input could appear in a Bootstrap template without modification, the styling is too generic.
- **Don't** leave components unstyled or headless-feeling. Every component must look finished on first render without consumer intervention. Radix is the foundation, not the shipping product.
- **Don't** use border-left or border-right greater than 1px as colored accent stripes on cards, alerts, or list items.
- **Don't** add gradient backgrounds, glassmorphism, or decorative blur effects to any component.
- **Don't** create tinted neutrals (warm or cool). The achromatic backbone is the brand; tinting is the consumer's job via token overrides.
