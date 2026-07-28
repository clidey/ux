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
import { ComponentErrorBoundary } from "@/lib/error-boundary"
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
  // Scroll container shared with TableBody for virtualization.
  // Null when the table has no maxHeight (i.e. isn't scrollable/virtualized).
  scrollContainerRef: React.RefObject<HTMLDivElement | null> | null
  // Known viewport height, used as the initial estimate before the real
  // container is measured (ResizeObserver hasn't fired on first render yet).
  scrollContainerHeight: number | null
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

/* --------------------------
Table Provider
-------------------------- */
interface TableProviderProps {
  children: React.ReactNode
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
  scrollContainerHeight?: number
}

function TableProvider({ children, scrollContainerRef, scrollContainerHeight }: TableProviderProps) {
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
    scrollContainerRef: scrollContainerRef ?? null,
    scrollContainerHeight: scrollContainerHeight ?? null,
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

  if (!context.isDrawerOpen) return null

  return (
    <Drawer open onOpenChange={context.setIsDrawerOpen}>
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

function Table({ className, style, maxHeight, ...props }: React.ComponentProps<"table"> & { maxHeight?: number }) {
  const tableRef = React.useRef<HTMLTableElement | null>(null)
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null)

  return (
    <TableProvider
      scrollContainerRef={maxHeight != null ? scrollContainerRef : undefined}
      scrollContainerHeight={maxHeight}
    >
      <div
        ref={scrollContainerRef}
        data-slot="table-container"
        className="max-w-full overflow-auto"
        style={maxHeight != null ? { maxHeight } : undefined}
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

type TableBodyProps = Omit<React.ComponentProps<"tbody">, "children"> & {
  children?: React.ReactNode
  /**
   * Height of each row in pixels, used to estimate which rows are near the
   * viewport before their real height is measured. Only relevant when the
   * enclosing Table has `maxHeight` set. Pass a function for variable heights.
   */
  rowHeight?: number | ((index: number) => number)
  /** Extra rows to render above/below the visible window. */
  overscan?: number
}

const DEFAULT_ROW_HEIGHT = 40
const DEFAULT_OVERSCAN = 3

/**
 * TableBody that virtualizes its rows automatically when it lives inside a
 * Table with `maxHeight` set, and behaves as a plain tbody otherwise.
 * Rows stay in native table-row-group/table-row layout at all times, so the
 * browser computes column widths the same way for every row and the header
 * always lines up with the body — no JS width-syncing required.
 */
const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, rowHeight = DEFAULT_ROW_HEIGHT, overscan = DEFAULT_OVERSCAN, ...props }, forwardedRef) => {
    const context = React.useContext(TableContext)
    const scrollContainerRef = context?.scrollContainerRef ?? null
    const scrollContainerHeight = context?.scrollContainerHeight ?? null

    const rows = React.useMemo(() => React.Children.toArray(children), [children])
    const rowCount = rows.length

    const localRef = React.useRef<HTMLTableSectionElement | null>(null)
    const setRef = React.useCallback((node: HTMLTableSectionElement | null) => {
      localRef.current = node
      if (typeof forwardedRef === "function") forwardedRef(node)
      else if (forwardedRef) (forwardedRef as React.RefObject<HTMLTableSectionElement | null>).current = node
    }, [forwardedRef])

    const [scrollTop, setScrollTop] = React.useState(0)
    // Seed from the Table's own maxHeight so the first render already windows
    // rows correctly, before ResizeObserver has a chance to measure the real
    // container (which may report 0 briefly, e.g. in tests or on first paint).
    const [viewportHeight, setViewportHeight] = React.useState(scrollContainerHeight ?? 0)

    // measured row heights, keyed by row index, filled in as rows are observed
    const measuredHeights = React.useRef<Map<number, number>>(new Map())
    const [, forceRemeasure] = React.useState(0)

    const isVirtualized = scrollContainerRef != null && rowCount > 0

    const getEstimatedRowHeight = React.useCallback((index: number): number => {
      const measured = measuredHeights.current.get(index)
      if (measured != null) return measured
      return typeof rowHeight === "function" ? rowHeight(index) : rowHeight
    }, [rowHeight])

    React.useLayoutEffect(() => {
      if (!isVirtualized) return
      const container = scrollContainerRef!.current
      if (!container) return

      const updateViewport = () => {
        // Fall back to the configured maxHeight if the container hasn't been
        // laid out yet (clientHeight briefly reads 0 in that case).
        setViewportHeight(container.clientHeight || scrollContainerHeight || 0)
      }
      updateViewport()

      let ticking = false
      const onScroll = () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
          setScrollTop(container.scrollTop)
          ticking = false
        })
      }
      container.addEventListener("scroll", onScroll, { passive: true })

      const resizeObserver = new ResizeObserver(updateViewport)
      resizeObserver.observe(container)

      return () => {
        container.removeEventListener("scroll", onScroll)
        resizeObserver.disconnect()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVirtualized, scrollContainerRef])

    // prefix-sum offsets for the estimated heights, recomputed whenever row
    // count or measured heights change
    const offsets = React.useMemo(() => {
      const arr = new Array(rowCount + 1)
      arr[0] = 0
      for (let i = 0; i < rowCount; i++) {
        arr[i + 1] = arr[i] + getEstimatedRowHeight(i)
      }
      return arr
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rowCount, getEstimatedRowHeight])

    const totalHeight = offsets[rowCount] ?? 0

    const findStartIndex = (): number => {
      let low = 0, high = rowCount - 1, mid
      while (low <= high) {
        mid = (low + high) >> 1
        if (offsets[mid + 1] < scrollTop) low = mid + 1
        else high = mid - 1
      }
      return Math.max(0, low - overscan)
    }

    const findEndIndex = (startIndex: number): number => {
      let low = startIndex, high = rowCount - 1, mid
      while (low <= high) {
        mid = (low + high) >> 1
        if (offsets[mid] < scrollTop + viewportHeight) low = mid + 1
        else high = mid - 1
      }
      return Math.min(rowCount - 1, low + overscan)
    }

    const startIndex = isVirtualized ? findStartIndex() : 0
    const endIndex = isVirtualized ? findEndIndex(startIndex) : rowCount - 1

    const topSpacerHeight = isVirtualized ? offsets[startIndex] : 0
    const bottomSpacerHeight = isVirtualized ? Math.max(0, totalHeight - offsets[endIndex + 1]) : 0

    // measure the real height of rendered rows so estimates converge to
    // reality (matters most for variable-height content)
    const rowRefs = React.useRef<Map<number, HTMLElement>>(new Map())
    const registerRowRef = React.useCallback((index: number, node: HTMLElement | null) => {
      if (node) rowRefs.current.set(index, node)
      else rowRefs.current.delete(index)
    }, [])

    React.useEffect(() => {
      if (!isVirtualized) return
      const observer = new ResizeObserver((entries) => {
        let changed = false
        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.virtRowIdx)
          const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
          if (height > 0 && measuredHeights.current.get(index) !== height) {
            measuredHeights.current.set(index, height)
            changed = true
          }
        }
        if (changed) forceRemeasure((n) => n + 1)
      })
      rowRefs.current.forEach((node) => observer.observe(node))
      return () => observer.disconnect()
    }, [isVirtualized, startIndex, endIndex])

    const visibleRows = isVirtualized ? rows.slice(startIndex, endIndex + 1) : rows

    return (
      <ComponentErrorBoundary>
        <tbody
          ref={setRef}
          data-slot="table-body"
          className={cn("[&_tr:last-child]:border-0", className)}
          {...props}
        >
          {isVirtualized && topSpacerHeight > 0 && (
            <tr aria-hidden style={{ height: topSpacerHeight }}>
              <td colSpan={9999} style={{ padding: 0, border: 0 }} />
            </tr>
          )}

          {visibleRows.map((row, i) => {
            const index = startIndex + i
            if (!isVirtualized) return row
            return (
              <VirtualizedRow key={(row as React.ReactElement).key ?? index} index={index} registerRowRef={registerRowRef}>
                {row}
              </VirtualizedRow>
            )
          })}

          {isVirtualized && bottomSpacerHeight > 0 && (
            <tr aria-hidden style={{ height: bottomSpacerHeight }}>
              <td colSpan={9999} style={{ padding: 0, border: 0 }} />
            </tr>
          )}
        </tbody>
      </ComponentErrorBoundary>
    )
  }
)
TableBody.displayName = "TableBody"

/**
 * Attaches a ref + row index to a TableRow child so its real rendered height
 * can be measured. Assumes the child is a TableRow (forwards refs to a <tr>).
 */
function VirtualizedRow({
  index,
  registerRowRef,
  children,
}: {
  index: number
  registerRowRef: (index: number, node: HTMLElement | null) => void
  children: React.ReactNode
}) {
  const ref = React.useCallback((node: HTMLElement | null) => {
    registerRowRef(index, node)
  }, [index, registerRowRef])

  if (!React.isValidElement(children)) return <>{children}</>

  return React.cloneElement(children as React.ReactElement<{ ref?: React.Ref<HTMLElement>; "data-virt-row-idx"?: number }>, {
    ref,
    "data-virt-row-idx": index,
  })
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

function TableHeadRow({ className, style, ...props }: React.ComponentProps<"tr">) {
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

const TableRow = React.forwardRef<HTMLTableRowElement, React.ComponentProps<"tr">>(
  ({ className, style, ...props }, ref) => {
    return (
      <tr
        ref={ref}
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
)
TableRow.displayName = "TableRow"

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
}
