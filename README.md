# @clidey/ux

A modern React UI component library built with Tailwind CSS and Radix UI primitives.

## Features

- 🎨 **Modern Design**: Clean, accessible components with a modern aesthetic
- 🌙 **Dark Mode**: Built-in dark mode support with theme switching
- ♿ **Accessible**: Built on Radix UI primitives for excellent accessibility
- 🎯 **TypeScript**: Full TypeScript support with proper type definitions
- 🚀 **Lightweight**: Optimized bundle size with tree-shaking support
- 🎨 **Customizable**: Easy to customize with Tailwind CSS classes

## Installation

```bash
npm install @clidey/ux
# or
yarn add @clidey/ux
# or
pnpm add @clidey/ux
```

## Quick Start

```tsx
import { Button, Card, ThemeProvider } from '@clidey/ux'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="my-app-theme">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Clidey UX</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Click me</Button>
        </CardContent>
      </Card>
    </ThemeProvider>
  )
}
```

**Note:** Styles are automatically included when you import components. No additional CSS imports are required.

## Components

### Layout Components

- **Card** - Container component with header, content, and footer sections
- **Skeleton** - Loading state component

### Form Components

- **Button** - Button component with multiple variants and sizes
- **Input** - Input field component
- **Label** - Form label component

### Navigation Components

- **Breadcrumb** - Hierarchical navigation component
- **Pagination** - Page navigation component
- **Tabs** - Tabbed interface component

### Data Display Components

- **Badge** - Status and label component
- **Table** - Data table component
- **Tooltip** - Tooltip component

### Overlay Components

- **ContextMenu** - Context menu component
- **Drawer** - Slide-out drawer component
- **DropdownMenu** - Dropdown menu component
- **Popover** - Popover component

### Feedback Components

- **Toaster** - Toast notification component

### Theme Components

- **ThemeProvider** - Theme context provider
- **ModeToggle** - Theme toggle button

## Usage Examples

### Basic Button

```tsx
import { Button } from '@clidey/ux'

function MyComponent() {
  return (
    <div>
      <Button>Default Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

### Card with Content

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@clidey/ux'

function MyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content of the card.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}
```

### Form with Input

```tsx
import { Input, Label, Button } from '@clidey/ux'

function MyForm() {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Enter your email" />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  )
}
```

### Table with Data

```tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Badge } from '@clidey/ux'

function MyTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell><Badge>Active</Badge></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
```

### Theme Setup

```tsx
import { ThemeProvider, ModeToggle } from '@clidey/ux'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="my-app-theme">
      <div>
        <ModeToggle />
        {/* Your app content */}
      </div>
    </ThemeProvider>
  )
}
```

## Styling

The components are built with Tailwind CSS v4 and include all necessary styles automatically. When you import any component, the styles are automatically included in your bundle.

### Requirements

To use the components properly, you need to have Tailwind CSS v4 installed in your project:

```bash
npm install tailwindcss@next
```

### Configuration

Configure your build tool to process CSS. For example, with Vite:

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
      ],
    },
  },
})
```

### CSS Variables

The package provides CSS custom properties for theming that are automatically included:

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... more variables */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode variables */
}
```

### Troubleshooting

If the styles aren't loading properly:

1. **Check your build tool configuration** - Make sure CSS imports are being processed
2. **Verify Tailwind CSS version** - Ensure you're using Tailwind CSS v4
3. **Clear cache** - Try clearing your build cache and node_modules

## Dependencies

This package has the following peer dependencies:

- `react` (^18.0.0 || ^19.0.0)
- `react-dom` (^18.0.0 || ^19.0.0)

And the following dependencies:

- `@radix-ui/react-*` - UI primitives
- `class-variance-authority` - Component variants
- `clsx` - Conditional classes
- `lucide-react` - Icons
- `next-themes` - Theme management
- `sonner` - Toast notifications
- `tailwind-merge` - Tailwind class merging
- `vaul` - Drawer component

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
