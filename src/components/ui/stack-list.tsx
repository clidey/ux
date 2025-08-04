import React from "react";
import { Separator } from "@/components/ui/separator";

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

// Define as a function, not React.FC, to avoid JSX type issues
export function StackListItem({
  item,
  children,
  keyClassName = "font-semibold min-w-1/2",
  valueClassName = "ml-4",
  rowClassName = "flex flex-row items-center text-lg py-3",
  itemClassName = "flex flex-col",
}: StackListItemProps) {
  return (
    <div className={itemClassName}>
      <div className={rowClassName}>
        <span className={keyClassName}>{item}</span>
        <span className={valueClassName}>{children}</span>
      </div>
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