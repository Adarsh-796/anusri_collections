import { cache, type ReactNode } from "react";
import type { SearchParams } from "nuqs/server";

import { getCatalogPage, loadCatalogQuery } from "../catalog-query";
import { productsByCollection, type ProductCollection } from "../products";
import { BoutiqueProductCard } from "./boutique-product-card";
import { PaginationControls, ToolbarControls } from "./catalog-browser";

interface ResultsProps {
  collection: ProductCollection;
  searchParams: Promise<SearchParams>;
}

const readCatalogPage = cache(
  async (
    collection: ProductCollection,
    searchParams: Promise<SearchParams>,
  ) => {
    const params = await loadCatalogQuery(searchParams);
    return getCatalogPage(productsByCollection[collection], params);
  },
);

function Root({
  children,
  collection,
}: Pick<ResultsProps, "collection"> & { children: ReactNode }) {
  return (
    <section
      aria-label={`${collection} results`}
      className="@container/results min-w-0 scroll-mt-24"
    >
      <h2 className="sr-only">Products</h2>
      {children}
    </section>
  );
}

async function Toolbar({ collection, searchParams }: ResultsProps) {
  const { total, query } = await readCatalogPage(collection, searchParams);
  return <ToolbarControls title={collection} total={total} page={query.page} />;
}

async function Grid({ collection, searchParams }: ResultsProps) {
  const { products } = await readCatalogPage(collection, searchParams);
  if (!products.length) return null;

  return (
    <ul className="grid grid-cols-1 items-stretch gap-3 @xs/results:grid-cols-1 @md/results:grid-cols-2 @2xl/results:grid-cols-3 @4xl/results:grid-cols-4 sm:gap-4">
      {products.map((product) => (
        <li key={product.id} className="min-w-0">
          <BoutiqueProductCard
            product={product}
            variant={collection === "fabrics" ? "fabric" : "standard"}
            prefetch={false}
          />
        </li>
      ))}
    </ul>
  );
}

async function Pagination({ collection, searchParams }: ResultsProps) {
  const { total, query } = await readCatalogPage(collection, searchParams);
  return <PaginationControls total={total} page={query.page} />;
}

export const CatalogResults = { Root, Toolbar, Grid, Pagination };
