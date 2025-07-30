import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyState } from "@/components/ui/empty-state"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Home, User } from "lucide-react"
import { ModeToggle } from "./components/theme/toggle"
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "./components/ui/dropdown-menu"
import { Select, SelectSeparator, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./components/ui/select"

function App() {
  return (
    <div className="min-h-svh bg-background max-w-4xl mx-auto px-4">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">Clidey UX</h1>
          <ModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="container py-8">
        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          {/* Buttons Showcase */}
          <TabsContent value="buttons" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>All available button variants and sizes</CardDescription>
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

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon"><User /></Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button disabled>Disabled</Button>
                    <Button>Loading...</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cards Showcase */}
          <TabsContent value="cards" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Card with Header</CardTitle>
                  <CardDescription>This is a card with a header section</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the main content of the card. You can put any content here.</p>
                </CardContent>
                <CardFooter>
                  <Button>Action</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card with Action</CardTitle>
                  <CardDescription>Card with action button in header</CardDescription>
                  <div className="absolute right-6 top-6">
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>This card has an action button positioned in the header area.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Forms Showcase */}
          <TabsContent value="forms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>Input fields and form components</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <Input id="search" type="search" placeholder="Search..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file">File Upload</Label>
                    <Input id="file" type="file" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Showcase */}
          <TabsContent value="data" className="space-y-6">
            <div className="space-y-6">
              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Badges</CardTitle>
                  <CardDescription>Different badge variants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Data Table</CardTitle>
                  <CardDescription>A sample data table</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>John Doe</TableCell>
                        <TableCell>john@example.com</TableCell>
                        <TableCell><Badge variant="secondary">Active</Badge></TableCell>
                        <TableCell><Button size="sm" variant="outline">Edit</Button></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Jane Smith</TableCell>
                        <TableCell>jane@example.com</TableCell>
                        <TableCell><Badge variant="destructive">Inactive</Badge></TableCell>
                        <TableCell><Button size="sm" variant="outline">Edit</Button></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Skeleton */}
              <Card>
                <CardHeader>
                  <CardTitle>Loading States</CardTitle>
                  <CardDescription>Skeleton components for loading states</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>


            {/* Dropdown */}
            <Card>
              <CardHeader>
                <CardTitle>Dropdown</CardTitle>
                <CardDescription>Dropdown component</CardDescription>
              </CardHeader>
              <CardContent>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <a href="/">Home</a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>

            {/* Select */}
            <Card>
              <CardHeader>
                <CardTitle>Select</CardTitle>
                <CardDescription>Accessible select dropdown component</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 max-w-xs">
                  <div>
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                      <SelectTrigger id="framework" className="w-full">
                        <SelectValue placeholder="Select a framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Popular</SelectLabel>
                          <SelectItem value="react">React</SelectItem>
                          <SelectItem value="vue">Vue</SelectItem>
                          <SelectItem value="svelte">Svelte</SelectItem>
                          <SelectItem value="angular">Angular</SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
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
                    <Label htmlFor="size">Size</Label>
                    <Select>
                      <SelectTrigger id="size" size="sm" className="w-32">
                        <SelectValue placeholder="Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Navigation Showcase */}
          <TabsContent value="navigation" className="space-y-6">
            <div className="space-y-6">
              {/* Breadcrumb */}
              <Card>
                <CardHeader>
                  <CardTitle>Breadcrumb Navigation</CardTitle>
                  <CardDescription>Hierarchical navigation component</CardDescription>
                </CardHeader>
                <CardContent>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">
                          <Home className="h-4 w-4" />
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Components</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                      </BreadcrumbSeparator>
                      <BreadcrumbItem>
                        <BreadcrumbPage>Showcase</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </CardContent>
              </Card>

              {/* Pagination */}
              <Card>
                <CardHeader>
                  <CardTitle>Pagination</CardTitle>
                  <CardDescription>Page navigation component</CardDescription>
                </CardHeader>
                <CardContent>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
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
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </CardContent>
              </Card>
            </div>

            <SidebarProvider defaultOpen={false}>
              <Sidebar variant="sidebar" collapsible="icon">
                <SidebarHeader>
                  <SidebarTrigger className="ml-px" />
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild={true}>
                          <a href="/">
                            <Home className="h-4 w-4" />
                            Home
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroup>
                </SidebarContent>
              </Sidebar>
            </SidebarProvider>
          </TabsContent>

          {/* Feedback Showcase */}
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feedback Components</CardTitle>
                <CardDescription>Components for user feedback and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Success</Badge>
                  <Badge variant="destructive">Error</Badge>
                  <Badge variant="secondary">Info</Badge>
                  <Badge variant="outline">Warning</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Note: Toast notifications and other feedback components would be implemented with the Sonner component.
                </p>
              </CardContent>
            </Card>
            <div className="flex h-[500px]">
              <EmptyState
                title="No navigation found"
                description="No navigation found"
                icon={<Home className="h-4 w-4" />}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App