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
import {cn} from "@/lib/utils"

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
        "inline-flex items-center justify-center rounded-md bg-icon dark:bg-icon p-2",
        className
      )}
      {...props}
    >
      {React.cloneElement(icon, {
        width: size,
        height: size,
        className: cn(
          "stroke-icon-foreground dark:stroke-icon-foreground",
            icon.props?.className
        ),
        "aria-hidden": true,
        focusable: false,
      })}
    </span>
  )
}