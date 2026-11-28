"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { catalogPageSize, catalogParsers } from "../catalog-query";
import { useCatalogControls } from "./use-catalog-controls";

interface PageInfo {
  page: number;
  total: number;
}

export function ToolbarControls({ title, total, page }: PageInfo & { title: string }) {
  const { controls, setControls, pending } = useCatalogControls();
  const offset = (page - 1) * catalogPageSize;
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border border-border bg-surface px-3 py-2 sm:px-4">
      <p
        role="status"
        aria-busy={pending}
        className="order-last w-full text-sm leading-snug font-semibold tabular-nums sm:order-0 sm:w-auto"
      >
        {total
          ? `Showing ${offset + 1}–${Math.min(offset + catalogPageSize, total)} of ${total} ${title}`
          : `No ${title} available`}
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

export function PaginationControls({ total, page }: PageInfo) {
  const { setControls, pending } = useCatalogControls();
  const navRef = useRef<HTMLElement>(null);
  const pageCount = Math.ceil(total / catalogPageSize);
  if (pageCount <= 1) return null;

  function goToPage(nextPage: number) {
    void setControls({ page: nextPage });
    navRef.current?.closest("section")?.scrollIntoView({ block: "start" });
  }

  return (
    <Pagination ref={navRef} aria-busy={pending} aria-label="Catalog pages" className="mt-6">
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
