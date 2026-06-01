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

function Progress({
  className,
  value,
  variant,
  size,
  indeterminate = false,
  showValue = false,
  ...props
}: ProgressProps) {
  return (
    <div className="flex items-center gap-3 w-full">
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

export { Progress, progressVariants }
