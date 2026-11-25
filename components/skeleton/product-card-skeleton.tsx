import type { BoutiqueCardVariant } from "@/features/products/components/boutique-product-card";
import {
  ProductCard,
  ProductCardContent,
  ProductCardMedia,
} from "@/features/products/components/product-card";
import { ProductGrid } from "@/features/products/components/product-grid";

interface ProductCardSkeletonProps {
  variant?: BoutiqueCardVariant;
  mediaClassName?: string;
}

export function ProductCardSkeleton({
  variant = "standard",
  mediaClassName,
}: ProductCardSkeletonProps) {
  return (
    <ProductCard aria-hidden="true" className="min-w-0 motion-safe:animate-pulse">
      <ProductCardMedia
        className={mediaClassName ?? (variant === "fabric" ? "aspect-square" : undefined)}
      />
      <ProductCardContent>
        <div className="h-3 w-1/3 bg-muted" />
        <div className="h-5 w-4/5 bg-muted" />
        <div className="mt-auto h-5 w-1/4 bg-muted" />
        <div className="h-button w-full bg-muted" />
      </ProductCardContent>
    </ProductCard>
  );
}

interface ProductGridSkeletonProps extends ProductCardSkeletonProps {
  count?: number;
}

export function ProductGridSkeleton({ count = 4, ...cardProps }: ProductGridSkeletonProps) {
  return (
    <>
      <span className="sr-only" role="status">Loading products…</span>
      <ProductGrid>
        {Array.from({ length: count }, (_, index) => (
          <ProductCardSkeleton key={index} {...cardProps} />
        ))}
      </ProductGrid>
    </>
  );
}
