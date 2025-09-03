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

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable"
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area"
import {Separator} from "@/components/ui/separator"

const tags = Array.from({length: 50}).map((_, i) => `Tag ${i + 1}`)

export function LayoutShowcase() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Resizable Panels</CardTitle>
                    <CardDescription>Adjustable panel layouts with drag handles</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="h-[400px] w-full">
                        <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
                            <ResizablePanel defaultSize={25} minSize={20}>
                                <div className="flex h-full items-center justify-center p-6">
                                    <span className="font-semibold">Sidebar</span>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle withHandle/>
                            <ResizablePanel defaultSize={75}>
                                <ResizablePanelGroup direction="vertical">
                                    <ResizablePanel defaultSize={70}>
                                        <div className="flex h-full items-center justify-center p-6">
                                            <span className="font-semibold">Main Content</span>
                                        </div>
                                    </ResizablePanel>
                                    <ResizableHandle withHandle/>
                                    <ResizablePanel defaultSize={30}>
                                        <div className="flex h-full items-center justify-center p-6">
                                            <span className="font-semibold">Footer</span>
                                        </div>
                                    </ResizablePanel>
                                </ResizablePanelGroup>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Three Column Layout</CardTitle>
                    <CardDescription>Three resizable columns</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="h-[300px] w-full">
                        <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
                            <ResizablePanel defaultSize={25} minSize={15}>
                                <div className="flex h-full items-center justify-center p-6">
                                    <span className="font-semibold">Left Panel</span>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle withHandle/>
                            <ResizablePanel defaultSize={50}>
                                <div className="flex h-full items-center justify-center p-6">
                                    <span className="font-semibold">Center Panel</span>
                                </div>
                            </ResizablePanel>
                            <ResizableHandle withHandle/>
                            <ResizablePanel defaultSize={25} minSize={15}>
                                <div className="flex h-full items-center justify-center p-6">
                                    <span className="font-semibold">Right Panel</span>
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Scroll Areas</CardTitle>
                    <CardDescription>Scrollable containers with custom scrollbars</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Vertical Scroll</h3>
                        <ScrollArea className="h-72 w-full rounded-md border">
                            <div className="p-4">
                                <h4 className="mb-4 text-sm font-medium leading-none">Documentation</h4>
                                {Array.from({length: 20}).map((_, i) => (
                                    <div key={i}>
                                        <div className="text-sm">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                            quis nostrud exercitation ullamco laboris.
                                        </div>
                                        {i < 19 && <Separator className="my-2"/>}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Horizontal Scroll</h3>
                        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                            <div className="flex w-max space-x-4 p-4">
                                {Array.from({length: 20}).map((_, i) => (
                                    <figure key={i} className="shrink-0">
                                        <div className="overflow-hidden rounded-md">
                                            <div className="h-32 w-48 bg-muted flex items-center justify-center">
                        <span className="text-2xl font-semibold text-muted-foreground">
                          Card {i + 1}
                        </span>
                                            </div>
                                        </div>
                                        <figcaption className="pt-2 text-xs text-muted-foreground">
                                            Photo {i + 1}
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal"/>
                        </ScrollArea>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Both Directions</h3>
                        <ScrollArea className="h-48 w-full rounded-md border">
                            <div className="p-4 w-[800px]">
                                <h4 className="mb-4 text-sm font-medium leading-none">Wide Content with Scrolling</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    {Array.from({length: 30}).map((_, i) => (
                                        <div key={i} className="rounded-lg border p-3">
                                            <div className="font-medium">Item {i + 1}</div>
                                            <div className="text-sm text-muted-foreground">
                                                This is a description for item {i + 1} with some additional text to make
                                                it longer
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ScrollBar orientation="horizontal"/>
                        </ScrollArea>
                    </div>

                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Tag List</h3>
                        <ScrollArea className="h-20 w-full rounded-md border">
                            <div className="flex flex-wrap gap-2 p-4">
                                {tags.map((tag) => (
                                    <div
                                        key={tag}
                                        className="rounded-full border px-3 py-1 text-xs font-semibold"
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}