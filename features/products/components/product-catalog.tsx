import { Suspense, type ReactNode } from "react";
import type { SearchParams } from "nuqs/server";

import { CatalogResultsSkeleton } from "@/components/skeleton/catalog-results-skeleton";
import {
  buildCatalogFilters,
  summarizeCatalogFilters,
  type CatalogFilterGroup,
} from "../catalog-filters";
import { getCatalogPage, loadCatalogQuery } from "../catalog-query";
import { productsByCollection, type ProductCollection } from "../products";
import { CatalogBrowser } from "./catalog-browser";
import { BoutiqueProductCard } from "./boutique-product-card";
import { CatalogFilters } from "./catalog-filter-controls";

const collections = {
  sarees: { title: "Sarees", typeLabel: "Saree Type" },
  dresses: { title: "Dresses", typeLabel: "Dress Type" },
  fabrics: { title: "Fabrics", typeLabel: "Textile Type" },
} satisfies Record<ProductCollection, { title: string; typeLabel: string }>;

interface CatalogProps {
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

function CatalogContent({ collection, searchParams }: CatalogProps) {
  const products = productsByCollection[collection];
  const groups = buildCatalogFilters(products, collection, collections[collection].typeLabel);
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(12rem,14rem)_minmax(0,1fr)] lg:gap-5">
      <CatalogFilters groups={summarizeCatalogFilters(groups)} collectionSize={products.length} />
      <Suspense fallback={<CatalogResultsSkeleton collection={collection} />}>
        <CatalogResults collection={collection} searchParams={searchParams} groups={groups} />
      </Suspense>
    </div>
  );
}

async function CatalogResults({
  collection,
  searchParams,
  groups,
}: CatalogProps & { groups: readonly CatalogFilterGroup[] }) {
  const products = productsByCollection[collection];
  const params = await loadCatalogQuery(searchParams);
  const result = getCatalogPage(products, groups, params);

  return (
    <CatalogBrowser
      title={collections[collection].title}
      query={result.query}
      total={result.total}
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
  Content: CatalogContent,
};
