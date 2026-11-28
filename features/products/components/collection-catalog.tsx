import type { SearchParams } from "nuqs/server";
import type { ProductCollection } from "../products";
import { Suspense } from "react";

import { CatalogResultsSkeleton } from "@/components/skeleton/catalog-results-skeleton";
import { CollectionFilterFields } from "./collection-filter-fields";
import { CatalogFilters } from "./catalog-filter-controls";
import * as CatalogFilterMenu from "./catalog-filter-menu";
import * as CatalogResults from "./catalog-results";
import { RelatedCollections } from "./discover-more-collections";
import * as ProductCatalog from "./product-catalog";

interface CollectionCatalogProps {
  collection: ProductCollection;
  title: string;
  searchParams: Promise<SearchParams>;
}

export function CollectionCatalog({ collection, title, searchParams }: CollectionCatalogProps) {
  return (
    <ProductCatalog.Root>
      <ProductCatalog.Title>{title}</ProductCatalog.Title>
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
