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

import {fireEvent, render, screen} from '@testing-library/react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from '@/components/ui/accordion';
import {describe, expect, it} from 'vitest';

describe('Accordion Component', () => {
    it('should render an accordion with a trigger and content', () => {
        render(
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
        expect(screen.getByText('Is it accessible?')).toBeInTheDocument();
        expect(screen.queryByText('Yes. It adheres to the WAI-ARIA design pattern.')).not.toBeInTheDocument();
    });

    it('should open and close the content when the trigger is clicked', async () => {
        render(
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
        const trigger = screen.getByText('Is it accessible?');

        expect(screen.queryByText('Yes. It adheres to the WAI-ARIA design pattern.')).not.toBeInTheDocument();

        fireEvent.click(trigger);
        const content = await screen.findByText('Yes. It adheres to the WAI-ARIA design pattern.');
        expect(content).toBeInTheDocument();

        fireEvent.click(trigger);
        expect(screen.queryByText('Yes. It adheres to the WAI-ARIA design pattern.')).not.toBeInTheDocument();
    });
});
