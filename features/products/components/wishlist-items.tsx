"use client";

import Link from "next/link";
import type { BoutiqueProduct } from "./boutique-product-grid";
import { useWishlist } from "../wishlist";
import { ProductCardWishlist } from "./product-card-wishlist";

interface WishlistItemsProps {
  products: readonly Pick<BoutiqueProduct, "id" | "title" | "href">[];
}

export function WishlistItems({ products }: WishlistItemsProps) {
  const saved = useWishlist();
  if (saved === undefined) {
    return <p role="status" className="mt-4 text-text-secondary">Loading wishlist…</p>;
  }
  const savedProducts = products.filter(({ id }) => saved.has(id));

  if (!savedProducts.length) {
    return <p className="mt-4 text-text-secondary">Your wishlist is empty.</p>;
  }

  return (
    <ul className="mt-4 divide-y divide-border">
      {savedProducts.map(({ id, title, href }) => (
        <li key={id} className="flex items-center justify-between gap-3 py-2">
          <Link href={href} className="text-link hover:underline">{title}</Link>
          <ProductCardWishlist productId={id} aria-label={`Wishlist: ${title}`} />
        </li>
      ))}
    </ul>
  );
}
