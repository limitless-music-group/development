import { cn } from "@packages/design-system/lib/utils"
import { Icons } from "@packages/design-system/components/shared/icons"
import type { ComponentProps } from "react"

function Spinner({ className, ...props }: ComponentProps<"svg">) {
  return (
    <Icons.loader
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
