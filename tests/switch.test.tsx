import {render, screen} from '@testing-library/react';
import {Switch} from '../src/components/ui/switch';
import {describe, it, expect, vi} from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Switch Component', () => {
    it('should render a switch element', () => {
        render(<Switch/>);
        const switchEl = screen.getByRole('switch');
        expect(switchEl).toBeInTheDocument();
    });

    it('should handle a change event', async () => {
        const handleChange = vi.fn();
        render(<Switch onCheckedChange={handleChange}/>);
        const switchEl = screen.getByRole('switch');
        await userEvent.click(switchEl);
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should be disabled when the disabled prop is true', () => {
        render(<Switch disabled/>);
        const switchEl = screen.getByRole('switch');
        expect(switchEl).toBeDisabled();
    });

    it('should be checked when the checked prop is true', () => {
        render(<Switch checked/>);
        const switchEl = screen.getByRole('switch');
        expect(switchEl).toBeChecked();
    });
});
