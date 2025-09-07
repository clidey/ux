import {defineConfig} from 'vitest/config'
import path from 'path'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.ts',
        exclude: [
            'node_modules/**',
            'dist/**',
            'src/showcases/**',
            'src/index.ts',
        ],
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
                'dist/**',
                'src/showcases/**',
                'src/index.ts',
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})