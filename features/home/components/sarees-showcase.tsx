import ProductShowcase from "@/features/products/components/product-showcase";
import { boutiqueProducts } from "@/features/products/products";

export default function SareesShowcase() {
  return (
    <ProductShowcase
      id="contemporary-dresses"
      eyebrow="Contemporary Ethnic"
      title="Designed to Make Every Moment Special."
      description="Explore beautiful designs that bring together modern style and traditional elegance."
      viewAll={{ href: "/dresses", label: "View All Dresses" }}
      products={boutiqueProducts}
      className="bg-[#fcf6f4]"
    />
  );
}
