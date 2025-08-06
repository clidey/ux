import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.lib.json"),
      rollupTypes: true,
    }),
  ],
  css: {
    modules: false,
  },
  build: { 
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'styles.css': resolve(__dirname, 'src/index.css'),
      },
      name: '@clidey/ux',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@radix-ui/react-accordion',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-context-menu',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-label',
        '@radix-ui/react-popover',
        '@radix-ui/react-scroll-area',
        '@radix-ui/react-select',
        '@radix-ui/react-separator',
        '@radix-ui/react-slot',
        '@radix-ui/react-tabs',
        '@radix-ui/react-tooltip',
        'class-variance-authority',
        'clsx',
        'cmdk',
        'lucide-react',
        'next-themes',
        'react-resizable-panels',
        'react-window',
        'sonner',
        'tailwind-merge',
        'tw-animate-css',
        'use-resize-observer',
        'vaul',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})