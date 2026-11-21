"use client";

import { usePathname } from "next/navigation";
import { navbarItems } from "@/lib/consts";
import { getNavbarLinkCurrent, NavbarLink } from "./navbar-link";
import { NavbarLinkGroup } from "./navbar-link-group";

export function NavbarNavigation() {
  const pathname = usePathname();
  return (
    <NavbarLinkGroup
      pathname={pathname}
      aria-label="Main navigation"
      className="hidden items-center justify-center gap-x-6 self-stretch font-medium text-text-secondary min-[1200px]:flex"
    >
      {navbarItems.map(({ href, label }) => (
        <NavbarLink
          key={href}
          href={href}
          aria-current={getNavbarLinkCurrent(pathname, href)}
        >
          {label}
        </NavbarLink>
      ))}
    </NavbarLinkGroup>
  );
}
