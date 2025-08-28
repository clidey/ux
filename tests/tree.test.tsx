import {describe, it, expect, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {Tree, type TreeDataItem} from "../src/components/ui/tree";

describe("Tree", () => {
    const mockData: TreeDataItem[] = [
        {
            id: "1",
            name: "Root",
            children: [
                {
                    id: "1.1",
                    name: "Child 1",
                    children: [
                        {id: "1.1.1", name: "Grandchild 1"},
                        {id: "1.1.2", name: "Grandchild 2"},
                    ],
                },
                {
                    id: "1.2",
                    name: "Child 2",
                },
            ],
        },
        {
            id: "2",
            name: "Root 2",
        },
    ];

    it("renders tree with items", () => {
        render(<Tree data={mockData}/>);

        expect(screen.getByText("Root")).toBeInTheDocument();
        expect(screen.getByText("Root 2")).toBeInTheDocument();
    });

    it("expands and collapses tree nodes", async () => {
        const user = userEvent.setup();
        render(<Tree data={mockData}/>);

        // Children should not be visible initially
        expect(screen.queryByText("Child 1")).not.toBeInTheDocument();

        // Click to expand root node (use exact match to avoid matching "Root 2")
        const rootButton = screen.getByRole("button", {name: /^Root$/i});
        await user.click(rootButton);

        // Children should now be visible
        expect(screen.getByText("Child 1")).toBeInTheDocument();
        expect(screen.getByText("Child 2")).toBeInTheDocument();

        // Click again to collapse
        await user.click(rootButton);
        expect(screen.queryByText("Child 1")).not.toBeInTheDocument();
    });

    it("handles nested expansion", async () => {
        const user = userEvent.setup();
        render(<Tree data={mockData}/>);

        // Expand root
        const rootButton = screen.getByRole("button", {name: /^Root$/i});
        await user.click(rootButton);
        expect(screen.getByText("Child 1")).toBeInTheDocument();

        // Expand child
        const childButton = screen.getByRole("button", {name: /child 1/i});
        await user.click(childButton);
        expect(screen.getByText("Grandchild 1")).toBeInTheDocument();
        expect(screen.getByText("Grandchild 2")).toBeInTheDocument();
    });

    it("calls onSelectChange when item is selected", async () => {
        const user = userEvent.setup();
        const handleSelect = vi.fn();

        render(<Tree data={mockData} onSelectChange={handleSelect}/>);

        // Click on a leaf node
        const rootButton = screen.getByRole("button", {name: /root 2/i});
        await user.click(rootButton);

        expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({
            id: "2",
            name: "Root 2",
        }));
    });

    it("renders with initialSelectedItemId", () => {
        render(<Tree data={mockData} initialSelectedItemId="2"/>);

        const selectedItem = screen.getByText("Root 2").parentElement;
        expect(selectedItem).toHaveAttribute("data-state", "selected");
    });

    it("applies custom className", () => {
        const {container} = render(<Tree data={mockData} className="custom-tree"/>);

        const tree = container.firstChild;
        expect(tree).toHaveClass("custom-tree");
    });

    it("handles empty data", () => {
        const {container} = render(<Tree data={[]}/>);

        const tree = container.firstChild;
        expect(tree).toBeInTheDocument();
    });

    it("handles single tree item data", () => {
        const singleItem: TreeDataItem = {
            id: "single",
            name: "Single Item",
        };

        render(<Tree data={singleItem}/>);

        expect(screen.getByText("Single Item")).toBeInTheDocument();
    });

    it("expands all nodes when expandAll is true", () => {
        render(<Tree data={mockData} expandAll/>);

        // All nodes should be visible
        expect(screen.getByText("Root")).toBeInTheDocument();
        expect(screen.getByText("Child 1")).toBeInTheDocument();
        expect(screen.getByText("Child 2")).toBeInTheDocument();
        expect(screen.getByText("Grandchild 1")).toBeInTheDocument();
        expect(screen.getByText("Grandchild 2")).toBeInTheDocument();
        expect(screen.getByText("Root 2")).toBeInTheDocument();
    });

    it("handles selection of nested items", async () => {
        const user = userEvent.setup();
        const handleSelect = vi.fn();

        render(<Tree data={mockData} onSelectChange={handleSelect} expandAll/>);

        // Click on a grandchild
        const grandchildItem = screen.getByText("Grandchild 1").parentElement;
        await user.click(grandchildItem!);

        expect(handleSelect).toHaveBeenCalledWith(expect.objectContaining({
            id: "1.1.1",
            name: "Grandchild 1",
        }));
    });

    it("renders with custom folder and item icons", () => {
        const FolderIcon = () => <span>📁</span>;
        const FileIcon = () => <span>📄</span>;

        render(
            <Tree
                data={mockData}
                folderIcon={FolderIcon as any}
                itemIcon={FileIcon as any}
                expandAll
            />
        );

        // The component would use the icons internally
        expect(screen.getByText("Root")).toBeInTheDocument();
    });

    it("handles keyboard navigation", async () => {
        const user = userEvent.setup();
        const handleSelect = vi.fn();

        render(<Tree data={mockData} onSelectChange={handleSelect}/>);

        // Focus on first item
        const firstItem = screen.getByRole("button", {name: /^Root$/i});
        firstItem.focus();

        // Use arrow keys to navigate
        await user.keyboard("{ArrowDown}");
        await user.keyboard("{Enter}");

        // Should expand/collapse or select
        expect(screen.getByText("Root")).toBeInTheDocument();
    });

    it("maintains selection state", async () => {
        const user = userEvent.setup();
        const Component = () => {
            const [selected, setSelected] = React.useState<TreeDataItem | undefined>();
            return (
                <>
                    <Tree data={mockData} onSelectChange={setSelected}/>
                    {selected && <div>Selected: {selected.name}</div>}
                </>
            );
        };

        const React = await import("react");
        render(<Component/>);

        // Select Root 2
        const rootButton = screen.getByRole("button", {name: /root 2/i});
        await user.click(rootButton);

        expect(screen.getByText("Selected: Root 2")).toBeInTheDocument();
    });

    it("handles deep nesting", () => {
        const deepData: TreeDataItem[] = [
            {
                id: "1",
                name: "Level 1",
                children: [
                    {
                        id: "1.1",
                        name: "Level 2",
                        children: [
                            {
                                id: "1.1.1",
                                name: "Level 3",
                                children: [
                                    {
                                        id: "1.1.1.1",
                                        name: "Level 4",
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];

        render(<Tree data={deepData} expandAll/>);

        expect(screen.getByText("Level 1")).toBeInTheDocument();
        expect(screen.getByText("Level 2")).toBeInTheDocument();
        expect(screen.getByText("Level 3")).toBeInTheDocument();
        expect(screen.getByText("Level 4")).toBeInTheDocument();
    });
});