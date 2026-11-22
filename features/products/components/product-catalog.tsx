import Image from "next/image";

import { ArrowLink } from "@/components/arrow-link";
import { buildCatalogFilters, type CatalogProduct } from "../catalog-filters";
import { CatalogBrowser } from "./catalog-browser";
import {
  ProductCard,
  ProductCardBadge,
  ProductCardContent,
  ProductCardMedia,
  ProductCardPrice,
  ProductCardTitle,
} from "./product-card";
import { AddToCartButton } from "./add-to-cart-button";

interface ProductCatalogProps {
  title: string;
  typeLabel: string;
  products: readonly CatalogProduct[];
}

export function ProductCatalog({ title, typeLabel, products }: ProductCatalogProps) {
  const items = products.map((product) => ({
    id: product.id,
    price: product.price,
    tile: (
      <ProductCard className="border border-border/70 shadow-none">
        <ProductCardMedia className={product.priceUnit ? "aspect-square" : "aspect-[6/7]"}>
          <Image
            src={product.image}
            alt={product.title}
            width={384}
            height={product.priceUnit ? 384 : 514}
            className="absolute inset-0 size-full object-cover"
          />
          {product.badge ? (
            <ProductCardBadge
              variant={product.badge.variant}
              className="inset-s-2 top-2 max-w-[calc(100%-1rem)] px-2 py-1 text-[0.625rem] sm:text-xs"
            >
              {product.badge.label}
            </ProductCardBadge>
          ) : null}
        </ProductCardMedia>
        <ProductCardContent className="gap-1.5 p-3">
          <ProductCardTitle className="text-sm leading-snug lg:text-base">
            {product.title}
          </ProductCardTitle>
          <ProductCardPrice unit={product.priceUnit} className="mt-auto text-base">
            {product.price}
          </ProductCardPrice>
          <ArrowLink
            href={product.href}
            prefetch={false}
            aria-label={`View product: ${product.title}`}
            className="min-h-9 self-start gap-2 text-xs sm:text-sm"
          >
            View Product
          </ArrowLink>
          <AddToCartButton productId={product.id} title={product.title} unit={product.priceUnit} className="w-full" />
        </ProductCardContent>
      </ProductCard>
    ),
  }));

  return (
    <main className="w-full px-gutter pt-8 pb-section sm:pt-12">
      <h1 className="mb-5 text-link sm:mb-7">{title}</h1>
      <CatalogBrowser title={title} groups={buildCatalogFilters(products, typeLabel)} items={items} />
    </main>
  );
}
