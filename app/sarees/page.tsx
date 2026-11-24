import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import { ProductCatalog } from "@/features/products/components/product-catalog";
import { boutiqueProducts } from "@/features/products/products";

export default function SareesPage({ searchParams }: PageProps<"/sarees">) {
  return (
    <ProductCatalog title="Sarees" typeLabel="Saree Type" products={boutiqueProducts} searchParams={searchParams}>
      <RelatedCollections current="sarees" />
    </ProductCatalog>
  );
}
