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
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "bg-primary/20",
        success: "bg-green-200 dark:bg-green-900",
        warning: "bg-yellow-200 dark:bg-yellow-900",
        destructive: "bg-destructive/20",
      },
      size: {
        sm: "h-1",
        default: "h-2",
        md: "h-3",
        lg: "h-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const indicatorVariants = cva(
  "h-full w-full flex-1 rounded-full transition-all",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-green-600 dark:bg-green-400",
        warning: "bg-yellow-600 dark:bg-yellow-400",
        destructive: "bg-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressVariants> & {
    indeterminate?: boolean
    showValue?: boolean
  }

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  function Progress(
    {
      className,
      value,
      variant,
      size,
      indeterminate = false,
      showValue = false,
      ...props
    },
    ref
  ) {
  return (
    <div ref={ref} className="flex items-center gap-3 w-full">
      <ProgressPrimitive.Root
        data-slot="progress"
        data-indeterminate={indeterminate || undefined}
        className={cn(progressVariants({ variant, size }), className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            indicatorVariants({ variant }),
            indeterminate && "animate-progress-indeterminate w-1/3"
          )}
          style={!indeterminate ? { transform: `translateX(-${100 - (value || 0)}%)` } : undefined}
        />
      </ProgressPrimitive.Root>
      {showValue && !indeterminate && (
        <span className="text-sm tabular-nums text-muted-foreground min-w-[3ch]">
          {Math.round(value || 0)}%
        </span>
      )}
    </div>
  )
  }
)

export { Progress, progressVariants }
