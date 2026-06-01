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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

type FormSheetProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  side?: "right" | "left" | "top" | "bottom"
  className?: string
  footer?: React.ReactNode
}

function FormSheet({
  open,
  onClose,
  title,
  description,
  children,
  side = "right",
  className,
  footer,
}: FormSheetProps) {
  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) onClose() }}>
      <SheetContent
        data-slot="form-sheet"
        side={side}
        className={className ?? "w-full sm:max-w-lg flex flex-col overflow-hidden"}
        footer={footer}
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}

export { FormSheet }
