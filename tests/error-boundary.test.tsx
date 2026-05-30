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

import {render, screen} from '@testing-library/react';
import {ComponentErrorBoundary} from '@/lib/error-boundary';
import {describe, expect, it, vi} from 'vitest';

// A component that throws an error for testing
function ThrowingComponent({message}: {message: string}) {
    throw new Error(message);
}

// A component that renders normally
function GoodComponent() {
    return <div>Working correctly</div>;
}

describe('ComponentErrorBoundary', () => {
    // Suppress React error boundary console.error output during tests
    const originalConsoleError = console.error;

    beforeEach(() => {
        console.error = vi.fn();
    });

    afterEach(() => {
        console.error = originalConsoleError;
    });

    it('should render children when no error occurs', () => {
        render(
            <ComponentErrorBoundary>
                <GoodComponent />
            </ComponentErrorBoundary>
        );

        expect(screen.getByText('Working correctly')).toBeInTheDocument();
    });

    it('should render multiple children when no error occurs', () => {
        render(
            <ComponentErrorBoundary>
                <div>Child 1</div>
                <div>Child 2</div>
            </ComponentErrorBoundary>
        );

        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('should catch errors and show default fallback when no custom fallback provided', () => {
        render(
            <ComponentErrorBoundary>
                <ThrowingComponent message="Test error" />
            </ComponentErrorBoundary>
        );

        expect(screen.getByText('Failed to render component')).toBeInTheDocument();
    });

    it('should render the default fallback with correct data-slot attribute', () => {
        const {container} = render(
            <ComponentErrorBoundary>
                <ThrowingComponent message="Test error" />
            </ComponentErrorBoundary>
        );

        const fallback = container.querySelector('[data-slot="error-boundary-fallback"]');
        expect(fallback).toBeInTheDocument();
    });

    it('should render custom fallback when provided and error occurs', () => {
        render(
            <ComponentErrorBoundary fallback={<div>Custom error message</div>}>
                <ThrowingComponent message="Test error" />
            </ComponentErrorBoundary>
        );

        expect(screen.getByText('Custom error message')).toBeInTheDocument();
        expect(screen.queryByText('Failed to render component')).not.toBeInTheDocument();
    });

    it('should call onError callback when error occurs', () => {
        const onError = vi.fn();

        render(
            <ComponentErrorBoundary onError={onError}>
                <ThrowingComponent message="callback test error" />
            </ComponentErrorBoundary>
        );

        expect(onError).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledWith(
            expect.objectContaining({message: 'callback test error'}),
            expect.objectContaining({componentStack: expect.any(String)})
        );
    });

    it('should call onError callback and render custom fallback together', () => {
        const onError = vi.fn();

        render(
            <ComponentErrorBoundary
                onError={onError}
                fallback={<div>Something went wrong</div>}
            >
                <ThrowingComponent message="combined test" />
            </ComponentErrorBoundary>
        );

        expect(onError).toHaveBeenCalledTimes(1);
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should not call onError when no error occurs', () => {
        const onError = vi.fn();

        render(
            <ComponentErrorBoundary onError={onError}>
                <GoodComponent />
            </ComponentErrorBoundary>
        );

        expect(onError).not.toHaveBeenCalled();
    });
});
