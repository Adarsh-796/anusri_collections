import ProductShowcase from "@/features/products/components/product-showcase";
import { dressProducts } from "@/features/products/products";

export default function DressesShowcase() {
  return (
    <ProductShowcase
      id="contemporary-dresses"
      eyebrow="Contemporary Ethnic"
      title="Designed to Make Every Moment Special."
      description="Explore beautiful designs that bring together modern style and traditional elegance."
      viewAll={{ href: "/dresses", label: "View All Dresses" }}
      products={dressProducts}
      className="bg-[#fcf6f4]"
    />
  );
}
