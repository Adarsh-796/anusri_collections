import type { ReactNode } from "react";
import type { SearchParams } from "nuqs/server";

import { getCatalogPage, loadCatalogQuery } from "../catalog-query";
import { productsByCollection, type ProductCollection } from "../products";
import { BoutiqueProductCard } from "./boutique-product-card";
import { ResultsProvider, CatalogPagination, Grid, Toolbar } from "./catalog-browser";

const collectionTitles = {
  sarees: "Sarees",
  dresses: "Dresses",
  fabrics: "Fabrics",
} satisfies Record<ProductCollection, string>;

interface CatalogResultsProps {
  children: ReactNode;
  collection: ProductCollection;
  searchParams: Promise<SearchParams>;
}

async function Root({
  children,
  collection,
  searchParams,
}: CatalogResultsProps) {
  const params = await loadCatalogQuery(searchParams);
  const { products, query, total } = getCatalogPage(productsByCollection[collection], params);

  const cards = products.map((product) => (
    <li key={product.id} className="min-w-0">
      <BoutiqueProductCard
        product={product}
        variant={collection === "fabrics" ? "fabric" : "standard"}
        prefetch={false}
      />
    </li>
  ));

  return (
    <ResultsProvider value={{ title: collectionTitles[collection], total, page: query.page, cards }}>
      {children}
    </ResultsProvider>
  );
}

export const CatalogResults = { Root, Toolbar, Grid, Pagination: CatalogPagination };
