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

import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
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
import {Calendar, CreditCard, FileText, Folder, Home, Mail, Settings, User} from "lucide-react"

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
                <CardContent>
                    <div className="border rounded-lg overflow-hidden">
                        <SidebarProvider defaultOpen>
                            <div className="flex min-h-[400px]">
                                <Sidebar>
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
                                                            <a href="#">
                                                                <Home className="h-4 w-4"/>
                                                                <span>Dashboard</span>
                                                            </a>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <a href="#">
                                                                <FileText className="h-4 w-4"/>
                                                                <span>Documents</span>
                                                            </a>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <a href="#">
                                                                <Folder className="h-4 w-4"/>
                                                                <span>Projects</span>
                                                            </a>
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
                                                            <a href="#">
                                                                <Mail className="h-4 w-4"/>
                                                                <span>Messages</span>
                                                            </a>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <a href="#">
                                                                <Calendar className="h-4 w-4"/>
                                                                <span>Calendar</span>
                                                            </a>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                    <SidebarMenuItem>
                                                        <SidebarMenuButton asChild>
                                                            <a href="#">
                                                                <CreditCard className="h-4 w-4"/>
                                                                <span>Billing</span>
                                                            </a>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                </SidebarMenu>
                                            </SidebarGroupContent>
                                        </SidebarGroup>
                                    </SidebarContent>
                                </Sidebar>
                                <main className="flex-1 p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <SidebarTrigger/>
                                        <h3 className="font-semibold">Main Content</h3>
                                    </div>
                                    <p className="text-muted-foreground">
                                        This is the main content area. The sidebar can be toggled using the trigger
                                        button.
                                    </p>
                                </main>
                            </div>
                        </SidebarProvider>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}