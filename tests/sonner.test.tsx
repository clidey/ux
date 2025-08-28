import {describe, it, expect, beforeEach, vi} from "vitest";
import {render} from "@testing-library/react";
import {Toaster} from "../src/components/ui/sonner";

// Mock matchMedia
beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        })),
    });
});

describe("Sonner", () => {
    it("renders toaster component", () => {
        const {container} = render(<Toaster/>);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("applies default props", () => {
        const {container} = render(<Toaster/>);
        const toaster = container.firstChild as HTMLElement;
        expect(toaster).toHaveAttribute("data-slot", "toaster");
    });

    it("accepts custom className", () => {
        const {container} = render(<Toaster className="custom-toaster"/>);
        const toaster = container.firstChild as HTMLElement;
        expect(toaster).toHaveClass("custom-toaster");
    });

    it("forwards toastOptions prop", () => {
        const toastOptions = {
            className: "custom-toast",
            duration: 5000,
        };

        const {container} = render(<Toaster toastOptions={toastOptions}/>);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts position prop", () => {
        const {container} = render(<Toaster position="top-right"/>);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts theme prop", () => {
        const {container} = render(<Toaster theme="dark"/>);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts expand prop", () => {
        const {container} = render(<Toaster expand={false}/>);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts richColors prop", () => {
        const {container} = render(<Toaster richColors/>);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts duration prop", () => {
        const {container} = render(<Toaster duration={3000}/>);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts closeButton prop", () => {
        const {container} = render(<Toaster closeButton/>);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts visibleToasts prop", () => {
        const {container} = render(<Toaster visibleToasts={5}/>);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts offset prop", () => {
        const {container} = render(<Toaster offset="20px"/>);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts dir prop", () => {
        const {container} = render(<Toaster dir="rtl"/>);
        expect(container.firstChild).toBeInTheDocument();
    });

    it("accepts hotkey prop", () => {
        const {container} = render(<Toaster hotkey={["Shift", "T"]}/>);
        expect(container.firstChild).toBeInTheDocument();
    });
});