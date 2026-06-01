import { describe, it, expect, vi, beforeEach } from 'vitest';
import { copyToClipboard } from '@/lib/clipboard';

describe('copyToClipboard', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should use navigator.clipboard when available', async () => {
        const writeText = vi.fn().mockResolvedValue(undefined);
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText },
            writable: true,
            configurable: true,
        });
        Object.defineProperty(window, 'isSecureContext', { value: true, writable: true, configurable: true });

        const result = await copyToClipboard('test');
        expect(result).toBe(true);
        expect(writeText).toHaveBeenCalledWith('test');
    });

    it('should return false on failure', async () => {
        Object.defineProperty(navigator, 'clipboard', {
            value: undefined,
            writable: true,
            configurable: true,
        });
        Object.defineProperty(window, 'isSecureContext', { value: false, writable: true, configurable: true });
        document.execCommand = vi.fn().mockReturnValue(false);

        const result = await copyToClipboard('test');
        expect(result).toBe(false);
    });
});
