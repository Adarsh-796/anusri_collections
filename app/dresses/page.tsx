import { CollectionCatalog } from "@/features/products/components/collection-catalog";

export default function DressesPage({ searchParams }: PageProps<"/dresses">) {
  return <CollectionCatalog collection="dresses" title="Dresses" searchParams={searchParams} />;
}
