import { CatalogResultsSkeleton } from "@/components/skeleton/catalog-results-skeleton";
import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import {
  CatalogResults,
  ProductCatalog,
} from "@/features/products/components/product-catalog";
import { Suspense } from "react";

export default function FabricsPage({ searchParams }: PageProps<"/fabrics">) {
  return (
    <ProductCatalog.Root>
      <ProductCatalog.Title>Fabrics</ProductCatalog.Title>
      <Suspense fallback={<CatalogResultsSkeleton collection="fabrics" />}>
        <CatalogResults
          title="Fabrics"
          typeLabel="Textile Type"
          collection="fabrics"
          searchParams={searchParams}
        />
      </Suspense>
      <RelatedCollections current="fabrics" />
    </ProductCatalog.Root>
  );
}
