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
import {cva, type VariantProps} from "class-variance-authority"
import {XIcon} from "lucide-react"

import {cn} from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current [&:not(:has(>svg))>*]:col-start-1",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
        info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400 *:data-[slot=alert-description]:text-blue-800 dark:*:data-[slot=alert-description]:text-blue-300",
        warning: "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400 *:data-[slot=alert-description]:text-yellow-800 dark:*:data-[slot=alert-description]:text-yellow-300",
        success: "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-200 [&>svg]:text-green-600 dark:[&>svg]:text-green-400 *:data-[slot=alert-description]:text-green-800 dark:*:data-[slot=alert-description]:text-green-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  dismissible,
  onClose,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants> & {
  dismissible?: boolean
  onClose?: () => void
}) {
  return (
    <div
      data-variant={variant || 'default'}
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), dismissible && "pr-10", className)}
      {...props}
    >
      {props.children}
      {dismissible && (
        <button
          data-slot="alert-close"
          onClick={onClose}
          className="absolute top-3 right-3 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Dismiss"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("col-start-2 mt-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
