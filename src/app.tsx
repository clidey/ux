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

import {lazy, Suspense, useState, useEffect, useCallback} from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command"
import {TooltipProvider} from "@/components/ui/tooltip"
import {Toaster} from "@/components/ui/sonner"
import {ModeToggle} from "@/components/theme/toggle"
import {Spinner} from "@/components/ui/spinner"
import {Button} from "@/components/ui/button"
import {Search} from "lucide-react"

// Lazy load showcase components
const ButtonsShowcase = lazy(() => import("./showcases/buttons-showcase").then(m => ({default: m.ButtonsShowcase})))
const FormsShowcase = lazy(() => import("./showcases/forms-showcase").then(m => ({default: m.FormsShowcase})))
const NavigationShowcase = lazy(() => import("./showcases/navigation-showcase").then(m => ({default: m.NavigationShowcase})))
const OverlaysShowcase = lazy(() => import("./showcases/overlays-showcase").then(m => ({default: m.OverlaysShowcase})))
const FeedbackShowcase = lazy(() => import("./showcases/feedback-showcase").then(m => ({default: m.FeedbackShowcase})))
const DataShowcase = lazy(() => import("./showcases/data-showcase").then(m => ({default: m.DataShowcase})))
const ChartsShowcase = lazy(() => import("./showcases/charts-showcase").then(m => ({default: m.ChartsShowcase})))
const LayoutShowcase = lazy(() => import("./showcases/layout-showcase").then(m => ({default: m.LayoutShowcase})))
const MapShowcase = lazy(() => import("./showcases/map-showcase").then(m => ({default: m.MapShowcase})))

// Loading component
const LoadingSection = () => (
    <div className="flex items-center justify-center min-h-[200px]">
      <Spinner size="lg"/>
    </div>
)

const TABS = ["buttons", "forms", "navigation", "overlays", "feedback", "data", "charts", "maps", "layout"] as const

function useHashTab() {
  const getHash = useCallback(() => {
    const hash = window.location.hash.slice(1)
    return TABS.includes(hash as typeof TABS[number]) ? hash : "buttons"
  }, [])

  const [tab, setTab] = useState(getHash)

  useEffect(() => {
    const onHashChange = () => setTab(getHash())
    window.addEventListener("hashchange", onHashChange)
    return () => window.removeEventListener("hashchange", onHashChange)
  }, [getHash])

  const setTabWithHash = useCallback((value: string) => {
    window.history.pushState(null, "", `#${value}`)
    setTab(value)
  }, [])

  return [tab, setTabWithHash] as const
}

const COMPONENT_INDEX = [
  { name: "Button", tab: "buttons", keywords: "action click submit" },
  { name: "ButtonGroup", tab: "buttons", keywords: "toolbar group actions" },
  { name: "Icon", tab: "buttons", keywords: "lucide svg" },
  { name: "Input", tab: "forms", keywords: "text field type" },
  { name: "TextArea", tab: "forms", keywords: "multiline textarea" },
  { name: "SearchInput", tab: "forms", keywords: "search filter" },
  { name: "Checkbox", tab: "forms", keywords: "toggle check" },
  { name: "Switch", tab: "forms", keywords: "toggle on off" },
  { name: "Select", tab: "forms", keywords: "dropdown pick" },
  { name: "SearchSelect", tab: "forms", keywords: "combobox autocomplete" },
  { name: "Accordion", tab: "navigation", keywords: "collapse expand faq" },
  { name: "Tabs", tab: "navigation", keywords: "tabbed sections" },
  { name: "Breadcrumb", tab: "navigation", keywords: "path hierarchy" },
  { name: "Sidebar", tab: "navigation", keywords: "nav panel menu" },
  { name: "Dialog", tab: "overlays", keywords: "modal popup form" },
  { name: "AlertDialog", tab: "overlays", keywords: "confirm destructive" },
  { name: "Sheet", tab: "overlays", keywords: "slide panel drawer" },
  { name: "Drawer", tab: "overlays", keywords: "bottom sheet mobile" },
  { name: "DropdownMenu", tab: "overlays", keywords: "menu actions context" },
  { name: "ContextMenu", tab: "overlays", keywords: "right click" },
  { name: "Popover", tab: "overlays", keywords: "floating content" },
  { name: "Tooltip", tab: "overlays", keywords: "hint hover" },
  { name: "Alert", tab: "feedback", keywords: "banner notice info warning error" },
  { name: "Badge", tab: "feedback", keywords: "label tag status count" },
  { name: "Skeleton", tab: "feedback", keywords: "loading placeholder" },
  { name: "EmptyState", tab: "feedback", keywords: "no data blank" },
  { name: "Toast", tab: "feedback", keywords: "notification sonner snackbar" },
  { name: "Spinner", tab: "feedback", keywords: "loading indicator" },
  { name: "Progress", tab: "feedback", keywords: "bar percentage completion" },
  { name: "Table", tab: "data", keywords: "rows columns grid data" },
  { name: "VirtualizedTable", tab: "data", keywords: "large dataset performance scroll" },
  { name: "Pagination", tab: "data", keywords: "pages next previous" },
  { name: "Command", tab: "data", keywords: "palette search cmdk" },
  { name: "Tree", tab: "data", keywords: "file explorer hierarchy folder" },
  { name: "StackList", tab: "data", keywords: "list items vertical" },
  { name: "Chart", tab: "charts", keywords: "bar line area pie recharts" },
  { name: "Map", tab: "maps", keywords: "maplibre marker polygon" },
  { name: "ResizablePanel", tab: "layout", keywords: "split pane resize drag" },
  { name: "ScrollArea", tab: "layout", keywords: "overflow scroll custom" },
] as const

