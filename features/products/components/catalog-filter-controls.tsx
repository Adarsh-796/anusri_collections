"use client";

import { Suspense, type ReactNode } from "react";
import { parseAsNativeArrayOf, parseAsString, useQueryState } from "nuqs";

import { Root as FilterMenuRoot } from "./catalog-filter-menu";

interface CatalogFiltersProps {
  children: ReactNode;
}

const filterParam = parseAsNativeArrayOf(parseAsString).withOptions({
  history: "push",
  shallow: true,
  scroll: false,
});

export function CatalogFilters({ children }: CatalogFiltersProps) {
  return (
    <Suspense
      fallback={
        <FilterMenuRoot selected={[]}>
          {children}
        </FilterMenuRoot>
      }
    >
      <UrlFilterMenu>{children}</UrlFilterMenu>
    </Suspense>
  );
}

function UrlFilterMenu({ children }: CatalogFiltersProps) {
  const [selected, setSelected] = useQueryState("filter", filterParam);

  function toggleFilter(id: string) {
    void setSelected(current => {
      const next = current.includes(id)
        ? current.filter(option => option !== id)
        : [...current, id];
      return next.length ? next : null;
    });
  }

  return (
    <FilterMenuRoot
      selected={selected}
      onToggle={toggleFilter}
      onClear={() => void setSelected(null)}
    >
      {children}
    </FilterMenuRoot>
  );
}
