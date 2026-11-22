"use client";

import { useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import type { CatalogFilterGroup } from "../catalog-filters";
import { CatalogFilterDrawer, CatalogFilterSidebar, ClearFilters } from "./catalog-filter-controls";

interface CatalogItem {
  id: string;
  price: number;
  tile: ReactNode;
}

interface CatalogBrowserProps {
  title: string;
  groups: readonly CatalogFilterGroup[];
  items: readonly CatalogItem[];
}

const pageSize = 12;

const priceSorters = {
  "price-asc": (a: CatalogItem, b: CatalogItem) => a.price - b.price,
  "price-desc": (a: CatalogItem, b: CatalogItem) => b.price - a.price,
};

function filterItems(
  items: readonly CatalogItem[],
  groups: readonly CatalogFilterGroup[],
  selected: readonly string[],
) {
  if (selected.length === 0) return items;

  const selectedOptions = new Set(selected);
  const activeGroups = groups
    .map(({ options }) => options.filter(({ id }) => selectedOptions.has(id)))
    .filter((options) => options.length > 0)
    .map((options) => new Set(options.flatMap(({ productIds }) => productIds)));

  return items.filter(({ id }) => activeGroups.every((matches) => matches.has(id)));
}

export function CatalogBrowser({ title, groups, items }: CatalogBrowserProps) {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [sort, setSort] = useState<"newest" | keyof typeof priceSorters>("newest");
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement>(null);

  const filtered = filterItems(items, groups, selected);
  const sorted = sort === "newest" ? filtered : filtered.toSorted(priceSorters[sort]);
  const offset = (page - 1) * pageSize;
  const visible = sorted.slice(offset, offset + pageSize);
  const pageCount = Math.ceil(sorted.length / pageSize);

  function applyFilters(filters: readonly string[]) {
    setSelected(filters);
    setPage(1);
  }

  function goToPage(nextPage: number) {
    setPage(nextPage);
    resultsRef.current?.scrollIntoView({ block: "start" });
  }

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(12rem,14rem)_minmax(0,1fr)] lg:gap-5">
      <CatalogFilterSidebar groups={groups} selected={selected} onApply={applyFilters} />

      <section aria-label={`${title} results`} className="min-w-0">
        <h2 className="sr-only">Products</h2>
        <div
          ref={resultsRef}
          className="mb-4 flex scroll-mt-24 flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-lg border border-border bg-surface px-3 py-2 sm:px-4"
        >
          <CatalogFilterDrawer
            groups={groups}
            selected={selected}
            onApply={applyFilters}
            getResultCount={(filters) => filterItems(items, groups, filters).length}
          />

          <p role="status" className="order-last w-full text-sm leading-snug font-semibold tabular-nums sm:order-0 sm:w-auto">
            {sorted.length
              ? `Showing ${offset + 1}–${offset + visible.length} of ${sorted.length} ${title.toLowerCase()}`
              : `No matching ${title.toLowerCase()}`}
          </p>
          <label className="ms-auto flex min-w-0 items-center gap-1 text-sm text-text-secondary">
            <span className="whitespace-nowrap">Sort by</span>
            <select
              value={sort}
              onChange={(event) => {
                const value = event.target.value;
                if (value === "newest" || value === "price-asc" || value === "price-desc") {
                  setSort(value);
                  setPage(1);
                }
              }}
              className="min-h-10 min-w-0 rounded-button bg-transparent px-1 text-xs font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-ring sm:px-2 sm:text-sm"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>

        {visible.length > 0 ? (
          <ul className="grid grid-cols-1 items-stretch gap-3 min-[360px]:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {visible.map(({ id, tile }) => (
              <li key={id} className="min-w-0">{tile}</li>
            ))}
          </ul>
        ) : (
          <div className="rounded-lg border border-border bg-surface px-5 py-10 text-center">
            <p className="text-sm text-text-secondary">Try clearing your filters to see more products.</p>
            <ClearFilters disabled={selected.length === 0} onClick={() => applyFilters([])} />
          </div>
        )}

        {pageCount > 1 ? (
          <Pagination aria-label="Catalog pages" className="mt-6">
            <PaginationContent className="flex-wrap justify-center gap-1">
              <PaginationItem>
                <Button type="button" size="icon" variant="ghost" disabled={page === 1} aria-label="Previous page" onClick={() => goToPage(page - 1)}>
                  <ChevronLeft aria-hidden="true" />
                </Button>
              </PaginationItem>
              {Array.from({ length: pageCount }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <PaginationItem key={pageNumber}>
                    <Button
                      type="button"
                      size="icon"
                      variant={page === pageNumber ? "default" : "ghost"}
                      aria-current={page === pageNumber ? "page" : undefined}
                      aria-label={`Page ${pageNumber}`}
                      onClick={() => goToPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <Button type="button" size="icon" variant="ghost" disabled={page === pageCount} aria-label="Next page" onClick={() => goToPage(page + 1)}>
                  <ChevronRight aria-hidden="true" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        ) : null}
      </section>
    </div>
  );
}
