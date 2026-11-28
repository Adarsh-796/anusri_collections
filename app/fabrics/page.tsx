import { CollectionCatalog } from "@/features/products/components/collection-catalog";

export default function FabricsPage({ searchParams }: PageProps<"/fabrics">) {
  return <CollectionCatalog collection="fabrics" title="Fabrics" searchParams={searchParams} />;
}
