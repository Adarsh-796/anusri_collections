"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { changeCartQuantity } from "../cart";
import { cartDrawerHandle } from "../cart-drawer-handle";

interface AddToCartButtonProps {
  productId: string;
  title: string;
  className?: string;
}

export function AddToCartButton({
  productId,
  title,
  className,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const openTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(openTimer.current), []);

  function addToCart() {
    if (openTimer.current !== undefined) return;

    const added = changeCartQuantity(productId, "addIfMissing");
    if (!added) {
      cartDrawerHandle.open(null);
      return;
    }

    setIsAdding(true);
    openTimer.current = window.setTimeout(() => {
      openTimer.current = undefined;
      setIsAdding(false);
      cartDrawerHandle.open(null);
    }, 300);
  }

  return (
    <Button
      type="button"
      aria-label={`Add to cart: ${title}`}
      aria-haspopup="dialog"
      aria-busy={isAdding}
      aria-disabled={isAdding}
      className={cn("min-h-11 cursor-pointer rounded-none whitespace-normal", className)}
      onClick={addToCart}
    >
      {isAdding && <LoaderCircle aria-hidden="true" className="size-3.5 motion-safe:animate-spin" />}
      {isAdding ? "Adding…" : "Add to cart"}
    </Button>
  );
}
