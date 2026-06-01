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
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
  confirmLabel?: string
  cancelLabel?: string
  confirmVariant?: "default" | "destructive" | "outline" | "secondary"
  disabled?: boolean
  dependencies?: string[]
  dependenciesLabel?: string
  items?: React.ReactNode[]
  className?: string
}

function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "destructive",
  disabled,
  dependencies,
  dependenciesLabel = "Blocked by:",
  items,
  className,
}: ConfirmDialogProps) {
  const blocked = dependencies && dependencies.length > 0

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent data-slot="confirm-dialog" className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        {items && items.length > 0 && (
          <div className="flex flex-col gap-0.5 text-sm max-h-60 overflow-y-auto rounded-md border border-border p-2">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-1.5 rounded-md bg-muted/50">
                {item}
              </div>
            ))}
          </div>
        )}

        {blocked && (
          <div className="flex flex-col gap-1 text-sm">
            <span className={cn("font-medium text-destructive")}>{dependenciesLabel}</span>
            <ul className="list-disc list-inside text-muted-foreground">
              {dependencies.map((dep, i) => (
                <li key={i}>{dep}</li>
              ))}
            </ul>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant={confirmVariant}
              onClick={onConfirm}
              disabled={disabled || blocked}
            >
              {confirmLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ConfirmDialog }
