import { WishlistItems } from "@/features/products/components/wishlist-items";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-gutter py-section">
      <h1>Wishlist</h1>
      <WishlistItems />
    </main>
  );
}
