import {
  createLoader,
  createParser,
  parseAsNativeArrayOf,
  parseAsString,
  parseAsStringLiteral,
  type inferParserType,
} from "nuqs/server";
import type { CatalogFilterGroup, CatalogProduct } from "./catalog-filters";

export const catalogPageSize = 12;
export const catalogParsers = {
  filter: parseAsNativeArrayOf(parseAsString),
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

export function selectedCatalogFilters(
  groups: readonly { options: readonly { id: string }[] }[],
  filters: readonly string[],
) {
  const requested = new Set(filters);
  return groups.flatMap(({ options }) =>
    options.filter(({ id }) => requested.has(id)).map(({ id }) => id)
  );
}

// Options within a group are alternatives. A product must match every active group.
export function matchingProductIds(groups: readonly CatalogFilterGroup[], selected: readonly string[]) {
  const selection = new Set(selected);
  let matches: Set<string> | undefined;
  for (const { options } of groups) {
    const active = options.filter(({ id }) => selection.has(id));
    if (!active.length) continue;
    const ids = new Set(active.flatMap(({ productIds }) => productIds));
    if (!matches) matches = ids;
    else for (const id of matches) {
      if (!ids.has(id)) matches.delete(id);
    }
  }
  return matches;
}

export function getCatalogPage(products: readonly CatalogProduct[], groups: readonly CatalogFilterGroup[], params: CatalogQuery) {
  const selected = selectedCatalogFilters(groups, params.filter);
  const matches = matchingProductIds(groups, selected);
  const filtered = matches ? products.filter(({ id }) => matches.has(id)) : products;
  const sort = params.sort;
  const sorted = sort === "newest" ? filtered : filtered.toSorted((a, b) =>
    sort === "price-asc" ? a.price - b.price : b.price - a.price
  );
  const pageCount = Math.ceil(sorted.length / catalogPageSize);
  const page = Math.max(1, Math.min(pageCount, params.page));
  const offset = (page - 1) * catalogPageSize;
  const query: CatalogQuery = { filter: selected, sort, page };

  return { query, total: sorted.length, products: sorted.slice(offset, offset + catalogPageSize) };
}
