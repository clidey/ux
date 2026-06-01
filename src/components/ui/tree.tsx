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

"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, type LucideIcon } from "lucide-react";
import useResizeObserver from "@/lib/use-resize-observer";
import { cn } from "@/lib/utils";

export interface TreeDataItem {
  id: string;
  name: string;
  icon?: LucideIcon;
  children?: TreeDataItem[];
}

type TreeProps = React.HTMLAttributes<HTMLDivElement> & {
  data: TreeDataItem[] | TreeDataItem;
  initialSelectedItemId?: string;
  onSelectChange?: (item: TreeDataItem | undefined) => void;
  expandAll?: boolean;
  expandedIds?: string[];
  onExpandChange?: (ids: string[]) => void;
  folderIcon?: LucideIcon;
  itemIcon?: LucideIcon;
};

function flattenVisible(items: TreeDataItem[], expandedIds: string[]): TreeDataItem[] {
  const result: TreeDataItem[] = [];
  for (const item of items) {
    result.push(item);
    if (item.children && expandedIds.includes(item.id)) {
      result.push(...flattenVisible(item.children, expandedIds));
    }
  }
  return result;
}

function collectInitialExpandedIds(
  items: TreeDataItem[],
  targetId: string | undefined,
  expandAll: boolean
): string[] {
  const ids: string[] = [];

  function walk(nodes: TreeDataItem[]): boolean {
    for (const item of nodes) {
      if (expandAll && item.children) {
        ids.push(item.id);
        walk(item.children);
      } else if (targetId) {
        if (item.id === targetId) return true;
        if (item.children) {
          ids.push(item.id);
          if (walk(item.children)) return true;
          ids.pop();
        }
      }
    }
    return false;
  }

  walk(items);
  return ids;
}

function findParentId(items: TreeDataItem[], targetId: string): string | undefined {
  for (const item of items) {
    if (item.children) {
      for (const child of item.children) {
        if (child.id === targetId) return item.id;
      }
      const found = findParentId(item.children, targetId);
      if (found) return found;
    }
  }
  return undefined;
}

