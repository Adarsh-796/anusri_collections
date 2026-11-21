"use client";

import { usePathname } from "next/navigation";
import { navbarItems } from "@/lib/consts";
import { NavbarLink } from "./navbar-link";
import { NavbarLinkGroup } from "./navbar-link-group";

export function NavbarNavigation() {
  const pathname = usePathname();
  return (
    <NavbarLinkGroup
      pathname={pathname}
      aria-label="Main navigation"
      className="hidden items-center justify-center gap-x-6 self-stretch font-medium text-text-secondary min-[1200px]:flex"
    >
      {navbarItems.map(({ href, label }) => {
        const inServices =
          href === "/services" && pathname.startsWith("/services/");

        return (
          <NavbarLink
            key={href}
            href={href}
            active={pathname === href || inServices}
            aria-current={inServices ? "location" : undefined}
          >
            {label}
          </NavbarLink>
        );
      })}
    </NavbarLinkGroup>
  );
}
