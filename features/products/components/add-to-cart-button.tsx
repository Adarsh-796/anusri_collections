"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { changeCartQuantity, useCartQuantity } from "../cart";

interface AddToCartButtonProps {
  productId: string;
  title: string;
  unit?: "meter";
  className?: string;
}

export function AddToCartButton({ productId, title, unit, className }: AddToCartButtonProps) {
  const quantity = useCartQuantity(productId);

  return (
    <>
      <Button
        type="button"
        aria-label={`Add to cart: ${title}`}
        className={cn("min-h-11 cursor-pointer whitespace-normal", className)}
        onClick={() => changeCartQuantity(productId, 1)}
      >
        Add to cart
      </Button>
      <span role="status" className="sr-only">
        {quantity > 0 ? `${quantity}${unit ? " m of" : " ×"} ${title} in cart.` : ""}
      </span>
    </>
  );
}
