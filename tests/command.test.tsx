import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from '../src/components/ui/command';
import {describe, it, expect, vi} from 'vitest';

describe('Command Component', () => {
    it('should render command with input and items', () => {
        render(
            <Command>
                <CommandInput placeholder="Type a command..."/>
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>Calendar</CommandItem>
                        <CommandItem>Search Emoji</CommandItem>
                        <CommandItem>Calculator</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        expect(screen.getByPlaceholderText('Type a command...')).toBeInTheDocument();
        expect(screen.getByText('Calendar')).toBeInTheDocument();
        expect(screen.getByText('Search Emoji')).toBeInTheDocument();
        expect(screen.getByText('Calculator')).toBeInTheDocument();
    });

    it('should filter items based on search input', async () => {
        const user = userEvent.setup();

        render(
            <Command>
                <CommandInput placeholder="Search..."/>
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        <CommandItem>Apple</CommandItem>
                        <CommandItem>Banana</CommandItem>
                        <CommandItem>Orange</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        const input = screen.getByPlaceholderText('Search...');

        // Type 'app' in the search
        await user.type(input, 'app');

        // Wait for filtering to occur
        await waitFor(() => {
            expect(screen.getByText('Apple')).toBeInTheDocument();
            expect(screen.queryByText('Banana')).not.toBeInTheDocument();
            expect(screen.queryByText('Orange')).not.toBeInTheDocument();
        });
    });

    it('should show empty state when no results match', async () => {
        const user = userEvent.setup();

        render(
            <Command>
                <CommandInput placeholder="Search..."/>
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                        <CommandItem>Apple</CommandItem>
                        <CommandItem>Banana</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        const input = screen.getByPlaceholderText('Search...');

        // Type something that doesn't match
        await user.type(input, 'xyz');

        // Wait for empty state to appear
        await waitFor(() => {
            expect(screen.getByText('No results found.')).toBeInTheDocument();
        });
    });

    it('should handle item selection', async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();

        render(
            <Command>
                <CommandInput placeholder="Search..."/>
                <CommandList>
                    <CommandGroup>
                        <CommandItem onSelect={onSelect}>Apple</CommandItem>
                        <CommandItem>Banana</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        const appleItem = screen.getByText('Apple');
        await user.click(appleItem);

        expect(onSelect).toHaveBeenCalled();
    });

    it('should render multiple groups', () => {
        render(
            <Command>
                <CommandList>
                    <CommandGroup heading="Fruits">
                        <CommandItem>Apple</CommandItem>
                        <CommandItem>Banana</CommandItem>
                    </CommandGroup>
                    <CommandGroup heading="Vegetables">
                        <CommandItem>Carrot</CommandItem>
                        <CommandItem>Lettuce</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        expect(screen.getByText('Fruits')).toBeInTheDocument();
        expect(screen.getByText('Vegetables')).toBeInTheDocument();
        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Carrot')).toBeInTheDocument();
    });

    it('should accept custom className', () => {
        const {container} = render(
            <Command className="custom-command">
                <CommandInput className="custom-input"/>
                <CommandList className="custom-list">
                    <CommandItem className="custom-item">Item</CommandItem>
                </CommandList>
            </Command>
        );

        expect(container.querySelector('.custom-command')).toBeInTheDocument();
        expect(container.querySelector('.custom-input')).toBeInTheDocument();
        expect(container.querySelector('.custom-list')).toBeInTheDocument();
        expect(container.querySelector('.custom-item')).toBeInTheDocument();
    });

    it('should render separator between groups', () => {
        render(
            <Command>
                <CommandList>
                    <CommandGroup heading="Group 1">
                        <CommandItem>Item 1</CommandItem>
                    </CommandGroup>
                    <CommandSeparator/>
                    <CommandGroup heading="Group 2">
                        <CommandItem>Item 2</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        const separator = document.querySelector('[cmdk-separator]');
        expect(separator).toBeInTheDocument();
    });

    it('should render command shortcuts', () => {
        render(
            <Command>
                <CommandList>
                    <CommandGroup>
                        <CommandItem>
                            Copy
                            <CommandShortcut>⌘C</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            Paste
                            <CommandShortcut>⌘V</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        expect(screen.getByText('⌘C')).toBeInTheDocument();
        expect(screen.getByText('⌘V')).toBeInTheDocument();
    });

    it('should handle disabled items', async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();

        render(
            <Command>
                <CommandList>
                    <CommandGroup>
                        <CommandItem disabled onSelect={onSelect}>
                            Disabled Item
                        </CommandItem>
                        <CommandItem>Enabled Item</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        const disabledItem = screen.getByText('Disabled Item');
        await user.click(disabledItem);

        expect(onSelect).not.toHaveBeenCalled();
    });

    it.skip('should handle keyboard navigation', async () => {
        const user = userEvent.setup();
        const onSelect1 = vi.fn();
        const onSelect2 = vi.fn();

        render(
            <Command>
                <CommandInput placeholder="Search..."/>
                <CommandList>
                    <CommandGroup>
                        <CommandItem onSelect={onSelect1}>Item 1</CommandItem>
                        <CommandItem onSelect={onSelect2}>Item 2</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        const input = screen.getByPlaceholderText('Search...');
        await user.click(input);

        // Navigate down
        await user.keyboard('{ArrowDown}');
        await user.keyboard('{Enter}');

        expect(onSelect1).toHaveBeenCalled();
    });

    it('should handle value prop on items', () => {
        render(
            <Command>
                <CommandList>
                    <CommandGroup>
                        <CommandItem value="custom-value">Display Text</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        const item = screen.getByText('Display Text');
        expect(item).toHaveAttribute('data-value', 'custom-value');
    });

    it('should render with custom dialog props', () => {
        render(
            <Command>
                <CommandInput/>
                <CommandList>
                    <CommandEmpty>No results</CommandEmpty>
                </CommandList>
            </Command>
        );

        expect(screen.getByText('No results')).toBeInTheDocument();
    });

    it('should handle case-insensitive search', async () => {
        const user = userEvent.setup();

        render(
            <Command>
                <CommandInput placeholder="Search..."/>
                <CommandList>
                    <CommandGroup>
                        <CommandItem>Apple</CommandItem>
                        <CommandItem>BANANA</CommandItem>
                        <CommandItem>orange</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        const input = screen.getByPlaceholderText('Search...');

        // Search with different case
        await user.type(input, 'APPLE');

        await waitFor(() => {
            expect(screen.getByText('Apple')).toBeInTheDocument();
            expect(screen.queryByText('BANANA')).not.toBeInTheDocument();
        });
    });

    it('should clear search on escape key', async () => {
        const user = userEvent.setup();

        render(
            <Command>
                <CommandInput placeholder="Search..."/>
                <CommandList>
                    <CommandGroup>
                        <CommandItem>Apple</CommandItem>
                        <CommandItem>Banana</CommandItem>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;

        await user.type(input, 'test');
        expect(input.value).toBe('test');

        await user.keyboard('{Escape}');
        expect(input.value).toBe('');
    });
});