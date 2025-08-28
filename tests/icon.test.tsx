import {render, screen} from '@testing-library/react';
import {Icon} from '../src/components/ui/icon';
import {Home, Settings, User} from 'lucide-react';
import {describe, it, expect} from 'vitest';
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