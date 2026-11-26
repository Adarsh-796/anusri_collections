import { Suspense } from "react";

import { CatalogResultsSkeleton } from "@/components/skeleton/catalog-results-skeleton";
import { catalogFilters } from "@/features/products/catalog-filters";
import { CatalogFilters } from "@/features/products/components/catalog-filter-controls";
import { CatalogResults } from "@/features/products/components/catalog-results";
import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import { ProductCatalog } from "@/features/products/components/product-catalog";

const collection = "sarees";

export default function SareesPage({ searchParams }: PageProps<"/sarees">) {
  return (
    <ProductCatalog.Root>
      <ProductCatalog.Title>Sarees</ProductCatalog.Title>
      <ProductCatalog.Content>
        <CatalogFilters groups={catalogFilters[collection]} />
        <Suspense fallback={<CatalogResultsSkeleton collection={collection} />}>
          <CatalogResults collection={collection} searchParams={searchParams} />
        </Suspense>
      </ProductCatalog.Content>
      <RelatedCollections current={collection} />
    </ProductCatalog.Root>
  );
}
