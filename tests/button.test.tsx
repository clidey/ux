import {render, screen} from '@testing-library/react';
import {Button} from '../src/components/ui/button';
import {describe, it, expect, vi} from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
    it('should render a button with the correct text', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', {name: /click me/i});
        expect(button).toBeInTheDocument();
    });

    it('should apply the default variant', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', {name: /click me/i});
        expect(button).toHaveClass('bg-primary');
    });

    it('should apply the destructive variant', () => {
        render(<Button variant="destructive">Click me</Button>);
        const button = screen.getByRole('button', {name: /click me/i});
        expect(button).toHaveClass('bg-destructive');
    });

    it('should apply the outline variant', () => {
        render(<Button variant="outline">Click me</Button>);
        const button = screen.getByRole('button', {name: /click me/i});
        expect(button).toHaveClass('border');
    });

    it('should apply the secondary variant', () => {
        render(<Button variant="secondary">Click me</Button>);
        const button = screen.getByRole('button', {name: /click me/i});
        expect(button).toHaveClass('bg-secondary');
    });

    it('should apply the ghost variant', () => {
        render(<Button variant="ghost">Click me</Button>);
        const button = screen.getByRole('button', {name: /click me/i});
        expect(button).toHaveClass('hover:bg-accent');
    });

    it('should apply the link variant', () => {
        render(<Button variant="link">Click me</Button>);
        const button = screen.getByRole('button', {name: /click me/i});
        expect(button).toHaveClass('text-primary');
    });

    it('should apply the default size', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByRole('button', {name: /click me/i});
        expect(button).toHaveClass('h-9');
    });

    it('should apply the sm size', () => {
        render(<Button size="sm">Click me</Button>);
        const button = screen.getByRole('button', {name: /click me/i});
        expect(button).toHaveClass('h-8');
    });

    it('should apply the lg size', () => {
        render(<Button size="lg">Click me</Button>);
        const button = screen.getByRole('button', {name: /click me/i});
        expect(button).toHaveClass('h-10');
    });

    it('should apply the icon size', () => {
        render(<Button size="icon">X</Button>);
        const button = screen.getByRole('button', {name: /x/i});
        expect(button).toHaveClass('size-9');
    });

    it('should be disabled when the disabled prop is true', () => {
        render(<Button disabled>Click me</Button>);
        const button = screen.getByRole('button', {name: /click me/i});
        expect(button).toBeDisabled();
    });

    it('should call the onClick handler when clicked', async () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Click me</Button>);
        const button = screen.getByRole('button', {name: /click me/i});
        await userEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not call the onClick handler when disabled', async () => {
        const onClick = vi.fn();
        render(
            <Button onClick={onClick} disabled>
                Click me
            </Button>
        );
        const button = screen.getByRole('button', {name: /click me/i});
        try {
            await userEvent.click(button);
        } catch (e) {
            // userEvent.click throws an error when the element is disabled
            // so we can safely ignore it.
        }
        expect(onClick).not.toHaveBeenCalled();
    });

    it('should render as a child component when asChild is true', () => {
        render(
            <Button asChild>
                <a href="#">Click me</a>
            </Button>
        );
        const link = screen.getByRole('link', {name: /click me/i});
        expect(link).toBeInTheDocument();
    });
});
