"use client";

import type { ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";

import { ClearButton } from "./catalog-filter-clear-button";
export { CatalogFilterFields as Fields } from "./catalog-filter-fields";
export { CatalogFilterDrawer as Drawer } from "./catalog-filter-drawer";

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
