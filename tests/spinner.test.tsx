import {render, screen} from '@testing-library/react';
import {Spinner} from '../src/components/ui/spinner';
import {describe, it, expect} from 'vitest';

describe('Spinner Component', () => {
    it('should render a spinner element', () => {
        render(<Spinner/>);
        const spinner = screen.getByRole('status');
        expect(spinner).toBeInTheDocument();
    });

    it('should have the correct class', () => {
        render(<Spinner/>);
        const spinner = screen.getByRole('status');
        expect(spinner).toHaveAttribute('role', 'status');
    });

    it('should accept a custom class', () => {
        render(<Spinner className="custom-class"/>);
        const spinner = screen.getByRole('status');
        expect(spinner).toHaveClass('custom-class');
    });
});
