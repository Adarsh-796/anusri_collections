"use client";

import type { ComponentProps } from "react";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { setWishlisted, useIsWishlisted } from "../wishlist";

type ProductCardWishlistProps = Omit<
  ComponentProps<"button">,
  "aria-pressed" | "children" | "onClick" | "type"
> & {
  productId: string;
};

export function ProductCardWishlist({
  productId,
  className,
  "aria-label": label = "Wishlist",
  ...props
}: ProductCardWishlistProps) {
  const isActive = useIsWishlisted(productId);

  return (
    <button
      {...props}
      type="button"
      aria-label={label}
      aria-pressed={isActive}
      className={cn(
        "-me-2 inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-secondary hover:text-primary aria-pressed:text-primary focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 motion-safe:transition-colors",
        className,
      )}
      onClick={() => setWishlisted(productId, !isActive)}
    >
      <Heart aria-hidden="true" className={cn("size-5", isActive && "fill-current")} />
    </button>
  );
}
