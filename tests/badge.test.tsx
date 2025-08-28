import {render, screen} from '@testing-library/react';
import {Badge} from '../src/components/ui/badge';
import {describe, it, expect} from 'vitest';

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
