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
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger
} from "@/components/ui/sidebar"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Calendar, CreditCard, FileText, Folder, Home, Mail, PanelLeftIcon, PanelRightIcon, Settings, User} from "lucide-react"

export function NavigationShowcase() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Accordion</CardTitle>
                    <CardDescription>Collapsible content sections</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is it accessible?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It adheres to the WAI-ARIA design pattern.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is it styled?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It comes with default styles that matches the other components' aesthetic.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Is it animated?</AccordionTrigger>
                            <AccordionContent>
                                Yes. It's animated by default, but you can disable it if you prefer.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Tabs</CardTitle>
                    <CardDescription>Organize content into tabbed sections</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="account">Account</TabsTrigger>
                            <TabsTrigger value="password">Password</TabsTrigger>
                            <TabsTrigger value="settings">Settings</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className="space-y-4">
                            <div className="p-4 border rounded-lg">
                                <h4 className="font-medium mb-2">Account Settings</h4>
                                <p className="text-sm text-muted-foreground">
                                    Make changes to your account here. Click save when you're done.
                                </p>
                            </div>
                        </TabsContent>
                        <TabsContent value="password" className="space-y-4">
                            <div className="p-4 border rounded-lg">
                                <h4 className="font-medium mb-2">Password Settings</h4>
                                <p className="text-sm text-muted-foreground">
                                    Change your password here. After saving, you'll be logged out.
                                </p>
                            </div>
                        </TabsContent>
                        <TabsContent value="settings" className="space-y-4">
                            <div className="p-4 border rounded-lg">
                                <h4 className="font-medium mb-2">General Settings</h4>
                                <p className="text-sm text-muted-foreground">
                                    Manage your general application settings and preferences.
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Breadcrumb</CardTitle>
                    <CardDescription>Navigation hierarchy display</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Components</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" className="flex items-center gap-2">
                                    <Home className="h-4 w-4"/>
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" className="flex items-center gap-2">
                                    <Settings className="h-4 w-4"/>
                                    Settings
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator/>
                            <BreadcrumbItem>
                                <BreadcrumbPage className="flex items-center gap-2">
                                    <User className="h-4 w-4"/>
                                    Profile
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sidebar</CardTitle>
                    <CardDescription>Collapsible navigation sidebar</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <SidebarBasicDemo/>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sidebar + Embedded Sidebar</CardTitle>
                    <CardDescription>Independent toggles — left nav and right properties panel each collapse separately</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <SidebarEmbedDemo/>
                </CardContent>
            </Card>
        </>
    )
}

function SidebarBasicDemo() {
    const [open, setOpen] = React.useState(true)

    return (
        <div className="border rounded-lg overflow-hidden">
            <SidebarProvider defaultOpen>
                <div className="flex min-h-[400px] w-full">
                    <Sidebar variant="embed" collapsible="offcanvas" open={open} onOpenChange={setOpen}>
                        <SidebarHeader>
                            <h3 className="font-semibold px-2">Navigation</h3>
                        </SidebarHeader>
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>Main</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <a href="#"><Home className="h-4 w-4"/><span>Dashboard</span></a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <a href="#"><FileText className="h-4 w-4"/><span>Documents</span></a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <a href="#"><Folder className="h-4 w-4"/><span>Projects</span></a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                            <SidebarGroup>
                                <SidebarGroupLabel>Tools</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <a href="#"><Mail className="h-4 w-4"/><span>Messages</span></a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <a href="#"><Calendar className="h-4 w-4"/><span>Calendar</span></a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton asChild>
                                                <a href="#"><CreditCard className="h-4 w-4"/><span>Billing</span></a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                    <main className="flex-1 p-6 border-l">
                        <div className="flex items-center gap-4 mb-4">
                            <Button variant="ghost" size="icon" className="size-7" onClick={() => setOpen(v => !v)}>
                                <PanelLeftIcon/>
                            </Button>
                            <h3 className="font-semibold">Main Content</h3>
                        </div>
                        <p className="text-muted-foreground">
                            The sidebar can be toggled using the trigger button.
                        </p>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    )
}

