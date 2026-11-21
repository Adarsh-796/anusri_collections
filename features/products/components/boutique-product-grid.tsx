import type { ComponentProps } from "react";

import {
  ProductCard,
  ProductCardAction,
  ProductCardBadge,
  ProductCardCategory,
  ProductCardContent,
  ProductCardFooter,
  ProductCardImage,
  ProductCardMedia,
  ProductCardPrice,
  ProductCardTitle,
} from "./product-card";
import { ProductCardWishlist } from "./product-card-wishlist";
import { ProductGrid } from "./product-grid";

export interface BoutiqueProduct {
  id: string;
  image: ComponentProps<typeof ProductCardImage>["src"];
  title: string;
  badge?: {
    variant: NonNullable<ComponentProps<typeof ProductCardBadge>["variant"]>;
    label: string;
  } | null;
  href: ComponentProps<typeof ProductCardAction>["href"];
  category: string;
  price: number | string;
}

interface BoutiqueProductGridProps {
  products: readonly BoutiqueProduct[];
  className?: string;
  imageSizes: string;
  firstImageLoading?: ComponentProps<typeof ProductCardImage>["loading"];
  productLinkPrefetch?: ComponentProps<typeof ProductCardAction>["prefetch"];
}

export function BoutiqueProductGrid({
  products,
  className,
  imageSizes,
  firstImageLoading,
  productLinkPrefetch,
}: BoutiqueProductGridProps) {
  return (
    <ProductGrid className={className}>
      {products.map(
        ({ id, image, title, badge, href, category, price }, index) => (
          <ProductCard key={id} className="@container min-w-0">
            <ProductCardMedia>
              <ProductCardImage
                src={image}
                alt={title}
                loading={index === 0 ? firstImageLoading : undefined}
                sizes={imageSizes}
              />
              {badge && (
                <ProductCardBadge
                  variant={badge.variant}
                  className="inset-s-[clamp(0.5rem,4.5cqw,1rem)] top-[clamp(0.5rem,4.5cqw,1rem)] max-w-[calc(100%-1rem)] px-[clamp(0.5rem,3.5cqw,0.75rem)] py-[clamp(0.25rem,1.75cqw,0.375rem)] text-[clamp(0.625rem,3.8cqw,0.875rem)]"
                >
                  {badge.label}
                </ProductCardBadge>
              )}
              <ProductCardAction
                href={href}
                prefetch={productLinkPrefetch}
                aria-label={`View product: ${title}`}
              >
                View Product
              </ProductCardAction>
            </ProductCardMedia>
            <ProductCardContent className="gap-[clamp(0.25rem,2cqw,0.5rem)] px-[clamp(0.75rem,5.5cqw,1.25rem)] pt-[clamp(0.75rem,6cqw,1.5rem)] pb-[clamp(0.25rem,3cqw,0.875rem)]">
              <ProductCardCategory className="text-[clamp(0.6875rem,4.1cqw,0.875rem)] leading-normal">
                {category}
              </ProductCardCategory>
              <ProductCardTitle className="text-[clamp(0.8125rem,6cqw,1.25rem)] leading-snug">
                {title}
              </ProductCardTitle>
              <ProductCardFooter className="pt-0">
                <ProductCardPrice className="text-[clamp(0.875rem,6.5cqw,1.5rem)]">
                  {price}
                </ProductCardPrice>
                <ProductCardWishlist
                  productId={id}
                  aria-label={`Wishlist: ${title}`}
                />
              </ProductCardFooter>
            </ProductCardContent>
          </ProductCard>
        ),
      )}
    </ProductGrid>
  );
}
