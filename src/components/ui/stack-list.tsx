import React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "../../lib/utils";

type StackListProps = {
  children: React.ReactNode;
  separatorClassName?: string;
};

type StackListItemProps = {
  item: React.ReactNode;
  children: React.ReactNode;
  keyClassName?: string;
  valueClassName?: string;
  rowClassName?: string;
  itemClassName?: string;
};

export function StackListItem({
  item,
  children,
  keyClassName,
  valueClassName,
  rowClassName,
  itemClassName,
}: StackListItemProps) {
  return (
    <div className={cn("flex flex-col", itemClassName)}>
      <p className={cn("flex flex-row items-center text-lg py-3", rowClassName)}>
        <span className={cn("font-semibold min-w-1/2", keyClassName)}>{item}</span>
        <span className={cn("ml-4", valueClassName)}>{children}</span>
      </p>
    </div>
  );
}

export function StackList({
  children,
  separatorClassName = "w-full",
}: StackListProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className="flex flex-col">
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