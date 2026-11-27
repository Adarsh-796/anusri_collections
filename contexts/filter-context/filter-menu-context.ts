"use client";

import { createContext, use } from "react";

export interface FilterMenuState {
  selected: readonly string[];
  onToggle?: (id: string) => void;
  onClear?: () => void;
}

export const FilterMenuContext = createContext<FilterMenuState | null>(null);

export function useFilterMenu() {
  const menu = use(FilterMenuContext);
  if (!menu)
    throw new Error("Filter controls must be rendered inside CatalogFilters.");
  return menu;
}
