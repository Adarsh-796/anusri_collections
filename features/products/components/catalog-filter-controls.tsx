"use client";

import { Suspense, type ReactNode } from "react";
import { parseAsNativeArrayOf, parseAsString, useQueryState } from "nuqs";

import type { CatalogFilterGroup } from "../catalog-filters";
import { Root as FilterMenuRoot } from "./catalog-filter-menu";

interface CatalogFiltersProps {
  groups: readonly CatalogFilterGroup[];
  children: ReactNode;
}

const filterParam = parseAsNativeArrayOf(parseAsString).withOptions({
  history: "push",
  shallow: true,
  scroll: false,
});

export function CatalogFilters({ groups, children }: CatalogFiltersProps) {
  return (
    <Suspense
      fallback={
        <FilterMenuRoot groups={groups} selected={[]}>
          {children}
        </FilterMenuRoot>
      }
    >
      <UrlFilterMenu groups={groups}>{children}</UrlFilterMenu>
    </Suspense>
  );
}

function UrlFilterMenu({ groups, children }: CatalogFiltersProps) {
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
      groups={groups}
      selected={selected}
      onToggle={toggleFilter}
      onClear={() => void setSelected(null)}
    >
      {children}
    </FilterMenuRoot>
  );
}
