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

import { cn } from "@/lib/utils"
import * as React from "react"

export type TableColumn = {
  dataKey: string
  label: string
  width?: number
  flexGrow?: number
}

type VirtualizedTableBodyProps = {
  rowCount: number
  rowHeight?: number | ((args: { index: number }) => number)
  height?: number
  className?: string
  style?: React.CSSProperties
  overscan?: number
  children: (index: number, style: React.CSSProperties) => React.ReactNode
}

/**
 * Highly optimized VirtualizedTableBody
 * - O(1) lookup for constant row height
 * - O(log n) lookup for variable row height (via binary search on prefix sum cache)
 * - requestAnimationFrame batching for scroll updates
 */
function VirtualizedTableBody({
  rowCount,
  rowHeight = 48,
  height = 400,
  className,
  style,
  overscan = 3,
  children,
}: VirtualizedTableBodyProps) {
  const containerRef = React.useRef<HTMLTableSectionElement | null>(null)
  const [scrollTop, setScrollTop] = React.useState(0)
  const [innerHeight, setInnerHeight] = React.useState<number>(height)

  const isConstant = typeof rowHeight === "number"

  // prefix sum cache for variable row heights
  const offsetsRef = React.useRef<number[] | null>(null)

  // ensure container height responds to prop changes
  React.useEffect(() => setInnerHeight(height), [height])

  // scroll handler (raf throttled)
  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    let ticking = false
    function onScroll(this: HTMLElement) {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          setScrollTop(this.scrollTop)
          ticking = false
        })
      }
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  /** -------- row height & position helpers -------- */

  const getRowHeight = React.useCallback(
    (index: number): number =>
      typeof rowHeight === "function" ? rowHeight({ index }) : rowHeight,
    [rowHeight]
  )

  const ensureOffsets = React.useCallback(() => {
    if (isConstant) return
    if (!offsetsRef.current || offsetsRef.current.length !== rowCount + 1) {
      const arr = new Array(rowCount + 1)
      arr[0] = 0
      for (let i = 0; i < rowCount; i++) {
        arr[i + 1] = arr[i] + getRowHeight(i)
      }
      offsetsRef.current = arr
    }
  }, [rowCount, getRowHeight, isConstant])

  const getRowPosition = React.useCallback(
    (index: number): number => {
      if (isConstant) {
        return (rowHeight as number) * index
      } else {
        ensureOffsets()
        return offsetsRef.current![index]
      }
    },
    [rowHeight, ensureOffsets, isConstant]
  )

  const getTotalHeight = React.useCallback((): number => {
    if (isConstant) {
      return (rowHeight as number) * rowCount
    } else {
      ensureOffsets()
      return offsetsRef.current![rowCount]
    }
  }, [rowHeight, rowCount, ensureOffsets, isConstant])

  /** -------- find visible range efficiently -------- */

  const findStartIndex = React.useCallback((): number => {
    if (isConstant) {
      return Math.max(0, Math.floor(scrollTop / (rowHeight as number)) - overscan)
    } else {
      ensureOffsets()
      const offsets = offsetsRef.current!
      let low = 0,
        high = rowCount - 1,
        mid
      while (low <= high) {
        mid = (low + high) >> 1
        if (offsets[mid + 1] < scrollTop) {
          low = mid + 1
        } else {
          high = mid - 1
        }
      }
      return Math.max(0, low - overscan)
    }
  }, [scrollTop, rowCount, rowHeight, overscan, ensureOffsets, isConstant])

  const findEndIndex = React.useCallback(
    (startIndex: number): number => {
      if (isConstant) {
        const perRow = rowHeight as number
        return Math.min(
          rowCount - 1,
          Math.floor((scrollTop + innerHeight) / perRow) + overscan
        )
      } else {
        ensureOffsets()
        const offsets = offsetsRef.current!
        let low = startIndex,
          high = rowCount - 1,
          mid
        while (low <= high) {
          mid = (low + high) >> 1
          if (offsets[mid] < scrollTop + innerHeight) {
            low = mid + 1
          } else {
            high = mid - 1
          }
        }
        return Math.min(rowCount - 1, low + overscan)
      }
    },
    [scrollTop, innerHeight, rowCount, rowHeight, overscan, ensureOffsets, isConstant]
  )

  /** -------- render -------- */

  const totalHeight = getTotalHeight()
  const startIndex = findStartIndex()
  const endIndex = findEndIndex(startIndex)

  const topSpacerHeight = getRowPosition(startIndex)
  const bottomSpacerHeight = Math.max(0, totalHeight - getRowPosition(endIndex + 1))

  return (
    <TableBody
      data-slot="table-body"
      ref={containerRef}
      style={{
        height: innerHeight,
        ...style,
      }}
      className={cn("[&_tr:last-child]:border-0 block overflow-y-auto w-full box-border", className)}
    >
      {topSpacerHeight > 0 && (
        <TableRow aria-hidden style={{ height: topSpacerHeight }}>
          <TableCell colSpan={9999} />
        </TableRow>
      )}

      {Array.from({ length: endIndex - startIndex + 1 }, (_, i) => {
        const index = startIndex + i
        const currentRowHeight = getRowHeight(index)
        const rowStyle: React.CSSProperties = { height: currentRowHeight }
        return children(index, rowStyle)
      })}

      {bottomSpacerHeight > 0 && (
        <TableRow aria-hidden style={{ height: bottomSpacerHeight }}>
          <TableCell colSpan={9999} />
        </TableRow>
      )}
    </TableBody>
  )
}

/* --------------------------
Table primitives
-------------------------- */
function Table({ className, style, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="w-full min-w-full overflow-x-auto h-full"
    >
      <table
        data-slot="table"
        className={cn(
          "w-full min-w-full text-sm border-collapse table-fixed",
          className
        )}
        style={{ ...style }}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={cn("[&_tr]:border-b w-full", className)} {...props} />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  )
}

function TableRow({ className, style, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors table",
        className
      )}
      style={style}
      {...props}
    />
  )
}

function TableHead({
  className,
  icon,
  children,
  ...props
}: React.ComponentProps<"th"> & { icon?: React.ReactNode }) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-12 px-4 py-2 text-left align-middle font-medium border-b",
        "max-w-[500px] min-w-[120px] truncate", // enforce consistent column sizing
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 w-full min-w-0">
        {icon}
        <span className="truncate min-w-0">{children}</span>
      </div>
    </th>
  )
}

function TableCell({ className, children, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-4 py-2 align-middle border-b",
        "max-w-[500px] min-w-[120px] overflow-hidden whitespace-nowrap text-ellipsis",
        className
      )}
      {...props}
    >
      <div className="truncate min-w-0">
        {children}
      </div>
    </td>
  )
}


function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption data-slot="table-caption" className={cn("text-muted-foreground mt-4 text-sm", className)} {...props} />
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  VirtualizedTableBody,
}
