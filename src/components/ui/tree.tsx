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
  folderIcon?: LucideIcon;
  itemIcon?: LucideIcon;
};

function collectExpandedIds(
  data: TreeDataItem[] | TreeDataItem,
  targetId: string | undefined,
  expandAll: boolean
): string[] {
  const ids: string[] = [];

  function walk(items: TreeDataItem[]): boolean {
    for (const item of items) {
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

  const items = Array.isArray(data) ? data : [data];
  walk(items);
  return ids;
}

function Tree({
  data,
  initialSelectedItemId,
  onSelectChange,
  expandAll = false,
  folderIcon,
  itemIcon,
  className,
  ...props
}: TreeProps) {
  const [selectedItemId, setSelectedItemId] = React.useState<string | undefined>(initialSelectedItemId);

  const handleSelectChange = React.useCallback((item: TreeDataItem | undefined) => {
    setSelectedItemId(item?.id);
    onSelectChange?.(item);
  }, [onSelectChange]);

  const expandedItemIds = React.useMemo(
    () => collectExpandedIds(data, initialSelectedItemId, expandAll),
    [data, initialSelectedItemId, expandAll]
  );

  const { ref: refRoot, width, height } = useResizeObserver<HTMLDivElement>();

  return (
    <div ref={refRoot} data-slot="tree" className={cn("overflow-hidden", className)} {...props}>
      <ScrollArea style={{ width, height }}>
        <div className="relative p-2">
          <TreeItems
            data={data}
            selectedItemId={selectedItemId}
            handleSelectChange={handleSelectChange}
            expandedItemIds={expandedItemIds}
            folderIcon={folderIcon}
            itemIcon={itemIcon}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

function TreeItems({
  data,
  selectedItemId,
  handleSelectChange,
  expandedItemIds,
  folderIcon: FolderIcon,
  itemIcon: ItemIcon,
}: {
  data: TreeDataItem[] | TreeDataItem;
  selectedItemId?: string;
  handleSelectChange: (item: TreeDataItem | undefined) => void;
  expandedItemIds: string[];
  folderIcon?: LucideIcon;
  itemIcon?: LucideIcon;
}) {
  const items = Array.isArray(data) ? data : [data];

  return (
    <ul role="tree">
      {items.map((item) => (
        <li key={item.id} role="treeitem">
          {item.children ? (
            <AccordionPrimitive.Root type="multiple" defaultValue={expandedItemIds}>
              <AccordionPrimitive.Item value={item.id}>
                <TreeFolder
                  item={item}
                  isSelected={selectedItemId === item.id}
                  FolderIcon={FolderIcon}
                  onClick={() => handleSelectChange(item)}
                />
                <TreeContent className="pl-6 overflow-hidden">
                  <TreeItems
                    data={item.children}
                    selectedItemId={selectedItemId}
                    handleSelectChange={handleSelectChange}
                    expandedItemIds={expandedItemIds}
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
  FolderIcon,
  onClick,
}: {
  item: TreeDataItem;
  isSelected: boolean;
  FolderIcon?: LucideIcon;
  onClick: () => void;
}) {
  const Icon = item.icon || FolderIcon;

  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        data-slot="tree-folder"
        aria-label={item.name}
        className={cn(
          "flex flex-1 w-full items-center py-2 px-2 transition-all last:[&[data-state=open]>svg]:rotate-90",
          "hover:before:opacity-100 before:absolute before:left-0 before:w-full before:opacity-0 before:bg-muted/80 before:h-[1.75rem] before:-z-10",
          isSelected && "before:opacity-100 before:bg-accent text-accent-foreground"
        )}
        onClick={onClick}
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
  Icon: DefaultIcon,
  onClick,
}: {
  item: TreeDataItem;
  isSelected: boolean;
  Icon?: LucideIcon;
  onClick: () => void;
}) {
  const Icon = item.icon || DefaultIcon;

  return (
    <button
      type="button"
      data-slot="tree-leaf"
      aria-label={item.name}
      data-state={isSelected ? "selected" : undefined}
      className={cn(
        "flex items-center py-2 px-2 cursor-pointer w-full text-left",
        "hover:before:opacity-100 before:absolute before:left-0 before:right-1 before:w-full before:opacity-0 before:bg-muted/80 before:h-[1.75rem] before:-z-10",
        isSelected && "before:opacity-100 before:bg-accent text-accent-foreground"
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
