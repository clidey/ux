import {render, screen} from '@testing-library/react';
import {ButtonGroup, ButtonGroupSeparator, ButtonGroupText} from '@/components/ui/button-group';
import {Button} from '@/components/ui/button';
import {describe, expect, it} from 'vitest';

describe('ButtonGroup', () => {
    it('renders children within a group role', () => {
        render(
            <ButtonGroup>
                <Button>First</Button>
                <Button>Second</Button>
            </ButtonGroup>
        );
        const group = screen.getByRole('group');
        expect(group).toBeInTheDocument();
        expect(screen.getByText('First')).toBeInTheDocument();
        expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('defaults to horizontal styling', () => {
        render(
            <ButtonGroup>
                <Button>A</Button>
                <Button>B</Button>
            </ButtonGroup>
        );
        const group = screen.getByRole('group');
        expect(group.className).toContain('rounded-l-none');
    });

    it('supports vertical orientation', () => {
        render(
            <ButtonGroup orientation="vertical">
                <Button>A</Button>
            </ButtonGroup>
        );
        const group = screen.getByRole('group');
        expect(group).toHaveAttribute('data-orientation', 'vertical');
        expect(group).toHaveClass('flex-col');
    });

    it('accepts custom className', () => {
        render(
            <ButtonGroup className="custom-class">
                <Button>A</Button>
            </ButtonGroup>
        );
        expect(screen.getByRole('group')).toHaveClass('custom-class');
    });
});

describe('ButtonGroupText', () => {
    it('renders text content', () => {
        render(<ButtonGroupText>Label:</ButtonGroupText>);
        expect(screen.getByText('Label:')).toBeInTheDocument();
    });

    it('applies styling classes', () => {
        render(<ButtonGroupText>Label:</ButtonGroupText>);
        const el = screen.getByText('Label:');
        expect(el).toHaveClass('bg-muted');
    });
});

describe('ButtonGroupSeparator', () => {
    it('renders a separator with correct data-slot', () => {
        const {container} = render(
            <ButtonGroup>
                <Button>A</Button>
                <ButtonGroupSeparator />
                <Button>B</Button>
            </ButtonGroup>
        );
        const separator = container.querySelector('[data-slot="button-group-separator"]');
        expect(separator).toBeInTheDocument();
    });
});
