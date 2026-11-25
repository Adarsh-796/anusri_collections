import type { BoutiqueProduct } from "./components/boutique-product-grid";

const colors = {
  Burgundy: "#701b34",
  Blush: "#c68287",
  Emerald: "#255e46",
  Gold: "#bc8c40",
  Ivory: "#f1e4cc",
  "Royal Blue": "#293e83",
  Plum: "#633447",
};

export function isCatalogColor(value: unknown): value is keyof typeof colors {
  return typeof value === "string" && Object.hasOwn(colors, value);
}

export type CatalogProduct = Omit<BoutiqueProduct, "price"> & {
  price: number;
  style?: string;
  material: string;
  color: keyof typeof colors;
  occasions?: readonly string[];
};

export interface CatalogFilterGroup {
  title: string;
  options: ReadonlyArray<{
    id: string;
    label: string;
    productIds: string[];
    swatch?: string;
  }>;
}

const apparelPrices = [
  { label: "Under ₹5,000", max: 5000 },
  { label: "₹5,000 to under ₹10,000", min: 5000, max: 10000 },
  { label: "₹10,000 to under ₹20,000", min: 10000, max: 20000 },
  { label: "₹20,000 and above", min: 20000 },
] as const;

const fabricPrices = [
  { label: "Under ₹1,500", max: 1500 },
  { label: "₹1,500 to under ₹2,000", min: 1500, max: 2000 },
  { label: "₹2,000 and above", min: 2000 },
] as const;

function groupOptions(
  key: string,
  title: string,
  products: readonly CatalogProduct[],
  getLabels: (product: CatalogProduct) => readonly string[],
): CatalogFilterGroup {
  const matches = new Map<string, string[]>();
  for (const product of products) {
    for (const label of getLabels(product)) {
      const ids = matches.get(label);
      if (ids) ids.push(product.id);
      else matches.set(label, [product.id]);
    }
  }

  return {
    title,
    options: Array.from(matches, ([label, productIds]) => ({
      id: `${key}:${label}`,
      label,
      productIds,
      swatch: key === "color" ? colors[label as keyof typeof colors] : undefined,
    })),
  };
}

export function buildCatalogFilters(
  products: readonly CatalogProduct[],
  typeLabel: string,
) {
  const soldByMeter = products.length > 0 && products.every((product) => product.priceUnit === "meter");
  const ranges = soldByMeter ? fabricPrices : apparelPrices;

  return [
    groupOptions("style", typeLabel, products, (product) => [product.style ?? product.category]),
    groupOptions("material", "Fabric", products, (product) => [product.material]),
    groupOptions("color", "Color", products, (product) => [product.color]),
    groupOptions("occasion", "Occasion", products, (product) => product.occasions ?? []),
    {
      title: soldByMeter ? "Price per meter" : "Price",
      options: ranges.map((range, index) => ({
        id: `price:${index}`,
        label: range.label,
        productIds: products
          .filter(({ price }) =>
            price >= ("min" in range ? range.min : 0) &&
            (!("max" in range) || price < range.max),
          )
          .map(({ id }) => id),
      })),
    },
  ]
    .map((group) => ({
      ...group,
      options: group.options.filter(({ productIds }) => productIds.length > 0),
    }))
    .filter(({ options }) => options.length > 0);
}
