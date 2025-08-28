import {render, screen} from '@testing-library/react';
import {Separator} from '../src/components/ui/separator';
import {describe, it, expect} from 'vitest';

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
