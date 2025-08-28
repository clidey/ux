import {render} from '@testing-library/react';
import {Skeleton} from '../src/components/ui/skeleton';
import {describe, it, expect} from 'vitest';

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
