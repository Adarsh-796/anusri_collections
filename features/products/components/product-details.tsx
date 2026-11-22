import Image from "next/image";
import { cn } from "@/lib/utils";

import type { BoutiqueProduct } from "./boutique-product-grid";
import { ProductCardPrice } from "./product-card";
import { ProductCardWishlist } from "./product-card-wishlist";

export function ProductDetails({
  product,
}: {
  product: Pick<BoutiqueProduct, "id" | "title" | "category" | "image" | "price" | "priceUnit">;
}) {
  return (
    <main className="mx-auto grid max-w-5xl gap-8 px-gutter py-section md:grid-cols-2">
      <div
        className={cn(
          "relative aspect-3/4 overflow-hidden rounded-lg",
          product.priceUnit === "meter" && "aspect-square",
        )}
      >
        <Image
          src={product.image}
          alt={product.title}
          width={512}
          height={product.priceUnit === "meter" ? 512 : 686}
          loading="eager"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div>
        <p className="mb-2 text-text-secondary">{product.category}</p>
        <h1>{product.title}</h1>
        <div className="mt-4 flex items-center gap-4">
          <ProductCardPrice unit={product.priceUnit}>{product.price}</ProductCardPrice>
          <ProductCardWishlist
            productId={product.id}
            aria-label={`Wishlist: ${product.title}`}
          />
        </div>
      </div>
    </main>
  );
}
