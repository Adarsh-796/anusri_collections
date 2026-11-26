"use client";

import { Suspense, type ReactNode } from "react";
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
  const menu = (
    <>
      <CatalogFilterMenu.Sidebar>
        <CatalogFilterMenu.Fields />
      </CatalogFilterMenu.Sidebar>
      <CatalogFilterMenu.Drawer>
        <CatalogFilterMenu.Fields />
      </CatalogFilterMenu.Drawer>
    </>
  );

  return (
    <Suspense
      fallback={
        <CatalogFilterMenu.Root groups={groups} selected={[]}>
          {menu}
        </CatalogFilterMenu.Root>
      }
    >
      <UrlFilterMenu groups={groups}>{menu}</UrlFilterMenu>
    </Suspense>
  );
}

function UrlFilterMenu({ groups, children }: CatalogFiltersProps & { children: ReactNode }) {
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
    <CatalogFilterMenu.Root
      groups={groups}
      selected={selected}
      onToggle={toggleFilter}
      onClear={() => void setSelected(null)}
    >
      {children}
    </CatalogFilterMenu.Root>
  );
}
