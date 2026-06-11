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

import React from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {ConfirmDialog} from "@/components/ui/confirm-dialog"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger
} from "@/components/ui/context-menu"
import {FormSheet} from "@/components/ui/form-sheet"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip"
import {
    ChevronDown,
    Cloud,
    CreditCard,
    GitBranch,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users
} from "lucide-react"

export function OverlaysShowcase() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Dialog & Alert Dialog</CardTitle>
                    <CardDescription>Modal dialogs for user interactions</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <Dialog>
                        <DialogTrigger>
                            <Button variant="outline">Open Dialog</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Update your display name and username. Changes apply immediately.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" defaultValue="Luis Guzmán" className="col-span-3"/>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <Input id="username" defaultValue="@luisguzman" className="col-span-3"/>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <AlertDialog>
                        <AlertDialogTrigger>
                            <Button variant="destructive">Delete Account</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete your account?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Your account and all associated data will be permanently deleted.
                                    This cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Keep account</AlertDialogCancel>
                                <AlertDialogAction>Delete account</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sheet & Drawer</CardTitle>
                    <CardDescription>Slide-out panels from edges</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <Sheet>
                        <SheetTrigger>
                            <Button variant="outline">Open Sheet</Button>
                        </SheetTrigger>
                        <SheetContent footer={
                            <SheetFooter>
                                <SheetClose>
                                    <Button type="submit">Save changes</Button>
                                </SheetClose>
                            </SheetFooter>
                        }>
                            <SheetHeader>
                                <SheetTitle>Edit profile</SheetTitle>
                                <SheetDescription>
                                    Update your display name and username. Changes apply immediately.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name-sheet" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name-sheet" defaultValue="Luis Guzmán" className="col-span-3"/>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username-sheet" className="text-right">
                                        Username
                                    </Label>
                                    <Input id="username-sheet" defaultValue="@luisguzman" className="col-span-3"/>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Sheet>
                        <SheetTrigger>
                            <Button variant="outline">Open Sheet (Overflow)</Button>
                        </SheetTrigger>
                        <SheetContent footer={
                            <SheetFooter>
                                <SheetClose>
                                    <Button type="submit">Save all</Button>
                                </SheetClose>
                            </SheetFooter>
                        }>
                            <SheetHeader>
                                <SheetTitle>Scrollable content</SheetTitle>
                                <SheetDescription>
                                    This sheet has more content than fits — scroll to see it all.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="space-y-4 py-4">
                                {Array.from({length: 20}).map((_, i) => (
                                    <div key={i} className="space-y-1">
                                        <Label htmlFor={`field-${i}`}>Field {i + 1}</Label>
                                        <Input id={`field-${i}`} placeholder={`Enter value for field ${i + 1}`}/>
                                    </div>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Drawer>
                        <DrawerTrigger>
                            <Button variant="outline">Open Drawer</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-sm">
                                <DrawerHeader>
                                    <DrawerTitle>Move Goal</DrawerTitle>
                                    <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                                </DrawerHeader>
                                <div className="p-4 pb-0">
                                    <div className="flex items-center justify-center space-x-2">
                                        <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full">
                                            <span className="sr-only">Decrease</span>
                                            -
                                        </Button>
                                        <div className="flex-1 text-center">
                                            <div className="text-7xl font-bold tracking-tighter">350</div>
                                            <div className="text-[0.70rem] uppercase text-muted-foreground">
                                                Calories/day
                                            </div>
                                        </div>
                                        <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full">
                                            <span className="sr-only">Increase</span>
                                            +
                                        </Button>
                                    </div>
                                </div>
                                <DrawerFooter>
                                    <Button>Set goal</Button>
                                    <DrawerClose>
                                        <Button variant="outline">Dismiss</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Dropdown Menu</CardTitle>
                    <CardDescription>Dropdown menus with nested items</CardDescription>
                </CardHeader>
                <CardContent>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button variant="outline">
                                Open Menu <ChevronDown className="ml-2 h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4"/>
                                    <span>Profile</span>
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <CreditCard className="mr-2 h-4 w-4"/>
                                    <span>Billing</span>
                                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4"/>
                                    <span>Settings</span>
                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Keyboard className="mr-2 h-4 w-4"/>
                                    <span>Keyboard shortcuts</span>
                                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <Users className="mr-2 h-4 w-4"/>
                                    <span>Team</span>
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <UserPlus className="mr-2 h-4 w-4"/>
                                        <span>Invite users</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>
                                            <Mail className="mr-2 h-4 w-4"/>
                                            <span>Email</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <MessageSquare className="mr-2 h-4 w-4"/>
                                            <span>Message</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem>
                                            <PlusCircle className="mr-2 h-4 w-4"/>
                                            <span>More...</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuSub>
                                <DropdownMenuItem>
                                    <Plus className="mr-2 h-4 w-4"/>
                                    <span>New Team</span>
                                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                                <GitBranch className="mr-2 h-4 w-4"/>
                                <span>GitHub</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <LifeBuoy className="mr-2 h-4 w-4"/>
                                <span>Support</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Cloud className="mr-2 h-4 w-4"/>
                                <span>API</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem>
                                <LogOut className="mr-2 h-4 w-4"/>
                                <span>Sign out</span>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Context Menu</CardTitle>
                    <CardDescription>Right-click context menus</CardDescription>
                </CardHeader>
                <CardContent>
                    <ContextMenu>
                        <ContextMenuTrigger
                            className="flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                            <span className="hidden sm:inline">Right-click to open menu</span>
                            <span className="sm:hidden">Long-press to open menu</span>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                            <ContextMenuItem>
                                Back
                                <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuItem disabled>
                                Forward
                                <ContextMenuShortcut>⌘]</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuItem>
                                Reload
                                <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuSub>
                                <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
                                <ContextMenuSubContent className="w-48">
                                    <ContextMenuItem>
                                        Save Page As...
                                        <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                                    </ContextMenuItem>
                                    <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                                    <ContextMenuItem>Name Window...</ContextMenuItem>
                                    <ContextMenuSeparator/>
                                    <ContextMenuItem>Developer Tools</ContextMenuItem>
                                </ContextMenuSubContent>
                            </ContextMenuSub>
                            <ContextMenuSeparator/>
                            <ContextMenuItem>
                                Show Bookmarks Bar
                                <ContextMenuShortcut>⇧⌘B</ContextMenuShortcut>
                            </ContextMenuItem>
                            <ContextMenuItem>Show Full URLs</ContextMenuItem>
                            <ContextMenuSeparator/>
                            <ContextMenuItem>
                                Inspect
                                <ContextMenuShortcut>⌘⇧C</ContextMenuShortcut>
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Popover & Tooltip</CardTitle>
                    <CardDescription>Floating content triggered by interaction</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <Popover>
                        <PopoverTrigger>
                            <Button variant="outline">Open Popover</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Dimensions</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Set the dimensions for the layer.
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="width">Width</Label>
                                        <Input id="width" defaultValue="100%" className="col-span-2 h-8"/>
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="maxWidth">Max. width</Label>
                                        <Input id="maxWidth" defaultValue="300px" className="col-span-2 h-8"/>
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="height">Height</Label>
                                        <Input id="height" defaultValue="25px" className="col-span-2 h-8"/>
                                    </div>
                                    <div className="grid grid-cols-3 items-center gap-4">
                                        <Label htmlFor="maxHeight">Max. height</Label>
                                        <Input id="maxHeight" defaultValue="none" className="col-span-2 h-8"/>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className="flex gap-4">
                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant="outline">Hover for Tooltip</Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>This is a helpful tooltip</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant="outline" size="icon">
                                    <Settings className="h-4 w-4"/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>Settings</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger>
                                <Button variant="outline" disabled>
                                    Disabled with Tooltip
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Sign in to enable this action</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>FormSheet</CardTitle>
                    <CardDescription>Pre-composed slide-out panel for forms</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormSheetDemo />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Confirm Dialog</CardTitle>
                    <CardDescription>Pre-composed confirmation for destructive actions</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    <ConfirmDialogDemo />
                </CardContent>
            </Card>
        </>
    )
}

