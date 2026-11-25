import { Check, ChevronDown } from "lucide-react";
import type { CatalogFilterSummary } from "../catalog-filters";

interface CatalogFilterFieldsProps {
  groups: readonly CatalogFilterSummary[];
  selected: readonly string[];
  onToggle: (id: string) => void;
}

export function CatalogFilterFields({ groups, selected, onToggle }: CatalogFilterFieldsProps) {
  return (
    <div className="divide-y divide-border/70 px-4">
      {groups.map(({ title, options }, index) => (
        <details key={title} open={index < 3} className="group py-1">
          <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-2 rounded-sm text-sm font-semibold focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
            {title}
            <ChevronDown aria-hidden="true" className="size-4 shrink-0 group-open:rotate-180" />
          </summary>
          <div role="group" aria-label={title} className="flex flex-wrap pb-2">
            {options.map(({ id, label, count, swatch }) => {
              const checked = selected.includes(id);

              return swatch ? (
                <button
                  key={id}
                  type="button"
                  aria-label={`${label} (${count})`}
                  aria-pressed={checked}
                  title={label}
                  onClick={() => onToggle(id)}
                  className="grid size-10 cursor-pointer place-items-center rounded-full focus-visible:outline-2 focus-visible:outline-ring"
                >
                  <span
                    className="grid size-7 place-items-center rounded-full border border-espresso/15 aria-hidden:select-none"
                    style={{ backgroundColor: swatch }}
                    aria-hidden="true"
                  >
                    {checked ? <Check className="size-4 rounded-full bg-espresso p-0.5 text-white" /> : null}
                  </span>
                </button>
              ) : (
                <label key={id} className="flex min-h-8 w-full cursor-pointer items-center gap-2 py-1 text-sm leading-snug">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(id)}
                    className="size-4 shrink-0 accent-burgundy"
                  />
                  <span>
                    {label} <span className="text-text-secondary">({count})</span>
                  </span>
                </label>
              );
            })}
          </div>
        </details>
      ))}
    </div>
  );
}
