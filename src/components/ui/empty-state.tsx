import { cn } from "@/lib/utils"

export const EmptyState = ({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) => {
  return (
    <div className={cn("flex flex-col items-center justify-center grow border-[1px] border-dashed rounded-xl")}>
      {icon}
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}