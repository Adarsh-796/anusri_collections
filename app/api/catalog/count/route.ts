import { buildCatalogFilters } from "@/features/products/catalog-filters";
import { matchingProductIds } from "@/features/products/catalog-query";
import { getCatalogProducts, isProductCollection } from "@/features/products/get-catalog-products";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const collection = params.get("collection");
  if (!isProductCollection(collection)) {
    return Response.json({ error: "Unknown collection" }, { status: 400 });
  }

  const products = await getCatalogProducts(collection);
  const groups = buildCatalogFilters(products, "Type");
  const matches = matchingProductIds(groups, params.getAll("filter"));
  return Response.json({ count: matches?.size ?? products.length });
}
