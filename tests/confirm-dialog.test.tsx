import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

describe('ConfirmDialog', () => {
    it('should render title and description when open', () => {
        render(
            <ConfirmDialog
                open
                onOpenChange={() => {}}
                title="Delete item?"
                description="This cannot be undone."
                onConfirm={() => {}}
            />
        );
        expect(screen.getByText('Delete item?')).toBeInTheDocument();
        expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
    });

    it('should call onConfirm when action clicked', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();
        render(
            <ConfirmDialog
                open
                onOpenChange={() => {}}
                title="Delete?"
                description="Sure?"
                onConfirm={onConfirm}
                confirmLabel="Delete"
            />
        );
        await user.click(screen.getByText('Delete'));
        expect(onConfirm).toHaveBeenCalled();
    });

    it('should render custom labels', () => {
        render(
            <ConfirmDialog
                open
                onOpenChange={() => {}}
                title="T"
                description="D"
                onConfirm={() => {}}
                confirmLabel="Remove"
                cancelLabel="Keep"
            />
        );
        expect(screen.getByText('Remove')).toBeInTheDocument();
        expect(screen.getByText('Keep')).toBeInTheDocument();
    });

    it('should disable confirm when dependencies present', () => {
        render(
            <ConfirmDialog
                open
                onOpenChange={() => {}}
                title="T"
                description="D"
                onConfirm={() => {}}
                confirmLabel="Delete"
                dependencies={["3 connections depend on this"]}
            />
        );
        expect(screen.getByText('Delete')).toBeDisabled();
        expect(screen.getByText('3 connections depend on this')).toBeInTheDocument();
    });

    it('should render items list', () => {
        render(
            <ConfirmDialog
                open
                onOpenChange={() => {}}
                title="T"
                description="D"
                onConfirm={() => {}}
                items={[<span key="1">Item 1</span>, <span key="2">Item 2</span>]}
            />
        );
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should not render when closed', () => {
        render(
            <ConfirmDialog
                open={false}
                onOpenChange={() => {}}
                title="Hidden"
                description="D"
                onConfirm={() => {}}
            />
        );
        expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    });
});
