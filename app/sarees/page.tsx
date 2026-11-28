import { CollectionCatalog } from "@/features/products/components/collection-catalog";

export default function SareesPage({ searchParams }: PageProps<"/sarees">) {
  return <CollectionCatalog collection="sarees" title="Sarees" searchParams={searchParams} />;
}
