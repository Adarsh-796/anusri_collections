import { Suspense } from "react";

import { CatalogResultsSkeleton } from "@/components/skeleton/catalog-results-skeleton";
import { catalogFilters } from "@/features/products/catalog-filters";
import { CatalogFilters } from "@/features/products/components/catalog-filter-controls";
import * as CatalogFilterMenu from "@/features/products/components/catalog-filter-menu";
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
            <CatalogFilterMenu.Fields groups={catalogFilters[collection]} />
          </CatalogFilterMenu.Sidebar>
          <CatalogFilterMenu.Drawer>
            <CatalogFilterMenu.Fields groups={catalogFilters[collection]} />
          </CatalogFilterMenu.Drawer>
        </CatalogFilters>
        <Suspense fallback={<CatalogResultsSkeleton collection={collection} />}>
          <CatalogResults collection={collection} searchParams={searchParams} />
        </Suspense>
      </ProductCatalog.Content>
      <RelatedCollections current={collection} />
    </ProductCatalog.Root>
  );
}
