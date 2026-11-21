import { CollectionsSection } from "@/features/home/components/collections-section";
import { HeroComponent } from "@/features/home/components/hero-component";
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
    </main>
  );
}
