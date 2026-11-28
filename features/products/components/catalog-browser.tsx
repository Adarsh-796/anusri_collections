"use client";

import { useId, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { catalogPageSize, type CatalogQuery } from "../catalog-query";
import { useCatalogControls } from "./use-catalog-controls";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] satisfies { value: CatalogQuery["sort"]; label: string }[];

interface PageInfo {
  page: number;
  total: number;
}

export function ToolbarControls({
  title,
  total,
  page,
}: PageInfo & { title: string }) {
  const { controls, setControls, pending } = useCatalogControls();
  const sortId = useId();
  const offset = (page - 1) * catalogPageSize;
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border border-border bg-surface px-3 py-2 sm:px-4">
      <p
        role="status"
        aria-busy={pending}
        className="text-sm leading-snug font-semibold tabular-nums sm:order-0 sm:w-auto"
      >
        {total
          ? `Showing ${offset + 1}–${Math.min(offset + catalogPageSize, total)} of ${total} ${title}`
          : `No ${title} available`}
      </p>
      <div className="ms-0 flex min-w-0 items-center gap-1 text-sm text-text-secondary">
        <label htmlFor={sortId} className="whitespace-nowrap">Sort by</label>
        <Select<CatalogQuery["sort"]>
          items={sortOptions}
          value={controls.sort}
          onValueChange={(sort) => {
            if (sort) void setControls({ sort, page: 1 });
          }}
        >
          <SelectTrigger id={sortId} className="min-h-10 font-semibold text-foreground">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="end" className="w-max">
            {sortOptions.map(({ value, label }) => (
              <SelectItem key={value} value={value}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
    <Pagination
      ref={navRef}
      aria-busy={pending}
      aria-label="Catalog pages"
      className="mt-6"
    >
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
