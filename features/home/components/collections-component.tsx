import { ReactNode } from "react";
import CollectionsGrid from "./collections-grid";
import SectionEyebrow from "./section-eyebrow";

export default function CollectionsComponent() {
  return (
    <CollectionSection>
      <CollectionSectionHeaderContent>
        <SectionEyebrow>Curated Selections</SectionEyebrow>
        <CollectionSectionHeader />
        <CollectionSectionHeaderDescription />
      </CollectionSectionHeaderContent>
      <CollectionsGrid />
    </CollectionSection>
  );
}

function CollectionSection({ children }: { children: ReactNode }) {
  return (
    <section
      aria-labelledby="home-collections-title"
      className="bg-[#fcf6f4] px-gutter py-9 text-espresso sm:py-12"
    >
      {children}
    </section>
  );
}

function CollectionSectionHeaderContent({ children }: { children: ReactNode }) {
  return (
    <header className="mx-auto mb-6 sm:mb-8 lg:mb-12 text-center">
      {children}
    </header>
  );
}

function CollectionSectionHeader() {
  return (
    <h2
      id="home-collections-title"
      className="font-heading text-h2 leading-tight font-semibol"
    >
      Explore Our Collections
    </h2>
  );
}

function CollectionSectionHeaderDescription() {
  return (
    <p className="mx-auto mt-2 max-w-lg text-sm sm:text-base leading-relaxed text-[#6d5b55]">
      Discover pieces that bring together tradition, elegance, and timeless
      beauty.
    </p>
  );
}
