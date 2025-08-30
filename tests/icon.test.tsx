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
import {Icon} from '@/components/ui/icon';
import {Home, Settings, User} from 'lucide-react';
import {describe, expect, it} from 'vitest';
import React from 'react';

describe('Icon Component', () => {
    it('should render icon element', () => {
        render(<Icon icon={<Home/>}/>);

        const icon = document.querySelector('svg');
        expect(icon).toBeInTheDocument();
    });

    it('should render with different sizes', () => {
        const {container} = render(<Icon icon={<Settings/>} size={32}/>);

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', '32');
        expect(svg).toHaveAttribute('height', '32');
    });

    it('should accept custom className', () => {
        const {container} = render(
            <Icon icon={<User/>} className="custom-icon text-blue-500"/>
        );

        const wrapper = container.querySelector('span');
        expect(wrapper).toHaveClass('custom-icon');
        expect(wrapper).toHaveClass('text-blue-500');
    });

    it('should render with custom component', () => {
        const CustomIcon = () => <svg data-testid="custom-svg"/>;
        render(<Icon icon={<CustomIcon/>}/>);

        const icon = screen.getByTestId('custom-svg');
        expect(icon).toBeInTheDocument();
    });

    it('should pass size prop to icon', () => {
        const {container} = render(
            <Icon
                icon={<Settings/>}
                size={48}
                data-testid="icon-wrapper"
            />
        );

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', '48');
        expect(svg).toHaveAttribute('height', '48');
    });

    it('should apply default size', () => {
        const {container} = render(<Icon icon={<Home/>}/>);

        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('width', '24');
        expect(svg).toHaveAttribute('height', '24');
    });

    it('should combine wrapper className', () => {
        const {container} = render(
            <Icon icon={<Home/>} className="text-green-600 p-2"/>
        );

        const wrapper = container.querySelector('span');
        expect(wrapper).toHaveClass('text-green-600');
        expect(wrapper).toHaveClass('p-2');
    });
});