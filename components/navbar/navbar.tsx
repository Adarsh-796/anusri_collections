import type { ComponentProps } from "react";
import { NavbarActions } from "./navbar-actions";
import { NavbarDrawer } from "./navbar-drawer";
import { NavbarLogo } from "./navbar-logo";
import { NavbarNavigation } from "./navbar-navigation";

interface NavbarProps {
  logoImage?: ComponentProps<typeof NavbarLogo>["image"];
  cartCount?: number;
}

export function Navbar({ logoImage, cartCount }: NavbarProps) {
  return (
    <header className="border-b border-border bg-background font-body">
      <div className="mx-auto flex min-h-[76px] max-w-[101rem] items-center justify-between gap-x-2 px-gutter lg:gap-x-4">
        <NavbarLogo image={logoImage} />
        <NavbarNavigation />
        <div className="flex shrink-0 items-center gap-1">
          <NavbarActions cartCount={cartCount} />
          <NavbarDrawer />
        </div>
      </div>
    </header>
  );
}
