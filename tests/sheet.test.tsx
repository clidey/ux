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
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {describe, expect, it} from 'vitest';
import React from 'react';

describe('Sheet Component', () => {
    it('should render and open sheet', async () => {
        const user = userEvent.setup();

        render(
            <Sheet>
                <SheetTrigger>Open Sheet</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Sheet Title</SheetTitle>
                        <SheetDescription>Sheet description</SheetDescription>
                    </SheetHeader>
                    <div>Sheet content goes here</div>
                    <SheetFooter>
                        <button>Save</button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        );

        const trigger = screen.getByText('Open Sheet');
        expect(trigger).toBeInTheDocument();

        // Sheet should not be visible initially
        expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();

        // Open the sheet
        await user.click(trigger);

        // Sheet content should now be visible
        expect(screen.getByText('Sheet Title')).toBeInTheDocument();
        expect(screen.getByText('Sheet description')).toBeInTheDocument();
        expect(screen.getByText('Sheet content goes here')).toBeInTheDocument();
    });

    it('should render sheet with different sides', () => {
        const sides = ['top', 'right', 'bottom', 'left'] as const;

        sides.forEach(side => {
            const {container} = render(
                <Sheet open={true}>
                    <SheetContent side={side}>
                        <SheetTitle>Sheet on {side}</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            expect(screen.getByText(`Sheet on ${side}`)).toBeInTheDocument();
            container.remove();
        });
    });

    it('should close sheet with close button', async () => {
        const user = userEvent.setup();

        render(
            <Sheet>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Test Sheet</SheetTitle>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        );

        // Open sheet
        await user.click(screen.getByText('Open'));
        expect(screen.getByText('Test Sheet')).toBeInTheDocument();

        // Find and click close button (X button)
        const closeButton = screen.getByRole('button', {name: /close/i});
        await user.click(closeButton);

        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 300));
        expect(screen.queryByText('Test Sheet')).not.toBeInTheDocument();
    });

    it('should accept custom className', () => {
        render(
            <Sheet open={true}>
                <SheetContent className="custom-content">
                    <SheetHeader className="custom-header">
                        <SheetTitle className="custom-title">Title</SheetTitle>
                        <SheetDescription className="custom-desc">
                            Description
                        </SheetDescription>
                    </SheetHeader>
                    <SheetFooter className="custom-footer">
                        <button>Action</button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        );

        const content = document.querySelector('.custom-content');
        const header = document.querySelector('.custom-header');
        const title = document.querySelector('.custom-title');
        const desc = document.querySelector('.custom-desc');
        const footer = document.querySelector('.custom-footer');

        expect(content).toBeInTheDocument();
        expect(header).toBeInTheDocument();
        expect(title).toBeInTheDocument();
        expect(desc).toBeInTheDocument();
        expect(footer).toBeInTheDocument();
    });

    it('should handle controlled state', () => {
        let isOpen = false;

        const ControlledSheet = () => {
            const [open, setOpen] = React.useState(false);
            isOpen = open;

            return (
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger onClick={() => setOpen(true)}>Toggle</SheetTrigger>
                    <SheetContent>
                        <SheetTitle>Controlled Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );
        };

        const {rerender} = render(<ControlledSheet/>);

        expect(isOpen).toBe(false);
        expect(screen.queryByText('Controlled Sheet')).not.toBeInTheDocument();

        // Trigger open
        const button = screen.getByText('Toggle');
        button.click();

        rerender(<ControlledSheet/>);
        expect(isOpen).toBe(true);
    });
});