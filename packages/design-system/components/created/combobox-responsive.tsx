"use client";

import { useMediaQuery } from "@packages/design-system/hooks/use-media-query";
import Image from "next/image";
import { useMemo, useState } from "react";
import { Icons } from "@packages/design-system/components/shared/icons";
import { Button } from "@packages/design-system/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@packages/design-system/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@packages/design-system/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@packages/design-system/components/ui/popover";

export type ComboboxItem = {
  value: string;
  label: string;
  logo?: string;
};

type ComboboxResponsiveProps = {
  items: ComboboxItem[];
  selectedItem: ComboboxItem | null;
  onSelect: (item: ComboboxItem | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
};

export function ComboboxResponsive({
  items,
  selectedItem,
  onSelect,
  placeholder = "Select an item",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  className,
}: ComboboxResponsiveProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className={`w-full justify-between ${className}`}
            role="combobox"
            variant="outline"
          >
            <div className="flex items-center gap-2">
              {selectedItem?.logo && (
                <Image
                  alt={selectedItem.label}
                  className="size-5 object-contain"
                  height={20}
                  src={selectedItem.logo}
                  width={20}
                />
              )}
              {selectedItem ? selectedItem.label : placeholder}
            </div>
            <Icons.chevronDown className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-0"
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <ComboboxList
            emptyText={emptyText}
            items={items}
            onSelect={onSelect}
            searchPlaceholder={searchPlaceholder}
            setOpen={setOpen}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer onOpenChange={setOpen} open={open}>
      <DrawerTrigger asChild>
        <Button
          aria-expanded={open}
          className={`w-full justify-between ${className}`}
          role="combobox"
          variant="outline"
        >
          <div className="flex items-center gap-2">
            {selectedItem?.logo && (
              <Image
                alt={selectedItem.label}
                className="size-5 object-contain"
                height={20}
                src={selectedItem.logo}
                width={20}
              />
            )}
            {selectedItem ? selectedItem.label : placeholder}
          </div>
          <Icons.chevronDown className="size-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <ComboboxList
            emptyText={emptyText}
            items={items}
            onSelect={onSelect}
            searchPlaceholder={searchPlaceholder}
            setOpen={setOpen}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

type ComboboxListProps = {
  items: ComboboxItem[];
  onSelect: (item: ComboboxItem | null) => void;
  setOpen: (open: boolean) => void;
  searchPlaceholder: string;
  emptyText: string;
};

function ComboboxList({
  items,
  onSelect,
  setOpen,
  searchPlaceholder,
  emptyText,
}: ComboboxListProps) {
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    if (!search) {
      return items;
    }
    return items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  return (
    <Command shouldFilter={false}>
      <CommandInput
        onValueChange={setSearch}
        placeholder={searchPlaceholder}
        value={search}
      />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        <CommandGroup>
          {filteredItems.map((item) => (
            <CommandItem
              key={item.value}
              onSelect={(value) => {
                onSelect(items.find((item) => item.value === value) || null);
                setOpen(false);
              }}
              value={item.value}
            >
              <div className="flex items-center gap-2">
                {item.logo && (
                  <Image
                    alt={item.label}
                    className="size-5 object-contain"
                    height={20}
                    src={item.logo}
                    width={20}
                  />
                )}
                {item.label}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
