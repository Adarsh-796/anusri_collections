import type { BoutiqueProduct } from "./components/boutique-product-grid";
import type { ProductCollection } from "./products";

const colors = {
  Burgundy: "#701b34",
  Blush: "#c68287",
  Emerald: "#255e46",
  Gold: "#bc8c40",
  Ivory: "#f1e4cc",
  "Royal Blue": "#293e83",
  Plum: "#633447",
};

export type CatalogProduct = Omit<BoutiqueProduct, "price"> & {
  price: number;
  style?: string;
  material: string;
  color: keyof typeof colors;
  occasions?: readonly string[];
};

interface FilterOption {
  id: string;
  label: string;
  swatch?: string;
}

export interface CatalogFilterGroup {
  title: string;
  options: readonly FilterOption[];
}

function styles(title: string, labels: string[]): CatalogFilterGroup {
  return { title, options: labels.map(label => ({ id: "style:" + label, label })) };
}

function colorOptions(labels: (keyof typeof colors)[]): CatalogFilterGroup {
  return {
    title: "Color",
    options: labels.map(label => ({ id: "color:" + label, label, swatch: colors[label] })),
  };
}

const midrange = { id: "price:2", label: "₹10,000 to under ₹20,000" };

export const catalogFilters = {
  sarees: [
    styles("Saree Type", ["Silk Sarees", "Festive Sarees", "Handloom Sarees"]),
    colorOptions(["Burgundy", "Blush", "Emerald", "Gold"]),
    { title: "Price", options: [midrange, { id: "price:3", label: "₹20,000 and above" }] },
  ],
  dresses: [
    styles("Dress Type", ["Couture Anarkali", "Festive Gown", "Sharara Set", "Cape Ensemble"]),
    colorOptions(["Burgundy", "Ivory", "Blush", "Royal Blue"]),
    { title: "Price", options: [midrange] },
  ],
  fabrics: [
    styles("Textile Type", ["Pure Brocade Silk", "Raw Silk", "Organza Silk", "Hand Embroidered Net"]),
    colorOptions(["Burgundy", "Gold", "Ivory", "Plum"]),
    {
      title: "Price per meter",
      options: [
        { id: "price:0", label: "Under ₹1,500" },
        { id: "price:1", label: "₹1,500 to under ₹2,000" },
        { id: "price:2", label: "₹2,000 and above" },
      ],
    },
  ],
} satisfies Record<ProductCollection, CatalogFilterGroup[]>;
