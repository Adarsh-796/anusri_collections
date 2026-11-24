import { RelatedCollections } from "@/features/products/components/discover-more-collections";
import { ProductCatalog } from "@/features/products/components/product-catalog";
import { fabricProducts } from "@/features/products/products";

export default function FabricsPage() {
  return (
    <ProductCatalog title="Fabrics" typeLabel="Textile Type" products={fabricProducts}>
      <RelatedCollections current="fabrics" />
    </ProductCatalog>
  );
}
