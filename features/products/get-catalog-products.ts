import "server-only";

import { isCatalogColor, type CatalogProduct } from "./catalog-filters";
import { boutiqueProducts, dressProducts, fabricProducts } from "./products";

const localCatalogs = {
  sarees: boutiqueProducts,
  dresses: dressProducts,
  fabrics: fabricProducts,
};

export type ProductCollection = keyof typeof localCatalogs;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

const badgeVariants = {
  new: true, heirloom: true, bridal: true, festive: true, trending: true,
} satisfies Record<NonNullable<CatalogProduct["badge"]>["variant"], true>;

function isBadge(value: unknown): value is NonNullable<CatalogProduct["badge"]> {
  return isRecord(value) && isText(value.label) && isText(value.variant)
    && Object.hasOwn(badgeVariants, value.variant);
}

function parseProduct(value: unknown, collection: ProductCollection): CatalogProduct {
  if (
    !isRecord(value) || !isText(value.id) || !isText(value.title) ||
    !isText(value.category) || !isText(value.material) || !isCatalogColor(value.color) ||
    !isText(value.image) || typeof value.price !== "number" ||
    !Number.isFinite(value.price) || value.price < 0 ||
    (value.style !== undefined && !isText(value.style)) ||
    (value.occasions !== undefined && !(Array.isArray(value.occasions) && value.occasions.every(isText))) ||
    (value.priceUnit !== undefined && value.priceUnit !== "meter") ||
    (value.badge != null && !isBadge(value.badge))
  ) {
    throw new Error(`Invalid product returned for ${collection}.`);
  }

  return {
    id: value.id,
    title: value.title,
    category: value.category,
    material: value.material,
    color: value.color,
    image: value.image,
    price: value.price,
    style: value.style,
    occasions: value.occasions,
    priceUnit: value.priceUnit,
    badge: value.badge,
    href: `/${collection}/${encodeURIComponent(value.id)}`,
  };
}

export async function getCatalogProducts(collection: ProductCollection): Promise<readonly CatalogProduct[]> {
  const endpoint = process.env.PRODUCTS_API_URL;
  if (!endpoint) return localCatalogs[collection];

  const url = new URL(endpoint);
  url.searchParams.set("category", collection);
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Could not load ${collection} (HTTP ${response.status}).`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error(`Expected a product array for ${collection}.`);
  return data.map((item: unknown) => parseProduct(item, collection));
}
