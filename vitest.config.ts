import {defineConfig} from 'vitest/config'
import react from '@vitejs/plugin-react'
// @ts-ignore
import path from 'path'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'happy-dom',
        setupFiles: './tests/setup.ts',
        include: ['tests/**/*.test.{ts,tsx}'],
        exclude: [
            '**/node_modules/**',
            '.dory/**',
            'dist/**',
            'src/showcases/**',
            'src/index.ts',
        ],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                '**/node_modules/**',
                '.dory/**',
                'tests/',
                '*.config.*',
                'src/app.tsx',
                'src/index.tsx',
                'src/vite-env.d.ts',
                'dist/**',
                'src/showcases/**',
                'src/index.ts',
            ],
        },
    },
    resolve: {
        alias: {
            '@clidey/ux/icons': path.resolve(__dirname, './icons/index.js'),
            '@': path.resolve(__dirname, './src'),
            '@clidey/ux': path.resolve(__dirname, './src/index.ts'),
        },
    },
})