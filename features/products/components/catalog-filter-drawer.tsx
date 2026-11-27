import { useEffect, useState, type ReactNode } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { ClearButton } from "./catalog-filter-clear-button";
import { useFilterMenu } from "@/contexts/filter-context/filter-menu-context";

export function CatalogFilterDrawer({ children }: { children: ReactNode }) {
  const { selected, onClear } = useFilterMenu();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;

    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setDrawerOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [drawerOpen]);

  return (
    <Drawer
      swipeDirection="left"
      open={drawerOpen}
      onOpenChange={setDrawerOpen}
    >
      <DrawerTrigger className="inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-button border border-border px-3 text-sm font-semibold text-link focus-visible:outline-2 focus-visible:outline-ring lg:hidden">
        <SlidersHorizontal aria-hidden="true" className="size-4" />
        Filters{selected.length > 0 ? ` (${selected.length})` : ""}
      </DrawerTrigger>
      <DrawerContent className="h-dvh bg-surface font-body data-[swipe-axis=x]:[--drawer-content-width:100%] data-[swipe-axis=x]:sm:[--drawer-content-width:22rem] motion-reduce:transition-none">
        <DrawerHeader className="flex-row items-center justify-between gap-3 border-b border-border px-4 py-2">
          <DrawerTitle className="flex items-center gap-2 font-body text-base font-semibold">
            <SlidersHorizontal aria-hidden="true" className="size-4" /> Filters
          </DrawerTitle>
          <div className="flex items-center gap-2">
            <ClearButton />
            <DrawerClose
              aria-label="Close filters"
              className="grid size-11 cursor-pointer place-items-center rounded-button focus-visible:outline-2 focus-visible:outline-ring"
            >
              <X aria-hidden="true" className="size-5" />
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
        <div className="grid shrink-0 grid-cols-[1fr_1.45fr] gap-2 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            disabled={!onClear}
            onClick={onClear}
          >
            Reset
          </Button>
          <Button
            type="button"
            className="min-h-11"
            onClick={() => setDrawerOpen(false)}
          >
            Done
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
