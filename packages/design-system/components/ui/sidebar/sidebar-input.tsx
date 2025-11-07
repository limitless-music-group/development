import { ComponentProps } from "react";
import { Input } from "../input";
import { cn } from "@packages/design-system/lib/utils";

export function SidebarInput({
  className,
  ...props
}: ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  )
}