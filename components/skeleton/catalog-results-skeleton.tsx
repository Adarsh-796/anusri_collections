import { catalogPageSize } from "@/features/products/catalog-query";
import type { ProductCollection } from "@/features/products/products";
import { ProductCardSkeleton } from "./product-card-skeleton";

export function CatalogResultsSkeleton({
  collection,
}: { collection: ProductCollection }) {
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(12rem,14rem)_minmax(0,1fr)] lg:gap-5">
      <span className="sr-only" role="status">
        Loading products…
      </span>
      <div
        aria-hidden="true"
        className="hidden h-64 rounded-lg bg-muted lg:block"
      />
      <div className="@container/results min-w-0">
        <div aria-hidden="true" className="mb-4 h-14 rounded-lg bg-muted" />
        <div className="grid grid-cols-1 gap-3 @xs/results:grid-cols-2 @2xl/results:grid-cols-3 @4xl/results:grid-cols-4 sm:gap-4">
          {Array.from({ length: catalogPageSize }, (_, index) => (
            <ProductCardSkeleton
              key={index}
              variant={collection === "fabrics" ? "fabric" : "standard"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
