import { BoutiqueProductGrid } from "@/features/products/components/boutique-product-grid";
import ProductShowcase from "@/features/products/components/product-showcase";
import { boutiqueProducts } from "@/features/products/products";

const ID = "heritage-sarees";

export default function SareesShowcase() {
  return (
    <ProductShowcase id={ID}>
      <ProductShowcase.Header>
        <ProductShowcase.Heading>
          <ProductShowcase.Eyebrow>Heritage Weaves</ProductShowcase.Eyebrow>
          <ProductShowcase.Title id={ID}>
            Timeless Sarees, Endless Elegance.
          </ProductShowcase.Title>
          <ProductShowcase.Description>
            Explore our beautiful saree collections, thoughtfully selected for
            every celebration and special occasion.
          </ProductShowcase.Description>
        </ProductShowcase.Heading>
        <ProductShowcase.ViewAll href="/sarees">
          View All Sarees
        </ProductShowcase.ViewAll>
      </ProductShowcase.Header>

      <BoutiqueProductGrid products={boutiqueProducts} />
    </ProductShowcase>
  );
}
