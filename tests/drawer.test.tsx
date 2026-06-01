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
import userEvent from '@testing-library/user-event';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import {describe, expect, it} from 'vitest';

describe('Drawer Component', () => {
    it('should render drawer trigger', () => {
        render(
            <Drawer>
                <DrawerTrigger>Open Drawer</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Title</DrawerTitle>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        );

        expect(screen.getByText('Open Drawer')).toBeInTheDocument();
    });

    it('should open drawer when trigger is clicked', async () => {
        const user = userEvent.setup();
        render(
            <Drawer>
                <DrawerTrigger>Open Drawer</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Drawer Title</DrawerTitle>
                        <DrawerDescription>Drawer Description</DrawerDescription>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        );

        await user.click(screen.getByText('Open Drawer'));

        await waitFor(() => {
            expect(screen.getByText('Drawer Title')).toBeInTheDocument();
            expect(screen.getByText('Drawer Description')).toBeInTheDocument();
        });
    });

    it('should render content when open', async () => {
        render(
            <Drawer open>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>My Title</DrawerTitle>
                        <DrawerDescription>My Description</DrawerDescription>
                    </DrawerHeader>
                    <div>Body content here</div>
                    <DrawerFooter>
                        <DrawerClose>Close</DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );

        await waitFor(() => {
            expect(screen.getByText('My Title')).toBeInTheDocument();
            expect(screen.getByText('My Description')).toBeInTheDocument();
            expect(screen.getByText('Body content here')).toBeInTheDocument();
            expect(screen.getByText('Close')).toBeInTheDocument();
        });
    });

    it('should render overlay when drawer is open', async () => {
        const {container} = render(
            <Drawer open>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Title</DrawerTitle>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        );

        await waitFor(() => {
            const overlay = container.ownerDocument.querySelector('[data-slot="drawer-overlay"]');
            expect(overlay).toBeInTheDocument();
        });
    });

    it('should apply correct data-slot attributes', async () => {
        const {container} = render(
            <Drawer open>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Title</DrawerTitle>
                        <DrawerDescription>Desc</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>Footer</DrawerFooter>
                </DrawerContent>
            </Drawer>
        );

        await waitFor(() => {
            const doc = container.ownerDocument;
            expect(doc.querySelector('[data-slot="drawer-content"]')).toBeInTheDocument();
            expect(doc.querySelector('[data-slot="drawer-overlay"]')).toBeInTheDocument();
            expect(doc.querySelector('[data-slot="drawer-header"]')).toBeInTheDocument();
            expect(doc.querySelector('[data-slot="drawer-title"]')).toBeInTheDocument();
            expect(doc.querySelector('[data-slot="drawer-description"]')).toBeInTheDocument();
            expect(doc.querySelector('[data-slot="drawer-footer"]')).toBeInTheDocument();
        });
    });

    it('should accept custom className on DrawerHeader', async () => {
        render(
            <Drawer open>
                <DrawerContent>
                    <DrawerHeader className="custom-header-class">
                        <DrawerTitle>Title</DrawerTitle>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        );

        await waitFor(() => {
            const header = screen.getByText('Title').closest('[data-slot="drawer-header"]');
            expect(header).toHaveClass('custom-header-class');
        });
    });

    it('should accept custom className on DrawerFooter', async () => {
        render(
            <Drawer open>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Title</DrawerTitle>
                    </DrawerHeader>
                    <DrawerFooter className="custom-footer-class">
                        <button>OK</button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );

        await waitFor(() => {
            const footer = screen.getByText('OK').closest('[data-slot="drawer-footer"]');
            expect(footer).toHaveClass('custom-footer-class');
        });
    });

    it('should accept custom className on DrawerContent', async () => {
        const {container} = render(
            <Drawer open>
                <DrawerContent className="custom-content-class">
                    <DrawerHeader>
                        <DrawerTitle>Title</DrawerTitle>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        );

        await waitFor(() => {
            const content = container.ownerDocument.querySelector('[data-slot="drawer-content"]');
            expect(content).toHaveClass('custom-content-class');
        });
    });

    it('should render DrawerOverlay with custom className', async () => {
        const {container} = render(
            <Drawer open>
                <DrawerOverlay className="custom-overlay" />
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Title</DrawerTitle>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        );

        await waitFor(() => {
            const overlays = container.ownerDocument.querySelectorAll('[data-slot="drawer-overlay"]');
            const hasCustom = Array.from(overlays).some(el => el.classList.contains('custom-overlay'));
            expect(hasCustom).toBe(true);
        });
    });
});
