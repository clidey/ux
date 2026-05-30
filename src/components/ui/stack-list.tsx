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

import React from "react";
import {Separator} from "@/components/ui/separator";
import {cn} from "@/lib/utils";

type StackListProps = {
  children: React.ReactNode;
  className?: string;
  separatorClassName?: string;
};

type StackListItemProps = {
  item: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  keyClassName?: string;
  valueClassName?: string;
  rowClassName?: string;
  itemClassName?: string;
};

export function StackListItem({
  item,
  children,
  className,
  keyClassName,
  valueClassName,
  rowClassName,
  itemClassName,
}: StackListItemProps) {
  return (
    <div data-slot="stack-list-item" className={cn("flex flex-col", itemClassName, className)}>
      <p className={cn("flex flex-row items-center text-lg py-3 min-w-0", rowClassName)}>
        <span className={cn("font-semibold min-w-1/2 truncate", keyClassName)}>{item}</span>
        <span className={cn("ml-4 truncate min-w-0", valueClassName)}>{children}</span>
      </p>
    </div>
  );
}

export function StackList({
  children,
  className,
  separatorClassName = "w-full",
}: StackListProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div data-slot="stack-list" className={cn("flex flex-col", className)}>
      {childrenArray.map((child, idx) => (
        <React.Fragment key={idx}>
          {child}
          {idx !== childrenArray.length - 1 && (
            <Separator className={separatorClassName} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}