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
import {Slot} from "@radix-ui/react-slot"
import {ChevronRight, Ellipsis} from "lucide-react"

import {cn} from "@/lib/utils"

const Breadcrumb = React.forwardRef<HTMLElement, React.ComponentProps<"nav">>(
  function Breadcrumb({ ...props }, ref) {
  return <nav ref={ref} aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
})

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentProps<"ol">>(
  function BreadcrumbList({ className, ...props }, ref) {
  return (
    <ol
      ref={ref}
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  )
})

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  function BreadcrumbItem({ className, ...props }, ref) {
  return (
    <li
      ref={ref}
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
})

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean
  }
>(function BreadcrumbLink({
  asChild,
  className,
  ...props
}, ref) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  )
})

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentProps<"span">>(
  function BreadcrumbPage({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
})

const BreadcrumbSeparator = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  function BreadcrumbSeparator({
  children,
  className,
  ...props
}, ref) {
  return (
    <li
      ref={ref}
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
})

const BreadcrumbEllipsis = React.forwardRef<HTMLSpanElement, React.ComponentProps<"span">>(
  function BreadcrumbEllipsis({
  className,
  ...props
}, ref) {
  return (
    <span
      ref={ref}
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <Ellipsis className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
})

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
