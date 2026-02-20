<p align="center">
  <img src="./docs/logo/logo.png" alt="Clidey UX" height="72" />
</p>

<p align="center">
  <strong>A production-ready React component library built on Radix UI and Tailwind CSS v4.</strong><br/>
  37+ accessible, composable, dark-mode-ready components — drop in and ship.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@clidey/ux">
    <img src="https://img.shields.io/npm/v/@clidey/ux?color=6366f1&labelColor=18181b&style=flat-square" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/@clidey/ux">
    <img src="https://img.shields.io/npm/dm/@clidey/ux?color=6366f1&labelColor=18181b&style=flat-square" alt="downloads" />
  </a>
  <a href="https://github.com/clidey/ux/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-6366f1?labelColor=18181b&style=flat-square" alt="MIT license" />
  </a>
  <img src="https://img.shields.io/badge/React-18%20%7C%2019-6366f1?labelColor=18181b&style=flat-square" alt="React 18/19" />
  <img src="https://img.shields.io/badge/TypeScript-ready-6366f1?labelColor=18181b&style=flat-square" alt="TypeScript" />
</p>

---

## Why Clidey UX?

Building a consistent, accessible UI from scratch takes weeks. Clidey UX gives you a complete set of polished components so you can focus on your product, not your design system.

- **Accessible by default** — every component is built on [Radix UI](https://radix-ui.com) primitives. Keyboard navigation, focus management, and ARIA attributes are handled for you.
- **Dark mode included** — wrap your app with `ThemeProvider` and all components adapt automatically. System preference detection and `localStorage` persistence built in.
- **Fully typed** — complete TypeScript definitions with strict mode. Autocomplete for every prop, variant, and event handler.
- **Composable API** — sub-component patterns give you full control over layout and markup without fighting against an opinionated structure.
- **Tailwind CSS v4** — styled with utility classes you already know. Override anything with `className`.
- **Zero configuration** — one import, one stylesheet, done.

---

## Installation

```bash
npm install @clidey/ux
# or
pnpm add @clidey/ux
# or
yarn add @clidey/ux
```

**Import the stylesheet once** at your app entry point:

```tsx
// main.tsx / _app.tsx
import '@clidey/ux/styles.css';
```

**Wrap with ThemeProvider** to enable dark mode:

```tsx
import { ThemeProvider } from '@clidey/ux';

export default function App() {
  return (
    <ThemeProvider defaultTheme="system">
      {/* your app */}
    </ThemeProvider>
  );
}
```

That's it. No extra configuration, no Tailwind setup required in your project.

---

## Quick start

```tsx
import {
  Button,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Badge,
  Input,
  Label,
} from '@clidey/ux';
import '@clidey/ux/styles.css';

export default function Example() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Get started in seconds. No credit card required.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" showPasswordToggle />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Badge variant="outline">Free plan</Badge>
        <Button>Create account</Button>
      </CardFooter>
    </Card>
  );
}
```

---

## Components

### Actions
| Component | Description |
| --- | --- |
| `Button` | 6 variants (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`) · 4 sizes |
| `ButtonGroup` | Connected button strip for toolbars and segmented controls |

### Inputs
| Component | Description |
| --- | --- |
| `Input` | Text field with optional password toggle |
| `TextArea` | Multi-line text input |
| `SearchInput` | Text field with built-in search icon |
| `Checkbox` | Accessible checkbox with indeterminate state |
| `Switch` | Toggle for boolean settings |
| `Select` | Composable dropdown selector |
| `SearchSelect` | Dropdown with search filtering and icon support |
| `Label` | Accessible form label |

### Display
| Component | Description |
| --- | --- |
| `Badge` | Status and category labels · 4 variants |
| `Card` | Container with header, content, footer, and action slots |
| `Alert` | Inline feedback messages · `default` and `destructive` |
| `Spinner` | Animated loader · 5 color variants · 3 sizes |
| `Skeleton` | Pulsing placeholder for loading states |
| `Progress` | Linear progress bar |
| `EmptyState` | Placeholder for empty lists and zero-state screens |
| `Separator` | Horizontal or vertical divider |

### Navigation
| Component | Description |
| --- | --- |
| `Tabs` | Tab panels for switching between sections |
| `Breadcrumb` | Hierarchical path with ellipsis support |
| `Pagination` | Previous / next and numbered page controls |
| `Sidebar` | Full sidebar with collapsible menus, submenus, mobile support |

### Overlays
| Component | Description |
| --- | --- |
| `Dialog` | Modal with focus trap and scroll lock |
| `AlertDialog` | Blocking confirmation for destructive actions |
| `Drawer` | Slide-in panel from any edge (powered by Vaul) |
| `Sheet` | Side panel overlay (powered by Radix Dialog) |
| `Tooltip` | Hover label with configurable delay and position |
| `Popover` | Click-anchored floating panel |

### Menus
| Component | Description |
| --- | --- |
| `DropdownMenu` | Trigger menu with checkboxes, radio groups, and sub-menus |
| `ContextMenu` | Right-click menu with the same rich item types |
| `Command` | Fuzzy-search command palette (⌘K) powered by cmdk |

### Layout
| Component | Description |
| --- | --- |
| `Accordion` | Collapsible sections with animated expand/collapse |
| `ResizablePanelGroup` | Drag-to-resize split views |
| `ScrollArea` | Custom scrollbar with styled track and thumb |
| `StackList` | Key-value metadata list with separators |

### Data & Visualization
| Component | Description |
| --- | --- |
| `Table` | Full table with virtualization for large datasets and JSON preview |
| `Chart` | Recharts wrapper with theme-aware tooltips and legend |
| `Tree` | Hierarchical tree / file explorer with expand and selection |

### Utilities
| Component | Description |
| --- | --- |
| `Icon` | SVG wrapper with consistent sizing |
| `Toaster` | Toast notifications powered by Sonner |

### Theme
| Component / Hook | Description |
| --- | --- |
| `ThemeProvider` | Context provider for light / dark / system theme |
| `useTheme` | Hook to read and set the active theme |
| `ModeToggle` | Ready-made dropdown to switch themes |

---

## Usage examples

### Confirmation dialog

```tsx
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent,
  AlertDialogHeader, AlertDialogTitle, AlertDialogDescription,
  AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
  Button,
} from '@clidey/ux';

<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. Your data will be permanently deleted.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Delete account</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Toast notifications

```tsx
import { Toaster, toast } from '@clidey/ux';

// In your root layout
<Toaster />

// Anywhere in your app
toast.success('Saved successfully!');
toast.error('Something went wrong.');
toast.promise(saveData(), {
  loading: 'Saving...',
  success: 'Done!',
  error: 'Failed to save.',
});
```

### Command palette (⌘K)

```tsx
import {
  CommandDialog, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem,
} from '@clidey/ux';

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Search commands..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Navigation">
      <CommandItem onSelect={() => navigate('/dashboard')}>Dashboard</CommandItem>
      <CommandItem onSelect={() => navigate('/settings')}>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>
```

### Large dataset table with virtualization

```tsx
import {
  TableProvider, Table, TableHeader, TableHeadRow,
  TableHead, VirtualizedTableBody, TableRow, TableCell,
} from '@clidey/ux';

<TableProvider columnCount={3}>
  <Table>
    <TableHeader>
      <TableHeadRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Status</TableHead>
      </TableHeadRow>
    </TableHeader>
    <VirtualizedTableBody rowCount={10000} rowHeight={48} height={400}>
      {({ index, style }) => (
        <TableRow style={style}>
          <TableCell>{rows[index].id}</TableCell>
          <TableCell>{rows[index].name}</TableCell>
          <TableCell>{rows[index].status}</TableCell>
        </TableRow>
      )}
    </VirtualizedTableBody>
  </Table>
</TableProvider>
```

---

## Theming

All visual tokens are exposed as CSS custom properties. Override them in your own stylesheet after importing `@clidey/ux/styles.css`:

```css
:root {
  --primary: 250 84% 54%;          /* your brand color */
  --radius: 0.375rem;              /* border radius */
}
```

Dark mode is automatic — `ThemeProvider` applies a `dark` class to `<html>` and all components respond to it via Tailwind's `dark:` modifier.

---

## Next.js

```tsx
// app/providers.tsx
'use client';
import { ThemeProvider } from '@clidey/ux';

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider defaultTheme="system">{children}</ThemeProvider>;
}

// app/layout.tsx
import '@clidey/ux/styles.css';
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## Peer dependencies

| Package | Version |
| --- | --- |
| `react` | `>= 18.3.0` |
| `react-dom` | `>= 18.3.0` |

All other dependencies (Radix UI, Lucide, Recharts, Sonner, Vaul, cmdk) are bundled — no extra installs needed.

---

## Contributing

Contributions, bug reports, and feature requests are welcome. Please open an issue or pull request on [GitHub](https://github.com/clidey/ux).

## License

MIT — free to use in personal and commercial projects.