function App() {
  const [activeTab, setActiveTab] = useHashTab()
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(open => !open)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const navigateToComponent = (tab: string) => {
    setActiveTab(tab)
    setSearchOpen(false)
  }

  return (
      <TooltipProvider>
        <div className="min-h-svh bg-background max-w-6xl mx-auto px-4">
          <header className="border-b">
            <div className="container flex h-16 items-center justify-between">
              <h1 className="text-foreground font-bold text-2xl">Clidey UX</h1>
              <div className="flex items-center gap-4">
                <a href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Docs</a>
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:inline-flex gap-2 text-muted-foreground"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-3.5 w-3.5" />
                  <span>Search components</span>
                  <kbd className="ml-2 pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
                <ModeToggle/>
              </div>
            </div>
          </header>

          <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
            <CommandInput placeholder="Search components..." />
            <CommandList>
              <CommandEmpty>No components found.</CommandEmpty>
              {TABS.map(tab => {
                const items = COMPONENT_INDEX.filter(c => c.tab === tab)
                if (!items.length) return null
                return (
                  <CommandGroup key={tab} heading={tab.charAt(0).toUpperCase() + tab.slice(1)}>
                    {items.map(item => (
                      <CommandItem
                        key={item.name}
                        value={`${item.name} ${item.keywords}`}
                        onSelect={() => navigateToComponent(item.tab)}
                      >
                        {item.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )
              })}
            </CommandList>
          </CommandDialog>

          <div className="container py-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full overflow-x-auto flex mb-8" aria-label="Component categories">
                <TabsTrigger value="buttons">Buttons</TabsTrigger>
                <TabsTrigger value="forms">Forms</TabsTrigger>
                <TabsTrigger value="navigation">Navigation</TabsTrigger>
                <TabsTrigger value="overlays">Overlays</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="maps">Maps</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
              </TabsList>

              <TabsContent value="buttons" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <ButtonsShowcase/>
                </Suspense>
              </TabsContent>

              <TabsContent value="forms" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <FormsShowcase/>
                </Suspense>
              </TabsContent>

              <TabsContent value="navigation" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <NavigationShowcase/>
                </Suspense>
              </TabsContent>

              <TabsContent value="overlays" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <OverlaysShowcase/>
                </Suspense>
              </TabsContent>

              <TabsContent value="feedback" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <FeedbackShowcase/>
                </Suspense>
              </TabsContent>

              <TabsContent value="data" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <DataShowcase/>
                </Suspense>
              </TabsContent>

              <TabsContent value="charts" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <ChartsShowcase/>
                </Suspense>
              </TabsContent>

              <TabsContent value="maps" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <MapShowcase/>
                </Suspense>
              </TabsContent>

              <TabsContent value="layout" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <LayoutShowcase/>
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Toaster/>
      </TooltipProvider>
  )
}

export default App