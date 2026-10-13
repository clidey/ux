---
title: 'Triggers and asChild'
description: 'How ux trigger components decide whether to render as their child or as their own button.'
---

# Triggers and `asChild`

Every `*Trigger` in `@clidey/ux` (`DropdownMenuTrigger`, `TooltipTrigger`, `PopoverTrigger`, `DialogTrigger`, `SheetTrigger`, `AlertDialogTrigger`, `DrawerTrigger`, `ContextMenuTrigger`) wraps a Radix primitive. Radix renders its own `<button>` unless `asChild` is set, in which case it clones the single child and merges `ref`, `data-state`, `aria-*` and event handlers into it.

Getting this wrong has two failure modes:

- **Without `asChild`** around a `Button`: a `<button>` inside a `<button>`. React warns `<button> cannot be a descendant of <button>`, browsers close the outer button early, there are two tab stops, and `data-state`/`aria-expanded` land on the invisible outer button so `data-[state=open]:` styles on the inner `Button` never fire.
- **With `asChild` on the wrong child**: a fragment, string, array, `null`, or a component that does not forward `ref` and spread props. The trigger silently stops opening, anchors in the wrong place, or warns about refs.

## The rule

> A trigger whose single child is a slot-safe element renders **as that child**. Anything else renders Radix's own `<button>`. Passing `asChild` with a child that cannot be slotted is a type error (for non-elements) and a development-time `console.error` (for known-unsafe components); the trigger falls back to its own button so the UI keeps working.

In practice: **wrap interactive children without `asChild`**.

```tsx
// Renders one <button>: the ux Button, with data-state / aria-expanded on it.
<DropdownMenuTrigger>
  <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
</DropdownMenuTrigger>

// Plain text: Radix renders its own <button>.
<TooltipTrigger>Help</TooltipTrigger>

// A non-ux element that forwards refs: say so explicitly.
<TooltipTrigger asChild>
  <Link to="/settings">Settings</Link>
</TooltipTrigger>
```

Explicit `asChild` still works everywhere it worked before; it is only required for elements the library cannot vouch for.

## Slot-safe children

A child is slot-safe when it forwards `ref` to its DOM node and spreads unknown props onto it.

| Child | Inferred `asChild` | Notes |
| --- | --- | --- |
| `button`, `a`, `div`, `span`, `input`, `label`, `li` | yes | Intrinsic elements always accept refs and props. |
| `Button`, `Badge`, `BreadcrumbLink`, `ButtonGroupText`, `Kbd` | yes | `forwardRef` + props spread. |
| `SidebarMenuButton`, `SidebarMenuAction`, `SidebarMenuSubButton` | yes | Spread every prop including React 19's `ref` prop. |
| Any ux `*Trigger` | yes | Lets you nest `TooltipTrigger > DropdownMenuTrigger > Button` and get one button. |
| Other intrinsic elements (`tr`, `td`, `p`, ...) | no | Trusted if you pass `asChild` yourself. |
| Your own components, `Link`, Radix primitives | no | Trusted if you pass `asChild` yourself. Make sure they forward refs and spread props. |
| `CopyButton`, `ConfirmDialog`, `FormSheet`, `MultiSearchSelect`, `Tree`, `ChartContainer`, `MapContainer`, `MasterDetailPanels`, `ResizablePanelGroup`/`ResizablePanel`/`ResizableHandle`, `Toaster` | never | Do not forward refs. `asChild` logs a development error and is ignored. Wrap them in a `<span>` if you need a trigger around them. |
| Text, numbers, fragments, arrays, `null`, conditionals | never | Not a single element. `asChild` is a type error and a development error. |

Internally this is a static `slottable` flag on the component (`true`, `false`, or unset) read by `resolveTriggerChild` in `src/lib/slot.ts`.

## Escape hatch

`asChild={false}` always wins and renders the Radix button around whatever you pass. Use it only when you deliberately want the wrapper element, and leave a comment saying why; it reintroduces the nested-button problem for interactive children.

```tsx
{/* Deliberate: the outer button is the hit target for the whole card. */}
<PopoverTrigger asChild={false}>
  <Button>...</Button>
</PopoverTrigger>
```

## Traps

### Disabled children and tooltips

A `disabled` element emits no pointer events, so a tooltip around it never opens. `TooltipTrigger` detects a slotted child with `disabled: true` and slots a focusable wrapper instead:

```html
<span data-slot="tooltip-disabled-wrapper" class="inline-flex" tabindex="0" data-state="closed">
  <button disabled>...</button>
</span>
```

The wrapper is the trigger; the button stays disabled. No app code is required.

### Nested triggers

Each trigger in a chain must slot the next. Because every ux `*Trigger` is itself slot-safe, inference handles this:

```tsx
<Tooltip>
  <TooltipTrigger>
    <DropdownMenuTrigger>
      <Button>One button</Button>
    </DropdownMenuTrigger>
  </TooltipTrigger>
  <TooltipContent>Actions</TooltipContent>
</Tooltip>
```

### Handlers on the child

Radix composes child handlers with its own, so a child `onClick` that calls `stopPropagation` still runs and the menu still opens (menus open on pointer down). A child `onPointerDown` that calls `preventDefault` will stop the menu from opening; use `onClick` for side effects instead.

### Styled triggers

`TabsTrigger` and `AccordionTrigger` are styled triggers whose children are content, not a replacement element. They never infer `asChild`. `TabsTrigger` validates an explicit `asChild`; `AccordionTrigger` appends a chevron sibling and cannot be slotted.

## Types

`TriggerChildProps<P>` is exported for wrappers that forward trigger props:

```ts
type TriggerChildProps<P> = Omit<P, "asChild" | "children"> &
  ({ asChild: true; children: React.ReactElement } | { asChild?: false; children?: React.ReactNode })
```

With `asChild: true`, `children` must be a single `React.ReactElement`.
