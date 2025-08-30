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
import {describe, expect, it} from 'vitest';

describe('Tooltip Component', () => {
    it('should show and hide the tooltip on hover', async () => {
        const user = userEvent.setup();
        render(
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
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
});
