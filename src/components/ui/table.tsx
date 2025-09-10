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

// Table Context Types
interface TableContextValue {
  columnWidths: number[]
  setColumnWidths: (widths: number[]) => void
  isHeaderWidthsSet: boolean
  setIsHeaderWidthsSet: (set: boolean) => void
  registerCellWidth: (columnIndex: number, width: number) => void
}

const TableContext = React.createContext<TableContextValue | null>(null)

// Hook to use table context
function useTableContext() {
  const context = React.useContext(TableContext)
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider")
  }
  return context
}

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
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

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
      className={cn("block [&_tr:last-child]:border-0 overflow-hidden overflow-y-visible w-full", className)}
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
Table Provider
-------------------------- */
interface TableProviderProps {
  children: React.ReactNode
}

function TableProvider({ children }: TableProviderProps) {
  const [columnWidths, setColumnWidths] = React.useState<number[]>([])
  const [isHeaderWidthsSet, setIsHeaderWidthsSet] = React.useState(false)
  const [cellWidths, setCellWidths] = React.useState<Map<number, number>>(new Map())

  const registerCellWidth = React.useCallback((columnIndex: number, width: number) => {
    setCellWidths(prev => {
      const newMap = new Map(prev)
      newMap.set(columnIndex, width)
      return newMap
    })
  }, [])

  // Update header widths when first row cells are measured
  React.useEffect(() => {
    if (cellWidths.size > 0 && !isHeaderWidthsSet) {
      const maxColumns = Math.max(...Array.from(cellWidths.keys())) + 1
      const widths = Array.from({ length: maxColumns }, (_, index) => cellWidths.get(index) || 120)
      setColumnWidths(widths)
      setIsHeaderWidthsSet(true)
    }
  }, [cellWidths, isHeaderWidthsSet])

  const contextValue: TableContextValue = {
    columnWidths,
    setColumnWidths,
    isHeaderWidthsSet,
    setIsHeaderWidthsSet,
    registerCellWidth,
  }

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  )
}

/* --------------------------
Table primitives
-------------------------- */
function Table({ className, style, ...props }: React.ComponentProps<"table">) {
  return (
    <TableProvider>
      <div
        data-slot="table-container"
        className="max-w-full overflow-x-auto overflow-y-auto"
      >
        <table
          data-slot="table"
          className={cn(
            "table-auto border-collapse min-w-full",
            className
          )}
          style={{ ...style }}
          {...props}
        />
      </div>
    </TableProvider>
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
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors table table-auto w-full",
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
  const context = React.useContext(TableContext)
  const thRef = React.useRef<HTMLTableCellElement>(null)
  const [columnIndex, setColumnIndex] = React.useState<number>(-1)

  // Get column index from DOM position
  React.useEffect(() => {
    if (thRef.current && context) {
      const row = thRef.current.parentElement
      if (row) {
        const cells = Array.from(row.children)
        const index = cells.indexOf(thRef.current)
        setColumnIndex(index)
      }
    }
  }, [context]);

  // Apply width from context if available
  const width = context && columnIndex >= 0 && context.isHeaderWidthsSet 
    ? context.columnWidths[columnIndex] 
    : undefined

  return (
    <th
      ref={thRef}
      data-slot="table-head"
      className={cn(
        "text-foreground h-12 p-2 first:pl-4 last:pr-4 text-left align-middle font-medium border-b",
        "min-w-[120px] max-w-[500px]",
        className
      )}
      style={{ 
        width: width ? `${width}px` : undefined,
        minWidth: width ? `${width}px` : "120px",
        maxWidth: width ? `${width}px` : "500px",
        ...props.style 
      }}
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
  const context = React.useContext(TableContext)
  const tdRef = React.useRef<HTMLTableCellElement>(null)
  const [columnIndex, setColumnIndex] = React.useState<number>(-1)
  const [isFirstRow, setIsFirstRow] = React.useState(false)

  // Get column index and check if this is the first row
  React.useEffect(() => {
    if (tdRef.current && context) {
      const row = tdRef.current.parentElement
      if (row) {
        const cells = Array.from(row.children)
        const index = cells.indexOf(tdRef.current)
        setColumnIndex(index)
        
        // Check if this is the first row in the tbody
        const tbody = row.parentElement
        if (tbody && tbody.tagName === 'TBODY') {
          const rows = Array.from(tbody.children)
          const rowIndex = rows.indexOf(row)
          setIsFirstRow(rowIndex === 0)
        }
      }
    }
  }, [context])

  // Measure and register width for first row cells
  React.useEffect(() => {
    if (tdRef.current && context && isFirstRow && columnIndex >= 0 && !context.isHeaderWidthsSet) {
      const measureWidth = () => {
        const width = tdRef.current?.offsetWidth
        if (width && width > 0) {
          context.registerCellWidth(columnIndex, width)
        }
      }

      // Use ResizeObserver to get accurate width after content is rendered
      const resizeObserver = new ResizeObserver(() => {
        measureWidth()
      })

      resizeObserver.observe(tdRef.current)

      // Also measure immediately in case content is already rendered
      measureWidth()

      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [context, isFirstRow, columnIndex])

  // Apply width from context if available
  const width = context && columnIndex >= 0 && context.isHeaderWidthsSet 
    ? context.columnWidths[columnIndex] 
    : undefined

  return (
    <td
      ref={tdRef}
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle border-b first:pl-4 last:pr-4",
        "min-w-[120px] overflow-hidden whitespace-nowrap text-ellipsis",
        className
      )}
      style={{ 
        maxWidth: width ? `${width}px` : "500px",
        width: width ? `${width}px` : undefined,
        minWidth: width ? `${width}px` : "120px",
        ...props.style 
      }}
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
  TableProvider,
  useTableContext,
}
