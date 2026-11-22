import { ProductCatalog } from "@/features/products/components/product-catalog";
import { boutiqueProducts } from "@/features/products/products";

export default function SareesPage() {
  return (
    <ProductCatalog title="Sarees" typeLabel="Saree Type" products={boutiqueProducts} />
  );
}
