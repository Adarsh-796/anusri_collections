"use client";

import { Suspense } from "react";
import { parseAsNativeArrayOf, parseAsString, useQueryState } from "nuqs";

import type { CatalogFilterGroup } from "../catalog-filters";
import { CatalogFilterMenu } from "./catalog-filter-menu";

interface CatalogFiltersProps {
  groups: readonly CatalogFilterGroup[];
}

const filterParam = parseAsNativeArrayOf(parseAsString).withOptions({
  history: "push",
  shallow: true,
  scroll: false,
});

export function CatalogFilters({ groups }: CatalogFiltersProps) {
  return (
    <Suspense fallback={<CatalogFilterMenu groups={groups} />}>
      <UrlFilterMenu groups={groups} />
    </Suspense>
  );
}

function UrlFilterMenu({ groups }: CatalogFiltersProps) {
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
    <CatalogFilterMenu
      groups={groups}
      selected={selected}
      onToggle={toggleFilter}
      onClear={() => void setSelected(null)}
    />
  );
}
