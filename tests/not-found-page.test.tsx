/*
 * Copyright 2026 Clidey, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NotFoundPage } from "@/components/ui/not-found-page";

let reduced = false;
const requestFrame = vi.fn<(callback: FrameRequestCallback) => number>();
const cancelFrame = vi.fn();
beforeEach(() => {
  reduced = false;
  requestFrame.mockReset().mockReturnValue(1);
  cancelFrame.mockReset();
  vi.stubGlobal("requestAnimationFrame", requestFrame);
  vi.stubGlobal("cancelAnimationFrame", cancelFrame);
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    get matches() { return reduced; },
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
  })));
});
afterEach(() => vi.unstubAllGlobals());

describe("NotFoundPage", () => {
  it("renders the default heading, home link, and no playback controls", () => {
    render(<NotFoundPage motion="off" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("This page took a wrong turn.");
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
    expect(screen.queryByRole("group", { name: "Animation playback" })).not.toBeInTheDocument();
  });
  it("supports custom copy, navigation callback, and caller attributes", () => {
    const onHome = vi.fn();
    render(<NotFoundPage motion="off" title="Missing page" description="Try the dashboard." onHome={onHome} homeLabel="Open dashboard" className="custom" data-testid="fallback" />);
    fireEvent.click(screen.getByRole("button", { name: "Open dashboard" }));
    expect(onHome).toHaveBeenCalledOnce();
    expect(screen.getByText("Try the dashboard.")).toBeInTheDocument();
    expect(screen.getByTestId("fallback")).toHaveClass("custom");
  });
  it("allows custom actions and uses unique heading IDs for multiple instances", () => {
    render(<><NotFoundPage motion="off" title="First" action={<a href="/help">Get help</a>} /><NotFoundPage motion="off" title="Second" action={null} /></>);
    expect(screen.getByRole("link", { name: "Get help" })).toHaveAttribute("href", "/help");
    expect(screen.queryByRole("link", { name: "Back to home" })).not.toBeInTheDocument();
    const headings = screen.getAllByRole("heading", { level: 1 });
    expect(headings[0].id).not.toBe(headings[1].id);
    expect(headings[0].closest("section")).toHaveAttribute("aria-labelledby", headings[0].id);
  });
  it("shows a still pose without scheduling frames when motion is off or reduced", () => {
    const { container, rerender } = render(<NotFoundPage motion="off" />);
    expect(requestFrame).not.toHaveBeenCalled();
    expect(container.querySelector(".ux-not-found-character")).toHaveStyle({ opacity: "1" });
    reduced = true;
    rerender(<NotFoundPage motion="loop" />);
    expect(requestFrame).not.toHaveBeenCalled();
  });
  it("lets uncontrolled playback be stopped and cleans up the animation", () => {
    const { unmount } = render(<NotFoundPage showMotionControls />);
    expect(requestFrame).toHaveBeenCalledOnce();
    fireEvent.click(screen.getByRole("button", { name: "off", exact: true }));
    expect(screen.getByRole("button", { name: "off", exact: true })).toHaveAttribute("aria-pressed", "true");
    expect(cancelFrame).toHaveBeenCalledWith(1);
    const calls = requestFrame.mock.calls.length;
    unmount();
    expect(requestFrame).toHaveBeenCalledTimes(calls);
  });
  it("notifies controlled playback changes without overriding the caller", () => {
    const onMotionChange = vi.fn();
    render(<NotFoundPage motion="off" onMotionChange={onMotionChange} showMotionControls />);
    fireEvent.click(screen.getByRole("button", { name: "loop", exact: true }));
    expect(onMotionChange).toHaveBeenCalledWith("loop");
    expect(screen.getByRole("button", { name: "off", exact: true })).toHaveAttribute("aria-pressed", "true");
    expect(requestFrame).not.toHaveBeenCalled();
  });
  it("plays once to the settled pose and then stops requesting frames", () => {
    const { container } = render(<NotFoundPage motion="once" />);
    requestFrame.mock.calls[0][0](0);
    requestFrame.mock.calls[1][0](4100);
    expect(requestFrame).toHaveBeenCalledTimes(2);
    expect(container.querySelector(".ux-not-found-character")).toHaveStyle({ opacity: "1" });
  });
});
