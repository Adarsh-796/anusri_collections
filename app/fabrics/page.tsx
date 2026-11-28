import { Suspense } from "react";

import { CatalogResultsSkeleton } from "@/components/skeleton/catalog-results-skeleton";
import { CollectionFilterFields } from "@/features/products/components/collection-filter-fields";
import { CatalogFilters } from "@/features/products/components/catalog-filter-controls";
import { CatalogFilterMenu } from "@/features/products/components/catalog-filter-menu";
import { CatalogResults } from "@/features/products/components/catalog-results";
import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import { ProductCatalog } from "@/features/products/components/product-catalog";

const collection = "fabrics";

export default function FabricsPage({ searchParams }: PageProps<"/fabrics">) {
  return (
    <ProductCatalog.Root>
      <ProductCatalog.Title>Fabrics</ProductCatalog.Title>
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
          <CatalogResults.Root collection={collection}>
            <CatalogResults.Toolbar collection={collection} searchParams={searchParams} />
            <CatalogResults.Grid collection={collection} searchParams={searchParams} />
            <CatalogResults.Pagination collection={collection} searchParams={searchParams} />
          </CatalogResults.Root>
        </Suspense>
      </ProductCatalog.Content>
      <RelatedCollections current={collection} />
    </ProductCatalog.Root>
  );
}
