import type { ComponentProps, ReactNode } from "react";

import { ArrowLink } from "@/components/arrow-link";
import { cn } from "@/lib/utils";

import {
  BoutiqueProductGrid,
  type BoutiqueProduct,
} from "./boutique-product-grid";
import SectionEyebrow from "@/features/home/components/section-eyebrow";

interface ProductShowcaseProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  viewAll: {
    href: ComponentProps<typeof ArrowLink>["href"];
    label: string;
  };
  products: readonly BoutiqueProduct[];
  className?: string;
}

const imageSizes =
  "(width >= 87.5rem) 19.25rem, (width >= 55rem) 22vw, (width >= 40rem) 45vw, (width >= 31rem) 28rem, calc(100vw - 2rem)";

export default function ProductShowcase({
  id,
  eyebrow,
  title,
  description,
  viewAll,
  products,
}: ProductShowcaseProps) {
  const headingId = `${id}-title`;

  return (
    <ProductShowcaseSection headingId={headingId} id={id}>
      <div className="mx-auto w-full max-w-md sm:max-w-none">
        <header className="mb-[clamp(1rem,3.3vw,2.5rem)] flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <h2
              id={headingId}
              className="font-heading text-[clamp(1.75rem,3.2vw,2.75rem)] leading-tight font-semibold"
            >
              {title}
            </h2>
            <p className="mt-2 max-w-[55ch] text-sm leading-relaxed text-text-secondary">
              {description}
            </p>
          </div>
          <ArrowLink
            href={viewAll.href}
            className="min-h-11 shrink-0 gap-2 text-sm sm:min-h-6"
          >
            {viewAll.label}
          </ArrowLink>
        </header>

        <BoutiqueProductGrid
          products={products}
          imageSizes={imageSizes}
          productLinkPrefetch={false}
          className="gap-[clamp(1rem,1.85vw,1.875rem)] sm:grid-cols-2 min-[55rem]:grid-cols-4"
        />
      </div>
    </ProductShowcaseSection>
  );
}

function ProductShowcaseSection({
  id,
  headingId,
  children,
}: {
  id: string;
  headingId: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="bg-[#f8efe8] px-[clamp(1rem,3.6vw,3rem)] py-section dark:bg-background"
    >
      {children}
    </section>
  );
}
