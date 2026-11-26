import type { ReactNode } from "react";
import type { SearchParams } from "nuqs/server";

import {
  buildCatalogFilters,
  summarizeCatalogFilters,
} from "../catalog-filters";
import { productsByCollection, type ProductCollection } from "../products";
import { CatalogBrowser } from "./catalog-browser";
import { BoutiqueProductCard } from "./boutique-product-card";
import {
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

export async function CatalogResults({
  title,
  typeLabel,
  collection,
  searchParams,
}: CatalogResultsProps) {
  const products = productsByCollection[collection];
  const params = await loadCatalogQuery(searchParams);
  const groups = buildCatalogFilters(products, collection, typeLabel);
  const result = getCatalogPage(products, groups, params);

  return (
    <CatalogBrowser
      title={title}
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
};
