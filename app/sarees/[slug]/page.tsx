import { notFound } from "next/navigation";
import { ProductDetails } from "@/features/products/components/product-details";
import { boutiqueProducts } from "@/features/products/products";

export function generateStaticParams() {
  return boutiqueProducts.map(({ id }) => ({ slug: id }));
}

export default async function SareePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = boutiqueProducts.find(({ id }) => id === slug);
  if (!product) notFound();

  return <ProductDetails product={product} />;
}
