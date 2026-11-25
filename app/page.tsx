import CollectionsComponent from "@/features/home/components/collections-component";
import HeroComponent from "@/features/home/components/hero-component";
import { ProductShowcase } from "@/features/products/components/product-showcase";
import {
  boutiqueProducts,
  dressProducts,
  fabricProducts,
} from "@/features/products/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anusri Collections",
  description:
    "Discover timeless sarees, beautiful fabrics, and thoughtfully crafted designs that celebrate the beauty of tradition.",
};

export default function Home() {
  return (
    <main>
      <HeroComponent />
      <CollectionsComponent />
      <ProductShowcase
        id="heritage-sarees"
        eyebrow="Heritage Weaves"
        title="Timeless Sarees, Endless Elegance."
        description="Explore our beautiful saree collections, thoughtfully selected for every celebration and special occasion."
        viewAll={{ href: "/sarees", label: "View All Sarees" }}
        products={boutiqueProducts}
      />
      <ProductShowcase
        id="contemporary-dresses"
        eyebrow="Contemporary Ethnic"
        title="Designed to Make Every Moment Special."
        description="Explore beautiful designs that bring together modern style and traditional elegance."
        viewAll={{ href: "/dresses", label: "View All Dresses" }}
        products={dressProducts}
        className="bg-[#fcf6f4]"
      />
      <ProductShowcase
        id="textile-atelier"
        eyebrow="Textile Atelier"
        title="The Beauty Begins With the Fabric."
        description="Discover beautiful fabrics and materials that inspire unique styles and personalized creations."
        viewAll={{ href: "/fabrics", label: "View All Fabrics" }}
        products={fabricProducts}
        className="bg-[#fcf9f4]"
      />
    </main>
  );
}
