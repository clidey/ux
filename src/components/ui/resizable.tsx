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

import * as React from "react"
import {GripVerticalIcon} from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import {cn} from "@/lib/utils"

const DirectionContext = React.createContext<"horizontal" | "vertical">("horizontal")

function ResizablePanelGroup({
  className,
  direction = "horizontal",
  ...props
}: Omit<React.ComponentProps<typeof ResizablePrimitive.Group>, "orientation"> & {
  direction?: "horizontal" | "vertical"
}) {
  return (
    <DirectionContext.Provider value={direction}>
      <ResizablePrimitive.Group
        data-slot="resizable-panel-group"
        data-orientation={direction}
        orientation={direction}
        className={cn(
          "flex h-full w-full data-[orientation=vertical]:flex-col",
          className
        )}
        {...props}
      />
    </DirectionContext.Provider>
  )
}

function ResizablePanel({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Panel> & {
  className?: string
}) {
  return (
    <ResizablePrimitive.Panel {...props}>
      <div data-slot="resizable-panel" className={cn("h-full", className)}>
        {children}
      </div>
    </ResizablePrimitive.Panel>
  )
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Separator> & {
  withHandle?: boolean
}) {
  const direction = React.useContext(DirectionContext)
  const isVertical = direction === "vertical"
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden",
        isVertical && "h-px w-full after:left-0 after:h-1 after:w-full after:translate-x-0 after:-translate-y-1/2 [&>div]:rotate-90",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePrimitive.Separator>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
