import {render, screen, fireEvent} from '@testing-library/react';
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '../src/components/ui/accordion';
import {describe, it, expect} from 'vitest';

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
