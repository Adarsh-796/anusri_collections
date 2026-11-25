import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import {
  CatalogResults,
  CatalogResultsSkeleton,
  ProductCatalog,
} from "@/features/products/components/product-catalog";
import { Suspense } from "react";

export default function DressesPage({ searchParams }: PageProps<"/dresses">) {
  return (
    <ProductCatalog.Root>
      <ProductCatalog.Title>Dresses</ProductCatalog.Title>
      <ProductCatalog.Result>
        <Suspense fallback={<CatalogResultsSkeleton collection="dresses" />}>
          <CatalogResults
            title="Dresses"
            typeLabel="Dress Type"
            collection="dresses"
            searchParams={searchParams}
          />
        </Suspense>
      </ProductCatalog.Result>
      <RelatedCollections current="dresses" />
    </ProductCatalog.Root>
  );
}
