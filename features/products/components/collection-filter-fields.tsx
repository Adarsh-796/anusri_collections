import { catalogFilters } from "../catalog-filters";
import type { ProductCollection } from "../products";
import { CatalogFilterMenu } from "./catalog-filter-menu";

export function CollectionFilterFields({
  collection,
}: {
  collection: ProductCollection;
}) {
  return <CatalogFilterMenu.Fields groups={catalogFilters[collection]} />;
}
