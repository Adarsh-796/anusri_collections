"use client";

import { useOptimistic, useRef, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import type { CatalogFilterSummary } from "../catalog-filters";
import type { ProductCollection } from "../get-catalog-products";
import {
  catalogPageSize,
  type CatalogQuery,
} from "../catalog-query";
import {
  CatalogFilterDrawer,
  CatalogFilterSidebar,
  ClearFilters,
} from "./catalog-filter-controls";

interface CatalogBrowserProps {
  title: string;
  collection: ProductCollection;
  groups: readonly CatalogFilterSummary[];
  query: CatalogQuery;
  total: number;
  collectionSize: number;
  children: ReactNode;
}

export function CatalogBrowser({
  title,
  collection,
  groups,
  query,
  total,
  collectionSize,
  children,
}: CatalogBrowserProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [controls, setControls] = useOptimistic(query);
  const { selected, sort, page } = controls;
  const resultsRef = useRef<HTMLDivElement>(null);
  const offset = (query.page - 1) * catalogPageSize;
  const pageCount = Math.ceil(total / catalogPageSize);

  function navigate(next: CatalogQuery) {
    const url = new URL(window.location.href);
    url.searchParams.delete("filter");
    for (const id of next.selected) url.searchParams.append("filter", id);
    if (next.sort === "newest") url.searchParams.delete("sort");
    else url.searchParams.set("sort", next.sort);
    if (next.page === 1) url.searchParams.delete("page");
    else url.searchParams.set("page", String(next.page));
    startTransition(() => {
      setControls(next);
      router.push(url.pathname + url.search + url.hash, { scroll: false });
    });
  }

  function applyFilters(filters: readonly string[]) {
    navigate({ ...controls, selected: filters, page: 1 });
  }

  function goToPage(nextPage: number) {
    navigate({ ...controls, page: nextPage });
    resultsRef.current?.scrollIntoView({ block: "start" });
  }

  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(12rem,14rem)_minmax(0,1fr)] lg:gap-5">
      <CatalogFilterSidebar
        groups={groups}
        selected={selected}
        onApply={applyFilters}
      />

      <section
        aria-label={`${title} results`}
        aria-busy={pending}
        className="@container/results min-w-0"
      >
        <h2 className="sr-only">Products</h2>
        <div
          ref={resultsRef}
          className="mb-4 flex scroll-mt-24 flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-lg border border-border bg-surface px-3 py-2 sm:px-4"
        >
          <CatalogFilterDrawer
            groups={groups}
            selected={selected}
            onApply={applyFilters}
            collection={collection}
            collectionSize={collectionSize}
            appliedFilters={query.selected}
            appliedCount={total}
          />

          <p
            role="status"
            className="order-last w-full text-sm leading-snug font-semibold tabular-nums sm:order-0 sm:w-auto"
          >
            {total
              ? `Showing ${offset + 1}–${Math.min(offset + catalogPageSize, total)} of ${total} ${title.toLowerCase()}`
              : `No matching ${title.toLowerCase()}`}
          </p>
          <label className="ms-auto flex min-w-0 items-center gap-1 text-sm text-text-secondary">
            <span className="whitespace-nowrap">Sort by</span>
            <select
              value={sort}
              onChange={(event) => {
                const value = event.target.value;
                if (
                  value === "newest" ||
                  value === "price-asc" ||
                  value === "price-desc"
                ) {
                  navigate({ ...controls, sort: value, page: 1 });
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

        {total > 0 ? (
          <ul className="grid grid-cols-1 items-stretch gap-3 @xs/results:grid-cols-2 @2xl/results:grid-cols-3 @4xl/results:grid-cols-4 sm:gap-4">
            {children}
          </ul>
        ) : (
          <div className="rounded-lg border border-border bg-surface px-5 py-10 text-center">
            <p className="text-sm text-text-secondary">
              Try clearing your filters to see more products.
            </p>
            <ClearFilters
              disabled={selected.length === 0}
              onClick={() => applyFilters([])}
            />
          </div>
        )}

        {pageCount > 1 ? (
          <Pagination aria-label="Catalog pages" className="mt-6">
            <PaginationContent className="flex-wrap justify-center gap-1">
              <PaginationItem>
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={page === 1}
                  aria-label="Previous page"
                  onClick={() => goToPage(page - 1)}
                >
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
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  disabled={page === pageCount}
                  aria-label="Next page"
                  onClick={() => goToPage(page + 1)}
                >
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
