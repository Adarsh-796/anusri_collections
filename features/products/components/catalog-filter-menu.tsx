import { SlidersHorizontal } from "lucide-react";

import type { CatalogFilterGroup } from "../catalog-filters";
import { CatalogFilterDrawer } from "./catalog-filter-drawer";
import { CatalogFilterFields } from "./catalog-filter-fields";

interface CatalogFilterMenuProps {
  groups: readonly CatalogFilterGroup[];
  selected: readonly string[];
  onToggle: (id: string) => void;
  onClear: () => void;
}

export function CatalogFilterMenu({ groups, selected, onToggle, onClear }: CatalogFilterMenuProps) {
  const fields = <CatalogFilterFields groups={groups} selected={selected} onToggle={onToggle} />;
  const clearButton = (
    <button
      type="button"
      onClick={onClear}
      disabled={selected.length === 0}
      className="min-h-10 cursor-pointer rounded-sm text-xs font-semibold whitespace-nowrap text-link underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-default disabled:text-text-secondary"
    >
      Clear All
    </button>
  );

  return (
    <>
      <aside
        aria-label="Filters"
        className="hidden rounded-lg border border-border bg-surface lg:block"
      >
        <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-1">
          <h2 className="flex items-center gap-2 font-body text-sm font-semibold">
            <SlidersHorizontal aria-hidden="true" className="size-4" />
            Filters
          </h2>
          {clearButton}
        </div>
        {fields}
      </aside>

      <div className="lg:hidden">
        <CatalogFilterDrawer selectedCount={selected.length} clearButton={clearButton} onReset={onClear}>
          {fields}
        </CatalogFilterDrawer>
      </div>
    </>
  );
}
