import '@testing-library/jest-dom';
import {vi} from 'vitest';

// JSDOM doesn't implement PointerEvent so we need to mock it
// @ts-ignore
if (global && !global.PointerEvent) {
    // @ts-ignore
    global.PointerEvent = class PointerEvent extends MouseEvent {
    };
}
// @ts-ignore
if (global && !global.HTMLElement.prototype.releasePointerCapture) {
    // @ts-ignore
    global.HTMLElement.prototype.releasePointerCapture = () => {
    };
}
// @ts-ignore
if (global && !global.HTMLElement.prototype.hasPointerCapture) {
    // @ts-ignore
    global.HTMLElement.prototype.hasPointerCapture = () => false;
}

// Mock pointer events for Radix UI components
if (typeof window !== 'undefined' && !window.PointerEvent) {
    class PointerEvent extends MouseEvent {
        public pointerId?: number;
        public width?: number;
        public height?: number;
        public pressure?: number;
        public tangentialPressure?: number;
        public tiltX?: number;
        public tiltY?: number;
        public twist?: number;
        public pointerType?: string;
        public isPrimary?: boolean;

        constructor(type: string, params: PointerEventInit = {}) {
            super(type, params);
            this.pointerId = params.pointerId;
            this.width = params.width;
            this.height = params.height;
            this.pressure = params.pressure;
            this.tangentialPressure = params.tangentialPressure;
            this.tiltX = params.tiltX;
            this.tiltY = params.tiltY;
            this.twist = params.twist;
            this.pointerType = params.pointerType;
            this.isPrimary = params.isPrimary;
        }
    }

    window.PointerEvent = PointerEvent as any;
}

if (typeof document !== 'undefined') {
    if (typeof (document.body as any).hasPointerCapture !== 'function') {
        (document.body as any).hasPointerCapture = function (
            this: any,
            _pointerId: number
        ): void {
            // do nothing
        };
    }
    if (typeof (document.body as any).releasePointerCapture !== 'function') {
        (document.body as any).releasePointerCapture = function (
            this: any,
            _pointerId: number
        ): void {
            // do nothing
        };
    }
}

// Mock ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Mock scrollIntoView which is not available in jsdom
Element.prototype.scrollIntoView = vi.fn();
