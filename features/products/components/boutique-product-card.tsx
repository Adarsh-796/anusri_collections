import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import {
  ProductCard,
  ProductCardAction,
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
  const { id, image, title, href, category, price, priceUnit } = product;
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
          className="w-full text-md"
        />
      </ProductCardContent>
    </ProductCard>
  );
}
