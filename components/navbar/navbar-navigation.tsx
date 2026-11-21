"use client";

import { usePathname } from "next/navigation";
import { NavbarDropdown } from "./navbar-dropdown";
import { navbarItems } from "./navbar-items";
import { NavbarLink } from "./navbar-link";

export function NavbarNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center justify-center gap-x-6 text-[15px] font-medium text-text-secondary min-[1200px]:flex"
    >
      {navbarItems.map((item) =>
        "items" in item ? (
          <NavbarDropdown key={item.label} items={item.items}>
            {item.label}
          </NavbarDropdown>
        ) : (
          <NavbarLink
            key={item.href}
            href={item.href}
            active={pathname === item.href}
          >
            {item.label}
          </NavbarLink>
        ),
      )}
    </nav>
  );
}
