"use client";

import { createContext, use, type ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";

import type { CatalogFilterGroup } from "../catalog-filters";
import { CatalogFilterDrawer } from "./catalog-filter-drawer";
import { CatalogFilterFields } from "./catalog-filter-fields";

interface FilterMenuState {
  selected: readonly string[];
  onToggle?: (id: string) => void;
  onClear?: () => void;
}

const FilterMenuContext = createContext<FilterMenuState | null>(null);

function useFilterMenu() {
  const menu = use(FilterMenuContext);
  if (!menu) throw new Error("CatalogFilterMenu parts require a CatalogFilterMenu.Root.");
  return menu;
}

export function Root({ children, ...state }: FilterMenuState & { children: ReactNode }) {
  return <FilterMenuContext value={state}>{children}</FilterMenuContext>;
}

export function Fields({ groups }: { groups: readonly CatalogFilterGroup[] }) {
  const { selected, onToggle } = useFilterMenu();
  return <CatalogFilterFields groups={groups} selected={selected} onToggle={onToggle} />;
}

function ClearButton() {
  const { selected, onClear } = useFilterMenu();
  return (
    <button
      type="button"
      onClick={onClear}
      disabled={!onClear || selected.length === 0}
      className="min-h-10 cursor-pointer rounded-sm text-xs font-semibold whitespace-nowrap text-link underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-default disabled:text-text-secondary"
    >
      Clear All
    </button>
  );
}

export function Sidebar({ children }: { children: ReactNode }) {
  return (
    <aside
      aria-label="Filters"
      className="hidden border border-border bg-surface lg:block"
    >
      <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-1">
        <h2 className="flex items-center gap-2 font-body text-sm font-semibold">
          <SlidersHorizontal aria-hidden="true" className="size-4" />
          Filters
        </h2>
        <ClearButton />
      </div>
      {children}
    </aside>
  );
}

export function Drawer({ children }: { children: ReactNode }) {
  const { selected, onClear } = useFilterMenu();
  return (
    <div className="lg:hidden">
      <CatalogFilterDrawer
        selectedCount={selected.length}
        clearButton={<ClearButton />}
        onReset={onClear}
      >
        {children}
      </CatalogFilterDrawer>
    </div>
  );
}
