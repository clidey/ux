import {render, screen} from '@testing-library/react';
import {Label} from '../src/components/ui/label';
import {describe, it, expect} from 'vitest';

describe('Label Component', () => {
    it('should render a label with the correct text', () => {
        render(<Label>Username</Label>);
        const label = screen.getByText(/username/i);
        expect(label).toBeInTheDocument();
    });

    it('should have the correct "for" attribute', () => {
        render(<Label htmlFor="username">Username</Label>);
        const label = screen.getByText(/username/i);
        expect(label).toHaveAttribute('for', 'username');
    });

    it('should render with no children', () => {
        render(<Label/>);
        expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
    });

    it('should handle null children', () => {
        render(<Label>{null}</Label>);
        expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
    });
});
