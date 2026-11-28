import type { ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";

import { ClearButton } from "./catalog-filter-clear-button";
import { CatalogFilterFields } from "./catalog-filter-fields";
import { CatalogFilterDrawer } from "./catalog-filter-drawer";

function CatalogFilterMenuSidebar({
  children,
}: {
  children: ReactNode;
}) {
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

export {
  CatalogFilterMenuSidebar as Sidebar,
  CatalogFilterFields as Fields,
  CatalogFilterDrawer as Drawer,
};
