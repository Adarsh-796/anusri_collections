"use client";

import { CartTrigger } from "@/features/products/components/cart-items";
import { ShoppingBag } from "lucide-react";
import { useCartCount } from "@/features/products/cart";

const actionClassName =
  "relative inline-flex size-11 cursor-pointer items-center justify-center rounded-sm text-foreground hover:text-link aria-[current=page]:text-link focus-visible:outline-2 focus-visible:outline-ring motion-safe:transition-colors";

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <span
      aria-hidden="true"
      className="absolute inset-e-2 top-2 grid min-h-4 min-w-4 place-items-center rounded-full bg-burgundy px-0.5 text-[10px] leading-none font-semibold text-white"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function NavbarActions() {
  const cartCount = useCartCount();
  return (
    <CartTrigger
        aria-label={cartCount > 0 ? `Cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}` : "Cart"}
        className={actionClassName}
      >
        <ShoppingBag aria-hidden="true" className="size-6" />
        <CountBadge count={cartCount} />
    </CartTrigger>
  );
}