function SidebarEmbedDemo() {
    const [navOpen, setNavOpen] = React.useState(true)
    const [embedOpen, setEmbedOpen] = React.useState(true)

    return (
        <div className="border rounded-lg overflow-hidden">
            <SidebarProvider defaultOpen>
                <div className="flex min-h-[440px] w-full">
                    {/* Left navigation sidebar — controlled independently */}
                    <Sidebar collapsible="icon" variant="embed" open={navOpen} onOpenChange={setNavOpen}>
                        <SidebarHeader>
                            <span className="px-2 font-semibold group-data-[collapsible=icon]:hidden">App</span>
                        </SidebarHeader>
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>Main</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton tooltip="Dashboard" isActive>
                                                <Home/><span>Dashboard</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton tooltip="Documents">
                                                <FileText/><span>Documents</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton tooltip="Calendar">
                                                <Calendar/><span>Calendar</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton tooltip="Settings">
                                                <Settings/><span>Settings</span>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>

                    {/* Main area */}
                    <div className="flex flex-1 flex-col min-w-0 border-l">
                        <header className="flex items-center justify-between px-3 py-2 border-b bg-background">
                            <div className="flex items-center gap-2">
                                {/* Toggles the left embed sidebar via controlled state */}
                                <Button variant="ghost" size="icon" className="size-7" onClick={() => setNavOpen(v => !v)} title="Toggle navigation">
                                    <PanelLeftIcon/>
                                </Button>
                                <span className="font-semibold text-sm">Dashboard</span>
                            </div>
                            {/* Toggles the embed sidebar via controlled state */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                onClick={() => setEmbedOpen(v => !v)}
                                title="Toggle properties panel"
                            >
                                <PanelRightIcon/>
                            </Button>
                        </header>

                        <div className="flex flex-1 min-h-0">
                            <div className="flex-1 p-5 space-y-3">
                                <p className="text-sm font-medium">Independent sidebar toggles</p>
                                <p className="text-sm text-muted-foreground">
                                    The left button (<strong>☰</strong>) collapses the navigation sidebar to icons.
                                    The right button (<strong>⊞</strong>) collapses the properties panel independently.
                                    Each sidebar manages its own state.
                                </p>
                                <div className="grid grid-cols-2 gap-3 pt-2">
                                    {["Overview", "Analytics", "Reports", "Activity"].map(item => (
                                        <div key={item} className="rounded-md border p-3 text-sm font-medium">{item}</div>
                                    ))}
                                </div>
                            </div>

                            {/* Embedded right panel — has its own SidebarContext */}
                            <Sidebar
                                variant="embed"
                                side="right"
                                collapsible="icon"
                                open={embedOpen}
                                onOpenChange={setEmbedOpen}
                            >
                                <SidebarHeader>
                                    <div className="flex items-center justify-between px-1">
                                        <span className="text-sm font-semibold group-data-[collapsible=icon]:hidden">Properties</span>
                                        {/* Toggles only this embed sidebar */}
                                        <SidebarTrigger/>
                                    </div>
                                </SidebarHeader>
                                <SidebarContent>
                                    <SidebarGroup>
                                        <SidebarGroupLabel>Details</SidebarGroupLabel>
                                        <SidebarGroupContent>
                                            <SidebarMenu>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Type">
                                                        <FileText/><span>Document</span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Owner">
                                                        <User/><span>You</span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton tooltip="Created">
                                                        <Calendar/><span>Today</span>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            </SidebarMenu>
                                        </SidebarGroupContent>
                                    </SidebarGroup>
                                </SidebarContent>
                            </Sidebar>
                        </div>
                    </div>
                </div>
            </SidebarProvider>
        </div>
    )
}