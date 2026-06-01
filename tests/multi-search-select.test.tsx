import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MultiSearchSelect } from '@/components/ui/multi-search-select';

const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
];

describe('MultiSearchSelect', () => {
    it('should render placeholder', () => {
        render(<MultiSearchSelect options={options} placeholder="Pick..." />);
        expect(screen.getByText('Pick...')).toBeInTheDocument();
    });

    it('should have data-slot', () => {
        render(<MultiSearchSelect options={options} />);
        expect(document.querySelector('[data-slot="multi-search-select"]')).toBeInTheDocument();
    });

    it('should open popover on click', async () => {
        const user = userEvent.setup();
        render(<MultiSearchSelect options={options} />);
        await user.click(screen.getByRole('combobox'));
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('Vue')).toBeInTheDocument();
    });

    it('should call onValueChange when item selected', async () => {
        const user = userEvent.setup();
        const onChange = vi.fn();
        render(<MultiSearchSelect options={options} value={[]} onValueChange={onChange} />);
        await user.click(screen.getByRole('combobox'));
        await user.click(screen.getByText('React'));
        expect(onChange).toHaveBeenCalledWith(['react']);
    });

    it('should show count when items selected', () => {
        render(<MultiSearchSelect options={options} value={['react', 'vue']} onValueChange={() => {}} />);
        expect(screen.getByText('2 selected')).toBeInTheDocument();
    });

    it('should be disabled when disabled prop is true', () => {
        render(<MultiSearchSelect options={options} disabled />);
        expect(screen.getByRole('combobox')).toBeDisabled();
    });
});
