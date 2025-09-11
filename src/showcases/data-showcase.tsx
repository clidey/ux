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

import {useState} from "react"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut
} from "@/components/ui/command"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import {StackList, StackListItem} from "@/components/ui/stack-list"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableHeadRow,
    TableRow,
    VirtualizedTableBody,
    type TableColumn,
} from "@/components/ui/table"
import {Tree, type TreeDataItem} from "@/components/ui/tree"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {
    Archive,
    Calculator,
    Calendar,
    CreditCard,
    File,
    FileText,
    Folder,
    Home,
    Mail,
    Settings,
    Smile,
    User
} from "lucide-react"

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
    },
]

const treeData: TreeDataItem[] = [
    {
        id: "1",
        name: "Documents",
        icon: Folder,
        children: [
            {
                id: "1-1",
                name: "Projects",
                icon: Folder,
                children: [
                    {
                        id: "1-1-1",
                        name: "project-overview.pdf",
                        icon: FileText,
                    },
                    {
                        id: "1-1-2",
                        name: "requirements.docx",
                        icon: File,
                    },
                ],
            },
            {
                id: "1-2",
                name: "Reports",
                icon: Folder,
                children: [
                    {
                        id: "1-2-1",
                        name: "annual-report.pdf",
                        icon: FileText,
                    },
                    {
                        id: "1-2-2",
                        name: "q4-summary.xlsx",
                        icon: File,
                    },
                ],
            },
        ],
    },
    {
        id: "2",
        name: "Images",
        icon: Folder,
        children: [
            {
                id: "2-1",
                name: "Screenshots",
                icon: Folder,
                children: [
                    {
                        id: "2-1-1",
                        name: "dashboard.png",
                        icon: File,
                    },
                ],
            },
        ],
    },
]

