"use client";

import Link from "next/link";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { changeCartQuantity, useCart } from "../cart";
import type { CatalogProduct } from "../catalog-filters";
import { ProductCardPrice } from "./product-card";

type CartProduct = Pick<CatalogProduct, "id" | "title" | "href" | "price" | "priceUnit">;

export function CartItems({ products }: { products: readonly CartProduct[] }) {
  const cart = useCart();
  if (!cart) {
    return <p role="status" className="mt-4 text-text-secondary">Loading cart…</p>;
  }

  const lines = products.flatMap((product) => {
    const quantity = cart.get(product.id);
    return quantity ? [{ product, quantity }] : [];
  });
  if (lines.length === 0) {
    return (
      <div className="mt-5 space-y-3">
        <p className="text-text-secondary">Your cart is empty.</p>
        <Link href="/sarees" className="font-semibold text-link underline underline-offset-4">
          Browse Sarees
        </Link>
      </div>
    );
  }

  const subtotal = lines.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

  return (
    <div className="mt-6 rounded-lg border border-border bg-surface">
      <ul aria-label="Cart items" className="divide-y divide-border">
        {lines.map(({ product: { id, title, href, price, priceUnit }, quantity }) => (
          <li key={id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
            <div className="min-w-0">
              <Link href={href} className="font-semibold text-link hover:underline">{title}</Link>
              <ProductCardPrice unit={priceUnit} className="mt-1 text-base">{price}</ProductCardPrice>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div role="group" aria-label={`Quantity for ${title}`} className="flex items-center gap-1">
                <Button type="button" variant="outline" size="icon" className="size-11" aria-label={`Decrease quantity of ${title}`} disabled={quantity === 1} onClick={() => changeCartQuantity(id, -1)}>
                  <Minus aria-hidden="true" />
                </Button>
                <span className="min-w-8 text-center text-sm tabular-nums">
                  {quantity}{priceUnit ? " m" : ""}
                </span>
                <Button type="button" variant="outline" size="icon" className="size-11" aria-label={`Increase quantity of ${title}`} onClick={() => changeCartQuantity(id, 1)}>
                  <Plus aria-hidden="true" />
                </Button>
              </div>
              <button type="button" className="min-h-11 cursor-pointer px-2 text-sm text-link underline underline-offset-2" aria-label={`Remove ${title} from cart`} onClick={() => changeCartQuantity(id, "remove")}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div role="status" className="flex flex-wrap items-center justify-between gap-2 border-t border-border px-4 py-4 font-semibold sm:px-6">
        <span>Subtotal</span>
        <ProductCardPrice className="text-xl">{subtotal}</ProductCardPrice>
      </div>
    </div>
  );
}
