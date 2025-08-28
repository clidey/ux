/// <reference types="vitest" />

import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react-swc"
import {defineConfig} from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'tests/',
                '*.config.*',
                'src/app.tsx',
                'src/index.tsx',
                'src/vite-env.d.ts',
            ],
        },
    },
})