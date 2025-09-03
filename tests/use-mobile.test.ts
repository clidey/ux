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

import {act, renderHook} from '@testing-library/react';
import {useIsMobile} from '@/hooks/use-mobile';
import {describe, expect, it, vi} from 'vitest';

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
