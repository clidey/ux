import * as React from "react"
import { cn } from "@/lib/utils"

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The icon SVG element to render.
   */
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>
  /**
   * Optional size (applies w/h to the icon SVG).
   * @default 24
   */
  size?: number
}

export function Icon({
  icon,
  size = 24,
  className,
  ...props
}: IconProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-icon dark:bg-icon",
        className
      )}
      {...props}
    >
      {React.cloneElement(icon, {
        width: size,
        height: size,
        className: cn(
          "stroke-icon-foreground dark:stroke-icon-foreground",
          icon.props.className
        ),
        "aria-hidden": true,
        focusable: false,
      })}
    </span>
  )
}