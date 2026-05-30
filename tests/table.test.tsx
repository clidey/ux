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

import {render, screen, fireEvent} from '@testing-library/react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    VirtualizedTableBody,
} from '@/components/ui/table';
import {describe, expect, it} from 'vitest';

describe('Table Component', () => {
    it('should render a basic table', () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Jane Smith</TableCell>
                        <TableCell>jane@example.com</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('should render table with caption', () => {
        render(
            <Table>
                <TableCaption>A list of users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>John</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );

        expect(screen.getByText('A list of users')).toBeInTheDocument();
    });

    it('should accept custom className on all components', () => {
        const {container} = render(
            <Table className="table-custom">
                <TableHeader className="header-custom">
                    <TableRow className="row-custom">
                        <TableHead className="head-custom">Header</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="body-custom">
                    <TableRow className="body-row-custom">
                        <TableCell className="cell-custom">Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );

        expect(container.querySelector('.table-custom')).toBeInTheDocument();
        expect(container.querySelector('.header-custom')).toBeInTheDocument();
        expect(container.querySelector('.row-custom')).toBeInTheDocument();
        expect(container.querySelector('.head-custom')).toBeInTheDocument();
        expect(container.querySelector('.body-custom')).toBeInTheDocument();
        expect(container.querySelector('.body-row-custom')).toBeInTheDocument();
        expect(container.querySelector('.cell-custom')).toBeInTheDocument();
    });

    it('should handle empty table body', () => {
        const {container} = render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody/>
            </Table>
        );

        expect(screen.getByText('Name')).toBeInTheDocument();
        const tbody = container.querySelector('[data-slot="table-body"]');
        expect(tbody).toBeInTheDocument();
        expect(tbody!.children).toHaveLength(0);
    });

    it('should render table with multiple columns and alignment', () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-center">Stock</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Widget</TableCell>
                        <TableCell className="text-right">$19.99</TableCell>
                        <TableCell className="text-center">50</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );

        // TableHead wraps content in a div>span structure, so we need to check the th element
        const priceHeader = screen.getByText('Price').closest('th');
        expect(priceHeader).toHaveClass('text-right');

        const stockHeader = screen.getByText('Stock').closest('th');
        expect(stockHeader).toHaveClass('text-center');

        const priceCell = screen.getByText('$19.99').closest('td');
        expect(priceCell).toHaveClass('text-right');

        const stockCell = screen.getByText('50').closest('td');
        expect(stockCell).toHaveClass('text-center');
    });

    it('should handle colspan and rowspan attributes', () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead colSpan={2}>Merged Header</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Cell 1</TableCell>
                        <TableCell>Cell 2</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );

        // The colSpan prop is on the th element, not the text span
        const mergedHeader = screen.getByText('Merged Header').closest('th');
        expect(mergedHeader).toHaveAttribute('colspan', '2');
    });

    it('should render table footer', () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Product A</TableCell>
                        <TableCell>$10</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Product B</TableCell>
                        <TableCell>$20</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>$30</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );

        expect(screen.getByText('Total')).toBeInTheDocument();
        expect(screen.getByText('$30')).toBeInTheDocument();

        const footer = screen.getByText('Total').closest('tfoot');
        expect(footer).toBeInTheDocument();
    });

    it('should apply correct data-slot attributes', () => {
        const {container} = render(
            <Table>
                <TableCaption>Caption</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Header</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Footer</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );

        expect(container.querySelector('[data-slot="table"]')).toBeInTheDocument();
        expect(container.querySelector('[data-slot="table-caption"]')).toBeInTheDocument();
        expect(container.querySelector('[data-slot="table-header"]')).toBeInTheDocument();
        expect(container.querySelector('[data-slot="table-body"]')).toBeInTheDocument();
        expect(container.querySelector('[data-slot="table-footer"]')).toBeInTheDocument();
        expect(container.querySelector('[data-slot="table-row"]')).toBeInTheDocument();
        expect(container.querySelector('[data-slot="table-head"]')).toBeInTheDocument();
        expect(container.querySelector('[data-slot="table-cell"]')).toBeInTheDocument();
    });

    it('should handle sorting indicators in headers', () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="cursor-pointer">
                            Name
                            <span className="ml-2">↓</span>
                        </TableHead>
                        <TableHead className="cursor-pointer">
                            Date
                            <span className="ml-2">↑</span>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>2024-01-01</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );

        const nameHeader = screen.getByText('Name').closest('th');
        expect(nameHeader).toHaveClass('cursor-pointer');
        expect(screen.getByText('↓')).toBeInTheDocument();
        expect(screen.getByText('↑')).toBeInTheDocument();
    });

    it('should handle complex table with nested content', () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div className="flex items-center">
                                <span className="font-bold">John Doe</span>
                                <span className="text-sm text-gray-500 ml-2">(Admin)</span>
                            </div>
                        </TableCell>
                        <TableCell>
                            <span className="badge badge-success">Active</span>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('(Admin)')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('should handle table with custom width classes', () => {
        const {container} = render(
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="w-[200px]">Name</TableHead>
                        <TableHead>Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="w-[100px]">1</TableCell>
                        <TableCell className="w-[200px]">Item</TableCell>
                        <TableCell>Long description text</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );

        const table = container.querySelector('[data-slot="table"]');
        expect(table).toHaveClass('w-full');

        const idHeader = screen.getByText('ID').closest('th');
        expect(idHeader).toHaveClass('w-[100px]');
    });

    it('should render table with sticky header', () => {
        render(
            <div className="h-[200px] overflow-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-white">
                        <TableRow>
                            <TableHead>Sticky Header</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({length: 20}, (_, i) => (
                            <TableRow key={i}>
                                <TableCell>Row {i + 1}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );

        const header = screen.getByText('Sticky Header').closest('thead');
        expect(header).toHaveClass('sticky', 'top-0', 'bg-white');
    });

    it('should handle responsive table wrapper', () => {
        const {container} = render(
            <div className="overflow-x-auto">
                <Table className="min-w-[600px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Column 1</TableHead>
                            <TableHead>Column 2</TableHead>
                            <TableHead>Column 3</TableHead>
                            <TableHead>Column 4</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Data 1</TableCell>
                            <TableCell>Data 2</TableCell>
                            <TableCell>Data 3</TableCell>
                            <TableCell>Data 4</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        );

        const wrapper = container.querySelector('.overflow-x-auto');
        expect(wrapper).toBeInTheDocument();

        const table = container.querySelector('[data-slot="table"]');
        expect(table).toHaveClass('min-w-[600px]');
    });
});

describe('VirtualizedTableBody', () => {
    it('should render visible rows with constant row height', () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <VirtualizedTableBody
                    rowCount={100}
                    rowHeight={48}
                    height={200}
                >
                    {(index, style) => (
                        <TableRow key={index} style={style}>
                            <TableCell>Row {index}</TableCell>
                        </TableRow>
                    )}
                </VirtualizedTableBody>
            </Table>
        );

        // Should render some rows (visible ones plus overscan)
        expect(screen.getByText('Row 0')).toBeInTheDocument();
        // Should not render rows far beyond the viewport
        expect(screen.queryByText('Row 50')).not.toBeInTheDocument();
    });

    it('should render rows with variable row heights', () => {
        const variableHeight = ({index}: {index: number}) => (index % 2 === 0 ? 40 : 60);

        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <VirtualizedTableBody
                    rowCount={50}
                    rowHeight={variableHeight}
                    height={200}
                >
                    {(index, style) => (
                        <TableRow key={index} style={style}>
                            <TableCell>Variable Row {index}</TableCell>
                        </TableRow>
                    )}
                </VirtualizedTableBody>
            </Table>
        );

        expect(screen.getByText('Variable Row 0')).toBeInTheDocument();
        expect(screen.getByText('Variable Row 1')).toBeInTheDocument();
    });

    it('should render spacer rows for virtualization', () => {
        const {container} = render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <VirtualizedTableBody
                    rowCount={1000}
                    rowHeight={48}
                    height={200}
                >
                    {(index, style) => (
                        <TableRow key={index} style={style}>
                            <TableCell>Row {index}</TableCell>
                        </TableRow>
                    )}
                </VirtualizedTableBody>
            </Table>
        );

        // There should be a bottom spacer since we have many rows
        const hiddenRows = container.querySelectorAll('tr[aria-hidden]');
        // bottom spacer should exist (top spacer may or may not depending on scroll position)
        expect(hiddenRows.length).toBeGreaterThanOrEqual(1);
    });

    it('should accept custom className', () => {
        const {container} = render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <VirtualizedTableBody
                    rowCount={10}
                    rowHeight={48}
                    height={200}
                    className="custom-virtualized"
                >
                    {(index, style) => (
                        <TableRow key={index} style={style}>
                            <TableCell>Row {index}</TableCell>
                        </TableRow>
                    )}
                </VirtualizedTableBody>
            </Table>
        );

        const tbody = container.querySelector('.custom-virtualized');
        expect(tbody).toBeInTheDocument();
    });

    it('should accept custom style prop', () => {
        const {container} = render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <VirtualizedTableBody
                    rowCount={10}
                    rowHeight={48}
                    height={300}
                    style={{border: '1px solid red'}}
                >
                    {(index, style) => (
                        <TableRow key={index} style={style}>
                            <TableCell>Row {index}</TableCell>
                        </TableRow>
                    )}
                </VirtualizedTableBody>
            </Table>
        );

        const tbody = container.querySelector('[data-slot="table-body"]');
        expect(tbody).toHaveStyle({height: '300px', border: '1px solid red'});
    });

    it('should handle zero rowCount gracefully', () => {
        const {container} = render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <VirtualizedTableBody
                    rowCount={0}
                    rowHeight={48}
                    height={200}
                >
                    {(index, style) => (
                        <TableRow key={index} style={style}>
                            <TableCell>Row {index}</TableCell>
                        </TableRow>
                    )}
                </VirtualizedTableBody>
            </Table>
        );

        // Should not render any content rows
        expect(screen.queryByText(/^Row \d+$/)).not.toBeInTheDocument();
        // The tbody should exist
        const tbody = container.querySelector('[data-slot="table-body"]');
        expect(tbody).toBeInTheDocument();
    });

    it('should wrap content in ComponentErrorBoundary', () => {
        // Render with normal content - the error boundary wraps everything
        const {container} = render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <VirtualizedTableBody
                    rowCount={5}
                    rowHeight={48}
                    height={300}
                >
                    {(index, style) => (
                        <TableRow key={index} style={style}>
                            <TableCell>Row {index}</TableCell>
                        </TableRow>
                    )}
                </VirtualizedTableBody>
            </Table>
        );

        // Verify normal rendering works within the error boundary
        expect(screen.getByText('Row 0')).toBeInTheDocument();
        const tbody = container.querySelector('[data-slot="table-body"]');
        expect(tbody).toBeInTheDocument();
    });

    it('should handle scroll events', () => {
        const {container} = render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <VirtualizedTableBody
                    rowCount={100}
                    rowHeight={48}
                    height={200}
                >
                    {(index, style) => (
                        <TableRow key={index} style={style}>
                            <TableCell>Row {index}</TableCell>
                        </TableRow>
                    )}
                </VirtualizedTableBody>
            </Table>
        );

        // Find the tbody (the scroll container)
        const tbody = container.querySelector('[data-slot="table-body"]');
        expect(tbody).toBeInTheDocument();

        // Fire a scroll event - this should not throw
        fireEvent.scroll(tbody!, {target: {scrollTop: 500}});
    });

    it('should respect overscan parameter', () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                    </TableRow>
                </TableHeader>
                <VirtualizedTableBody
                    rowCount={100}
                    rowHeight={48}
                    height={96}
                    overscan={5}
                >
                    {(index, style) => (
                        <TableRow key={index} style={style}>
                            <TableCell>Row {index}</TableCell>
                        </TableRow>
                    )}
                </VirtualizedTableBody>
            </Table>
        );

        // With height=96 and rowHeight=48, 2 rows are visible
        // With overscan=5, up to 2+5=7 rows should be rendered at most (from endIndex)
        // startIndex is max(0, floor(0/48) - 5) = 0, endIndex = min(99, floor(96/48) + 5) = 7
        // So rows 0 through 7 should be rendered (8 rows)
        expect(screen.getByText('Row 0')).toBeInTheDocument();
        expect(screen.getByText('Row 7')).toBeInTheDocument();
        expect(screen.queryByText('Row 8')).not.toBeInTheDocument();
    });
});