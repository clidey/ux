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
import { ChevronsUpDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

export type MultiSearchSelectOption = {
  value: string
  label: string
  icon?: React.ReactNode
}

type MultiSearchSelectProps = {
  options: MultiSearchSelectOption[]
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  selected?: string[]
  onChange?: (selected: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  notFoundMessage?: string
  selectAllLabel?: string
  showSelectAll?: boolean
  disabled?: boolean
  className?: string
  buttonClassName?: string
  contentClassName?: string
  side?: "top" | "bottom" | "left" | "right"
  align?: "start" | "center" | "end"
}

function MultiSearchSelect({
  options,
  value,
  defaultValue,
  onValueChange,
  selected,
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  notFoundMessage = "No results found.",
  selectAllLabel = "Select all",
  showSelectAll = true,
  disabled = false,
  className,
  buttonClassName,
  contentClassName,
  side = "bottom",
  align = "start",
}: MultiSearchSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue || [])

  const selectedValues = value ?? selected ?? internalValue

  const handleChange = React.useCallback((newValue: string[]) => {
    if (value === undefined && selected === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    onChange?.(newValue)
  }, [value, selected, onValueChange, onChange])

  const allSelected = options.length > 0 && options.every(o => selectedValues.includes(o.value))

  const toggleAll = React.useCallback(() => {
    if (allSelected) {
      handleChange(selectedValues.filter(v => !options.some(o => o.value === v)))
    } else {
      const allValues = options.map(o => o.value)
      handleChange([...new Set([...selectedValues, ...allValues])])
    }
  }, [allSelected, selectedValues, options, handleChange])

  const toggle = React.useCallback((optionValue: string) => {
    if (selectedValues.includes(optionValue)) {
      handleChange(selectedValues.filter(v => v !== optionValue))
    } else {
      handleChange([...selectedValues, optionValue])
    }
  }, [selectedValues, handleChange])

  const triggerLabel = selectedValues.length === 0
    ? placeholder
    : `${selectedValues.length} selected`

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          data-slot="multi-search-select"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between font-normal", buttonClassName, className)}
        >
          <span className="truncate text-muted-foreground">
            {triggerLabel}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[var(--radix-popover-trigger-width)] p-0", contentClassName)}
        side={side}
        align={align}
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{notFoundMessage}</CommandEmpty>
            <CommandGroup>
              {showSelectAll && options.length > 0 && (
                <CommandItem onSelect={toggleAll} className="cursor-pointer">
                  <div className={cn(
                    "mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border",
                    allSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"
                  )}>
                    {allSelected && <Check className="size-3" />}
                  </div>
                  <span className="font-medium">{selectAllLabel}</span>
                </CommandItem>
              )}
              {options.map(option => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggle(option.value)}
                    className="cursor-pointer"
                  >
                    <div className={cn(
                      "mr-2 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border",
                      isSelected ? "bg-primary border-primary text-primary-foreground" : "border-muted-foreground"
                    )}>
                      {isSelected && <Check className="size-3" />}
                    </div>
                    {option.icon && <span className="mr-2">{option.icon}</span>}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { MultiSearchSelect }
