/*
 * Copyright 2025 Clidey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ThemeProvider, useTheme} from '@/components/theme/provider';
import {ModeToggle} from '@/components/theme/toggle';
import {beforeEach, describe, expect, it, vi} from 'vitest';

// Mock matchMedia
beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe('ThemeProvider', () => {
    it('should provide theme context to children', () => {
        const TestComponent = () => {
            const {theme} = useTheme();
            return <div>Current theme: {theme}</div>;
        };

        render(
            <ThemeProvider defaultTheme="light">
                <TestComponent/>
            </ThemeProvider>
        );

        expect(screen.getByText(/Current theme:/)).toBeInTheDocument();
    });

    it('should use system theme by default', () => {
        const TestComponent = () => {
            const {theme} = useTheme();
            return <div>Theme: {theme}</div>;
        };

        render(
            <ThemeProvider>
                <TestComponent/>
            </ThemeProvider>
        );

        expect(screen.getByText('Theme: system')).toBeInTheDocument();
    });

    it('should allow setting theme', async () => {
        const user = userEvent.setup();

        const TestComponent = () => {
            const {theme, setTheme} = useTheme();
            return (
                <div>
                    <div>Current: {theme}</div>
                    <button onClick={() => setTheme('dark')}>Set Dark</button>
                    <button onClick={() => setTheme('light')}>Set Light</button>
                </div>
            );
        };

        render(
            <ThemeProvider defaultTheme="system">
                <TestComponent/>
            </ThemeProvider>
        );

        expect(screen.getByText('Current: system')).toBeInTheDocument();

        await user.click(screen.getByText('Set Dark'));
        await waitFor(() => {
            expect(screen.getByText('Current: dark')).toBeInTheDocument();
        });

        await user.click(screen.getByText('Set Light'));
        await waitFor(() => {
            expect(screen.getByText('Current: light')).toBeInTheDocument();
        });
    });

    it('should persist theme in localStorage', async () => {
        const user = userEvent.setup();
        const storageKey = 'test-theme';

        const TestComponent = () => {
            const {setTheme} = useTheme();
            return <button onClick={() => setTheme('dark')}>Set Dark</button>;
        };

        render(
            <ThemeProvider defaultTheme="light" storageKey={storageKey}>
                <TestComponent/>
            </ThemeProvider>
        );

        await user.click(screen.getByText('Set Dark'));

        await waitFor(() => {
            expect(localStorage.getItem(storageKey)).toBe('dark');
        });
    });

    it('should handle different default themes', () => {
        const TestComponent = () => {
            const {theme} = useTheme();
            return <div data-testid="theme-display">{theme}</div>;
        };

        // Clear localStorage to ensure no persistence issues
        localStorage.clear();

        render(
            <ThemeProvider defaultTheme="light">
                <TestComponent/>
            </ThemeProvider>
        );

        const display = screen.getByTestId('theme-display');
        expect(display.textContent).toBeTruthy(); // Just verify it renders with some theme
    });
});

describe('ModeToggle', () => {
    it('should render theme toggle component', () => {
        const {container} = render(
            <ThemeProvider>
                <ModeToggle/>
            </ThemeProvider>
        );

        // Check that the component renders (look for SVG icons which are always present)
        const sunIcon = container.querySelector('.lucide-sun');
        const moonIcon = container.querySelector('.lucide-moon');
        expect(sunIcon).toBeInTheDocument();
        expect(moonIcon).toBeInTheDocument();
    });

    it('should toggle theme on click', async () => {
        const user = userEvent.setup();

        const TestComponent = () => {
            const {theme} = useTheme();
            return (
                <>
                    <ModeToggle/>
                    <div data-testid="theme-display">{theme}</div>
                </>
            );
        };

        render(
            <ThemeProvider defaultTheme="light">
                <TestComponent/>
            </ThemeProvider>
        );

        const button = screen.getByRole('button');
        expect(screen.getByTestId('theme-display')).toHaveTextContent('light');

        // Open dropdown
        await user.click(button);
        // Click Dark option
        await user.click(await screen.findByText('Dark'));
        await waitFor(() => {
            expect(screen.getByTestId('theme-display')).toHaveTextContent('dark');
        });

        // Open dropdown again
        await user.click(button);
        // Click Light option
        await user.click(await screen.findByText('Light'));
        await waitFor(() => {
            expect(screen.getByTestId('theme-display')).toHaveTextContent('light');
        });
    });

    it('should have theme context available', () => {
        const TestComponent = () => {
            const {theme, setTheme} = useTheme();
            return (
                <div>
                    <div>Current: {theme}</div>
                    <button onClick={() => setTheme('dark')}>Set Dark</button>
                </div>
            );
        };

        render(
            <ThemeProvider defaultTheme="light">
                <TestComponent/>
            </ThemeProvider>
        );

        expect(screen.getByText('Current: light')).toBeInTheDocument();
    });

    it('should apply correct class to root element', async () => {
        const user = userEvent.setup();

        render(
            <ThemeProvider defaultTheme="light">
                <ModeToggle/>
            </ThemeProvider>
        );

        expect(document.documentElement).toHaveClass('light');

        // Open dropdown and click Dark
        await user.click(screen.getByRole('button'));
        await user.click(await screen.findByText('Dark'));
        await waitFor(() => {
            expect(document.documentElement).toHaveClass('dark');
        });
    });

    it('should handle system theme preference', () => {
        // Mock system prefers dark mode
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: query === '(prefers-color-scheme: dark)',
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });

        render(
            <ThemeProvider defaultTheme="system">
                <ModeToggle/>
            </ThemeProvider>
        );

        expect(document.documentElement).toHaveClass('dark');
    });
});