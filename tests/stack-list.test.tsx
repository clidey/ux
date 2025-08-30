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

import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {StackList, StackListItem} from "@/components/ui/stack-list";

describe("StackList", () => {
    it("renders stack list with items", () => {
        render(
            <StackList>
                <StackListItem item="Key 1">Value 1</StackListItem>
                <StackListItem item="Key 2">Value 2</StackListItem>
                <StackListItem item="Key 3">Value 3</StackListItem>
            </StackList>
        );

        expect(screen.getByText("Key 1")).toBeInTheDocument();
        expect(screen.getByText("Value 1")).toBeInTheDocument();
        expect(screen.getByText("Key 2")).toBeInTheDocument();
        expect(screen.getByText("Value 2")).toBeInTheDocument();
        expect(screen.getByText("Key 3")).toBeInTheDocument();
        expect(screen.getByText("Value 3")).toBeInTheDocument();
    });

    it("applies custom className to stack list", () => {
        render(
            <StackList separatorClassName="custom-separator">
                <StackListItem item="Key">Value</StackListItem>
            </StackList>
        );

        expect(screen.getByText("Key")).toBeInTheDocument();
    });

    it("applies custom className to stack list item", () => {
        render(
            <StackList>
                <StackListItem
                    item="Custom Key"
                    keyClassName="custom-key"
                    valueClassName="custom-value"
                    rowClassName="custom-row"
                    itemClassName="custom-item"
                >
                    Custom Value
                </StackListItem>
            </StackList>
        );

        const key = screen.getByText("Custom Key");
        expect(key).toHaveClass("custom-key");

        const value = screen.getByText("Custom Value");
        expect(value).toHaveClass("custom-value");

        const row = key.parentElement;
        expect(row).toHaveClass("custom-row");

        const item = row?.parentElement;
        expect(item).toHaveClass("custom-item");
    });

    it("renders items with different content types", () => {
        render(
            <StackList>
                <StackListItem item="Text">
                    <span>Text content</span>
                </StackListItem>
                <StackListItem item="Complex">
                    <div>
                        <strong>Bold text</strong>
                        <span> and normal text</span>
                    </div>
                </StackListItem>
                <StackListItem item="Button">
                    <button>Click me</button>
                </StackListItem>
            </StackList>
        );

        expect(screen.getByText("Text content")).toBeInTheDocument();
        expect(screen.getByText("Bold text")).toBeInTheDocument();
        expect(screen.getByText("and normal text")).toBeInTheDocument();
        expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("renders with separator between items", () => {
        const {container} = render(
            <StackList>
                <StackListItem item="Item 1">Value 1</StackListItem>
                <StackListItem item="Item 2">Value 2</StackListItem>
                <StackListItem item="Item 3">Value 3</StackListItem>
            </StackList>
        );

        // Should have 2 separators for 3 items
        const separators = container.querySelectorAll('[data-orientation="horizontal"]');
        expect(separators).toHaveLength(2);
    });

    it("does not render separator after last item", () => {
        const {container} = render(
            <StackList>
                <StackListItem item="Only Item">Value</StackListItem>
            </StackList>
        );

        // Should have no separators for single item
        const separators = container.querySelectorAll('[data-orientation="horizontal"]');
        expect(separators).toHaveLength(0);
    });

    it("applies custom separator className", () => {
        const {container} = render(
            <StackList separatorClassName="w-3/4 mx-auto">
                <StackListItem item="Item 1">Value 1</StackListItem>
                <StackListItem item="Item 2">Value 2</StackListItem>
            </StackList>
        );

        const separator = container.querySelector('[data-orientation="horizontal"]');
        expect(separator).toHaveClass("w-3/4", "mx-auto");
    });

    it("handles click events on items", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(
            <StackList>
                <StackListItem item="Clickable">
                    <button onClick={handleClick}>Click me</button>
                </StackListItem>
            </StackList>
        );

        await user.click(screen.getByText("Click me"));
        expect(handleClick).toHaveBeenCalled();
    });

    it("renders empty stack list", () => {
        const {container} = render(<StackList>{[]}</StackList>);

        const list = container.querySelector('.flex.flex-col');
        expect(list).toBeInTheDocument();
        expect(list?.children).toHaveLength(0);
    });

    it("handles single child correctly", () => {
        render(
            <StackList>
                <StackListItem item="Single">Item</StackListItem>
            </StackList>
        );

        expect(screen.getByText("Single")).toBeInTheDocument();
        expect(screen.getByText("Item")).toBeInTheDocument();
    });

    it("handles complex nested content", () => {
        render(
            <StackList>
                <StackListItem item="User Info">
                    <div className="flex gap-2">
                        <span className="font-bold">John Doe</span>
                        <span className="text-gray-500">john@example.com</span>
                    </div>
                </StackListItem>
                <StackListItem item="Status">
                    <span className="text-green-500">Active</span>
                </StackListItem>
            </StackList>
        );

        expect(screen.getByText("User Info")).toBeInTheDocument();
        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("john@example.com")).toBeInTheDocument();
        expect(screen.getByText("Status")).toBeInTheDocument();
        expect(screen.getByText("Active")).toBeInTheDocument();
    });
});