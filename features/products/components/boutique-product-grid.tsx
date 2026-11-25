import type { ComponentProps } from "react";

import { BoutiqueProductCard, type BoutiqueProduct, type BoutiqueCardVariant } from "./boutique-product-card";
import { ProductGrid } from "./product-grid";

export type { BoutiqueProduct } from "./boutique-product-card";

interface BoutiqueProductGridProps {
  products: readonly BoutiqueProduct[];
  className?: string;
  cardVariant?: BoutiqueCardVariant;
  productLinkPrefetch?: ComponentProps<typeof BoutiqueProductCard>["prefetch"];
}

export function BoutiqueProductGrid({
  products,
  className,
  cardVariant,
  productLinkPrefetch,
}: BoutiqueProductGridProps) {
  return (
    <ProductGrid className={className}>
      {products.map((product) => (
        <BoutiqueProductCard
          key={product.id}
          product={product}
          variant={cardVariant}
          prefetch={productLinkPrefetch}
        />
      ))}
    </ProductGrid>
  );
}
