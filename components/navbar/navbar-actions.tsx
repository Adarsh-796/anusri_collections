"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShoppingBag } from "lucide-react";
import { NavbarLinkGroup } from "./navbar-link-group";

const actionClassName =
  "relative inline-flex size-11 items-center justify-center rounded-sm text-foreground hover:text-link aria-[current=page]:text-link focus-visible:outline-2 focus-visible:outline-ring motion-safe:transition-colors";

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <span
      aria-hidden="true"
      className="absolute inset-e-2 top-2 grid min-h-4 min-w-4 place-items-center rounded-full bg-burgundy px-0.5 text-[10px] leading-none font-semibold text-white"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function NavbarActions() {
  const pathname = usePathname();
  const shoppingCount = 4;
  const likeCount = 0;
  return (
    <NavbarLinkGroup
      pathname={pathname}
      aria-label="Shopping navigation"
      className="flex items-center justify-end lg:gap-3"
    >
      <Link
        href="/wishlist"
        aria-label={likeCount > 0 ? `Wishlist, ${likeCount} saved` : "Wishlist"}
        aria-current={pathname === "/wishlist" ? "page" : undefined}
        className={actionClassName}
      >
        <Heart aria-hidden="true" className="size-6" />
        <CountBadge count={likeCount} />
      </Link>
      <Link
        href="/cart"
        aria-label={
          shoppingCount > 0 ? `Cart, ${shoppingCount} in cart` : "Cart"
        }
        aria-current={pathname === "/cart" ? "page" : undefined}
        className={actionClassName}
      >
        <ShoppingBag aria-hidden="true" className="size-6" />
        <CountBadge count={shoppingCount} />
      </Link>
    </NavbarLinkGroup>
  );
}
