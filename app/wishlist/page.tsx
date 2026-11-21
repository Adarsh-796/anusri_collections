import { WishlistItems } from "@/features/products/components/wishlist-items";
import { boutiqueProducts, dressProducts } from "@/features/products/products";

const wishlistProducts = [...boutiqueProducts, ...dressProducts].map(
  ({ id, title, href }) => ({ id, title, href }),
);

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-gutter py-section">
      <h1>Wishlist</h1>
      <WishlistItems products={wishlistProducts} />
    </main>
  );
}
