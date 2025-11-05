"use client";

import { useIsMobile } from "@packages/design-system/hooks/use-mobile";
import { cn } from "@packages/design-system/lib/utils";
import { createContext, type ReactNode, useContext, useMemo } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

type ResponsiveDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

type ResponsiveDialogContentProps = {
  className?: string;
  children: React.ReactNode;
}

type ResponsiveDialogHeaderProps = {
  className?: string;
  children: React.ReactNode;
}

type ResponsiveDialogTitleProps = {
  className?: string;
  children: React.ReactNode;
}

type ResponsiveDialogDescriptionProps = {
  className?: string;
  children: React.ReactNode;
}

type ResponsiveDialogCloseProps = {
  className?: string;
  children?: React.ReactNode;
  asChild?: boolean;
}

type ResponsiveDialogBodyProps = {
  className?: string;
  children: React.ReactNode;
}

type ResponsiveDialogFooterProps = {
  className?: string;
  children: ReactNode;
}

const ResponsiveDialogContext = createContext<{
  isMobile: boolean;
}>({
  isMobile: false,
});

function ResponsiveDialog({
  open,
  onOpenChange,
  children,
}: ResponsiveDialogProps) {
  const isMobile = useIsMobile();

  const contextValue = useMemo(
    () => ({
      isMobile,
    }),
    [isMobile]
  );

  if (isMobile) {
    return (
      <ResponsiveDialogContext.Provider value={contextValue}>
        <Drawer onOpenChange={onOpenChange} open={open}>
          {children}
        </Drawer>
      </ResponsiveDialogContext.Provider>
    );
  }

  return (
    <ResponsiveDialogContext.Provider value={contextValue}>
      <Dialog onOpenChange={onOpenChange} open={open}>
        {children}
      </Dialog>
    </ResponsiveDialogContext.Provider>
  );
}

function ResponsiveDialogContent({
  className,
  children,
}: ResponsiveDialogContentProps) {
  const { isMobile } = useContext(ResponsiveDialogContext);

  if (isMobile) {
    return (
      <DrawerContent className={cn("flex max-h-[90vh] flex-col", className)}>
        {children}
      </DrawerContent>
    );
  }

  return (
    <DialogContent
      className={cn(
        "flex max-h-[90vh] flex-col p-0 sm:max-w-[800px]",
        className
      )}
    >
      {children}
    </DialogContent>
  );
}

function ResponsiveDialogHeader({
  className,
  children,
}: ResponsiveDialogHeaderProps) {
  const { isMobile } = useContext(ResponsiveDialogContext);

  if (isMobile) {
    return (
      <DrawerHeader className={cn("pb-4 text-left", className)}>
        {children}
      </DrawerHeader>
    );
  }

  return (
    <DialogHeader className={cn("p-4 pb-0", className)}>
      {children}
    </DialogHeader>
  );
}

function ResponsiveDialogTitle({
  className,
  children,
}: ResponsiveDialogTitleProps) {
  const { isMobile } = useContext(ResponsiveDialogContext);

  if (isMobile) {
    return (
      <DrawerTitle className={cn("font-semibold text-lg", className)}>
        {children}
      </DrawerTitle>
    );
  }

  return <DialogTitle className={className}>{children}</DialogTitle>;
}

function ResponsiveDialogDescription({
  className,
  children,
}: ResponsiveDialogDescriptionProps) {
  const { isMobile } = useContext(ResponsiveDialogContext);

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
    <DialogDescription className={className}>{children}</DialogDescription>
  );
}

function ResponsiveDialogBody({
  className,
  children,
}: ResponsiveDialogBodyProps) {
  const { isMobile } = useContext(ResponsiveDialogContext);

  if (isMobile) {
    return (
      <div className={cn("flex-1 space-y-4 overflow-y-auto px-4", className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn("flex-1 overflow-y-auto px-6 py-4", className)}>
      {children}
    </div>
  );
}

function ResponsiveDialogFooter({
  className,
  children,
}: ResponsiveDialogFooterProps) {
  const { isMobile } = useContext(ResponsiveDialogContext);

  if (isMobile) {
    return (
      <DrawerFooter className={cn("border-t px-4 pt-2 pb-4", className)}>
        {children}
      </DrawerFooter>
    );
  }

  return (
    <DialogFooter className={cn("p-4 pt-0", className)}>
      {children}
    </DialogFooter>
  );
}

function ResponsiveDialogClose({
  className,
  children,
  asChild,
}: ResponsiveDialogCloseProps) {
  const { isMobile } = useContext(ResponsiveDialogContext);

  if (isMobile) {
    return (
      <DrawerClose asChild={asChild} className={className}>
        {children}
      </DrawerClose>
    );
  }

  return (
    <DialogClose asChild={asChild} className={className}>
      {children}
    </DialogClose>
  );
}

export {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
  ResponsiveDialogBody,
  ResponsiveDialogClose,
  ResponsiveDialogFooter,
};
