import {render, screen} from '@testing-library/react';
import {Checkbox} from '../src/components/ui/checkbox';
import {describe, it, expect, vi} from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Checkbox Component', () => {
    it('should render a checkbox element', () => {
        render(<Checkbox/>);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
    });

    it('should handle a change event', async () => {
        const handleChange = vi.fn();
        render(<Checkbox onCheckedChange={handleChange}/>);
        const checkbox = screen.getByRole('checkbox');
        await userEvent.click(checkbox);
        expect(handleChange).toHaveBeenCalledTimes(1);
        expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('should be disabled when the disabled prop is true', () => {
        render(<Checkbox disabled/>);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeDisabled();
    });

    it('should be checked when the checked prop is true', () => {
        render(<Checkbox checked/>);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    it('should be indeterminate when the checked prop is "indeterminate"', () => {
        render(<Checkbox checked="indeterminate"/>);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBePartiallyChecked();
    });
});
