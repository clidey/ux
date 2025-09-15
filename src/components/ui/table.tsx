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
import { EyeIcon } from "lucide-react"
import * as React from "react"
import { Button } from "./button"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "./drawer"

// Table Context Types
interface TableContextValue {
  // Drawer state
  isDrawerOpen: boolean
  setIsDrawerOpen: (open: boolean) => void
  drawerContent: string | React.ReactNode
  setDrawerContent: (content: string | React.ReactNode) => void
  openDrawer: (content: string | React.ReactNode) => void
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
  React.useLayoutEffect(() => {
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
  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [drawerContent, setDrawerContent] = React.useState<string | React.ReactNode>("")

  const openDrawer = React.useCallback((content: string | React.ReactNode) => {
    setDrawerContent(content)
    setIsDrawerOpen(true)
  }, [])

  const contextValue: TableContextValue = {
    isDrawerOpen,
    setIsDrawerOpen,
    drawerContent,
    setDrawerContent,
    openDrawer,
  }

  return (
    <TableContext.Provider value={contextValue}>
      {children}
    </TableContext.Provider>
  )
}

// Helper function to check if content is valid JSON
function isJsonContent(content: string | React.ReactNode): boolean {
  if (typeof content !== 'string') return false
  
  const trimmed = content.trim()
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) return false
  
  try {
    JSON.parse(trimmed)
    return true
  } catch {
    return false
  }
}

// Helper function to format JSON with subtle ShadCN-like syntax highlighting
function formatJson(jsonString: string): React.ReactNode {
  try {
    const parsed = JSON.parse(jsonString.trim())
    const formatted = JSON.stringify(parsed, null, 2)

    // Subtle ShadCN-inspired color classes
    const colorMap: Record<string, string> = {
      string: "text-green-700 dark:text-green-400/80",
      number: "text-yellow-700 dark:text-yellow-400/80",
      boolean: "text-blue-700 dark:text-blue-400/80",
      null: "text-muted-foreground",
      key: "text-primary/80 dark:text-primary/70",
      punctuation: "text-muted-foreground",
    }

    // Regex for JSON tokens
    const tokenRegex = /("(?:\\.|[^"\\])*"(\s*:)?|\b(true|false|null)\b|[{}[\],]|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g

    function highlight(line: string, _lineIdx: number) { // eslint-disable-line @typescript-eslint/no-unused-vars
      const tokens = line.match(tokenRegex)
      if (!tokens) return line

      let lastIndex = 0
      const spans: React.ReactNode[] = []

      tokens.forEach((token, i) => {
        const start = line.indexOf(token, lastIndex)
        if (start > lastIndex) {
          // Add any whitespace or non-token text
          spans.push(
            <span key={`ws-${i}`} className="">
              {line.slice(lastIndex, start)}
            </span>
          )
        }
        let className = ""
        if (/^"/.test(token)) {
          if (/:$/.test(token)) {
            className = colorMap.key
          } else {
            className = colorMap.string
          }
        } else if (/true|false/.test(token)) {
          className = colorMap.boolean
        } else if (/null/.test(token)) {
          className = colorMap.null
        } else if (/[{}[\],:]/.test(token)) {
          className = colorMap.punctuation
        } else if (/^-?\d/.test(token)) {
          className = colorMap.number
        }
        spans.push(
          <span key={`tok-${i}`} className={className}>
            {token}
          </span>
        )
        lastIndex = start + token.length
      })
      if (lastIndex < line.length) {
        spans.push(
          <span key="end" className="">
            {line.slice(lastIndex)}
          </span>
        )
      }
      return spans
    }

    return (
      <pre className="bg-muted/40 p-4 rounded-md overflow-auto text-sm font-mono">
        <code className="text-foreground">
          {formatted.split('\n').map((line, index) => (
            <div key={index} className="leading-relaxed">
              {highlight(line, index)}
            </div>
          ))}
        </code>
      </pre>
    )
  } catch {
    return jsonString
  }
}

