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
import {ChevronLeftIcon, ChevronRightIcon, EllipsisIcon,} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button, buttonVariants} from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <EllipsisIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

type DataPaginationProps = {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  siblingsCount?: number
  className?: string
  size?: React.ComponentProps<typeof PaginationLink>["size"]
}

function DataPagination({
  totalPages,
  currentPage,
  onPageChange,
  siblingsCount = 2,
  className,
  size = "icon",
}: DataPaginationProps) {
  if (totalPages <= 1) return null

  const start = Math.max(1, currentPage - siblingsCount)
  const end = Math.min(totalPages, currentPage + siblingsCount)

  const pages: (number | "ellipsis-start" | "ellipsis-end")[] = []

  if (start > 1) {
    pages.push(1)
    if (start > 2) pages.push("ellipsis-start")
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("ellipsis-end")
    pages.push(totalPages)
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => { e.preventDefault(); if (currentPage > 1) onPageChange(currentPage - 1) }}
            aria-disabled={currentPage === 1}
            size={size === "icon" ? "default" : size}
            className={cn({ "opacity-50 pointer-events-none": currentPage === 1 })}
          />
        </PaginationItem>

        {pages.map((page) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return <PaginationEllipsis key={page} />
          }
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => { e.preventDefault(); onPageChange(page) }}
                size={size}
                aria-label={page === currentPage ? `Page ${page}` : `Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) onPageChange(currentPage + 1) }}
            aria-disabled={currentPage === totalPages}
            size={size === "icon" ? "default" : size}
            className={cn({ "opacity-50 pointer-events-none": currentPage === totalPages })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  DataPagination,
}