function Tree({
  data,
  initialSelectedItemId,
  onSelectChange,
  expandAll = false,
  expandedIds: controlledExpandedIds,
  onExpandChange,
  folderIcon,
  itemIcon,
  className,
  ...props
}: TreeProps) {
  const items = React.useMemo(() => Array.isArray(data) ? data : [data], [data]);
  const [selectedItemId, setSelectedItemId] = React.useState<string | undefined>(initialSelectedItemId);
  const [focusedItemId, setFocusedItemId] = React.useState<string | undefined>(initialSelectedItemId);
  const [internalExpandedIds, setInternalExpandedIds] = React.useState<string[]>(() =>
    collectInitialExpandedIds(Array.isArray(data) ? data : [data], initialSelectedItemId, expandAll)
  );
  const typeAheadRef = React.useRef("");
  const typeAheadTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const treeRef = React.useRef<HTMLDivElement>(null);

  const expandedIds = controlledExpandedIds ?? internalExpandedIds;

  const setExpandedIds = React.useCallback((ids: string[]) => {
    if (controlledExpandedIds === undefined) {
      setInternalExpandedIds(ids);
    }
    onExpandChange?.(ids);
  }, [controlledExpandedIds, onExpandChange]);

  const toggleExpand = React.useCallback((id: string) => {
    const newIds = expandedIds.includes(id)
      ? expandedIds.filter(i => i !== id)
      : [...expandedIds, id];
    setExpandedIds(newIds);
  }, [expandedIds, setExpandedIds]);

  const handleSelectChange = React.useCallback((item: TreeDataItem | undefined) => {
    setSelectedItemId(item?.id);
    setFocusedItemId(item?.id);
    onSelectChange?.(item);
  }, [onSelectChange]);

  const visibleItems = React.useMemo(
    () => flattenVisible(items, expandedIds),
    [items, expandedIds]
  );

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    const currentIndex = visibleItems.findIndex(i => i.id === focusedItemId);
    let handled = true;

    switch (e.key) {
      case "ArrowDown": {
        const nextIndex = Math.min(currentIndex + 1, visibleItems.length - 1);
        setFocusedItemId(visibleItems[nextIndex].id);
        break;
      }
      case "ArrowUp": {
        const prevIndex = Math.max(currentIndex - 1, 0);
        setFocusedItemId(visibleItems[prevIndex].id);
        break;
      }
      case "ArrowRight": {
        const current = visibleItems[currentIndex];
        if (current?.children && !expandedIds.includes(current.id)) {
          setExpandedIds([...expandedIds, current.id]);
        } else if (current?.children && expandedIds.includes(current.id)) {
          const firstChild = current.children[0];
          if (firstChild) setFocusedItemId(firstChild.id);
        }
        break;
      }
      case "ArrowLeft": {
        const current = visibleItems[currentIndex];
        if (current?.children && expandedIds.includes(current.id)) {
          setExpandedIds(expandedIds.filter(i => i !== current.id));
        } else {
          const parentId = findParentId(items, current?.id ?? "");
          if (parentId) setFocusedItemId(parentId);
        }
        break;
      }
      case "Enter":
      case " ": {
        const current = visibleItems[currentIndex];
        if (current) handleSelectChange(current);
        break;
      }
      case "Home": {
        if (visibleItems.length > 0) setFocusedItemId(visibleItems[0].id);
        break;
      }
      case "End": {
        if (visibleItems.length > 0) setFocusedItemId(visibleItems[visibleItems.length - 1].id);
        break;
      }
      default: {
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          if (typeAheadTimerRef.current) clearTimeout(typeAheadTimerRef.current);
          typeAheadRef.current += e.key.toLowerCase();
          typeAheadTimerRef.current = setTimeout(() => { typeAheadRef.current = ""; }, 500);

          const startIndex = currentIndex + 1;
          const searchItems = [
            ...visibleItems.slice(startIndex),
            ...visibleItems.slice(0, startIndex),
          ];
          const match = searchItems.find(item =>
            item.name.toLowerCase().startsWith(typeAheadRef.current)
          );
          if (match) setFocusedItemId(match.id);
        } else {
          handled = false;
        }
      }
    }

    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, [visibleItems, focusedItemId, expandedIds, items, setExpandedIds, handleSelectChange]);

  React.useEffect(() => {
    if (focusedItemId && treeRef.current) {
      const el = treeRef.current.querySelector(`[data-tree-id="${focusedItemId}"]`) as HTMLElement;
      el?.scrollIntoView({ block: "nearest" });
    }
  }, [focusedItemId]);

  const { ref: refRoot, width, height } = useResizeObserver<HTMLDivElement>();

  return (
    <div ref={refRoot} data-slot="tree" className={cn("overflow-hidden", className)} {...props}>
      <ScrollArea style={{ width, height }}>
        <div
          ref={treeRef}
          className="relative p-2 outline-none"
          role="tree"
          tabIndex={0}
          aria-activedescendant={focusedItemId ? `tree-node-${focusedItemId}` : undefined}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (!focusedItemId && visibleItems.length > 0) {
              setFocusedItemId(visibleItems[0].id);
            }
          }}
          onMouseUp={() => {
            treeRef.current?.focus();
          }}
        >
          <TreeItems
            items={items}
            selectedItemId={selectedItemId}
            focusedItemId={focusedItemId}
            handleSelectChange={handleSelectChange}
            expandedIds={expandedIds}
            toggleExpand={toggleExpand}
            folderIcon={folderIcon}
            itemIcon={itemIcon}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

