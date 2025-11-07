import { ComponentProps } from "react"
import { Button } from "../button"
import { useSidebar } from "./use-sidebar"
import { Icons } from "@packages/shared/components/icons"
import { cn } from "@packages/design-system/lib/utils"

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: ComponentProps<typeof Button>) {
  const { toggleSidebar, side } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      {side === 'left' ? <Icons.leftSidebar/> : <Icons.rightSidebar/>}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}