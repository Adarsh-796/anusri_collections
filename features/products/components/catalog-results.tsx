import type { SearchParams } from "nuqs/server";

import { getCatalogPage, loadCatalogQuery } from "../catalog-query";
import { productsByCollection, type ProductCollection } from "../products";
import { BoutiqueProductCard } from "./boutique-product-card";
import { CatalogBrowser } from "./catalog-browser";

const collectionTitles = {
  sarees: "Sarees",
  dresses: "Dresses",
  fabrics: "Fabrics",
} satisfies Record<ProductCollection, string>;

export interface CatalogResultsProps {
  collection: ProductCollection;
  searchParams: Promise<SearchParams>;
}

export async function CatalogResults({
  collection,
  searchParams,
}: CatalogResultsProps) {
  const params = await loadCatalogQuery(searchParams);
  const { products, query, total } = getCatalogPage(productsByCollection[collection], params);

  return (
    <CatalogBrowser
      title={collectionTitles[collection]}
      query={query}
      total={total}
    >
      {products.map((product) => (
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
