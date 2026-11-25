import { Suspense, type ReactNode } from "react";
import type { SearchParams } from "nuqs/server";

import { ProductCardSkeleton } from "@/components/skeleton/product-card-skeleton";
import { buildCatalogFilters, summarizeCatalogFilters } from "../catalog-filters";
import {
  getCatalogProducts,
  type ProductCollection,
} from "../get-catalog-products";
import { CatalogBrowser } from "./catalog-browser";
import { BoutiqueProductCard } from "./boutique-product-card";
import {
  catalogPageSize,
  getCatalogPage,
  loadCatalogQuery,
} from "../catalog-query";

interface CatalogResultsProps {
  title: string;
  typeLabel: string;
  collection: ProductCollection;
  searchParams: Promise<SearchParams>;
}

function ProductCatalogRoot({ children }: { children: ReactNode }) {
  return (
    <main className="w-full px-gutter pt-8 pb-section sm:pt-12">
      {children}
    </main>
  );
}

export function CatalogResultsSkeleton({
  collection,
}: Pick<CatalogResultsProps, "collection">) {
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(12rem,14rem)_minmax(0,1fr)] lg:gap-5">
      <span className="sr-only" role="status">
        Loading products…
      </span>
      <div
        aria-hidden="true"
        className="hidden h-64 rounded-lg bg-muted lg:block"
      />
      <div className="@container/results min-w-0">
        <div aria-hidden="true" className="mb-4 h-14 rounded-lg bg-muted" />
        <div className="grid grid-cols-1 gap-3 @xs/results:grid-cols-2 @2xl/results:grid-cols-3 @4xl/results:grid-cols-4 sm:gap-4">
          {Array.from({ length: catalogPageSize }, (_, index) => (
            <ProductCardSkeleton
              key={index}
              variant={collection === "fabrics" ? "fabric" : "standard"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCatalogResult(props: CatalogResultsProps) {
  return (
    <Suspense fallback={<CatalogResultsSkeleton collection={props.collection} />}>
      <CatalogResults {...props} />
    </Suspense>
  );
}

async function CatalogResults({
  title,
  typeLabel,
  collection,
  searchParams,
}: CatalogResultsProps) {
  const [products, params] = await Promise.all([
    getCatalogProducts(collection),
    loadCatalogQuery(searchParams),
  ]);
  const groups = buildCatalogFilters(products, typeLabel);
  const result = getCatalogPage(products, groups, params);

  return (
    <CatalogBrowser
      title={title}
      collection={collection}
      groups={summarizeCatalogFilters(groups)}
      query={result.query}
      total={result.total}
      collectionSize={products.length}
    >
      {result.products.map((product) => (
        <li key={product.id} className="min-w-0">
          <BoutiqueProductCard
            product={product}
            variant={collection === "fabrics" ? "fabric" : "standard"}
            prefetch={false}
          />
        </li>
      ))}
    </CatalogBrowser>
  );
}

function ProductCatalogTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-5 text-link sm:mb-7 text-4xl md:text-5xl">{children}</h1>
  );
}

export const ProductCatalog = {
  Root: ProductCatalogRoot,
  Title: ProductCatalogTitle,
  Result: ProductCatalogResult,
};
