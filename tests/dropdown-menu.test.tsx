/*
 * Copyright 2025 Clidey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {describe, expect, it, vi} from 'vitest';

describe('DropdownMenu Component', () => {
    it('should render and open dropdown menu', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        const trigger = screen.getByText('Open Menu');
        expect(trigger).toBeInTheDocument();

        // Menu should not be visible initially
        expect(screen.queryByText('Profile')).not.toBeInTheDocument();

        // Open the menu
        await user.click(trigger);

        // Menu items should be visible
        expect(screen.getByText('My Account')).toBeInTheDocument();
        expect(screen.getByText('Profile')).toBeInTheDocument();
        expect(screen.getByText('Settings')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('should handle menu item clicks', async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={onSelect}>Click Me</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Menu'));
        await user.click(screen.getByText('Click Me'));

        expect(onSelect).toHaveBeenCalled();
    });

    it('should render checkbox items', async () => {
        const user = userEvent.setup();
        const onCheckedChange = vi.fn();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Options</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuCheckboxItem
                        checked={false}
                        onCheckedChange={onCheckedChange}
                    >
                        Show Toolbar
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={true}>
                        Show Sidebar
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Options'));

        const toolbar = screen.getByText('Show Toolbar');
        expect(toolbar).toBeInTheDocument();

        await user.click(toolbar);
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });

    it('should render radio group items', async () => {
        const user = userEvent.setup();
        const onValueChange = vi.fn();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Theme</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuRadioGroup value="light" onValueChange={onValueChange}>
                        <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Theme'));
        await user.click(screen.getByText('Dark'));

        expect(onValueChange).toHaveBeenCalledWith('dark');
    });

    it('should render submenu', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Item 1</DropdownMenuItem>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>Sub Item 1</DropdownMenuItem>
                            <DropdownMenuItem>Sub Item 2</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Menu'));
        expect(screen.getByText('More Options')).toBeInTheDocument();

        // Hover over submenu trigger to open it
        await user.hover(screen.getByText('More Options'));

        // Wait for submenu to appear
        await new Promise(resolve => setTimeout(resolve, 100));
        expect(screen.getByText('Sub Item 1')).toBeInTheDocument();
    });

    it('should render menu item with shortcut', async () => {
        const user = userEvent.setup();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>File</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>
                        Save
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('File'));
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('⌘S')).toBeInTheDocument();
    });

    it('should handle disabled items', async () => {
        const user = userEvent.setup();
        const onSelect = vi.fn();

        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem disabled onSelect={onSelect}>
                        Disabled Item
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        await user.click(screen.getByText('Menu'));

        const item = screen.getByText('Disabled Item');
        expect(item).toHaveAttribute('data-disabled');
    });
});