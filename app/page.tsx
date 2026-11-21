import { CollectionsSection } from "@/features/home/components/collections-section";
import { HeroComponent } from "@/features/home/components/hero-component";
import { ProductShowcase } from "@/features/products/components/product-showcase";
import { boutiqueProducts } from "@/features/products/products";
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
      <CollectionsSection />
      <ProductShowcase
        id="heritage-sarees"
        eyebrow="Heritage Weaves"
        title="Timeless Sarees, Endless Elegance."
        description="Explore our beautiful saree collections, thoughtfully selected for every celebration and special occasion."
        viewAll={{ href: "/sarees", label: "View All Sarees" }}
        products={boutiqueProducts}
      />
    </main>
  );
}
