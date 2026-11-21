import { notFound } from "next/navigation";
import { ProductDetails } from "@/features/products/components/product-details";
import { fabricProducts } from "@/features/products/products";

export function generateStaticParams() {
  return fabricProducts.map(({ id }) => ({ slug: id }));
}

export default async function FabricPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = fabricProducts.find(({ id }) => id === slug);
  if (!product) notFound();

  return <ProductDetails product={product} />;
}
