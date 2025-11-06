"use client"

import { Icons } from '@packages/design-system/components/shared/icons'
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { Spinner } from './spinner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <Icons.check className="size-4" />,
        info: <Icons.info className="size-4" />,
        warning: <Icons.warning className="size-4" />,
        error: <Icons.error className="size-4" />,
        loading: <Spinner/>,
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
