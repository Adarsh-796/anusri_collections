import ProductShowcase from "@/features/products/components/product-showcase";
import { boutiqueProducts } from "@/features/products/products";

export default function SareesShowcase() {
  return (
    <ProductShowcase
      id="heritage-sarees"
      eyebrow="Heritage Weaves"
      title="Timeless Sarees, Endless Elegance."
      description="Explore our beautiful saree collections, thoughtfully selected for every celebration and special occasion."
      viewAll={{ href: "/sarees", label: "View All Sarees" }}
      products={boutiqueProducts}
      className="bg-[#fcf6f4]"
    />
  );
}
