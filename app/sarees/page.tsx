import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import { ProductCatalog } from "@/features/products/components/product-catalog";

export default function SareesPage({ searchParams }: PageProps<"/sarees">) {
  return (
    <ProductCatalog title="Sarees" typeLabel="Saree Type" collection="sarees" searchParams={searchParams}>
      <RelatedCollections current="sarees" />
    </ProductCatalog>
  );
}
