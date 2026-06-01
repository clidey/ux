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
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { copyToClipboard } from "@/lib/clipboard"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

type CopyButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick" | "children"> & {
  text: string
  onCopy?: () => void
  tooltipLabel?: string
  copiedLabel?: string
}

function CopyButton({
  text,
  onCopy,
  tooltipLabel = "Copy",
  copiedLabel = "Copied",
  variant = "ghost",
  size = "icon",
  className,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(() => {
    copyToClipboard(text).then((success) => {
      if (success) {
        setCopied(true)
        onCopy?.()
        setTimeout(() => setCopied(false), 2000)
      }
    })
  }, [text, onCopy])

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot="copy-button"
          variant={variant}
          size={size}
          className={cn("size-8", className)}
          onClick={handleCopy}
          aria-label={copied ? copiedLabel : tooltipLabel}
          {...props}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {copied ? copiedLabel : tooltipLabel}
      </TooltipContent>
    </Tooltip>
  )
}

export { CopyButton }
