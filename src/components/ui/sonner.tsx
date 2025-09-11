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

import {useTheme} from "@/components/theme/provider"
import {toast, Toaster as Sonner, type ToasterProps} from "sonner"
import {cn} from "@/lib/utils"

const Toaster = ({className, ...props}: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
      <div data-slot="toaster" className={cn("toaster group", className)}>
          <Sonner
              theme={theme as ToasterProps["theme"]}
              className={cn("toaster group", className)}
              style={
                  {
                      "--normal-bg": "var(--popover)",
                      "--normal-text": "var(--popover-foreground)",
                      "--normal-border": "var(--border)",
                  } as React.CSSProperties
              }
              {...props}
          />
      </div>
  )
}

export {Toaster, toast}
