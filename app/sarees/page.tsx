import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import { ProductCatalog } from "@/features/products/components/product-catalog";

export default function SareesPage({ searchParams }: PageProps<"/sarees">) {
  return (
    <ProductCatalog.Root>
      <ProductCatalog.Title>Sarees</ProductCatalog.Title>
      <ProductCatalog.Content collection="sarees" searchParams={searchParams} />
      <RelatedCollections current="sarees" />
    </ProductCatalog.Root>
  );
}
