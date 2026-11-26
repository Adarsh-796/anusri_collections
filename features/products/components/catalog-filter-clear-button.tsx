import { useFilterMenu } from "./catalog-filter-controls";

export function ClearButton() {
  const { selected, onClear } = useFilterMenu();
  return (
    <button
      type="button"
      onClick={onClear}
      disabled={!onClear || selected.length === 0}
      className="min-h-10 cursor-pointer rounded-sm text-xs font-semibold whitespace-nowrap text-link underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-default disabled:text-text-secondary"
    >
      Clear All
    </button>
  );
}
