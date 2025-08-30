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

import {cn} from "@/lib/utils"

export const EmptyState = ({
  className,
  title,
  description,
  icon,
  children,
}: {
  className?: string
  title: string
  description: string
  icon: React.ReactNode
  children?: React.ReactNode
}) => {
  return (
    <div className={cn("flex justify-center items-center w-full h-full grow", className)}>
      <div
        className={cn(
          "flex flex-col gap-4 items-center w-[400px] p-8"
        )}>
        {icon}
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-muted-foreground text-center">{description}</p>
        {children}
      </div>
    </div>
  )
}