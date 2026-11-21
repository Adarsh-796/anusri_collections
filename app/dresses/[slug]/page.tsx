import { notFound } from "next/navigation";
import { ProductDetails } from "@/features/products/components/product-details";
import { dressProducts } from "@/features/products/products";

export function generateStaticParams() {
  return dressProducts.map(({ id }) => ({ slug: id }));
}

export default async function DressPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = dressProducts.find(({ id }) => id === slug);
  if (!product) notFound();

  return <ProductDetails product={product} />;
}
