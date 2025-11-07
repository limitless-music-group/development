"use client";

import { useIsMobile } from "@packages/design-system/hooks/use-mobile";
import { cn } from "@packages/design-system/lib/utils";
import { createContext, type ReactNode, useContext, useMemo } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@packages/design-system/components/ui/alert-dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@packages/design-system/components/ui/drawer";

type ResponsiveAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

type ResponsiveAlertDialogContentProps = {
  children: ReactNode;
  className?: string;
};

type ResponsiveAlertDialogHeaderProps = {
  children: ReactNode;
  className?: string;
};

type ResponsiveAlertDialogTitleProps = {
  children: ReactNode;
  className?: string;
};

type ResponsiveAlertDialogDescriptionProps = {
  children: ReactNode;
  className?: string;
};

type ResponsiveAlertDialogCloseProps = {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
  disabled?: boolean;
};

type ResponsiveAlertDialogFooterProps = {
  children: ReactNode;
  className?: string;
};

const ResponsiveAlertDialogContext = createContext<{
  isMobile: boolean;
}>({
  isMobile: false,
});

function ResponsiveAlertDialog({
  onOpenChange,
  children,
  open,
}: ResponsiveAlertDialogProps) {
  const isMobile = useIsMobile();

  const contextValue = useMemo(
    () => ({
      isMobile,
    }),
    [isMobile]
  );

  if (isMobile) {
    return (
      <ResponsiveAlertDialogContext.Provider value={contextValue}>
        <Drawer onOpenChange={onOpenChange} open={open}>
          {children}
        </Drawer>
      </ResponsiveAlertDialogContext.Provider>
    );
  }

  return (
    <ResponsiveAlertDialogContext.Provider value={contextValue}>
      <AlertDialog onOpenChange={onOpenChange} open={open}>
        {children}
      </AlertDialog>
    </ResponsiveAlertDialogContext.Provider>
  );
}

function ResponsiveAlertDialogContent({
  className,
  children,
}: ResponsiveAlertDialogContentProps) {
  const { isMobile } = useContext(ResponsiveAlertDialogContext);

  if (isMobile) {
    return (
      <DrawerContent
        className={cn("flex max-h-[90vh] flex-col px-4", className)}
      >
        {children}
      </DrawerContent>
    );
  }

  return (
    <AlertDialogContent className={cn("sm:max-w-lg", className)}>
      {children}
    </AlertDialogContent>
  );
}

function ResponsiveAlertDialogHeader({
  className,
  children,
}: ResponsiveAlertDialogHeaderProps) {
  const { isMobile } = useContext(ResponsiveAlertDialogContext);

  if (isMobile) {
    return (
      <DrawerHeader className={cn("pb-4 text-left", className)}>
        {children}
      </DrawerHeader>
    );
  }

  return (
    <AlertDialogHeader className={className}>{children}</AlertDialogHeader>
  );
}

function ResponsiveAlertDialogTitle({
  className,
  children,
}: ResponsiveAlertDialogTitleProps) {
  const { isMobile } = useContext(ResponsiveAlertDialogContext);

  if (isMobile) {
    return (
      <DrawerTitle className={cn("font-semibold text-lg", className)}>
        {children}
      </DrawerTitle>
    );
  }

  return <AlertDialogTitle className={className}>{children}</AlertDialogTitle>;
}

function ResponsiveAlertDialogDescription({
  className,
  children,
}: ResponsiveAlertDialogDescriptionProps) {
  const { isMobile } = useContext(ResponsiveAlertDialogContext);

  if (isMobile) {
    return (
      <DrawerDescription
        className={cn("text-muted-foreground text-sm", className)}
      >
        {children}
      </DrawerDescription>
    );
  }

  return (
    <AlertDialogDescription className={className}>
      {children}
    </AlertDialogDescription>
  );
}

function ResponsiveAlertDialogFooter({
  className,
  children,
}: ResponsiveAlertDialogFooterProps) {
  const { isMobile } = useContext(ResponsiveAlertDialogContext);

  if (isMobile) {
    return (
      <DrawerFooter className={cn("border-t px-4 pt-2 pb-4", className)}>
        {children}
      </DrawerFooter>
    );
  }

  return (
    <AlertDialogFooter className={className}>{children}</AlertDialogFooter>
  );
}

function ResponsiveAlertDialogCancel({
  className,
  children,
  asChild,
  disabled,
}: ResponsiveAlertDialogCloseProps) {
  const { isMobile } = useContext(ResponsiveAlertDialogContext);

  if (isMobile) {
    return (
      <DrawerClose asChild={asChild} className={className} disabled={disabled}>
        {children}
      </DrawerClose>
    );
  }

  return (
    <AlertDialogCancel
      asChild={asChild}
      className={className}
      disabled={disabled}
    >
      {children}
    </AlertDialogCancel>
  );
}

export {
  ResponsiveAlertDialog,
  ResponsiveAlertDialogContent,
  ResponsiveAlertDialogHeader,
  ResponsiveAlertDialogTitle,
  ResponsiveAlertDialogDescription,
  ResponsiveAlertDialogCancel,
  ResponsiveAlertDialogFooter,
};
