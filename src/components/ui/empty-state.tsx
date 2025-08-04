import { cn } from "@/lib/utils"

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