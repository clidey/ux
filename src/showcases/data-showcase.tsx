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
    TableRow
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
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Invoice</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
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
                                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">$1,750.00</TableCell>
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
        </>
    )
}