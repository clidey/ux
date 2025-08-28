import {render, screen, within} from '@testing-library/react';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '../src/components/ui/dialog';
import {Button} from '../src/components/ui/button';
import {describe, it, expect} from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Dialog Component', () => {
    it('should open and close the dialog', async () => {
        render(
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button>Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );

        const trigger = screen.getByText('Open Dialog');
        expect(screen.queryByText('Are you sure absolutely sure?')).not.toBeInTheDocument();

        await userEvent.click(trigger);
        const dialogTitle = screen.getByText('Are you sure absolutely sure?');
        expect(dialogTitle).toBeInTheDocument();

        const footer = screen.getByTestId('dialog-footer');
        const closeButton = within(footer).getByRole('button', {name: /close/i});
        await userEvent.click(closeButton);
        expect(screen.queryByText('Are you sure absolutely sure?')).not.toBeInTheDocument();
    });

    it('should close the dialog with the Escape key', async () => {
        render(
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        );

        const trigger = screen.getByText('Open Dialog');
        await userEvent.click(trigger);
        expect(screen.getByText('Are you sure absolutely sure?')).toBeInTheDocument();

        await userEvent.keyboard('{escape}');
        expect(screen.queryByText('Are you sure absolutely sure?')).not.toBeInTheDocument();
    });

    it('should trap focus within the dialog', async () => {
        render(
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Title</DialogTitle>
                        <DialogDescription>
                            Dialog description for accessibility.
                        </DialogDescription>
                    </DialogHeader>
                    <input type="text"/>
                    <button>Button 1</button>
                    <button>Button 2</button>
                </DialogContent>
            </Dialog>
        );

        const trigger = screen.getByText('Open Dialog');
        await userEvent.click(trigger);

        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();

        const input = screen.getByRole('textbox');
        const button1 = screen.getByRole('button', {name: 'Button 1'});
        const button2 = screen.getByRole('button', {name: 'Button 2'});
        const closeButton = screen.getAllByRole('button', {name: /close/i})[0];

        expect(input).toHaveFocus();

        await userEvent.tab();
        expect(button1).toHaveFocus();

        await userEvent.tab();
        expect(button2).toHaveFocus();

        await userEvent.tab();
        expect(closeButton).toHaveFocus();

        await userEvent.tab();
        expect(input).toHaveFocus();
    });
});
