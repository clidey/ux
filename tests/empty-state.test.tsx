import {render, screen} from '@testing-library/react';
import {EmptyState} from '../src/components/ui/empty-state';
import {describe, it, expect} from 'vitest';

describe('EmptyState Component', () => {
    it('should render empty state with title and description', () => {
        render(
            <EmptyState
                title="No results found"
                description="Try adjusting your search or filters"
            />
        );

        expect(screen.getByText('No results found')).toBeInTheDocument();
        expect(screen.getByText('Try adjusting your search or filters')).toBeInTheDocument();
    });

    it('should render with icon', () => {
        const Icon = () => <svg data-testid="custom-icon"/>;

        render(
            <EmptyState
                title="Empty"
                icon={<Icon/>}
            />
        );

        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('should render with action button', () => {
        render(
            <EmptyState
                title="No items"
                description=""
                icon={null}
            >
                <button>Add Item</button>
            </EmptyState>
        );

        expect(screen.getByRole('button', {name: 'Add Item'})).toBeInTheDocument();
    });

    it('should accept custom className', () => {
        const {container} = render(
            <EmptyState
                title="Empty"
                className="custom-empty"
            />
        );

        expect(container.querySelector('.custom-empty')).toBeInTheDocument();
    });

    it('should render without description', () => {
        render(
            <EmptyState title="Just a title"/>
        );

        expect(screen.getByText('Just a title')).toBeInTheDocument();
    });

    it('should render with all props', () => {
        const Icon = () => <span>📭</span>;

        render(
            <EmptyState
                title="Your inbox is empty"
                description="When you receive messages, they'll appear here"
                icon={<Icon/>}
                className="inbox-empty"
            >
                <button>Compose Message</button>
            </EmptyState>
        );

        expect(screen.getByText('Your inbox is empty')).toBeInTheDocument();
        expect(screen.getByText("When you receive messages, they'll appear here")).toBeInTheDocument();
        expect(screen.getByText('📭')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Compose Message'})).toBeInTheDocument();
    });
});