"use client";

import Image from "next/image";
import type { ComponentProps } from "react";
import { cartDrawerHandle } from "../cart-drawer-handle";
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { changeCartQuantity, useCart } from "../cart";
import type { CatalogProduct } from "../catalog-filters";
import { ProductCardPrice } from "./product-card";

type CartProduct = Pick<CatalogProduct, "id" | "title" | "href" | "price" | "priceUnit" | "image" | "category" | "color">;

export function CartTrigger(props: ComponentProps<typeof DrawerTrigger>) {
  return <DrawerTrigger {...props} handle={cartDrawerHandle} />;
}

export function CartDrawer({ products }: { products: readonly CartProduct[] }) {
  return (
    <Drawer swipeDirection="right" handle={cartDrawerHandle}>
      <DrawerContent className="w-11/12! max-w-lg bg-surface text-espresso data-[swipe-direction=right]:rounded-none">
        <header className="mx-5 flex shrink-0 items-center justify-between border-b border-gold py-5">
          <DrawerTitle className="text-3xl">Cart</DrawerTitle>
          <DrawerClose aria-label="Close cart" className="grid size-11 cursor-pointer place-items-center"><X /></DrawerClose>
        </header>
        <CartItems products={products} />
      </DrawerContent>
    </Drawer>
  );
}

function CartItems({ products }: { products: readonly CartProduct[] }) {
  const cart = useCart();
  if (!cart) {
    return <p role="status" className="p-5 text-text-secondary">Loading cart…</p>;
  }

  const lines = products.flatMap((product) => {
    const quantity = cart.get(product.id);
    return quantity ? [{ product, quantity }] : [];
  });
  if (lines.length === 0) {
    return (
      <div className="p-5 space-y-3">
        <p className="text-text-secondary">Your cart is empty.</p>
        <DrawerClose nativeButton={false} render={<Link href="/sarees" />} className="font-semibold text-link underline underline-offset-4">
          Browse Sarees
        </DrawerClose>
      </div>
    );
  }

  const subtotal = lines.reduce((total, { product, quantity }) => total + product.price * quantity, 0);

  return (
    <>
      <ul aria-label="Cart items" className="min-h-0 flex-1 divide-y divide-border overflow-y-auto px-5">
        {lines.map(({ product: { id, title, href, image, category, color, price, priceUnit }, quantity }) => (
          <li key={id} className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 py-6">
            <Image src={image} alt="" width={96} height={128} className="row-span-2 aspect-3/4 w-16 rounded-sm object-cover sm:w-24" />
            <div className="min-w-0">
              <DrawerClose nativeButton={false} render={<Link href={href} />} className="font-heading text-lg text-link hover:underline">{title}</DrawerClose>
              <p className="my-1 text-text-secondary">{category} · {color}</p>
              <ProductCardPrice unit={priceUnit} className="mt-1 text-base">{price}</ProductCardPrice>
            </div>
            <div className="col-start-2 flex flex-wrap items-center gap-2">
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
      <a href="tel:+918019167233" className="mx-5 mb-5 bg-burgundy p-3 text-center font-semibold text-ivory">Call to order</a>
    </>
  );
}
