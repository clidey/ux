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

import {render} from '@testing-library/react';
import {Skeleton} from '@/components/ui/skeleton';
import {describe, expect, it} from 'vitest';

describe('Skeleton Component', () => {
    it('should render a skeleton element', () => {
        const {container} = render(<Skeleton/>);
        const skeleton = container.firstChild;
        expect(skeleton).toBeInTheDocument();
    });

    it('should have the correct class', () => {
        const {container} = render(<Skeleton/>);
        const skeleton = container.firstChild;
        expect(skeleton).toHaveClass('animate-pulse');
    });

    it('should accept a custom class', () => {
        const {container} = render(<Skeleton className="custom-class"/>);
        const skeleton = container.firstChild;
        expect(skeleton).toHaveClass('custom-class');
    });
});
