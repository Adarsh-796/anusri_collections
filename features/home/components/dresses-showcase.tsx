import { BoutiqueProductGrid } from "@/features/products/components/boutique-product-grid";
import ProductShowcase from "@/features/products/components/product-showcase";
import { dressProducts } from "@/features/products/products";

const ID = "contemporary-dresses";

export default function DressesShowcase() {
  return (
    <ProductShowcase id={ID} className="bg-[#fcf6f4]">
      <ProductShowcase.Header>
        <ProductShowcase.Heading>
          <ProductShowcase.Eyebrow>Contemporary Ethnic</ProductShowcase.Eyebrow>
          <ProductShowcase.Title id={ID}>
            Designed to Make Every Moment Special.
          </ProductShowcase.Title>
          <ProductShowcase.Description>
            Explore beautiful designs that bring together modern style and
            traditional elegance.
          </ProductShowcase.Description>
        </ProductShowcase.Heading>
        <ProductShowcase.ViewAll href="/dresses">
          View All Dresses
        </ProductShowcase.ViewAll>
      </ProductShowcase.Header>

      <BoutiqueProductGrid products={dressProducts} />
    </ProductShowcase>
  );
}
