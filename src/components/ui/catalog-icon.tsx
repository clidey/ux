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

import { forwardRef, type SVGProps } from "react"
import { icons } from "@clidey/ux/icons"

/** SVG props shared by catalog icons. Icons inherit the current text color. */
export type CatalogIconProps = SVGProps<SVGSVGElement> & { size?: number }

/** Renders an SVG asset from the public Clidey UX icon catalog. */
export const CatalogIcon = forwardRef<SVGSVGElement, CatalogIconProps & { name: string }>(
  function CatalogIcon({ name, size = 24, style, ...props }, ref) {
    const url = icons[name]
    if (!url) throw new Error(`Unknown Clidey UX icon: ${name}`)
    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        aria-hidden={props["aria-label"] ? undefined : true}
        focusable="false"
        {...props}
        style={{
          mask: `url("${url}") center / contain no-repeat`,
          WebkitMask: `url("${url}") center / contain no-repeat`,
          ...style,
        }}
      >
        <rect width="24" height="24" fill="currentColor" />
      </svg>
    )
  }
)

/** Creates a named component backed by a catalog asset. */
export function createCatalogIcon(name: string) {
  const Component = forwardRef<SVGSVGElement, CatalogIconProps>(
    function NamedCatalogIcon(props, ref) {
      return <CatalogIcon name={name} ref={ref} {...props} />
    }
  )
  Component.displayName = `CatalogIcon(${name})`
  return Component
}
