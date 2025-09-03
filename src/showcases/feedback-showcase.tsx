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

import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {EmptyState} from "@/components/ui/empty-state"
import {Separator} from "@/components/ui/separator"
import {Skeleton} from "@/components/ui/skeleton"
import {toast} from "sonner"
import {AlertCircle, AlertTriangle, CheckCircle2, FileX, Info, Package, Search, Users} from "lucide-react"

export function FeedbackShowcase() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Alerts</CardTitle>
                    <CardDescription>Contextual feedback messages for user actions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Alert>
                        <Info className="h-4 w-4"/>
                        <AlertTitle>Default Alert</AlertTitle>
                        <AlertDescription>
                            This is a default alert with an informational message.
                        </AlertDescription>
                    </Alert>

                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Your session has expired. Please log in again.
                        </AlertDescription>
                    </Alert>

                    <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400"/>
                        <AlertTitle className="text-green-800 dark:text-green-200">Success!</AlertTitle>
                        <AlertDescription className="text-green-700 dark:text-green-300">
                            Your changes have been saved successfully.
                        </AlertDescription>
                    </Alert>

                    <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400"/>
                        <AlertTitle className="text-yellow-800 dark:text-yellow-200">Warning</AlertTitle>
                        <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                            Your free trial expires in 3 days. Upgrade now to continue using all features.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Badges</CardTitle>
                    <CardDescription>Small count and labeling components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Variants</h3>
                        <div className="flex flex-wrap gap-2">
                            <Badge>Default</Badge>
                            <Badge variant="secondary">Secondary</Badge>
                            <Badge variant="destructive">Destructive</Badge>
                            <Badge variant="outline">Outline</Badge>
                        </div>
                    </div>

                    <Separator/>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Status Badges</h3>
                        <div className="flex flex-wrap gap-2">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                Active
                            </Badge>
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                Pending
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                In Progress
                            </Badge>
                            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                Archived
                            </Badge>
                        </div>
                    </div>

                    <Separator/>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">With Numbers</h3>
                        <div className="flex flex-wrap gap-2">
                            <Badge>New <span className="ml-1">12</span></Badge>
                            <Badge variant="secondary">Messages <span className="ml-1">99+</span></Badge>
                            <Badge variant="destructive">Errors <span className="ml-1">3</span></Badge>
                            <Badge variant="outline">Updates <span className="ml-1">5</span></Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Skeleton Loading</CardTitle>
                    <CardDescription>Loading placeholders for content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Text Skeleton</h3>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full"/>
                            <Skeleton className="h-4 w-[90%]"/>
                            <Skeleton className="h-4 w-[75%]"/>
                        </div>
                    </div>

                    <Separator/>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Card Skeleton</h3>
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full"/>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]"/>
                                <Skeleton className="h-4 w-[200px]"/>
                            </div>
                        </div>
                    </div>

                    <Separator/>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Table Skeleton</h3>
                        <div className="space-y-2">
                            <div className="flex gap-4">
                                <Skeleton className="h-8 w-[100px]"/>
                                <Skeleton className="h-8 w-[200px]"/>
                                <Skeleton className="h-8 w-[150px]"/>
                                <Skeleton className="h-8 w-[100px]"/>
                            </div>
                            <div className="flex gap-4">
                                <Skeleton className="h-8 w-[100px]"/>
                                <Skeleton className="h-8 w-[200px]"/>
                                <Skeleton className="h-8 w-[150px]"/>
                                <Skeleton className="h-8 w-[100px]"/>
                            </div>
                            <div className="flex gap-4">
                                <Skeleton className="h-8 w-[100px]"/>
                                <Skeleton className="h-8 w-[200px]"/>
                                <Skeleton className="h-8 w-[150px]"/>
                                <Skeleton className="h-8 w-[100px]"/>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Empty States</CardTitle>
                    <CardDescription>Placeholder content when there's no data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <EmptyState
                        icon={<FileX className="h-12 w-12"/>}
                        title="No documents found"
                        description="Get started by creating your first document."
                    >
                        <Button>Create Document</Button>
                    </EmptyState>

                    <Separator/>

                    <EmptyState
                        icon={<Search className="h-12 w-12"/>}
                        title="No results found"
                        description="Try adjusting your search or filter to find what you're looking for."
                    >
                        <Button variant="outline">Clear filters</Button>
                    </EmptyState>

                    <Separator/>

                    <EmptyState
                        icon={<Package className="h-12 w-12"/>}
                        title="Your cart is empty"
                        description="Add items to your cart to get started with your order."
                    />

                    <Separator/>

                    <EmptyState
                        icon={<Users className="h-12 w-12"/>}
                        title="No team members"
                        description="Invite team members to collaborate on your projects."
                    >
                        <div className="flex gap-2">
                            <Button>Invite Members</Button>
                            <Button variant="outline">Learn More</Button>
                        </div>
                    </EmptyState>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Toast Notifications (Sonner)</CardTitle>
                    <CardDescription>Temporary notification messages</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Button
                            onClick={() => toast("Default notification")}
                        >
                            Default Toast
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => toast.success("Operation completed successfully!")}
                        >
                            Success Toast
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => toast.error("Something went wrong. Please try again.")}
                        >
                            Error Toast
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => toast.warning("Please review before proceeding.")}
                        >
                            Warning Toast
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => toast.info("New update available.")}
                        >
                            Info Toast
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                const promise = () => new Promise((resolve) => setTimeout(resolve, 2000))
                                toast.promise(promise, {
                                    loading: 'Loading...',
                                    success: 'Data loaded successfully!',
                                    error: 'Failed to load data',
                                })
                            }}
                        >
                            Promise Toast
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => toast("Custom toast with action", {
                                action: {
                                    label: "Undo",
                                    onClick: () => console.log("Undo clicked")
                                }
                            })}
                        >
                            Toast with Action
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}