import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  css: {
    modules: false,
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ClideyUX',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@radix-ui/react-context-menu',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-label',
        '@radix-ui/react-popover',
        '@radix-ui/react-slot',
        '@radix-ui/react-tabs',
        '@radix-ui/react-tooltip',
        'class-variance-authority',
        'clsx',
        'lucide-react',
        'next-themes',
        'sonner',
        'tailwind-merge',
        'vaul',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
}) 