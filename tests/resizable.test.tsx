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

import {describe, expect, it} from "vitest";
import {render, screen} from "@testing-library/react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable";

describe("Resizable", () => {
    it("renders resizable panel group with panels", () => {
        render(
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>Panel 1</ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel>Panel 2</ResizablePanel>
            </ResizablePanelGroup>
        );

        expect(screen.getByText("Panel 1")).toBeInTheDocument();
        expect(screen.getByText("Panel 2")).toBeInTheDocument();
    });

    it("renders horizontal layout", () => {
        render(
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>Left Panel</ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel>Right Panel</ResizablePanel>
            </ResizablePanelGroup>
        );

        const group = document.querySelector('[data-panel-group]');
        expect(group).toHaveAttribute("data-orientation", "horizontal");
    });

    it("renders vertical layout", () => {
        render(
            <ResizablePanelGroup direction="vertical">
                <ResizablePanel>Top Panel</ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel>Bottom Panel</ResizablePanel>
            </ResizablePanelGroup>
        );

        const group = document.querySelector('[data-panel-group]');
        expect(group).toHaveAttribute("data-orientation", "vertical");
    });

    it("renders handle with icon", () => {
        render(
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>Panel 1</ResizablePanel>
                <ResizableHandle withHandle/>
                <ResizablePanel>Panel 2</ResizablePanel>
            </ResizablePanelGroup>
        );

        const handleIcon = document.querySelector('[data-panel-resize-handle-enabled] svg');
        expect(handleIcon).toBeInTheDocument();
    });

    it("applies custom className to panel group", () => {
        render(
            <ResizablePanelGroup direction="horizontal" className="custom-group">
                <ResizablePanel>Panel</ResizablePanel>
            </ResizablePanelGroup>
        );

        const group = document.querySelector('[data-panel-group]');
        expect(group).toHaveClass("custom-group");
    });

    it("applies custom className to panel", () => {
        render(
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel className="custom-panel">Content</ResizablePanel>
            </ResizablePanelGroup>
        );

        const panel = document.querySelector('[data-slot="resizable-panel"]');
        expect(panel).toHaveClass("custom-panel");
    });

    it("applies custom className to handle", () => {
        render(
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>Panel 1</ResizablePanel>
                <ResizableHandle className="custom-handle"/>
                <ResizablePanel>Panel 2</ResizablePanel>
            </ResizablePanelGroup>
        );

        const handle = document.querySelector('[data-panel-resize-handle-enabled]');
        expect(handle).toHaveClass("custom-handle");
    });

    it("sets initial sizes for panels", () => {
        render(
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={30}>Small Panel</ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel defaultSize={70}>Large Panel</ResizablePanel>
            </ResizablePanelGroup>
        );

        expect(screen.getByText("Small Panel")).toBeInTheDocument();
        expect(screen.getByText("Large Panel")).toBeInTheDocument();
    });

    it("sets min and max sizes for panels", () => {
        render(
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel minSize={20} maxSize={80}>
                    Constrained Panel
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel>Free Panel</ResizablePanel>
            </ResizablePanelGroup>
        );

        expect(screen.getByText("Constrained Panel")).toBeInTheDocument();
        expect(screen.getByText("Free Panel")).toBeInTheDocument();
    });

    it("renders multiple panels with handles", () => {
        render(
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>Panel 1</ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel>Panel 2</ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel>Panel 3</ResizablePanel>
            </ResizablePanelGroup>
        );

        expect(screen.getByText("Panel 1")).toBeInTheDocument();
        expect(screen.getByText("Panel 2")).toBeInTheDocument();
        expect(screen.getByText("Panel 3")).toBeInTheDocument();

        const handles = document.querySelectorAll('[data-panel-resize-handle-enabled]');
        expect(handles).toHaveLength(2);
    });

    it("supports collapsible panels", () => {
        render(
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel collapsible minSize={20}>
                    Collapsible Panel
                </ResizablePanel>
                <ResizableHandle/>
                <ResizablePanel>Regular Panel</ResizablePanel>
            </ResizablePanelGroup>
        );

        expect(screen.getByText("Collapsible Panel")).toBeInTheDocument();
        expect(screen.getByText("Regular Panel")).toBeInTheDocument();
    });
});