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
import {Separator} from '@/components/ui/separator';
import {describe, expect, it} from 'vitest';

describe('Separator Component', () => {
    it('should render a separator element', () => {
        const {container} = render(<Separator/>);
        const separator = container.firstChild;
        expect(separator).toBeInTheDocument();
    });

    it('should have a role of separator', () => {
        render(<Separator/>);
        const separator = screen.getByTestId('separator');
        expect(separator).toBeInTheDocument();
    });

    it('should be horizontal by default', () => {
        render(<Separator/>);
        const separator = screen.getByTestId('separator');
        expect(separator).toHaveAttribute('data-orientation', 'horizontal');
    });

    it('should be vertical when the orientation prop is vertical', () => {
        render(<Separator orientation="vertical"/>);
        const separator = screen.getByTestId('separator');
        expect(separator).toHaveAttribute('data-orientation', 'vertical');
    });
});
