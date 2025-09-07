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
import {ScrollArea} from '@/components/ui/scroll-area';
import {describe, expect, it} from 'vitest';

describe('ScrollArea Component', () => {
    it('should render content within scroll area', () => {
        render(
            <ScrollArea className="h-[200px] w-[350px]">
                <div>
                    <p>Content line 1</p>
                    <p>Content line 2</p>
                    <p>Content line 3</p>
                </div>
            </ScrollArea>
        );

        expect(screen.getByText('Content line 1')).toBeInTheDocument();
        expect(screen.getByText('Content line 2')).toBeInTheDocument();
        expect(screen.getByText('Content line 3')).toBeInTheDocument();
    });

    it('should accept custom className', () => {
        const {container} = render(
            <ScrollArea className="custom-scroll-area">
                <div>Scrollable content</div>
            </ScrollArea>
        );

        const scrollArea = container.querySelector('.custom-scroll-area');
        expect(scrollArea).toBeInTheDocument();
    });

    it('should handle long content', () => {
        const longContent = Array.from({length: 50}, (_, i) => `Item ${i + 1}`);

        render(
            <ScrollArea className="h-[200px]">
                {longContent.map((item, index) => (
                    <div key={index}>{item}</div>
                ))}
            </ScrollArea>
        );

        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 50')).toBeInTheDocument();
    });

    it('should render with horizontal content', () => {
        render(
            <ScrollArea className="w-[200px]">
                <div className="flex w-max">
                    <div>Column 1</div>
                    <div>Column 2</div>
                    <div>Column 3</div>
                </div>
            </ScrollArea>
        );

        expect(screen.getByText('Column 1')).toBeInTheDocument();
        expect(screen.getByText('Column 2')).toBeInTheDocument();
        expect(screen.getByText('Column 3')).toBeInTheDocument();
    });

    it('should handle nested scroll areas', () => {
        render(
            <ScrollArea className="h-[300px]">
                <div>Outer content</div>
                <ScrollArea className="h-[100px]">
                    <div>Inner content</div>
                </ScrollArea>
            </ScrollArea>
        );

        expect(screen.getByText('Outer content')).toBeInTheDocument();
        expect(screen.getByText('Inner content')).toBeInTheDocument();
    });
});