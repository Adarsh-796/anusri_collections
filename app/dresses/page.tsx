import { ProductCatalog } from "@/features/products/components/product-catalog";
import { dressProducts } from "@/features/products/products";

export default function DressesPage() {
  return (
    <ProductCatalog title="Dresses" typeLabel="Dress Type" products={dressProducts} />
  );
}