/* --------------------------
Table primitives
-------------------------- */
function TableDrawer() {
  const context = useTableContext()
  
  const renderContent = () => {
    if (typeof context.drawerContent === 'string' && isJsonContent(context.drawerContent)) {
      return formatJson(context.drawerContent)
    }
    
    return (
      <div className="whitespace-pre-wrap break-words">
        {context.drawerContent}
      </div>
    )
  }
  
  return (
    <Drawer open={context.isDrawerOpen} onOpenChange={context.setIsDrawerOpen}>
      <DrawerContent className="min-h-[40vh] px-8 pb-8 max-h-[70vh]">
        <DrawerHeader>
          <DrawerTitle className="self-start">Preview</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto">
          {renderContent()}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function Table({ className, style, ...props }: React.ComponentProps<"table">) {
  const tableRef = React.useRef<HTMLTableElement | null>(null)
  const isVirtualizedRef = React.useRef(false)
  const widthSyncedRef = React.useRef(false)

  React.useEffect(() => {
    const table = tableRef.current
    if (!table) return

    const getCells = () => {
      const thead = table.querySelector("thead")
      const tbody = table.querySelector("tbody")
      if (!thead || !tbody) return { headCells: [] as HTMLElement[], bodyCells: [] as HTMLElement[] }
      const headRow = thead.querySelector("tr")
      const firstBodyRow = tbody.querySelector("tr")
      if (!headRow || !firstBodyRow) return { headCells: [] as HTMLElement[], bodyCells: [] as HTMLElement[] }
      const headCells = Array.from(headRow.children) as HTMLElement[]
      const bodyCells = Array.from(firstBodyRow.children) as HTMLElement[]
      return { headCells, bodyCells }
    }

    const syncWidths = () => {
      // Skip width sync for virtualized tables after initial setup
      if (isVirtualizedRef.current && widthSyncedRef.current) {
        return
      }

      const { headCells, bodyCells } = getCells();
      const count = Math.min(headCells.length, bodyCells.length)
      for (let i = 0; i < count; i++) {
        const width = bodyCells[i].getBoundingClientRect().width
        if (width > 0 && i !== count - 1) {
          headCells[i].style.width = `${width}px`
          headCells[i].style.minWidth = `${width}px`
          headCells[i].style.maxWidth = `${width}px`
        }
      }

      // Mark as synced for virtualized tables
      if (isVirtualizedRef.current) {
        widthSyncedRef.current = true
      }
    }

    // Check if this is a virtualized table by looking for VirtualizedTableBody
    const checkIfVirtualized = () => {
      const tbody = table.querySelector("tbody")
      const isVirtualized = Boolean(tbody?.hasAttribute("data-slot") && tbody.getAttribute("data-slot") === "table-body")
      isVirtualizedRef.current = isVirtualized
      return isVirtualized
    }

    const rafId = requestAnimationFrame(() => {
      checkIfVirtualized()
      syncWidths()
    })

    const resizeObserver = new ResizeObserver(() => {
      // Only sync widths for non-virtualized tables or before initial sync for virtualized tables
      if (!isVirtualizedRef.current || !widthSyncedRef.current) {
        syncWidths()
      }
    })

    const tbody = table.querySelector("tbody")
    const firstRow = tbody?.querySelector("tr")
    if (firstRow) resizeObserver.observe(firstRow as Element)

    const { bodyCells } = getCells()
    bodyCells.forEach((cell) => resizeObserver.observe(cell))

    const onResize = () => {
      // Reset sync flag on window resize to allow re-sync
      widthSyncedRef.current = false
      syncWidths()
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <TableProvider>
      <div
        data-slot="table-container"
        className="max-w-full overflow-x-auto overflow-y-auto"
      >
        <table
          ref={tableRef}
          data-slot="table"
          className={cn(
            "table-auto border-collapse min-w-full",
            className
          )}
          style={{ ...style }}
          {...props}
        />
        <TableDrawer />
      </div>
    </TableProvider>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={cn("[&_tr]:border-b w-full", className)} {...props} />
  )
}

const TableBody = React.forwardRef<HTMLTableSectionElement, React.ComponentProps<"tbody">>(
  ({ className, ...props }, ref) => {
    return (
      <tbody 
        ref={ref}
        data-slot="table-body" 
        className={cn("[&_tr:last-child]:border-0", className)} 
        {...props} 
      />
    )
  }
)
TableBody.displayName = "TableBody"

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
      {...props}
    />
  )
}

function TableHeadRow({ className, style, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors table table-auto",
        className
      )}
      style={style}
      {...props}
    />
  )
}

function TableRow({ className, style, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
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
        "text-foreground h-12 p-2 first:pl-4 last:pr-4 text-left align-middle font-medium border-b",
        "not-last:min-w-[150px] not-last:max-w-[500px] last:w-full",
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
  const context = useTableContext()
  const tdRef = React.useRef<HTMLTableCellElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [isOverflowing, setIsOverflowing] = React.useState(false)

  // Check for overflow
  React.useEffect(() => {
    if (contentRef.current && tdRef.current) {
      const checkOverflow = () => {
        const content = contentRef.current
        const cell = tdRef.current
        if (content && cell) {
          const isOverflow = content.scrollWidth > content.clientWidth
          setIsOverflowing(isOverflow)
        }
      }

      // Check overflow on mount and when content changes
      checkOverflow()

      // Use ResizeObserver to check overflow when cell size changes
      const resizeObserver = new ResizeObserver(() => {
        checkOverflow()
      })

      resizeObserver.observe(tdRef.current)
      resizeObserver.observe(contentRef.current)

      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [children]);

  const handleEyeClick = () => {
    context.openDrawer(children)
  }

  return (
    <td
      ref={tdRef}
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle border-b first:pl-4 last:pr-4 relative group last:w-full",
        "min-w-[150px] max-w-[500px] overflow-hidden whitespace-nowrap text-ellipsis",
        className
      )}
      style={{ 
        ...props.style 
      }}
      {...props}
    >
      <div ref={contentRef} className="truncate min-w-0 pr-8">
        {children}
      </div>
      
      {isOverflowing && (
        <Button
          onClick={handleEyeClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-muted/50 rounded-sm"
          aria-label="View full content"
          variant="ghost"
          size="icon"
        >
          <EyeIcon className="w-4 h-4" />
        </Button>
      )}
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
  TableProvider,
  TableHeadRow,
  TableRow,
  VirtualizedTableBody,
}

