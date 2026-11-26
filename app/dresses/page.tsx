import { Suspense } from "react";

import { CatalogResultsSkeleton } from "@/components/skeleton/catalog-results-skeleton";
import { CollectionFilterFields } from "@/features/products/components/collection-filter-fields";
import { CatalogFilters } from "@/features/products/components/catalog-filter-controls";
import * as CatalogFilterMenu from "@/features/products/components/catalog-filter-menu";
import { CatalogResults } from "@/features/products/components/catalog-results";
import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import { ProductCatalog } from "@/features/products/components/product-catalog";

const collection = "dresses";

export default function DressesPage({ searchParams }: PageProps<"/dresses">) {
  return (
    <ProductCatalog.Root>
      <ProductCatalog.Title>Dresses</ProductCatalog.Title>
      <ProductCatalog.Content>
        <CatalogFilters>
          <CatalogFilterMenu.Sidebar>
            <CollectionFilterFields collection={collection} />
          </CatalogFilterMenu.Sidebar>
          <CatalogFilterMenu.Drawer>
            <CollectionFilterFields collection={collection} />
          </CatalogFilterMenu.Drawer>
        </CatalogFilters>
        <Suspense fallback={<CatalogResultsSkeleton collection={collection} />}>
          <CatalogResults.Root collection={collection} searchParams={searchParams}>
            <CatalogResults.Toolbar />
            <CatalogResults.Grid />
            <CatalogResults.Pagination />
          </CatalogResults.Root>
        </Suspense>
      </ProductCatalog.Content>
      <RelatedCollections current={collection} />
    </ProductCatalog.Root>
  );
}
