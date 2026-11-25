import { BoutiqueProductGrid } from "@/features/products/components/boutique-product-grid";
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
      className="bg-[#fcf9f4]"
    >
      <BoutiqueProductGrid
        products={fabricProducts}
        cardVariant="fabric"
        productLinkPrefetch={false}
        className="gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4 xl:gap-7"
      />
    </ProductShowcase>
  );
}
