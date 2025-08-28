import {useTheme} from "next-themes"
import {toast, Toaster as Sonner, type ToasterProps} from "sonner"
import {cn} from "@/lib/utils"

const Toaster = ({className, ...props}: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
      <div data-slot="toaster" className={cn("toaster group", className)}>
          <Sonner
              theme={theme as ToasterProps["theme"]}
              className={cn("toaster group", className)}
              style={
                  {
                      "--normal-bg": "var(--popover)",
                      "--normal-text": "var(--popover-foreground)",
                      "--normal-border": "var(--border)",
                  } as React.CSSProperties
              }
              {...props}
          />
      </div>
  )
}

export { Toaster, toast }
