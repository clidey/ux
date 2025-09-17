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

import {lazy, Suspense} from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {TooltipProvider} from "@/components/ui/tooltip"
import {Toaster} from "@/components/ui/sonner"
import {ModeToggle} from "@/components/theme/toggle"
import {Spinner} from "@/components/ui/spinner"

// Lazy load showcase components
const ButtonsShowcase = lazy(() => import("./showcases/buttons-showcase").then(m => ({default: m.ButtonsShowcase})))
const FormsShowcase = lazy(() => import("./showcases/forms-showcase").then(m => ({default: m.FormsShowcase})))
const NavigationShowcase = lazy(() => import("./showcases/navigation-showcase").then(m => ({default: m.NavigationShowcase})))
const OverlaysShowcase = lazy(() => import("./showcases/overlays-showcase").then(m => ({default: m.OverlaysShowcase})))
const FeedbackShowcase = lazy(() => import("./showcases/feedback-showcase").then(m => ({default: m.FeedbackShowcase})))
const DataShowcase = lazy(() => import("./showcases/data-showcase").then(m => ({default: m.DataShowcase})))
const ChartsShowcase = lazy(() => import("./showcases/charts-showcase").then(m => ({default: m.ChartsShowcase})))
const LayoutShowcase = lazy(() => import("./showcases/layout-showcase").then(m => ({default: m.LayoutShowcase})))

// Loading component
const LoadingSection = () => (
    <div className="flex items-center justify-center py-12">
      <Spinner size="lg"/>
    </div>
)

function App() {
  return (
      <TooltipProvider>
        <div className="min-h-svh bg-background max-w-6xl mx-auto px-4">
          {/* Header */}
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
              <h1 className="text-brand-foreground dark:text-brand-foreground font-bold text-2xl">Clidey UX - Component
                Showcase</h1>
              <ModeToggle/>
            </div>
          </header>

          {/* Main Content */}
          <div className="container py-8">
            <Tabs defaultValue="buttons" className="w-full">
              <TabsList className="grid w-full grid-cols-8 mb-8">
                <TabsTrigger value="buttons">Buttons</TabsTrigger>
                <TabsTrigger value="forms">Forms</TabsTrigger>
                <TabsTrigger value="navigation">Navigation</TabsTrigger>
                <TabsTrigger value="overlays">Overlays</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="charts">Charts</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
              </TabsList>

              {/* Buttons & Actions Showcase */}
              <TabsContent value="buttons" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <ButtonsShowcase/>
                </Suspense>
              </TabsContent>

              {/* Forms & Controls Showcase */}
              <TabsContent value="forms" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <FormsShowcase/>
                </Suspense>
              </TabsContent>

              {/* Navigation Showcase */}
              <TabsContent value="navigation" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <NavigationShowcase/>
                </Suspense>
              </TabsContent>

              {/* Overlays Showcase */}
              <TabsContent value="overlays" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <OverlaysShowcase/>
                </Suspense>
              </TabsContent>

              {/* Feedback Showcase */}
              <TabsContent value="feedback" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <FeedbackShowcase/>
                </Suspense>
              </TabsContent>

              {/* Data Showcase */}
              <TabsContent value="data" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <DataShowcase/>
                </Suspense>
              </TabsContent>

              {/* Charts Showcase */}
              <TabsContent value="charts" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <ChartsShowcase/>
                </Suspense>
              </TabsContent>

              {/* Layout Showcase */}
              <TabsContent value="layout" className="space-y-6">
                <Suspense fallback={<LoadingSection/>}>
                  <LayoutShowcase/>
                </Suspense>
              </TabsContent>
            </Tabs>
          </div>
          <Toaster/>
        </div>
      </TooltipProvider>
  )
}

export default App