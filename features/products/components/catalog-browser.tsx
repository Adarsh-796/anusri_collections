"use client";

import { createContext, use, useRef, type ReactNode, type RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  catalogPageSize,
  catalogParsers,
} from "../catalog-query";
import { useCatalogControls } from "./use-catalog-controls";

interface ResultsData {
  title: string;
  page: number;
  total: number;
  cards: ReactNode;
}

interface ResultsState extends ResultsData {
  navigation: ReturnType<typeof useCatalogControls>;
  resultsRef: RefObject<HTMLElement | null>;
}

const ResultsContext = createContext<ResultsState | null>(null);

function useResults() {
  const results = use(ResultsContext);
  if (!results) throw new Error("Catalog results components require CatalogResults.Root.");
  return results;
}

export function ResultsProvider({ value, children }: { value: ResultsData; children: ReactNode }) {
  const navigation = useCatalogControls();
  const resultsRef = useRef<HTMLElement>(null);
  return (
    <ResultsContext value={{ ...value, navigation, resultsRef }}>
      <section
        ref={resultsRef}
        aria-label={`${value.title} results`}
        aria-busy={navigation.pending}
        className="@container/results min-w-0 scroll-mt-24"
      >
        <h2 className="sr-only">Products</h2>
        {children}
      </section>
    </ResultsContext>
  );
}

export function Toolbar() {
  const { title, total, page, navigation: { controls, setControls } } = useResults();
  const offset = (page - 1) * catalogPageSize;
  return (
    <div
      className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-lg border border-border bg-surface px-3 py-2 sm:px-4"
    >
      <p
        role="status"
        className="order-last w-full text-sm leading-snug font-semibold tabular-nums sm:order-0 sm:w-auto"
      >
        {total
          ? `Showing ${offset + 1}–${Math.min(offset + catalogPageSize, total)} of ${total} ${title.toLowerCase()}`
          : `No ${title.toLowerCase()} available`}
      </p>
      <label className="ms-auto flex min-w-0 items-center gap-1 text-sm text-text-secondary">
        <span className="whitespace-nowrap">Sort by</span>
        <select
          value={controls.sort}
          onChange={(event) => {
            const value = event.target.value;
            const sort = catalogParsers.sort.parse(value);
            if (sort) void setControls({ sort, page: 1 });
          }}
          className="min-h-10 min-w-0 rounded-button bg-transparent px-1 text-xs font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-ring sm:px-2 sm:text-sm"
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </label>
    </div>
  );
}

export function Grid() {
  const { total, cards } = useResults();
  if (!total) return null;
  return (
    <ul className="grid grid-cols-1 items-stretch gap-3 @xs/results:grid-cols-2 @2xl/results:grid-cols-3 @4xl/results:grid-cols-4 sm:gap-4">
      {cards}
    </ul>
  );
}

export function CatalogPagination() {
  const { total, page, navigation: { setControls }, resultsRef } = useResults();
  const pageCount = Math.ceil(total / catalogPageSize);
  if (pageCount <= 1) return null;

  function goToPage(nextPage: number) {
    void setControls({ page: nextPage });
    resultsRef.current?.scrollIntoView({ block: "start" });
  }

  return (
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
  );
}
