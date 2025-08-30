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

import {render, screen, waitFor} from '@testing-library/react';
import {Popover, PopoverAnchor, PopoverContent, PopoverTrigger,} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';
import {describe, expect, it, vi} from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Popover Component', () => {
    it('should open and close the popover', async () => {
        render(
            <Popover>
                <PopoverTrigger asChild>
                    <Button>Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                    The content of the popover.
                </PopoverContent>
            </Popover>
        );

        const trigger = screen.getByText('Open Popover');
        expect(screen.queryByText('The content of the popover.')).not.toBeInTheDocument();

        await userEvent.click(trigger);
        expect(screen.getByText('The content of the popover.')).toBeInTheDocument();

        await userEvent.click(trigger);
        expect(screen.queryByText('The content of the popover.')).not.toBeInTheDocument();
    });

    it('should close the popover with the Escape key', async () => {
        render(
            <Popover>
                <PopoverTrigger asChild>
                    <Button>Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                    The content of the popover.
                </PopoverContent>
            </Popover>
        );

        const trigger = screen.getByText('Open Popover');
        await userEvent.click(trigger);
        expect(screen.getByText('The content of the popover.')).toBeInTheDocument();

        await userEvent.keyboard('{escape}');
        expect(screen.queryByText('The content of the popover.')).not.toBeInTheDocument();
    });

    it('should return focus to the trigger when the popover is closed', async () => {
        render(
            <Popover>
                <PopoverTrigger asChild>
                    <Button>Open Popover</Button>
                </PopoverTrigger>
                <PopoverContent>
                    The content of the popover.
                </PopoverContent>
            </Popover>
        );

        const trigger = screen.getByText('Open Popover');
        await userEvent.click(trigger);
        expect(screen.getByText('The content of the popover.')).toBeInTheDocument();

        await userEvent.keyboard('{escape}');
        expect(trigger).toHaveFocus();
    });

    it('should handle controlled open state', async () => {
        const user = userEvent.setup();
        const handleOpenChange = vi.fn();

        render(
            <Popover open={false} onOpenChange={handleOpenChange}>
                <PopoverTrigger asChild>
                    <Button>Open</Button>
                </PopoverTrigger>
                <PopoverContent>
                    Content
                </PopoverContent>
            </Popover>
        );

        await user.click(screen.getByText('Open'));
        expect(handleOpenChange).toHaveBeenCalledWith(true);
    });

    it('should apply custom className to content', async () => {
        render(
            <Popover defaultOpen>
                <PopoverContent className="custom-popover">
                    Content with custom class
                </PopoverContent>
            </Popover>
        );

        const content = await screen.findByText('Content with custom class');
        // Check the PopoverContent element which has data-slot="popover-content"
        const popoverContent = content.closest('[data-slot="popover-content"]');
        expect(popoverContent).toHaveClass('custom-popover');
    });

    it('should handle different alignment options', () => {
        render(
            <Popover defaultOpen>
                <PopoverContent align="start" sideOffset={10}>
                    Aligned content
                </PopoverContent>
            </Popover>
        );

        const content = screen.getByText('Aligned content');
        expect(content).toBeInTheDocument();
    });

    it('should work with PopoverAnchor', () => {
        render(
            <Popover defaultOpen>
                <PopoverAnchor>
                    <div>Anchor element</div>
                </PopoverAnchor>
                <PopoverTrigger>
                    <Button>Trigger</Button>
                </PopoverTrigger>
                <PopoverContent>
                    Popover content
                </PopoverContent>
            </Popover>
        );

        expect(screen.getByText('Anchor element')).toBeInTheDocument();
        expect(screen.getByText('Popover content')).toBeInTheDocument();
    });

    it('should close on outside click', async () => {
        const user = userEvent.setup();

        render(
            <>
                <div data-testid="outside">Outside element</div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button>Open</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        Popover content
                    </PopoverContent>
                </Popover>
            </>
        );

        await user.click(screen.getByText('Open'));
        expect(screen.getByText('Popover content')).toBeInTheDocument();

        await user.click(screen.getByTestId('outside'));
        await waitFor(() => {
            expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
        });
    });

    it('should handle side prop', () => {
        const {rerender} = render(
            <Popover defaultOpen>
                <PopoverContent side="top">
                    Top content
                </PopoverContent>
            </Popover>
        );

        expect(screen.getByText('Top content')).toBeInTheDocument();

        rerender(
            <Popover defaultOpen>
                <PopoverContent side="bottom">
                    Bottom content
                </PopoverContent>
            </Popover>
        );

        expect(screen.getByText('Bottom content')).toBeInTheDocument();

        rerender(
            <Popover defaultOpen>
                <PopoverContent side="left">
                    Left content
                </PopoverContent>
            </Popover>
        );

        expect(screen.getByText('Left content')).toBeInTheDocument();

        rerender(
            <Popover defaultOpen>
                <PopoverContent side="right">
                    Right content
                </PopoverContent>
            </Popover>
        );

        expect(screen.getByText('Right content')).toBeInTheDocument();
    });

    it('should handle alignOffset prop', () => {
        render(
            <Popover defaultOpen>
                <PopoverContent alignOffset={20}>
                    Offset content
                </PopoverContent>
            </Popover>
        );

        expect(screen.getByText('Offset content')).toBeInTheDocument();
    });

    it('should handle avoidCollisions prop', () => {
        render(
            <Popover defaultOpen>
                <PopoverContent avoidCollisions={false}>
                    No collision avoidance
                </PopoverContent>
            </Popover>
        );

        expect(screen.getByText('No collision avoidance')).toBeInTheDocument();
    });

    it('should handle defaultOpen prop', () => {
        render(
            <Popover defaultOpen>
                <PopoverTrigger>
                    <Button>Trigger</Button>
                </PopoverTrigger>
                <PopoverContent>
                    Initially open
                </PopoverContent>
            </Popover>
        );

        expect(screen.getByText('Initially open')).toBeInTheDocument();
    });
});
