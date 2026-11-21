import { NavbarActions } from "./navbar-actions";
import { NavbarDrawer } from "./navbar-drawer";
import { NavbarLogo } from "./navbar-logo";
import { NavbarNavigation } from "./navbar-navigation";

export function Navbar() {
  return (
    <header className="sticky top-0 z-4 border-b border-border bg-background font-body">
      <div className="mx-auto flex items-center justify-between gap-x-2 px-gutter lg:gap-x-4 py-4">
        <NavbarLogo />
        <NavbarNavigation />
        <div className="flex shrink-0 items-center gap-1">
          <NavbarActions />
          <NavbarDrawer />
        </div>
      </div>
    </header>
  );
}
