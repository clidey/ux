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

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Icon} from "@/components/ui/icon"
import {Separator} from "@/components/ui/separator"
import {Spinner} from "@/components/ui/spinner"
import {Bell, Calendar, Download, Home, Mail, Settings, Trash2, Upload, User} from "lucide-react"

export function ButtonsShowcase() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Button Variants</CardTitle>
                    <CardDescription>All available button variants, sizes, and states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Variants</h3>
                        <div className="flex flex-wrap gap-4">
                            <Button>Default</Button>
                            <Button variant="secondary">Secondary</Button>
                            <Button variant="destructive">Destructive</Button>
                            <Button variant="outline">Outline</Button>
                            <Button variant="ghost">Ghost</Button>
                            <Button variant="link">Link</Button>
                        </div>
                    </div>

                    <Separator/>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Sizes</h3>
                        <div className="flex flex-wrap items-center gap-4">
                            <Button size="sm">Small</Button>
                            <Button size="default">Default</Button>
                            <Button size="lg">Large</Button>
                            <Button size="icon"><User className="h-4 w-4"/></Button>
                        </div>
                    </div>

                    <Separator/>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">States & Icons</h3>
                        <div className="flex flex-wrap gap-4">
                            <Button disabled>Disabled</Button>
                            <Button><Spinner className="mr-2 h-4 w-4"/>Loading</Button>
                            <Button><Download className="mr-2 h-4 w-4"/>Download</Button>
                            <Button><Upload className="mr-2 h-4 w-4"/>Upload</Button>
                            <Button variant="destructive"><Trash2 className="mr-2 h-4 w-4"/>Delete</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Icon Component</CardTitle>
                    <CardDescription>Lucide icon wrapper with different sizes</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Icon icon={<Home/>} size={16}/>
                        <Icon icon={<Settings/>} size={24}/>
                        <Icon icon={<Bell/>} size={32}/>
                        <Icon icon={<Mail/>} className="text-blue-500"/>
                        <Icon icon={<Calendar/>} className="text-green-500"/>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}