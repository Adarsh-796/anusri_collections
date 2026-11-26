import { CatalogResultsSkeleton } from "@/components/skeleton/catalog-results-skeleton";
import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import {
  CatalogResults,
  ProductCatalog,
} from "@/features/products/components/product-catalog";
import { Suspense } from "react";

export default function DressesPage({ searchParams }: PageProps<"/dresses">) {
  return (
    <ProductCatalog.Root>
      <ProductCatalog.Title>Dresses</ProductCatalog.Title>
      <Suspense fallback={<CatalogResultsSkeleton collection="dresses" />}>
        <CatalogResults
          title="Dresses"
          typeLabel="Dress Type"
          collection="dresses"
          searchParams={searchParams}
        />
      </Suspense>
      <RelatedCollections current="dresses" />
    </ProductCatalog.Root>
  );
}
