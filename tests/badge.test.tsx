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
import {Badge} from '@/components/ui/badge';
import {describe, expect, it} from 'vitest';

describe('Badge Component', () => {
    it('should render a badge with the correct text', () => {
        render(<Badge>New</Badge>);
        const badge = screen.getByText(/new/i);
        expect(badge).toBeInTheDocument();
    });

    it('should apply the default variant', () => {
        render(<Badge>New</Badge>);
        const badge = screen.getByText(/new/i);
        expect(badge).toHaveClass('bg-primary');
    });

    it('should apply the destructive variant', () => {
        render(<Badge variant="destructive">New</Badge>);
        const badge = screen.getByText(/new/i);
        expect(badge).toHaveClass('bg-destructive');
    });

    it('should render with no children', () => {
        render(<Badge/>);
        const badge = screen.queryByText(/.+/);
        expect(badge).not.toBeInTheDocument();
    });

    it('should handle null children', () => {
        render(<Badge>{null}</Badge>);
        const badge = screen.queryByText(/.+/);
        expect(badge).not.toBeInTheDocument();
    });
});
