import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CopyButton } from '@/components/ui/copy-button';
import { TooltipProvider } from '@/components/ui/tooltip';

function renderWithTooltip(ui: React.ReactElement) {
    return render(<TooltipProvider>{ui}</TooltipProvider>);
}

describe('CopyButton', () => {
    beforeEach(() => {
        const writeText = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText },
            writable: true,
            configurable: true,
        });
        Object.defineProperty(window, 'isSecureContext', { value: true, writable: true, configurable: true });
    });

    it('should render with data-slot', () => {
        renderWithTooltip(<CopyButton text="hello" />);
        expect(document.querySelector('[data-slot="copy-button"]')).toBeInTheDocument();
    });

    it('should have copy aria-label initially', () => {
        renderWithTooltip(<CopyButton text="hello" />);
        expect(screen.getByLabelText('Copy')).toBeInTheDocument();
    });

    it('should call onCopy when clicked', async () => {
        const user = userEvent.setup();
        const onCopy = vi.fn();
        renderWithTooltip(<CopyButton text="hello" onCopy={onCopy} />);
        await user.click(screen.getByLabelText('Copy'));
        await vi.waitFor(() => expect(onCopy).toHaveBeenCalled());
    });

    it('should accept custom tooltipLabel', () => {
        renderWithTooltip(<CopyButton text="hello" tooltipLabel="Copy code" />);
        expect(screen.getByLabelText('Copy code')).toBeInTheDocument();
    });
});
