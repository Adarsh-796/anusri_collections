import Image from "next/image";
import { Suspense, type ReactNode } from "react";

import { ArrowLink } from "@/components/arrow-link";
import { buildCatalogFilters, type CatalogProduct } from "../catalog-filters";
import { CatalogBrowser } from "./catalog-browser";
import { getCatalogPage, type CatalogParams } from "../catalog-query";
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
  searchParams: Promise<CatalogParams>;
  children?: ReactNode;
}

function CatalogTile({ product }: { product: CatalogProduct }) {
  return (
    <ProductCard className="border border-border/70 shadow-none">
      <ProductCardMedia
        className={product.priceUnit ? "aspect-square" : "aspect-6/7"}
      >
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
        <ProductCardPrice
          unit={product.priceUnit}
          className="mt-auto text-base"
        >
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
        <AddToCartButton
          productId={product.id}
          title={product.title}
          unit={product.priceUnit}
          className="w-full"
        />
      </ProductCardContent>
    </ProductCard>
  );
}

async function CatalogResults({ title, typeLabel, products, searchParams }: Omit<ProductCatalogProps, "children">) {
  const groups = buildCatalogFilters(products, typeLabel);
  const result = getCatalogPage(products, groups, await searchParams);

  return (
    <CatalogBrowser title={title} groups={groups} query={result.query} total={result.total} collectionSize={products.length}>
      {result.products.map((product) => (
        <li key={product.id} className="min-w-0"><CatalogTile product={product} /></li>
      ))}
    </CatalogBrowser>
  );
}

export function ProductCatalog({ children, ...props }: ProductCatalogProps) {
  return (
    <main className="w-full px-gutter pt-8 pb-section sm:pt-12">
      <h1 className="mb-5 text-link sm:mb-7">{props.title}</h1>
      <Suspense fallback={<p role="status">Loading products…</p>}>
        <CatalogResults {...props} />
      </Suspense>
      {children}
    </main>
  );
}
