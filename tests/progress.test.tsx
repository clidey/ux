import {render, screen} from '@testing-library/react';
import {Progress} from '@/components/ui/progress';
import {describe, expect, it} from 'vitest';

describe('Progress', () => {
    it('renders a progressbar role', () => {
        render(<Progress value={50} />);
        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).toBeInTheDocument();
    });

    it('translates indicator based on value=75', () => {
        const {container} = render(<Progress value={75} />);
        const indicator = container.querySelector('[data-slot="progress-indicator"]');
        expect(indicator).toHaveStyle({transform: 'translateX(-25%)'});
    });

    it('translates indicator fully left for value=0', () => {
        const {container} = render(<Progress value={0} />);
        const indicator = container.querySelector('[data-slot="progress-indicator"]');
        expect(indicator).toHaveStyle({transform: 'translateX(-100%)'});
    });

    it('translates indicator to 0 for value=100', () => {
        const {container} = render(<Progress value={100} />);
        const indicator = container.querySelector('[data-slot="progress-indicator"]');
        expect(indicator).toHaveStyle({transform: 'translateX(-0%)'});
    });

    it('applies the indicator transform based on value', () => {
        const {container} = render(<Progress value={60} />);
        const indicator = container.querySelector('[data-slot="progress-indicator"]');
        expect(indicator).toHaveStyle({transform: 'translateX(-40%)'});
    });

    it('accepts custom className', () => {
        render(<Progress value={50} className="custom-progress" />);
        const progressbar = screen.getByRole('progressbar');
        expect(progressbar).toHaveClass('custom-progress');
    });

    it('renders with undefined value (indeterminate)', () => {
        const {container} = render(<Progress />);
        const indicator = container.querySelector('[data-slot="progress-indicator"]');
        expect(indicator).toHaveStyle({transform: 'translateX(-100%)'});
    });
});
