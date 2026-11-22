import { CartItems } from "@/features/products/components/cart-items";
import { boutiqueProducts, dressProducts, fabricProducts } from "@/features/products/products";

const cartProducts = [...boutiqueProducts, ...dressProducts, ...fabricProducts].map(
  (product) => ({
    id: product.id,
    title: product.title,
    href: product.href,
    price: product.price,
    priceUnit: "priceUnit" in product ? product.priceUnit : undefined,
  }),
);

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-gutter py-section">
      <h1>Cart</h1>
      <CartItems products={cartProducts} />
    </main>
  );
}
