import type { CatalogFilterGroup, CatalogProduct } from "./catalog-filters";

export const catalogPageSize = 12;
export type CatalogParams = Record<string, string | string[] | undefined>;
export interface CatalogQuery {
  selected: readonly string[];
  sort: "newest" | "price-asc" | "price-desc";
  page: number;
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

export function getCatalogPage(products: readonly CatalogProduct[], groups: readonly CatalogFilterGroup[], params: CatalogParams) {
  const requested = new Set(Array.isArray(params.filter) ? params.filter : [params.filter]);
  const selected = groups.flatMap(({ options }) => options.map(({ id }) => id).filter((id) => requested.has(id)));
  const matches = matchingProductIds(groups, selected);
  const filtered = matches ? products.filter(({ id }) => matches.has(id)) : products;
  const sort = params.sort === "price-asc" || params.sort === "price-desc" ? params.sort : "newest";
  const sorted = sort === "newest" ? filtered : filtered.toSorted((a, b) =>
    sort === "price-asc" ? a.price - b.price : b.price - a.price
  );
  const pageCount = Math.ceil(sorted.length / catalogPageSize);
  const requestedPage = typeof params.page === "string" ? Number(params.page) : 1;
  const page = Math.max(1, Math.min(pageCount, Number.isSafeInteger(requestedPage) ? requestedPage : 1));
  const offset = (page - 1) * catalogPageSize;
  const query: CatalogQuery = { selected, sort, page };

  return { query, total: sorted.length, products: sorted.slice(offset, offset + catalogPageSize) };
}
