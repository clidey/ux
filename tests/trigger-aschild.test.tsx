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

import * as React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {Button} from '@/components/ui/button';
import {CopyButton} from '@/components/ui/copy-button';
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {isSlottableElement, markNotSlottable, markSlottable, resolveTriggerChild} from '@/lib/slot';

function renderMenu(trigger: React.ReactElement) {
    return render(
        <DropdownMenu>
            {trigger}
            <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

afterEach(() => {
    vi.restoreAllMocks();
});

describe('resolveTriggerChild', () => {
    it('infers asChild for a slot-safe element', () => {
        const child = <Button>Go</Button>;
        expect(resolveTriggerChild(child, undefined, 'X')).toEqual({asChild: true, child});
        expect(resolveTriggerChild(<button/>, undefined, 'X').asChild).toBe(true);
        expect(resolveTriggerChild(<span/>, undefined, 'X').asChild).toBe(true);
    });

    it('does not infer asChild for unknown components but honours an explicit one', () => {
        const Unknown = () => <button>u</button>;
        expect(resolveTriggerChild(<Unknown/>, undefined, 'X').asChild).toBe(false);
        expect(resolveTriggerChild(<Unknown/>, true, 'X').asChild).toBe(true);
    });

    it('never infers when infer is false', () => {
        expect(resolveTriggerChild(<Button>Go</Button>, undefined, 'X', {infer: false}).asChild).toBe(false);
        expect(resolveTriggerChild(<Button>Go</Button>, true, 'X', {infer: false}).asChild).toBe(true);
    });

    it('explicit asChild={false} always wins', () => {
        expect(resolveTriggerChild(<Button>Go</Button>, false, 'X').asChild).toBe(false);
    });

    it('rejects text, fragments, arrays and empty children with an explicit asChild', () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        expect(resolveTriggerChild('text', true, 'X').asChild).toBe(false);
        expect(resolveTriggerChild(<><span/></>, true, 'X').asChild).toBe(false);
        expect(resolveTriggerChild([<span key="a"/>, <span key="b"/>], true, 'X').asChild).toBe(false);
        expect(resolveTriggerChild(null, true, 'X').asChild).toBe(false);
        expect(error).toHaveBeenCalledTimes(4);
        expect(error.mock.calls[0][0]).toContain('X');
        expect(error.mock.calls[0][0]).toContain('text');
        expect(error.mock.calls[1][0]).toContain('a fragment');
        expect(error.mock.calls[2][0]).toContain('multiple children');
        expect(error.mock.calls[3][0]).toContain('empty');
    });

    it('is silent for text children without asChild', () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        expect(resolveTriggerChild('text', undefined, 'X')).toEqual({asChild: false, child: 'text'});
        expect(error).not.toHaveBeenCalled();
    });

    it('rejects components marked not slottable', () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        const Bad = markNotSlottable(function Bad() {
            return <button>bad</button>;
        });
        expect(isSlottableElement(<Bad/>)).toBe(false);
        expect(resolveTriggerChild(<Bad/>, true, 'X').asChild).toBe(false);
        expect(error).toHaveBeenCalledTimes(1);
        expect(error.mock.calls[0][0]).toContain('Bad');
    });

    it('markSlottable makes a custom component eligible for inference', () => {
        const Good = markSlottable(React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
            function Good(props, ref) {
                return <button ref={ref} {...props}/>;
            }
        ));
        expect(isSlottableElement(<Good/>)).toBe(true);
        expect(resolveTriggerChild(<Good/>, undefined, 'X').asChild).toBe(true);
    });
});

