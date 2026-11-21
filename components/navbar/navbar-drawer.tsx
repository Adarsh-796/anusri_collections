"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { navbarItems } from "./navbar-items";

const iconButton =
  "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-sm text-foreground hover:text-link focus-visible:outline-2 focus-visible:outline-ring";
const linkStyle =
  "flex min-h-11 items-center rounded-sm px-3 hover:bg-muted hover:text-link aria-[current=page]:font-semibold aria-[current=page]:text-link focus-visible:outline-2 focus-visible:outline-ring";

export function NavbarDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function renderLink({ href, label }: { href: string; label: string }) {
    return (
      <Link
        href={href}
        aria-current={pathname === href ? "page" : undefined}
        className={linkStyle}
        onNavigate={() => setOpen(false)}
      >
        {label}
      </Link>
    );
  }

  return (
    <Drawer swipeDirection="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        aria-label="Open navigation menu"
        className={iconButton + " min-[1200px]:hidden"}
      >
        <Menu aria-hidden="true" className="size-6" />
      </DrawerTrigger>
      <DrawerContent className="bg-background font-body motion-reduce:transition-none">
        <DrawerHeader className="flex-row items-center justify-between gap-3 border-b border-border p-4">
          <DrawerTitle className="text-xl">Menu</DrawerTitle>
          <DrawerClose
            aria-label="Close navigation menu"
            className={iconButton}
          >
            <X aria-hidden="true" className="size-6" />
          </DrawerClose>
        </DrawerHeader>
        <nav
          aria-label="Mobile navigation"
          className="min-h-0 flex-1 overflow-y-auto p-4 text-base"
        >
          {navbarItems.map((item) =>
            "items" in item ? (
              <details key={item.label} className="group">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-2 rounded-sm px-3 hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-4 shrink-0 group-open:rotate-180 motion-safe:transition-transform"
                  />
                </summary>
                <ul className="ps-3 text-sm text-text-secondary">
                  {item.items.map(({ href, label }) => (
                    <li key={href}>{renderLink({ href, label })}</li>
                  ))}
                </ul>
              </details>
            ) : (
              <div key={item.href}>{renderLink(item)}</div>
            ),
          )}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
