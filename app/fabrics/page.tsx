import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import { ProductCatalog } from "@/features/products/components/product-catalog";

export default function FabricsPage({ searchParams }: PageProps<"/fabrics">) {
  return (
    <ProductCatalog title="Fabrics" typeLabel="Textile Type" collection="fabrics" searchParams={searchParams}>
      <RelatedCollections current="fabrics" />
    </ProductCatalog>
  );
}
