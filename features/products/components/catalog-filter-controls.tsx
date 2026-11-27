"use client";

import { Suspense, type ReactNode } from "react";
import { parseAsNativeArrayOf, parseAsString, useQueryState } from "nuqs";
import { FilterMenuProvider } from "@/contexts/filter-context/filter-menu-provider";

const filterParam = parseAsNativeArrayOf(parseAsString).withOptions({
  history: "push",
  shallow: true,
  scroll: false,
});

export function CatalogFilters({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <FilterMenuProvider selected={[]}>
          {children}
        </FilterMenuProvider>
      }
    >
      <UrlFilterMenu>{children}</UrlFilterMenu>
    </Suspense>
  );
}

function UrlFilterMenu({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useQueryState("filter", filterParam);

  function toggleFilter(id: string) {
    void setSelected((current) => {
      const next = current.includes(id)
        ? current.filter((option) => option !== id)
        : [...current, id];
      return next.length ? next : null;
    });
  }

  return (
    <FilterMenuProvider
      selected={selected}
      onToggle={toggleFilter}
      onClear={() => void setSelected(null)}
    >
      {children}
    </FilterMenuProvider>
  );
}
