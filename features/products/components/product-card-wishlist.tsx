"use client";

import { useState, type ComponentProps } from "react";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";

type ProductCardWishlistProps = Omit<
  ComponentProps<"button">,
  "aria-pressed" | "children" | "onClick" | "type"
> & {
  active?: boolean;
  defaultActive?: boolean;
  onToggle?: (active: boolean) => void;
};

export function ProductCardWishlist({
  active,
  defaultActive = false,
  onToggle,
  className,
  "aria-label": label = "Wishlist",
  ...props
}: ProductCardWishlistProps) {
  const [saved, setSaved] = useState(defaultActive);
  const isActive = active ?? saved;

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
      onClick={() => {
        const next = !isActive;
        if (active === undefined) setSaved(next);
        onToggle?.(next);
      }}
    >
      <Heart aria-hidden="true" className={cn("size-5", isActive && "fill-current")} />
    </button>
  );
}
