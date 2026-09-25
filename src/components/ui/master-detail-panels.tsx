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
import {ChevronLeftIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable"
import {useIsMobile} from "@/hooks/use-mobile"
import {cn} from "@/lib/utils"

export type MasterDetailPanelsProps = {
  /** Content of the list (master) panel. */
  list: React.ReactNode
  /** Content of the detail panel. */
  detail: React.ReactNode
  /** On mobile, show the detail panel instead of the list. */
  detailOpen: boolean
  /** On mobile, called by the back button shown above the detail panel. */
  onBack: () => void
  /** Text for the mobile back button. */
  backLabel: string
  /** Desktop list panel size as a percentage of the group. Defaults to 25. */
  listDefaultSize?: number
  /** Desktop list panel minimum size as a percentage. Defaults to 18. */
  listMinSize?: number
  /** Desktop list panel maximum size as a percentage. Defaults to 40. */
  listMaxSize?: number
  listClassName?: string
  handleClassName?: string
  detailClassName?: string
  className?: string
}

/**
 * A list/detail split view. On desktop it renders a horizontal resizable
 * split; below the mobile breakpoint it shows one panel at a time — the
 * list until `detailOpen` is set, then the detail with a back button.
 */
function MasterDetailPanels({
  list,
  detail,
  detailOpen,
  onBack,
  backLabel,
  listDefaultSize = 25,
  listMinSize = 18,
  listMaxSize = 40,
  listClassName,
  handleClassName,
  detailClassName,
  className,
}: MasterDetailPanelsProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    if (!detailOpen) {
      return (
        <div data-slot="master-detail-list" className={cn("flex min-h-0 grow flex-col", className)}>
          {list}
        </div>
      )
    }
    return (
      <div data-slot="master-detail-detail" className={cn("flex min-h-0 grow flex-col", className)}>
        <Button
          data-slot="master-detail-back"
          variant="ghost"
          size="sm"
          className="-ml-2 mb-2 w-fit"
          onClick={onBack}
        >
          <ChevronLeftIcon />
          {backLabel}
        </Button>
        <div className="flex min-h-0 grow flex-col">{detail}</div>
      </div>
    )
  }

  return (
    <ResizablePanelGroup direction="horizontal" className={cn("grow", className)}>
      <ResizablePanel
        defaultSize={listDefaultSize}
        minSize={listMinSize}
        maxSize={listMaxSize}
        className={listClassName}
      >
        {list}
      </ResizablePanel>
      <ResizableHandle withHandle className={handleClassName} />
      <ResizablePanel defaultSize={100 - listDefaultSize} className={detailClassName}>
        {detail}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export {MasterDetailPanels}
