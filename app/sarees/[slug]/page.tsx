import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCardPrice } from "@/features/products/components/product-card";
import { ProductCardWishlist } from "@/features/products/components/product-card-wishlist";
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

  return (
    <main className="mx-auto grid max-w-5xl gap-8 px-gutter py-section md:grid-cols-2">
      <div className="relative aspect-3/4 overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.title}
          fill
          loading="eager"
          sizes="(min-width: 64rem) 28rem, (min-width: 48rem) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div>
        <p className="mb-2 text-text-secondary">{product.category}</p>
        <h1>{product.title}</h1>
        <div className="mt-4 flex items-center gap-4">
          <ProductCardPrice>{product.price}</ProductCardPrice>
          <ProductCardWishlist
            productId={product.id}
            aria-label={`Wishlist: ${product.title}`}
          />
        </div>
      </div>
    </main>
  );
}
