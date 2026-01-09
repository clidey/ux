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

import {cn} from "@/lib/utils"

function Skeleton({
  className,
  "aria-label": ariaLabel = "Loading",
  ...props
}: React.ComponentProps<"div"> & {
  "aria-label"?: string
}) {
  return (
    <div
      data-slot="skeleton"
      role="status"
      aria-busy="true"
      aria-label={ariaLabel}
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
