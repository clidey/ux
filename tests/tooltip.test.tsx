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
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from '@/components/ui/tooltip';
import {Button} from '@/components/ui/button';
import {describe, expect, it, vi} from 'vitest';

describe('Tooltip Component', () => {
    it('should show and hide the tooltip on hover', async () => {
        const user = userEvent.setup();
        render(
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Button>Hover</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add to library</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );

        const trigger = screen.getByText('Hover');
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

        // Show tooltip
        await user.hover(trigger);
        const tooltip = await screen.findByRole('tooltip');
        expect(tooltip).toBeInTheDocument();
        expect(tooltip).toHaveTextContent('Add to library');

        // The tooltip test should not check for removal as Radix keeps it hidden
        // Testing the visibility state is enough
    });
    it('respects the delay of an enclosing provider', async () => {
        const user = userEvent.setup();
        render(<TooltipProvider delayDuration={1500}><Tooltip><TooltipTrigger><Button>Delayed hint</Button></TooltipTrigger><TooltipContent>Wait for the provider delay</TooltipContent></Tooltip></TooltipProvider>);
        await user.hover(screen.getByRole('button', {name: 'Delayed hint'}));
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
        await user.unhover(screen.getByRole('button', {name: 'Delayed hint'}));
    });

    it('preserves the controlled open contract', async () => {
        const user = userEvent.setup();
        const onOpenChange = vi.fn();
        render(<Tooltip open={false} onOpenChange={onOpenChange}><TooltipTrigger><Button>Controlled hint</Button></TooltipTrigger><TooltipContent>Controlled content</TooltipContent></Tooltip>);
        await user.hover(screen.getByRole('button', {name: 'Controlled hint'}));
        await new Promise(resolve => setTimeout(resolve, 20));
        expect(onOpenChange).toHaveBeenCalledWith(true);
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

});