function FormSheetDemo() {
    const [open, setOpen] = React.useState(false)
    return (
        <>
            <Button variant="outline" onClick={() => setOpen(true)}>Open FormSheet</Button>
            <FormSheet open={open} onClose={() => setOpen(false)} title="Create project" description="Fill in the details for your new project.">
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="project-name">Name</Label>
                        <Input id="project-name" placeholder="My project" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-desc">Description</Label>
                        <Input id="project-desc" placeholder="A short description" />
                    </div>
                </div>
            </FormSheet>
        </>
    )
}

function ConfirmDialogDemo() {
    const [open, setOpen] = React.useState(false)
    const [openBlocked, setOpenBlocked] = React.useState(false)
    return (
        <>
            <Button variant="destructive" onClick={() => setOpen(true)}>Delete project</Button>
            <ConfirmDialog
                open={open}
                onOpenChange={setOpen}
                title="Delete project?"
                description="This will permanently delete the project and all its data. This cannot be undone."
                onConfirm={() => setOpen(false)}
                confirmLabel="Delete project"
                cancelLabel="Keep project"
            />
            <Button variant="outline" onClick={() => setOpenBlocked(true)}>Delete (blocked)</Button>
            <ConfirmDialog
                open={openBlocked}
                onOpenChange={setOpenBlocked}
                title="Delete database?"
                description="This database cannot be deleted because other resources depend on it."
                onConfirm={() => setOpenBlocked(false)}
                confirmLabel="Delete"
                dependencies={["3 active connections", "2 scheduled backups"]}
            />
        </>
    )
}