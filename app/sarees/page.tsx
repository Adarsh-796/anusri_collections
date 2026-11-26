import { CatalogResultsSkeleton } from "@/components/skeleton/catalog-results-skeleton";
import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import {
  CatalogResults,
  ProductCatalog,
} from "@/features/products/components/product-catalog";
import { Suspense } from "react";

export default function SareesPage({ searchParams }: PageProps<"/sarees">) {
  return (
    <ProductCatalog.Root>
      <ProductCatalog.Title>Sarees</ProductCatalog.Title>
      <Suspense fallback={<CatalogResultsSkeleton collection="sarees" />}>
        <CatalogResults
          title="Sarees"
          typeLabel="Saree Type"
          collection="sarees"
          searchParams={searchParams}
        />
      </Suspense>
      <RelatedCollections current="sarees" />
    </ProductCatalog.Root>
  );
}
