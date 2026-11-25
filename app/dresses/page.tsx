import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import { ProductCatalog } from "@/features/products/components/product-catalog";

export default function DressesPage({ searchParams }: PageProps<"/dresses">) {
  return (
    <ProductCatalog title="Dresses" typeLabel="Dress Type" collection="dresses" searchParams={searchParams}>
      <RelatedCollections current="dresses" />
    </ProductCatalog>
  );
}
