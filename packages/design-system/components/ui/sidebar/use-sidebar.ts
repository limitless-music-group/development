import { Context, useContext } from "react"
import { createContext } from "react"
import { SidebarContextProps } from "./types"

const SidebarContext = createContext<SidebarContextProps | null>(null)


export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}
