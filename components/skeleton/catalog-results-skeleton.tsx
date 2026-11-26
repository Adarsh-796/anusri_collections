import { catalogPageSize } from "@/features/products/catalog-query";
import type { ProductCollection } from "@/features/products/products";
import { ProductCardSkeleton } from "./product-card-skeleton";

export function CatalogResultsSkeleton({
  collection,
}: { collection: ProductCollection }) {
  return (
    <div className="@container/results min-w-0">
      <span className="sr-only" role="status">
        Loading products…
      </span>
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
  );
}
