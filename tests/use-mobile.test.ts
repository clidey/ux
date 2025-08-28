import {renderHook, act} from '@testing-library/react';
import {useIsMobile} from '../src/hooks/use-mobile';
import {describe, it, expect, vi} from 'vitest';

describe('useIsMobile Hook', () => {
    const matchMediaMock = (matches: boolean) => ({
        matches,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
    });

    it('should return true when window width is less than the mobile breakpoint', () => {
        window.matchMedia = vi.fn().mockImplementation(() => matchMediaMock(true));
        window.innerWidth = 500;
        const {result} = renderHook(() => useIsMobile());
        expect(result.current).toBe(true);
    });

    it('should return false when window width is greater than the mobile breakpoint', () => {
        window.matchMedia = vi.fn().mockImplementation(() => matchMediaMock(false));
        window.innerWidth = 1024;
        const {result} = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);
    });

    it('should update when the window is resized', () => {
        let MQL = matchMediaMock(false);
        window.matchMedia = vi.fn().mockImplementation(() => MQL);
        window.innerWidth = 1024;

        const {result} = renderHook(() => useIsMobile());
        expect(result.current).toBe(false);

        act(() => {
            window.innerWidth = 500;
            // @ts-ignore
            MQL.matches = true;
            // @ts-ignore
            MQL.addEventListener.mock.calls[0][1]();
        });

        expect(result.current).toBe(true);
    });
});
