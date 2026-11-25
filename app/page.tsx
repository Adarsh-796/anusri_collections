import CollectionsComponent from "@/features/home/components/collections-component";
import DressesShowcase from "@/features/home/components/dresses-showcase";
import FabricsShowcase from "@/features/home/components/fabrics-showcase";
import HeroComponent from "@/features/home/components/hero-component";
import SareesShowcase from "@/features/home/components/sarees-showcase";
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
      <SareesShowcase />
      <DressesShowcase />
      <FabricsShowcase />
    </main>
  );
}