function TreeItems({
  items,
  selectedItemId,
  focusedItemId,
  handleSelectChange,
  expandedIds,
  toggleExpand,
  folderIcon: FolderIcon,
  itemIcon: ItemIcon,
}: {
  items: TreeDataItem[];
  selectedItemId?: string;
  focusedItemId?: string;
  handleSelectChange: (item: TreeDataItem | undefined) => void;
  expandedIds: string[];
  toggleExpand: (id: string) => void;
  folderIcon?: LucideIcon;
  itemIcon?: LucideIcon;
}) {
  return (
    <ul role="group">
      {items.map((item) => (
        <li key={item.id} role="treeitem" aria-expanded={item.children ? expandedIds.includes(item.id) : undefined}>
          {item.children ? (
            <AccordionPrimitive.Root type="multiple" value={expandedIds} onValueChange={(value) => {
              const isExpanding = value.includes(item.id) && !expandedIds.includes(item.id);
              const isCollapsing = !value.includes(item.id) && expandedIds.includes(item.id);
              if (isExpanding || isCollapsing) toggleExpand(item.id);
            }}>
              <AccordionPrimitive.Item value={item.id}>
                <TreeFolder
                  item={item}
                  isSelected={selectedItemId === item.id}
                  isFocused={focusedItemId === item.id}
                  FolderIcon={FolderIcon}
                  onSelect={() => handleSelectChange(item)}
                />
                <TreeContent className="pl-6 overflow-hidden">
                  <TreeItems
                    items={item.children}
                    selectedItemId={selectedItemId}
                    focusedItemId={focusedItemId}
                    handleSelectChange={handleSelectChange}
                    expandedIds={expandedIds}
                    toggleExpand={toggleExpand}
                    folderIcon={FolderIcon}
                    itemIcon={ItemIcon}
                  />
                </TreeContent>
              </AccordionPrimitive.Item>
            </AccordionPrimitive.Root>
          ) : (
            <TreeLeaf
              item={item}
              isSelected={selectedItemId === item.id}
              isFocused={focusedItemId === item.id}
              Icon={ItemIcon}
              onClick={() => handleSelectChange(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

function TreeFolder({
  item,
  isSelected,
  isFocused,
  FolderIcon,
  onSelect,
}: {
  item: TreeDataItem;
  isSelected: boolean;
  isFocused: boolean;
  FolderIcon?: LucideIcon;
  onSelect: () => void;
}) {
  const Icon = item.icon || FolderIcon;

  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        data-slot="tree-folder"
        id={`tree-node-${item.id}`}
        data-tree-id={item.id}
        aria-label={item.name}
        tabIndex={-1}
        className={cn(
          "flex flex-1 w-full items-center py-2 px-2 rounded-md transition-all last:[&[data-state=open]>svg]:rotate-90 outline-none",
          "hover:bg-muted/80",
          isSelected && "bg-accent text-accent-foreground",
          isFocused && "ring-2 ring-ring/50",
          isFocused && !isSelected && "bg-muted/60"
        )}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        {Icon && (
          <Icon className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50" aria-hidden="true" />
        )}
        <span className={cn("text-sm truncate", isSelected && "font-semibold")}>
          {item.name}
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200 text-accent-foreground/50 ml-auto" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function TreeLeaf({
  item,
  isSelected,
  isFocused,
  Icon: DefaultIcon,
  onClick,
}: {
  item: TreeDataItem;
  isSelected: boolean;
  isFocused: boolean;
  Icon?: LucideIcon;
  onClick: () => void;
}) {
  const Icon = item.icon || DefaultIcon;

  return (
    <button
      type="button"
      data-slot="tree-leaf"
      id={`tree-node-${item.id}`}
      data-tree-id={item.id}
      aria-label={item.name}
      data-state={isSelected ? "selected" : undefined}
      tabIndex={-1}
      className={cn(
        "flex items-center py-2 px-2 rounded-md cursor-pointer w-full text-left outline-none",
        "hover:bg-muted/80",
        isSelected && "bg-accent text-accent-foreground",
        isFocused && "ring-2 ring-ring/50",
        isFocused && !isSelected && "bg-muted/60"
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0 mr-2 text-accent-foreground/50" aria-hidden="true" />}
      <span className={cn("flex-grow text-sm truncate", isSelected && "font-semibold")}>
        {item.name}
      </span>
    </button>
  );
}

function TreeContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="tree-content"
      className={cn(
        "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        className
      )}
      {...props}
    >
      <div className="pb-1 pt-0">{children}</div>
    </AccordionPrimitive.Content>
  );
}

export { Tree };
