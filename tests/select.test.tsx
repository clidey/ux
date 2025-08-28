import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
    SelectGroup,
    SelectLabel,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
    SearchSelect,
} from '../src/components/ui/select';
import {describe, it, expect, vi} from 'vitest';

describe('Select Component', () => {
    it('should open, select an item, and close the select menu', async () => {
        const user = userEvent.setup();
        render(
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Theme"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
            </Select>
        );

        const trigger = screen.getByRole('combobox');
        expect(screen.queryByRole('option', {name: 'Light'})).not.toBeInTheDocument();

        // Open the select
        await user.click(trigger);

        // Wait for content to appear (portaled content)
        const lightOption = await screen.findByRole('option', {name: 'Light'});
        expect(lightOption).toBeInTheDocument();

        // Select an item
        await user.click(lightOption);

        // Verify the value updated and the menu closed
        await waitFor(() => {
            expect(screen.queryByRole('option', {name: 'Light'})).not.toBeInTheDocument();
        });
        expect(trigger).toHaveTextContent('Light');
    });

    it('should call onValueChange when an item is selected', async () => {
        const user = userEvent.setup();
        const onValueChange = vi.fn();
        render(
            <Select onValueChange={onValueChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Theme"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
            </Select>
        );

        await user.click(screen.getByRole('combobox'));
        await user.click(await screen.findByText('Dark'));

        expect(onValueChange).toHaveBeenCalledWith('dark');
    });

    it('should be navigable with a keyboard', async () => {
        const user = userEvent.setup();
        render(
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Theme"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                </SelectContent>
            </Select>
        );

        const trigger = screen.getByRole('combobox');
        await user.click(trigger);
        const lightOption = await screen.findByRole('option', {name: 'Light'});
        expect(lightOption).toBeInTheDocument();

        await user.keyboard('{arrowdown}');
        await user.keyboard('{enter}');
        await waitFor(() => {
            expect(trigger).toHaveTextContent('Dark');
        });
    });

    it('should be disabled', async () => {
        const user = userEvent.setup();
        render(
            <Select disabled>
                <SelectTrigger>
                    <SelectValue placeholder="Theme"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                </SelectContent>
            </Select>
        );

        const trigger = screen.getByRole('combobox');
        expect(trigger).toBeDisabled();
        await user.click(trigger);
        expect(screen.queryByText('Light')).not.toBeInTheDocument();
    });

    it('should render with groups and labels', async () => {
        const user = userEvent.setup();
        render(
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select a fruit"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                    </SelectGroup>
                    <SelectSeparator/>
                    <SelectGroup>
                        <SelectLabel>Vegetables</SelectLabel>
                        <SelectItem value="carrot">Carrot</SelectItem>
                        <SelectItem value="lettuce">Lettuce</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        );

        await user.click(screen.getByRole('combobox'));

        expect(await screen.findByText('Fruits')).toBeInTheDocument();
        expect(screen.getByText('Vegetables')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Carrot')).toBeInTheDocument();
    });

    it('should handle scroll buttons', async () => {
        const user = userEvent.setup();
        render(
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Select"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectScrollUpButton/>
                    <SelectGroup>
                        {Array.from({length: 20}, (_, i) => (
                            <SelectItem key={i} value={`item-${i}`}>
                                Item {i}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                    <SelectScrollDownButton/>
                </SelectContent>
            </Select>
        );

        await user.click(screen.getByRole('combobox'));
        await screen.findByText('Item 0');
    });

    it('should handle controlled value', async () => {
        const user = userEvent.setup();
        const Component = () => {
            const [value, setValue] = React.useState('light');
            return (
                <Select value={value} onValueChange={setValue}>
                    <SelectTrigger>
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                </Select>
            );
        };

        const React = await import('react');
        render(<Component/>);

        const trigger = screen.getByRole('combobox');
        expect(trigger).toHaveTextContent('Light');

        await user.click(trigger);
        await user.click(await screen.findByText('Dark'));

        await waitFor(() => {
            expect(trigger).toHaveTextContent('Dark');
        });
    });

    it('should handle defaultValue', () => {
        render(
            <Select defaultValue="dark">
                <SelectTrigger>
                    <SelectValue/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                </SelectContent>
            </Select>
        );

        expect(screen.getByRole('combobox')).toHaveTextContent('Dark');
    });

    it('should apply custom className', () => {
        render(
            <Select>
                <SelectTrigger className="custom-trigger">
                    <SelectValue className="custom-value" placeholder="Select"/>
                </SelectTrigger>
                <SelectContent className="custom-content">
                    <SelectItem value="test" className="custom-item">
                        Test
                    </SelectItem>
                </SelectContent>
            </Select>
        );

        expect(screen.getByRole('combobox')).toHaveClass('custom-trigger');
    });

    it('should handle disabled items', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(
            <Select onValueChange={handleChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Select"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="enabled">Enabled</SelectItem>
                    <SelectItem value="disabled" disabled>
                        Disabled
                    </SelectItem>
                </SelectContent>
            </Select>
        );

        await user.click(screen.getByRole('combobox'));

        const disabledItem = await screen.findByText('Disabled');
        await user.click(disabledItem);

        expect(handleChange).not.toHaveBeenCalled();
    });

    it('should handle open state change', async () => {
        const user = userEvent.setup();
        const handleOpenChange = vi.fn();

        render(
            <Select onOpenChange={handleOpenChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Select"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="test">Test</SelectItem>
                </SelectContent>
            </Select>
        );

        await user.click(screen.getByRole('combobox'));
        expect(handleOpenChange).toHaveBeenCalledWith(true);

        await user.keyboard('{Escape}');
        expect(handleOpenChange).toHaveBeenCalledWith(false);
    });
});

describe('SearchSelect Component', () => {
    const options = [
        {value: 'light', label: 'Light'},
        {value: 'dark', label: 'Dark'},
        {value: 'system', label: 'System'},
    ];

    it('should filter options based on search', async () => {
        const user = userEvent.setup();
        render(<SearchSelect options={options}/>);

        await user.click(screen.getByRole('combobox'));
        const searchInput = await screen.findByPlaceholderText('Search...');
        await user.type(searchInput, 'ark');

        expect(screen.getByText('Dark')).toBeInTheDocument();
        expect(screen.queryByText('Light')).not.toBeInTheDocument();
    });

    it('should handle value selection in search select', async () => {
        const user = userEvent.setup();
        const handleChange = vi.fn();

        render(
            <SearchSelect
                options={options}
                onValueChange={handleChange}
                placeholder="Select theme"
            />
        );

        await user.click(screen.getByRole('combobox'));
        await user.click(await screen.findByText('System'));

        expect(handleChange).toHaveBeenCalledWith('system');
    });

    it('should show no results when search has no matches', async () => {
        const user = userEvent.setup();
        render(
            <SearchSelect
                options={options}
                notFoundMessage="No theme found"
            />
        );

        await user.click(screen.getByRole('combobox'));
        const searchInput = await screen.findByPlaceholderText('Search...');
        await user.type(searchInput, 'xyz');

        expect(await screen.findByText('No theme found')).toBeInTheDocument();
    });

    it('should handle defaultValue in search select', () => {
        render(
            <SearchSelect
                options={options}
                defaultValue="dark"
            />
        );

        expect(screen.getByRole('combobox')).toHaveTextContent('Dark');
    });

    it('should be disabled in search select', async () => {
        const user = userEvent.setup();
        render(
            <SearchSelect
                options={options}
                disabled
            />
        );

        const trigger = screen.getByRole('combobox');
        expect(trigger).toBeDisabled();
        await user.click(trigger);
        expect(screen.queryByPlaceholderText('Search...')).not.toBeInTheDocument();
    });

    it('should handle controlled value in search select', async () => {
        const user = userEvent.setup();
        const Component = () => {
            const [value, setValue] = React.useState('light');
            return (
                <SearchSelect
                    options={options}
                    value={value}
                    onValueChange={setValue}
                />
            );
        };

        const React = await import('react');
        render(<Component/>);

        const trigger = screen.getByRole('combobox');
        expect(trigger).toHaveTextContent('Light');

        await user.click(trigger);
        await user.click(await screen.findByText('Dark'));

        await waitFor(() => {
            expect(trigger).toHaveTextContent('Dark');
        });
    });

    it('should clear search on close', async () => {
        const user = userEvent.setup();
        render(<SearchSelect options={options}/>);

        await user.click(screen.getByRole('combobox'));
        const searchInput = await screen.findByPlaceholderText('Search...');
        await user.type(searchInput, 'dark');
        expect(searchInput).toHaveValue('dark');

        await user.keyboard('{Escape}');
        await user.click(screen.getByRole('combobox'));

        const newSearchInput = await screen.findByPlaceholderText('Search...');
        expect(newSearchInput).toHaveValue('');
    });
});
