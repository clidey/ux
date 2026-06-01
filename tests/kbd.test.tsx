import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Kbd } from '@/components/ui/kbd';

describe('Kbd', () => {
    it('should render children', () => {
        render(<Kbd>⌘</Kbd>);
        expect(screen.getByText('⌘')).toBeInTheDocument();
    });

    it('should have data-slot attribute', () => {
        const { container } = render(<Kbd>K</Kbd>);
        expect(container.querySelector('[data-slot="kbd"]')).toBeInTheDocument();
    });

    it('should merge className', () => {
        const { container } = render(<Kbd className="custom-class">X</Kbd>);
        const kbd = container.querySelector('kbd');
        expect(kbd).toHaveClass('custom-class');
    });

    it('should render as kbd element', () => {
        const { container } = render(<Kbd>Enter</Kbd>);
        expect(container.querySelector('kbd')).toBeInTheDocument();
    });
});