describe('DropdownMenuTrigger asChild inference', () => {
    it('renders a single button when wrapping Button without asChild', () => {
        renderMenu(
            <DropdownMenuTrigger>
                <Button>Open</Button>
            </DropdownMenuTrigger>
        );
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(1);
        // Radix merges the trigger's props onto the Button, so the trigger slot name wins.
        expect(buttons[0]).toHaveAttribute('data-slot', 'dropdown-menu-trigger');
        expect(buttons[0]).toHaveClass('inline-flex');
        expect(buttons[0]).toHaveAttribute('data-state', 'closed');
        expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
        expect(buttons[0]).toHaveAttribute('aria-haspopup', 'menu');
    });

    it('behaves the same with an explicit asChild', () => {
        renderMenu(
            <DropdownMenuTrigger asChild>
                <Button>Open</Button>
            </DropdownMenuTrigger>
        );
        expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    it('opens on pointer down and marks the Button as open', async () => {
        renderMenu(
            <DropdownMenuTrigger>
                <Button>Open</Button>
            </DropdownMenuTrigger>
        );
        const button = screen.getByRole('button', {name: 'Open'});
        fireEvent.pointerDown(button, {button: 0, ctrlKey: false, pointerType: 'mouse'});
        await waitFor(() => expect(screen.getByText('Profile')).toBeInTheDocument());
        expect(button).toHaveAttribute('data-state', 'open');
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('runs a child onClick that stops propagation and still opens the menu', async () => {
        const user = userEvent.setup();
        const onClick = vi.fn((event: React.MouseEvent) => event.stopPropagation());
        const onRowClick = vi.fn();
        render(
            <div onClick={onRowClick}>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button onClick={onClick}>Open</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        );
        await user.click(screen.getByRole('button', {name: 'Open'}));
        await waitFor(() => expect(screen.getByText('Profile')).toBeInTheDocument());
        expect(onClick).toHaveBeenCalledTimes(1);
        expect(onRowClick).not.toHaveBeenCalled();
    });

    it('opens from the keyboard', async () => {
        const user = userEvent.setup();
        renderMenu(
            <DropdownMenuTrigger>
                <Button>Open</Button>
            </DropdownMenuTrigger>
        );
        const button = screen.getByRole('button', {name: 'Open'});
        button.focus();
        await user.keyboard('{Enter}');
        await waitFor(() => expect(screen.getByText('Profile')).toBeInTheDocument());
    });

    it('explicit asChild={false} renders two buttons as an escape hatch', () => {
        renderMenu(
            <DropdownMenuTrigger asChild={false}>
                <Button>Open</Button>
            </DropdownMenuTrigger>
        );
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);
        expect(buttons[0]).toHaveAttribute('data-slot', 'dropdown-menu-trigger');
        expect(buttons[0]).toHaveAttribute('data-state', 'closed');
    });

    it('logs a dev error for a non-slottable child with asChild and still opens', async () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        renderMenu(
            <DropdownMenuTrigger asChild>
                <CopyButton text="x" tooltipLabel="Copy" copiedLabel="Copied"/>
            </DropdownMenuTrigger>
        );
        expect(error).toHaveBeenCalled();
        expect(error.mock.calls[0][0]).toContain('DropdownMenuTrigger');
        expect(error.mock.calls[0][0]).toContain('CopyButton');
        const outer = document.querySelector('[data-slot="dropdown-menu-trigger"]');
        expect(outer?.tagName).toBe('BUTTON');
        fireEvent.pointerDown(outer as Element, {button: 0, ctrlKey: false, pointerType: 'mouse'});
        await waitFor(() => expect(screen.getByText('Profile')).toBeInTheDocument());
    });

    it('renders the Radix button for text children', async () => {
        const user = userEvent.setup();
        renderMenu(<DropdownMenuTrigger>Open</DropdownMenuTrigger>);
        const button = screen.getByRole('button', {name: 'Open'});
        expect(button).toHaveAttribute('data-slot', 'dropdown-menu-trigger');
        await user.click(button);
        await waitFor(() => expect(screen.getByText('Profile')).toBeInTheDocument());
    });

    it('does not infer asChild for an unknown component', () => {
        const Custom = () => <span>custom</span>;
        renderMenu(
            <DropdownMenuTrigger>
                <Custom/>
            </DropdownMenuTrigger>
        );
        expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'dropdown-menu-trigger');
    });

    it('forwards the ref to the slotted Button', () => {
        const ref = React.createRef<HTMLButtonElement>();
        renderMenu(
            <DropdownMenuTrigger ref={ref}>
                <Button>Open</Button>
            </DropdownMenuTrigger>
        );
        expect(ref.current).toBe(screen.getByRole('button'));
    });
});

describe('TooltipTrigger asChild inference', () => {
    it('renders a single button and shows the tooltip on hover', async () => {
        const user = userEvent.setup();
        render(
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Button>Hover</Button>
                    </TooltipTrigger>
                    <TooltipContent>Tip</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(1);
        expect(buttons[0]).toHaveAttribute('data-state', 'closed');
        await user.hover(buttons[0]);
        await waitFor(() => expect(screen.getAllByText('Tip').length).toBeGreaterThan(0));
    });

    it('keeps text children on the Radix button', () => {
        render(
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>Plain</TooltipTrigger>
                    <TooltipContent>Tip</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
        expect(screen.getByRole('button', {name: 'Plain'})).toHaveAttribute('data-slot', 'tooltip-trigger');
    });

    it('slots a plain span with explicit asChild', () => {
        render(
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span>Label</span>
                    </TooltipTrigger>
                    <TooltipContent>Tip</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        expect(screen.getByText('Label')).toHaveAttribute('data-state', 'closed');
    });

    it('falls back to a Radix button for a non-slottable child with asChild', () => {
        const error = vi.spyOn(console, 'error').mockImplementation(() => {});
        render(
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <CopyButton text="x" tooltipLabel="Copy" copiedLabel="Copied"/>
                    </TooltipTrigger>
                    <TooltipContent>Tip</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
        expect(error.mock.calls.some((call) => String(call[0]).includes('TooltipTrigger'))).toBe(true);
        expect(document.querySelector('[data-slot="tooltip-trigger"]')?.tagName).toBe('BUTTON');
    });

    it('nested TooltipTrigger > DropdownMenuTrigger > Button renders exactly one button', async () => {
        const user = userEvent.setup();
        render(
            <TooltipProvider>
                <DropdownMenu>
                    <Tooltip>
                        <TooltipTrigger>
                            <DropdownMenuTrigger>
                                <Button>Open</Button>
                            </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Tip</TooltipContent>
                    </Tooltip>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TooltipProvider>
        );
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(1);
        expect(buttons[0]).toHaveAttribute('data-slot', 'tooltip-trigger');
        expect(buttons[0]).toHaveAttribute('aria-haspopup', 'menu');
        await user.click(buttons[0]);
        await waitFor(() => expect(screen.getByText('Profile')).toBeInTheDocument());
    });

    it('wraps a disabled child in a focusable span so the tooltip still shows', async () => {
        const user = userEvent.setup();
        render(
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Button disabled>Disabled</Button>
                    </TooltipTrigger>
                    <TooltipContent>Why disabled</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
        const wrapper = document.querySelector('[data-slot="tooltip-disabled-wrapper"]');
        expect(wrapper).not.toBeNull();
        expect(wrapper?.tagName).toBe('SPAN');
        expect(wrapper).toHaveAttribute('tabindex', '0');
        expect(wrapper).toHaveAttribute('data-state', 'closed');
        expect(wrapper?.querySelector('button')).toBeDisabled();
        expect(screen.getAllByRole('button')).toHaveLength(1);
        await user.hover(wrapper as Element);
        await waitFor(() => expect(screen.getAllByText('Why disabled').length).toBeGreaterThan(0));
    });
});

describe('other triggers', () => {
    it('PopoverTrigger infers asChild for Button', async () => {
        const user = userEvent.setup();
        render(
            <Popover>
                <PopoverTrigger>
                    <Button>Open</Button>
                </PopoverTrigger>
                <PopoverContent>Body</PopoverContent>
            </Popover>
        );
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(1);
        expect(buttons[0]).toHaveAttribute('data-slot', 'popover-trigger');
        await user.click(buttons[0]);
        await waitFor(() => expect(screen.getByText('Body')).toBeInTheDocument());
    });

    it('DialogTrigger infers asChild for Button', async () => {
        const user = userEvent.setup();
        render(
            <Dialog>
                <DialogTrigger>
                    <Button>Open</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Title</DialogTitle>
                </DialogContent>
            </Dialog>
        );
        expect(screen.getAllByRole('button')).toHaveLength(1);
        await user.click(screen.getByRole('button', {name: 'Open'}));
        await waitFor(() => expect(screen.getByText('Title')).toBeInTheDocument());
    });

    it('TabsTrigger never infers asChild', () => {
        render(
            <Tabs defaultValue="a">
                <TabsList>
                    <TabsTrigger value="a"><span>A</span></TabsTrigger>
                    <TabsTrigger value="b">B</TabsTrigger>
                </TabsList>
                <TabsContent value="a">Panel A</TabsContent>
            </Tabs>
        );
        const tabs = screen.getAllByRole('tab');
        expect(tabs).toHaveLength(2);
        expect(tabs[0].tagName).toBe('BUTTON');
        expect(tabs[0]).toHaveAttribute('data-slot', 'tabs-trigger');
    });
});
