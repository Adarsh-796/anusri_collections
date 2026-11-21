import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { NavbarSearch } from "./navbar-search";

const actionClassName =
  "relative inline-flex size-11 items-center justify-center rounded-sm text-foreground hover:text-link focus-visible:outline-2 focus-visible:outline-ring motion-safe:transition-colors";

export function NavbarActions({ cartCount = 3 }: { cartCount?: number }) {
  return (
    <div className="flex items-center justify-end gap-0 lg:gap-3">
      <div className="hidden sm:block">
        <NavbarSearch className={actionClassName} />
      </div>
      <Link href="/wishlist" aria-label="Wishlist" className={actionClassName}>
        <Heart aria-hidden="true" className="size-5" />
      </Link>
      <Link
        href="/cart"
        aria-label={cartCount > 0 ? `Cart, ${cartCount} items` : "Cart"}
        className={actionClassName}
      >
        <ShoppingBag aria-hidden="true" className="size-5" />
        {cartCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute inset-e-2 top-2 grid min-h-4 min-w-4 place-items-center rounded-full bg-burgundy px-0.5 text-[10px] leading-none font-semibold text-white"
          >
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>
    </div>
  );
}
