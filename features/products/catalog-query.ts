import {
  createLoader,
  createParser,
  parseAsStringLiteral,
  type inferParserType,
} from "nuqs/server";
import type { CatalogProduct } from "./catalog-filters";

export const catalogPageSize = 12;
export const catalogParsers = {
  sort: parseAsStringLiteral(["newest", "price-asc", "price-desc"] as const).withDefault("newest"),
  page: createParser({
    parse(value) {
      const page = Number(value);
      return Number.isSafeInteger(page) && page > 0 ? page : null;
    },
    serialize: String,
  }).withDefault(1),
};
export type CatalogQuery = inferParserType<typeof catalogParsers>;
export const loadCatalogQuery = createLoader(catalogParsers);

export function getCatalogPage(products: readonly CatalogProduct[], params: CatalogQuery) {
  const sort = params.sort;
  const sorted = sort === "newest" ? products : products.toSorted((a, b) =>
    sort === "price-asc" ? a.price - b.price : b.price - a.price
  );
  const pageCount = Math.ceil(sorted.length / catalogPageSize);
  const page = Math.max(1, Math.min(pageCount, params.page));
  const offset = (page - 1) * catalogPageSize;
  const query: CatalogQuery = { sort, page };

  return { query, total: sorted.length, products: sorted.slice(offset, offset + catalogPageSize) };
}
