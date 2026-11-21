import { BoutiqueProductGrid } from "@/features/products/components/boutique-product-grid";
import { dressProducts } from "@/features/products/products";

export default function DressesPage() {
  return (
    <main className="py-section">
      <h1 className="mb-8 px-gutter">Dresses</h1>
      <BoutiqueProductGrid
        products={dressProducts}
        className="mx-auto max-w-[100rem] px-gutter"
        imageSizes="(min-width: 100rem) 23rem, (min-width: 80rem) 25vw, (min-width: 48rem) 50vw, 100vw"
        firstImageLoading="eager"
      />
    </main>
  );
}
