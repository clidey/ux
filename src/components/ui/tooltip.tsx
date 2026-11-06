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
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import {cn} from "@/lib/utils"
import {markSlottable, resolveTriggerChild, type TriggerChildProps} from "@/lib/slot"

const TooltipProviderContext = React.createContext(false)

function TooltipProvider({delayDuration = 0, ...props}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipProviderContext.Provider value={true}>
    <TooltipPrimitive.Provider data-slot="tooltip-provider" delayDuration={delayDuration} {...props} />
  </TooltipProviderContext.Provider>
}

function Tooltip({open: controlledOpen, defaultOpen = false, onOpenChange, ...props}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  const hasProvider = React.useContext(TooltipProviderContext)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const handleOpenChange = React.useCallback((next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next)
    onOpenChange?.(next)
  }, [controlledOpen, onOpenChange])
  // Dispatch the Radix open notification during the event, before content
  // installs its close-other-tooltips listener in compatibility runtimes.
  const tooltip = <TooltipPrimitive.Root data-slot="tooltip" open={controlledOpen ?? internalOpen} onOpenChange={handleOpenChange} {...props} />
  return hasProvider ? tooltip : <TooltipProvider>{tooltip}</TooltipProvider>
}

const TooltipTrigger = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Trigger>,
  TriggerChildProps<React.ComponentProps<typeof TooltipPrimitive.Trigger>>
>(function TooltipTrigger({ asChild, children, ...props }, ref) {
  const resolved = resolveTriggerChild(children, asChild, "TooltipTrigger")
  let child = resolved.child
  // A disabled element does not emit pointer events, so the tooltip would
  // never open. Slot a focusable span around it and let the span be the trigger.
  if (
    resolved.asChild &&
    React.isValidElement<{ disabled?: boolean }>(child) &&
    child.props.disabled === true
  ) {
    child = (
      <span data-slot="tooltip-disabled-wrapper" className="inline-flex" tabIndex={0}>
        {child}
      </span>
    )
  }
  return (
    <TooltipPrimitive.Trigger
      ref={ref}
      data-slot="tooltip-trigger"
      asChild={resolved.asChild}
      {...props}
    >
      {child}
    </TooltipPrimitive.Trigger>
  )
})
markSlottable(TooltipTrigger)

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentProps<typeof TooltipPrimitive.Content>
>(function TooltipContent({ className, sideOffset = 0, children, ...props }, ref) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
})

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
