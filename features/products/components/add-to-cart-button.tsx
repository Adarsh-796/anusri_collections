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

export function AddToCartButton({
  productId,
  title,
  unit,
  className,
}: AddToCartButtonProps) {
  const quantity = useCartQuantity(productId);
  const inCart = quantity > 0;
  const label = inCart ? "Remove item" : "Add to cart";

  return (
    <>
      <Button
        type="button"
        aria-label={`${label}: ${title}`}
        className={cn(
          "min-h-11 rounded-none cursor-pointer whitespace-normal",
          className,
        )}
        onClick={() => changeCartQuantity(productId, inCart ? "remove" : 1)}
      >
        {label}
      </Button>
      <span role="status" className="sr-only">
        {inCart ? `${quantity}${unit ? " m of" : " ×"} ${title} in cart.` : ""}
      </span>
    </>
  );
}
