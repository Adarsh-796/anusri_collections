import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import { ProductCatalog } from "@/features/products/components/product-catalog";
import { dressProducts } from "@/features/products/products";

export default function DressesPage({ searchParams }: PageProps<"/dresses">) {
  return (
    <ProductCatalog title="Dresses" typeLabel="Dress Type" products={dressProducts} searchParams={searchParams}>
      <RelatedCollections current="dresses" />
    </ProductCatalog>
  );
}