export function DataShowcase() {
    const [open, setOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<TreeDataItem | undefined>(undefined)

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Table</CardTitle>
                    <CardDescription>Data tables with headers, footers, and captions</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table className="caption-bottom">
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.invoice}>
                                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                invoice.paymentStatus === "Paid"
                                                    ? "default"
                                                    : invoice.paymentStatus === "Pending"
                                                        ? "secondary"
                                                        : "destructive"
                                            }
                                        >
                                            {invoice.paymentStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{invoice.paymentMethod}</TableCell>
                                    <TableCell>{invoice.totalAmount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell>$1,750.00</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Pagination</CardTitle>
                    <CardDescription>Navigation between pages of content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#"/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#"/>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#"/>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" size="icon">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" size="icon">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" size="icon" isActive>3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" size="icon">4</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" size="icon">5</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#"/>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Command Menu</CardTitle>
                    <CardDescription>Fast, composable command menu with search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button onClick={() => setOpen(true)}>Open Command Menu</Button>

                    <Command className="rounded-lg border shadow-md">
                        <CommandInput placeholder="Type a command or search..."/>
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                                <CommandItem>
                                    <Calendar className="mr-2 h-4 w-4"/>
                                    <span>Calendar</span>
                                </CommandItem>
                                <CommandItem>
                                    <Smile className="mr-2 h-4 w-4"/>
                                    <span>Search Emoji</span>
                                </CommandItem>
                                <CommandItem>
                                    <Calculator className="mr-2 h-4 w-4"/>
                                    <span>Calculator</span>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator/>
                            <CommandGroup heading="Settings">
                                <CommandItem>
                                    <User className="mr-2 h-4 w-4"/>
                                    <span>Profile</span>
                                    <CommandShortcut>⌘P</CommandShortcut>
                                </CommandItem>
                                <CommandItem>
                                    <CreditCard className="mr-2 h-4 w-4"/>
                                    <span>Billing</span>
                                    <CommandShortcut>⌘B</CommandShortcut>
                                </CommandItem>
                                <CommandItem>
                                    <Settings className="mr-2 h-4 w-4"/>
                                    <span>Settings</span>
                                    <CommandShortcut>⌘S</CommandShortcut>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>

                    <CommandDialog open={open} onOpenChange={setOpen}>
                        <CommandInput placeholder="Type a command or search..."/>
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                                <CommandItem>
                                    <Calendar className="mr-2 h-4 w-4"/>
                                    <span>Calendar</span>
                                </CommandItem>
                                <CommandItem>
                                    <Smile className="mr-2 h-4 w-4"/>
                                    <span>Search Emoji</span>
                                </CommandItem>
                                <CommandItem>
                                    <Calculator className="mr-2 h-4 w-4"/>
                                    <span>Calculator</span>
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </CommandDialog>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Tree View</CardTitle>
                    <CardDescription>Hierarchical data display with expand/collapse</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tree
                        data={treeData}
                        className="h-[300px] w-full"
                        onSelectChange={setSelectedItem}
                        expandAll={false}
                        folderIcon={Folder}
                        itemIcon={File}
                    />
                    {selectedItem && (
                        <div className="mt-4 p-4 border rounded-lg">
                            <p className="text-sm text-muted-foreground">Selected: {selectedItem.name}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Stack List</CardTitle>
                    <CardDescription>Vertical list of stacked items</CardDescription>
                </CardHeader>
                <CardContent>
                    <StackList>
                        <StackListItem
                            item="Dashboard"
                        >
                            View your overview and analytics
                        </StackListItem>
                        <StackListItem
                            item="Messages"
                        >
                            12 unread messages
                        </StackListItem>
                        <StackListItem
                            item="Archive"
                        >
                            Archived items and documents
                        </StackListItem>
                        <StackListItem
                            item="Settings"
                        >
                            Manage your preferences
                        </StackListItem>
                    </StackList>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-4">Custom Stack List</h3>
                        <div className="space-y-2">
                            <div
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Home className="h-5 w-5 text-muted-foreground"/>
                                    <div>
                                        <div className="font-medium">Dashboard</div>
                                        <div className="text-sm text-muted-foreground">View your overview and
                                            analytics
                                        </div>
                                    </div>
                                </div>
                                <Badge>New</Badge>
                            </div>
                            <div
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-muted-foreground"/>
                                    <div>
                                        <div className="font-medium">Messages</div>
                                        <div className="text-sm text-muted-foreground">12 unread messages</div>
                                    </div>
                                </div>
                                <Badge variant="destructive">12</Badge>
                            </div>
                            <div
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Archive className="h-5 w-5 text-muted-foreground"/>
                                    <div>
                                        <div className="font-medium">Archive</div>
                                        <div className="text-sm text-muted-foreground">Archived items and documents
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Settings className="h-5 w-5 text-muted-foreground"/>
                                    <div>
                                        <div className="font-medium">Settings</div>
                                        <div className="text-sm text-muted-foreground">Manage your preferences</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Virtualized Table</CardTitle>
                    <CardDescription>High-performance table with virtualization for large datasets</CardDescription>
                </CardHeader>
                <CardContent>
                    <VirtualizedTableExample />
                </CardContent>
            </Card>
        </>
    )
}

// Virtualized Table Example Component

function VirtualizedTableExample() {
    const [useDynamicRowHeight, setUseDynamicRowHeight] = useState(false)
    const [hideIndexRow, setHideIndexRow] = useState(false)
    const [disableHeader, setDisableHeader] = useState(false)
    const [rowCount, setRowCount] = useState(1000)
    const [height, setHeight] = useState(400)
    const [rowHeight, setRowHeight] = useState(40)
    const [headerHeight, setHeaderHeight] = useState(30)
    const [overscanRowCount, setOverscanRowCount] = useState(10)
    const [scrollToIndex, setScrollToIndex] = useState<number | undefined>(undefined)

    // Generate sample data
    const generateData = (count: number) => {
        return Array.from({ length: count }, (_, index) => ({
            index: index + 1,
            name: `User ${index + 1}`,
            email: `user${index + 1}@example.com`,
            role: ['Admin', 'User', 'Moderator', 'Guest'][index % 4],
            status: ['Active', 'Inactive', 'Pending'][index % 3],
            lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            // random: `This is a long description for row ${index + 1} that demonstrates text truncation and wrapping behavior in the virtualized table component.`
            random: JSON.stringify({
                id: Math.floor(Math.random() * 10000),
                active: Math.random() > 0.5,
                tags: ["alpha", "beta", "gamma"].filter(() => Math.random() > 0.5),
                score: +(Math.random() * 100).toFixed(2),
                meta: {
                    created: new Date(Date.now() - Math.random() * 1e9).toISOString(),
                    updated: new Date().toISOString()
                }
            }, null, 2)
        }))
    }

    const data = generateData(rowCount)

    // Column definitions
    const columns: TableColumn[] = [
        ...(hideIndexRow ? [] : [{
            dataKey: 'index',
            label: 'Index',
        }]),
        {
            dataKey: 'name',
            label: 'Full Name',
        },
        {
            dataKey: 'email',
            label: 'Email',
        },
        {
            dataKey: 'role',
            label: 'Role',
        },
        {
            dataKey: 'status',
            label: 'Status',
        },
        {
            dataKey: 'lastLogin',
            label: 'Last Login',
        },
        {
            dataKey: 'random',
            label: 'Description',
        }
    ]


    const handleScrollToRowChange = (value: string) => {
        const index = parseInt(value, 10)
        if (isNaN(index)) {
            setScrollToIndex(undefined)
        } else {
            setScrollToIndex(Math.min(rowCount - 1, index))
        }
    }

    // Table rendering using primitives from @/components/ui/table
    return (
        <div className="space-y-6">
            {/* Controls */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-x-2">
                    <label className="text-sm font-medium">Use dynamic row heights?</label>
                    <input
                        type="checkbox"
                        checked={useDynamicRowHeight}
                        onChange={(e) => setUseDynamicRowHeight(e.target.checked)}
                        className="rounded"
                    />
                </div>
                <div className="space-x-2">
                    <label className="text-sm font-medium">Hide index?</label>
                    <input
                        type="checkbox"
                        checked={hideIndexRow}
                        onChange={(e) => setHideIndexRow(e.target.checked)}
                        className="rounded"
                    />
                </div>
                <div className="space-x-2">
                    <label className="text-sm font-medium">Hide header?</label>
                    <input
                        type="checkbox"
                        checked={disableHeader}
                        onChange={(e) => setDisableHeader(e.target.checked)}
                        className="rounded"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Num rows</label>
                    <input
                        type="number"
                        value={rowCount}
                        onChange={(e) => setRowCount(parseInt(e.target.value, 10) || 0)}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Scroll to</label>
                    <input
                        type="number"
                        placeholder="Index..."
                        value={scrollToIndex ?? ''}
                        onChange={(e) => handleScrollToRowChange(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">List height</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(parseInt(e.target.value, 10) || 1)}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Row height</label>
                    <input
                        type="number"
                        disabled={useDynamicRowHeight}
                        value={rowHeight}
                        onChange={(e) => setRowHeight(parseInt(e.target.value, 10) || 1)}
                        className="w-full px-3 py-2 border rounded-md disabled:opacity-50"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Header height</label>
                    <input
                        type="number"
                        value={headerHeight}
                        onChange={(e) => setHeaderHeight(parseInt(e.target.value, 10) || 1)}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Overscan</label>
                    <input
                        type="number"
                        value={overscanRowCount}
                        onChange={(e) => setOverscanRowCount(parseInt(e.target.value, 10) || 0)}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
            </div>
            <div className="border rounded-lg">
                <Table className="w-full">
                    {!disableHeader && (
                        <TableHeader>
                            <TableHeadRow style={{ height: headerHeight }}>
                                {columns.map((col) => (
                                    <TableHead key={col.dataKey}>
                                        {col.label}
                                    </TableHead>
                                ))}
                            </TableHeadRow>
                        </TableHeader>
                    )}
                    <VirtualizedTableBody
                        rowCount={data.length}
                        rowHeight={
                            useDynamicRowHeight
                                ? (args: { index: number }) => 30 + (args.index % 3) * 10
                                : rowHeight
                        }
                        height={height}
                        overscan={overscanRowCount}
                    >
                        {(rowIdx: number, rowStyle: React.CSSProperties) => {
                            const rowData = data[rowIdx]
                            return (
                                <TableRow key={rowIdx} style={rowStyle}>
                                    {columns.map((col) => {
                                        return (
                                            <TableCell key={col.dataKey}>
                                                {rowData[col.dataKey as keyof typeof rowData]}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        }}
                    </VirtualizedTableBody>
                </Table>
            </div>
        </div>
    )
}