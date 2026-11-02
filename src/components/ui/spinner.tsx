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

import * as React from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const spinnerVariants = cva(
  'relative inline-block aspect-square transform-gpu',
  {
    variants: {
      variant: {
        default: '[&>div]:bg-foreground',
        primary: '[&>div]:bg-primary',
        secondary: '[&>div]:bg-secondary',
        destructive: '[&>div]:bg-destructive',
        muted: '[&>div]:bg-muted-foreground',
      },
      size: {
        sm: 'size-4',
        default: 'size-5',
        md: 'size-6',
        lg: 'size-8',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<typeof spinnerVariants>, 'size'> {
  className?: string;
  size?: VariantProps<typeof spinnerVariants>['size'] | number;
  /** The Clidey Design mark is the default; classic retains the twelve-spoke spinner. */
  appearance?: 'brand' | 'classic';
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  function Spinner({ className, variant, size = 'default', appearance = 'brand', ...props }, ref) {
  return (
  <div
    ref={ref}
    data-slot="spinner"
    data-appearance={appearance}
    data-variant={variant ?? 'default'}
    role="status"
    aria-label="Loading"
    className={cn(
      typeof size === 'string'
        ? spinnerVariants({ variant, size })
        : spinnerVariants({ variant }),
      className,
    )}
    style={typeof size === 'number' ? { width: size, height: size } : undefined}
    {...props}
  >
    {appearance === 'brand' ? <svg viewBox="0 0 120 96" fill="none" aria-hidden="true" className="ux-spinner-mark size-full">
      <path className="ux-spinner-mark__outline" d="M18 20 C24 34 42 63 60 63 C78 63 96 34 102 20" />
      <path className="ux-spinner-mark__stem-outline" d="M60 29 V80" />
      <path className="ux-spinner-mark__signal" pathLength="100" d="M18 20 C24 34 42 63 60 63" />
      <path className="ux-spinner-mark__signal" pathLength="100" d="M102 20 C96 34 78 63 60 63" />
      <path className="ux-spinner-mark__meet" d="M48 59.1 C52 61.6 56 63 60 63 C64 63 68 61.6 72 59.1" />
      <path className="ux-spinner-mark__stem" pathLength="100" d="M60 29 V80" />
      <circle className="ux-spinner-mark__ring" cx="18" cy="20" r="4" />
      <circle className="ux-spinner-mark__ring" cx="102" cy="20" r="4" />
      <circle className="ux-spinner-mark__node" cx="35" cy="48" r="2.5" />
      <circle className="ux-spinner-mark__node" cx="85" cy="48" r="2.5" />
      <circle className="ux-spinner-mark__beacon" cx="60" cy="18" r="6" />
    </svg> : Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="animate-spinner absolute left-[46.5%] top-[4.4%] h-[24%] w-[7%]
          origin-[center_190%] rounded-full opacity-[0.1] will-change-transform"
        style={{
          transform: `rotate(${i * 30}deg)`,
          animationDelay: `${(i * 0.083).toFixed(3)}s`,
        }}
        aria-hidden="true"
      />
    ))}
    <span className="sr-only">Loading...</span>
  </div>
  );
});

export { Spinner, spinnerVariants };
