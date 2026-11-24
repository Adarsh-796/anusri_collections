import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import { ProductCatalog } from "@/features/products/components/product-catalog";
import { fabricProducts } from "@/features/products/products";

export default function FabricsPage({ searchParams }: PageProps<"/fabrics">) {
  return (
    <ProductCatalog title="Fabrics" typeLabel="Textile Type" products={fabricProducts} searchParams={searchParams}>
      <RelatedCollections current="fabrics" />
    </ProductCatalog>
  );
}
