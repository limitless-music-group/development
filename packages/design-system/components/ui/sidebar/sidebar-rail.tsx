import { ComponentProps } from "react";
import { useSidebar } from "./use-sidebar";
import { cn } from "@packages/design-system/lib/utils";

export function SidebarRail({ className, ...props }: ComponentProps<"button">) {
  const { toggleSidebar, side } = useSidebar();

  const positionClasses =
    side === "left"
      ? "-right-4 [[data-side=left][data-collapsible=offcanvas]_&]:-right-2"
      : "left-0 [[data-side=right][data-collapsible=offcanvas]_&]:-left-2"


  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
      "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear sm:flex",
          "after:absolute after:inset-y-0 after:w-[2px]",
          side === "left"
            ? "after:right-0 cursor-w-resize"
            : "after:left-0 cursor-e-resize",
          positionClasses,
          className      
      )}
      {...props}
    />
  )
}