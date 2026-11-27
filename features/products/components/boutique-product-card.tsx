import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

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
import { AddToCartButton } from "./add-to-cart-button";

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
  priceUnit?: "meter";
}

export type BoutiqueCardVariant = "standard" | "fabric";

interface BoutiqueProductCardProps {
  product: BoutiqueProduct;
  variant?: BoutiqueCardVariant;
  prefetch?: ComponentProps<typeof ProductCardAction>["prefetch"];
}

export function BoutiqueProductCard({
  product,
  variant = "standard",
  prefetch,
}: BoutiqueProductCardProps) {
  const { id, image, title, badge, href, category, price, priceUnit } = product;
  const isFabric = variant === "fabric";

  return (
    <ProductCard
      className={cn(
        "@container min-w-0",
        isFabric && "bg-[#fcf6f4] dark:bg-surface",
      )}
    >
      <ProductCardMedia className={isFabric ? "aspect-square" : undefined}>
        <ProductCardImage src={image} alt={title} loading="lazy" sizes="auto" />
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
          prefetch={prefetch}
          aria-label={`View product: ${title}`}
        >
          View Product
        </ProductCardAction>
      </ProductCardMedia>
      <ProductCardContent className="gap-[clamp(0.25rem,2cqw,0.5rem)] px-[clamp(0.75rem,5.5cqw,1.25rem)] pt-[clamp(0.75rem,6cqw,1.5rem)] pb-[clamp(0.25rem,3cqw,0.875rem)]">
        <ProductCardCategory className="text-[clamp(0.6875rem,4.1cqw,0.875rem)] leading-normal">
          {category}
        </ProductCardCategory>
        <ProductCardTitle className="text-[1rem] leading-snug">
          {title}
        </ProductCardTitle>
        <ProductCardFooter className="pt-0">
          <ProductCardPrice className="text-[1rem]" unit={priceUnit}>
            {price}
          </ProductCardPrice>
        </ProductCardFooter>
        <AddToCartButton
          productId={id}
          title={title}
          className="w-full text-xs sm:text-sm"
        />
      </ProductCardContent>
    </ProductCard>
  );
}
