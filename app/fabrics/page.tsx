import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import {
  CatalogResults,
  CatalogResultsSkeleton,
  ProductCatalog,
} from "@/features/products/components/product-catalog";
import { Suspense } from "react";

export default function FabricsPage({ searchParams }: PageProps<"/fabrics">) {
  return (
    <ProductCatalog.Root>
      <ProductCatalog.Title>Fabrics</ProductCatalog.Title>
      <ProductCatalog.Result>
        <Suspense fallback={<CatalogResultsSkeleton collection="fabrics" />}>
          <CatalogResults
            title="Fabrics"
            typeLabel="Textile Type"
            collection="fabrics"
            searchParams={searchParams}
          />
        </Suspense>
      </ProductCatalog.Result>
      <RelatedCollections current="fabrics" />
    </ProductCatalog.Root>
  );
}
