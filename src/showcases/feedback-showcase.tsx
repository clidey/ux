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
import {Progress} from "@/components/ui/progress"
import {Separator} from "@/components/ui/separator"
import {Skeleton} from "@/components/ui/skeleton"
import {Spinner} from "@/components/ui/spinner"
import {toast} from "sonner"
import {CircleAlert, TriangleAlert, CircleCheck, FileX, Info, Package, Search, Users} from "lucide-react"

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
                        <AlertTitle>New version available</AlertTitle>
                        <AlertDescription>
                            Version 2.1 includes performance improvements and bug fixes. Restart to update.
                        </AlertDescription>
                    </Alert>

                    <Alert variant="destructive">
                        <CircleAlert className="h-4 w-4"/>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Your session has expired. Please log in again.
                        </AlertDescription>
                    </Alert>

                    <Alert variant="success">
                        <CircleCheck className="h-4 w-4"/>
                        <AlertTitle>Changes saved</AlertTitle>
                        <AlertDescription>
                            Your changes have been saved successfully.
                        </AlertDescription>
                    </Alert>

                    <Alert variant="warning">
                        <TriangleAlert className="h-4 w-4"/>
                        <AlertTitle>Trial expiring</AlertTitle>
                        <AlertDescription>
                            Your free trial expires in 3 days. Upgrade to continue using all features.
                        </AlertDescription>
                    </Alert>

                    <Alert variant="info">
                        <Info className="h-4 w-4"/>
                        <AlertTitle>Scheduled maintenance</AlertTitle>
                        <AlertDescription>
                            The system will be briefly unavailable on Sunday 2:00 AM UTC for upgrades.
                        </AlertDescription>
                    </Alert>

                    <Separator/>

                    <h3 className="text-lg font-semibold">Without Description</h3>

                    <Alert>
                        <Info className="h-4 w-4"/>
                        <AlertTitle>Your account has been verified.</AlertTitle>
                    </Alert>

                    <Alert variant="destructive">
                        <CircleAlert className="h-4 w-4"/>
                        <AlertTitle>Unable to connect to the server.</AlertTitle>
                    </Alert>

                    <Separator/>

                    <h3 className="text-lg font-semibold">Without Icon</h3>

                    <Alert>
                        <AlertTitle>CLI available</AlertTitle>
                        <AlertDescription>
                            Install components individually with npx clidey-ux add [component].
                        </AlertDescription>
                    </Alert>

                    <Alert variant="destructive">
                        <AlertTitle>Deletion failed</AlertTitle>
                        <AlertDescription>
                            The item could not be deleted because it is referenced by other resources.
                        </AlertDescription>
                    </Alert>

                    <Separator/>

                    <h3 className="text-lg font-semibold">Description Only</h3>

                    <Alert>
                        <AlertDescription>
                            Your changes are saved automatically as you edit.
                        </AlertDescription>
                    </Alert>

                    <Alert variant="destructive">
                        <AlertDescription>
                            Could not save changes. Check your connection and try again.
                        </AlertDescription>
                    </Alert>

                    <Separator/>

                    <h3 className="text-lg font-semibold">Dismissible</h3>

                    <Alert variant="info" dismissible onClose={() => {}}>
                        <Info className="h-4 w-4"/>
                        <AlertTitle>New feature available</AlertTitle>
                        <AlertDescription>
                            You can now export data in CSV format. Try it from the toolbar.
                        </AlertDescription>
                    </Alert>

                    <Alert variant="warning" dismissible onClose={() => {}}>
                        <TriangleAlert className="h-4 w-4"/>
                        <AlertTitle>Browser outdated</AlertTitle>
                        <AlertDescription>
                            Some features may not work correctly. Update your browser for the best experience.
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
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Active</Badge>
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">In Progress</Badge>
                            <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">Archived</Badge>
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
                        description="Get started by creating your first document.">
                    </EmptyState>

                    <Separator/>

                    <EmptyState
                        icon={<Search className="h-12 w-12"/>}
                        title="No results found"
                        description="Try adjusting your search or filter to find what you're looking for.">
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
                        description="Invite team members to collaborate on your projects.">
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

            <Card>
                <CardHeader>
                    <CardTitle>Spinner</CardTitle>
                    <CardDescription>Animated loading spinners with variant colors and sizes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Sizes</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size="sm" />
                                <span className="text-xs text-muted-foreground">sm</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size="default" />
                                <span className="text-xs text-muted-foreground">default</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size="lg" />
                                <span className="text-xs text-muted-foreground">lg</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner size={40} />
                                <span className="text-xs text-muted-foreground">40px</span>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Variants</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col items-center gap-2">
                                <Spinner variant="default" />
                                <span className="text-xs text-muted-foreground">default</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner variant="primary" />
                                <span className="text-xs text-muted-foreground">primary</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner variant="secondary" />
                                <span className="text-xs text-muted-foreground">secondary</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner variant="destructive" />
                                <span className="text-xs text-muted-foreground">destructive</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Spinner variant="muted" />
                                <span className="text-xs text-muted-foreground">muted</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Progress Indicators</CardTitle>
                    <CardDescription>Show progress or completion status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Sizes</h3>
                        <div className="space-y-4">
                            <Progress value={60} size="sm" />
                            <Progress value={60} size="default" />
                            <Progress value={60} size="md" />
                            <Progress value={60} size="lg" />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Variants</h3>
                        <div className="space-y-4">
                            <Progress value={75} variant="default" showValue />
                            <Progress value={90} variant="success" showValue />
                            <Progress value={45} variant="warning" showValue />
                            <Progress value={20} variant="destructive" showValue />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Indeterminate</h3>
                        <div className="space-y-4">
                            <Progress indeterminate />
                            <Progress indeterminate variant="success" size="md" />
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Use Cases</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">File Upload</span>
                                </div>
                                <Progress value={67} showValue />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Profile Completion</span>
                                </div>
                                <Progress value={33} variant="warning" showValue />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Course Progress</span>
                                </div>
                                <Progress value={89} variant="success" showValue />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}