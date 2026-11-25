import ProductShowcase from "@/features/products/components/product-showcase";
import { fabricProducts } from "@/features/products/products";

export default function FabricsShowcase() {
  return (
    <ProductShowcase
      id="textile-atelier"
      eyebrow="Textile Atelier"
      title="The Beauty Begins With the Fabric."
      description="Discover beautiful fabrics and materials that inspire unique styles and personalized creations."
      viewAll={{ href: "/fabrics", label: "View All Fabrics" }}
      products={fabricProducts}
      cardVariant="fabric"
      className="bg-[#fcf9f4]"
    />
  );
}
