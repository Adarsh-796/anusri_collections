import { type ReactNode } from "react";
import { FilterMenuContext, type FilterMenuState } from "./filter-menu-context";

export const FilterMenuProvider = ({
  children,
  selected,
  onClear,
  onToggle,
}: FilterMenuState & { children: ReactNode }) => {
  return (
    <FilterMenuContext value={{ selected, onClear, onToggle }}>
      {children}
    </FilterMenuContext>
  );
};
