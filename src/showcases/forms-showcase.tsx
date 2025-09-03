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
import {Checkbox} from "@/components/ui/checkbox"
import {Input, TextArea} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {Separator} from "@/components/ui/separator"
import {Switch} from "@/components/ui/switch"
import {Search} from "lucide-react"

export function FormsShowcase() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Input Fields</CardTitle>
                    <CardDescription>Various input types and states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter your email"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="Enter your password"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="search">Search with Icon</Label>
                            <div className="relative">
                                <Search
                                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
                                <Input id="search" type="search" placeholder="Search..." className="pl-10"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="file">File Upload</Label>
                            <Input id="file" type="file"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="disabled">Disabled Input</Label>
                            <Input id="disabled" placeholder="Disabled input" disabled/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="error">Input with Error</Label>
                            <Input id="error" placeholder="Error state" className="border-red-500"/>
                            <p className="text-sm text-red-500">This field is required</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="textarea">Textarea</Label>
                        <TextArea id="textarea" placeholder="Enter your message here..." rows={4}/>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Form Controls</CardTitle>
                    <CardDescription>Checkboxes, switches, and select dropdowns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Checkboxes</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms"/>
                                <Label htmlFor="terms">Accept terms and conditions</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="marketing" defaultChecked/>
                                <Label htmlFor="marketing">Receive marketing emails</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="disabled" disabled/>
                                <Label htmlFor="disabled" className="text-muted-foreground">Disabled option</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="indeterminate" checked="indeterminate"/>
                                <Label htmlFor="indeterminate">Indeterminate state</Label>
                            </div>
                        </div>
                    </div>

                    <Separator/>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Switches</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="flex items-center space-x-2">
                                <Switch id="notifications"/>
                                <Label htmlFor="notifications">Enable notifications</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="darkmode" defaultChecked/>
                                <Label htmlFor="darkmode">Dark mode</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="disabled-switch" disabled/>
                                <Label htmlFor="disabled-switch" className="text-muted-foreground">Disabled
                                    switch</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="airplane"/>
                                <Label htmlFor="airplane">Airplane mode</Label>
                            </div>
                        </div>
                    </div>

                    <Separator/>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Select Dropdowns</h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="framework">Framework</Label>
                                <Select>
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select a framework"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Popular</SelectLabel>
                                            <SelectItem value="react">React</SelectItem>
                                            <SelectItem value="vue">Vue</SelectItem>
                                            <SelectItem value="svelte">Svelte</SelectItem>
                                            <SelectItem value="angular">Angular</SelectItem>
                                        </SelectGroup>
                                        <SelectSeparator/>
                                        <SelectGroup>
                                            <SelectLabel>Other</SelectLabel>
                                            <SelectItem value="solid">Solid</SelectItem>
                                            <SelectItem value="qwik">Qwik</SelectItem>
                                            <SelectItem value="alpine">Alpine</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="size-select">Size</Label>
                                <Select>
                                    <SelectTrigger id="size-select">
                                        <SelectValue placeholder="Choose size"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="xs">Extra Small</SelectItem>
                                        <SelectItem value="sm">Small</SelectItem>
                                        <SelectItem value="md">Medium</SelectItem>
                                        <SelectItem value="lg">Large</SelectItem>
                                        <SelectItem value="xl">Extra Large</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}