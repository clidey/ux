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