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

/**
 * Static field set on component types to record whether they are safe to use
 * as the single child of a Radix `asChild` slot. A slot-safe component must
 * forward its `ref` to the underlying DOM node and spread unknown props
 * (`data-state`, `aria-*`, `onPointerDown`, ...) onto it.
 *
 * - `true`: verified slot-safe; triggers infer `asChild` for it.
 * - `false`: known to swallow refs/props; `asChild` is rejected in development.
 * - unset: unknown; triggers trust an explicit `asChild` and never infer one.
 */
export const SLOTTABLE_FIELD = "slottable" as const

type SlottableMarker = { [SLOTTABLE_FIELD]?: boolean }

/** Intrinsic elements that always accept a ref and arbitrary DOM props. */
const SLOTTABLE_INTRINSICS = new Set(["button", "a", "div", "span", "input", "label", "li"])

/** Marks a component as slot-safe. See {@link SLOTTABLE_FIELD}. */
export function markSlottable<T>(component: T): T {
  ;(component as SlottableMarker)[SLOTTABLE_FIELD] = true
  return component
}

/** Marks a component as never slot-safe. See {@link SLOTTABLE_FIELD}. */
export function markNotSlottable<T>(component: T): T {
  ;(component as SlottableMarker)[SLOTTABLE_FIELD] = false
  return component
}

function slottableFlag(type: React.ElementType): boolean | undefined {
  if (typeof type === "string") {
    return SLOTTABLE_INTRINSICS.has(type) ? true : undefined
  }
  return (type as SlottableMarker)[SLOTTABLE_FIELD]
}

/**
 * Returns true when `child` is a single React element whose type is known to
 * be slot-safe: one of the intrinsic elements in {@link SLOTTABLE_INTRINSICS}
 * or a component marked with {@link markSlottable}.
 */
export function isSlottableElement(child: React.ReactNode): child is React.ReactElement {
  if (!React.isValidElement(child) || child.type === React.Fragment) {
    return false
  }
  return slottableFlag(child.type as React.ElementType) === true
}

/** Result of {@link resolveTriggerChild}. */
export interface ResolvedTriggerChild {
  /** Value to pass as `asChild` to the Radix primitive. */
  asChild: boolean
  /** Children to render inside the primitive. */
  child: React.ReactNode
}

/** Options for {@link resolveTriggerChild}. */
export interface ResolveTriggerChildOptions {
  /**
   * When false, `asChild` is never inferred and only an explicit `asChild`
   * is honoured (after validation). Used by styled triggers such as Tabs
   * whose children are content rather than a replacement element.
   */
  infer?: boolean
}

function describeChildren(children: React.ReactNode): string | null {
  if (children === null || children === undefined || typeof children === "boolean") return "empty"
  if (typeof children === "string" || typeof children === "number") return "text"
  if (Array.isArray(children)) return "multiple children"
  if (React.isValidElement(children) && children.type === React.Fragment) return "a fragment"
  if (!React.isValidElement(children)) return "not a React element"
  return null
}

function componentName(type: React.ElementType): string {
  if (typeof type === "string") return `<${type}>`
  const named = type as { displayName?: string; name?: string; render?: { displayName?: string; name?: string } }
  return named.displayName ?? named.name ?? named.render?.displayName ?? named.render?.name ?? "component"
}

// Consumers' bundlers replace `process.env.NODE_ENV` with a literal (the library
// build leaves it in place). Without a bundler `process` is undefined in the
// browser, so the ReferenceError is caught and warnings stay off.
declare const process: { env: { NODE_ENV?: string } }

const isDevelopment = (() => {
  try {
    return process.env.NODE_ENV !== "production"
  } catch {
    return false
  }
})()

function reportMisuse(owner: string, reason: string) {
  if (isDevelopment) {
    console.error(
      `[@clidey/ux] ${owner}: asChild was set but ${reason}. Rendering the primitive's own element instead so the trigger keeps working. See docs/triggers-and-aschild.md.`
    )
  }
}

/**
 * Decides whether a trigger wrapper should render as its child (`asChild`)
 * or as the Radix primitive's own element.
 *
 * - Exactly one valid, slot-safe element and `asChild` undefined → `asChild: true`.
 * - Exactly one valid element of unknown slot-safety → honour `asChild` as passed (default false).
 * - Exactly one element marked not slot-safe with `asChild` → dev error, `asChild: false`.
 * - Anything else (text, number, fragment, array, empty) → `asChild: false`; if the
 *   caller passed `asChild` explicitly, a dev error explains why it was ignored.
 * - An explicit `asChild={false}` always wins.
 *
 * @param children The trigger's children as received.
 * @param asChild The trigger's `asChild` prop as received.
 * @param owner Component name used in development error messages.
 */
export function resolveTriggerChild(
  children: React.ReactNode,
  asChild: boolean | undefined,
  owner: string,
  options: ResolveTriggerChildOptions = {}
): ResolvedTriggerChild {
  const { infer = true } = options

  if (asChild === false) {
    return { asChild: false, child: children }
  }

  const problem = describeChildren(children)
  if (problem !== null) {
    if (asChild === true) {
      reportMisuse(owner, `its child is ${problem}, which cannot receive a ref and props`)
    }
    return { asChild: false, child: children }
  }

  const element = children as React.ReactElement
  const flag = slottableFlag(element.type as React.ElementType)

  if (flag === false) {
    if (asChild === true) {
      reportMisuse(
        owner,
        `${componentName(element.type as React.ElementType)} does not forward refs or spread props and cannot be slotted; wrap it in a <span> instead`
      )
    }
    return { asChild: false, child: children }
  }

  if (asChild === true) {
    return { asChild: true, child: element }
  }

  return { asChild: infer && flag === true, child: element }
}

/**
 * Props helper for trigger wrappers: `asChild: true` requires a single React
 * element child, while the default form accepts any children.
 */
export type TriggerChildProps<P> = Omit<P, "asChild" | "children"> &
  (
    | { asChild: true; children: React.ReactElement }
    | { asChild?: false; children?: React.ReactNode }
  )
