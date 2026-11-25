import { useEffect, useState } from "react";
import { createSerializer, parseAsString } from "nuqs/server";
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
import type { CatalogFilterSummary } from "../catalog-filters";
import { catalogParsers } from "../catalog-query";
import type { ProductCollection } from "../get-catalog-products";
import { CatalogFilterFields } from "./catalog-filter-fields";

interface CatalogFilterControlsProps {
  groups: readonly CatalogFilterSummary[];
  selected: readonly string[];
  onApply: (filters: readonly string[]) => void;
}

function toggleOption(selected: readonly string[], id: string) {
  return selected.includes(id)
    ? selected.filter((option) => option !== id)
    : [...selected, id];
}

export function ClearFilters({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="min-h-10 cursor-pointer rounded-sm text-xs font-semibold whitespace-nowrap text-link underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-default disabled:text-text-secondary"
    >
      Clear All
    </button>
  );
}

export function CatalogFilterSidebar({ groups, selected, onApply }: CatalogFilterControlsProps) {
  return (
    <aside aria-label="Filters" className="hidden rounded-lg border border-border bg-surface lg:block">
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-1">
        <h2 className="flex items-center gap-2 font-body text-sm font-semibold">
          <SlidersHorizontal aria-hidden="true" className="size-4" />
          Filters
        </h2>
        <ClearFilters disabled={selected.length === 0} onClick={() => onApply([])} />
      </div>
      <CatalogFilterFields
        groups={groups}
        selected={selected}
        onToggle={(id) => onApply(toggleOption(selected, id))}
      />
    </aside>
  );
}

interface CatalogFilterDrawerProps extends CatalogFilterControlsProps {
  collection: ProductCollection;
  collectionSize: number;
  appliedFilters: readonly string[];
  appliedCount: number;
}

const countUrl = createSerializer({ collection: parseAsString, filter: catalogParsers.filter });

function DraftResultCount({ url }: { url: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function loadCount() {
      try {
        const response = await fetch(url, { signal: controller.signal });
        if (response.ok) {
          const { count } = await response.json();
          if (!controller.signal.aborted && typeof count === "number") setCount(count);
        }
      } catch {
        // Applying the filters still works when the optional preview is unavailable.
      }
    }
    const timer = window.setTimeout(loadCount, 200);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [url]);

  return count === null ? null : ` (${count})`;
}

export function CatalogFilterDrawer({
  groups,
  selected,
  onApply,
  collection,
  collectionSize,
  appliedFilters,
  appliedCount,
}: CatalogFilterDrawerProps) {
  const [draft, setDraft] = useState<readonly string[]>([]);
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

  let count: number | undefined;
  if (!draft.length) count = collectionSize;
  else if (draft.length === appliedFilters.length && draft.every((id) => appliedFilters.includes(id))) {
    count = appliedCount;
  } else if (draft.length === 1) {
    for (const group of groups) {
      const option = group.options.find(({ id }) => id === draft[0]);
      if (option) {
        count = option.count;
        break;
      }
    }
  }
  const previewUrl = drawerOpen && count === undefined
    ? countUrl("/api/catalog/count", { collection, filter: [...draft] })
    : null;

  return (
    <Drawer
      swipeDirection="left"
      open={drawerOpen}
      onOpenChange={(open) => {
        // The popup stays mounted during its exit animation.
        if (open) setDraft(selected);
        setDrawerOpen(open);
      }}
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
            <ClearFilters disabled={draft.length === 0} onClick={() => setDraft([])} />
            <DrawerClose
              aria-label="Close filters"
              className="grid size-11 cursor-pointer place-items-center rounded-button focus-visible:outline-2 focus-visible:outline-ring"
            >
              <X aria-hidden="true" className="size-5" />
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <CatalogFilterFields
            groups={groups}
            selected={draft}
            onToggle={(id) => setDraft((filters) => toggleOption(filters, id))}
          />
        </div>
        <div className="grid shrink-0 grid-cols-[1fr_1.45fr] gap-2 border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <Button type="button" variant="outline" className="min-h-11" onClick={() => setDraft([])}>
            Reset
          </Button>
          <Button
            type="button"
            className="min-h-11"
            onClick={() => {
              onApply(draft);
              setDrawerOpen(false);
            }}
          >
            View Results{count !== undefined ? ` (${count})` : previewUrl && (
              <DraftResultCount key={previewUrl} url={previewUrl} />
            )}
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
