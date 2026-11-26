"use client";

import { createContext, Suspense, use, type ReactNode } from "react";
import { parseAsNativeArrayOf, parseAsString, useQueryState } from "nuqs";

interface FilterMenuState {
  selected: readonly string[];
  onToggle?: (id: string) => void;
  onClear?: () => void;
}

const FilterMenuContext = createContext<FilterMenuState | null>(null);

export function useFilterMenu() {
  const menu = use(FilterMenuContext);
  if (!menu) throw new Error("Filter controls must be rendered inside CatalogFilters.");
  return menu;
}

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
        <FilterMenuContext value={{ selected: [] }}>
          {children}
        </FilterMenuContext>
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
    <FilterMenuContext value={{ selected, onToggle: toggleFilter, onClear: () => void setSelected(null) }}>
      {children}
    </FilterMenuContext>
  );
}
