"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navbarItems } from "@/lib/consts";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { getNavbarLinkCurrent } from "./navbar-link";

const iconButton =
  "inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-sm text-foreground hover:text-link focus-visible:outline-2 focus-visible:outline-ring";
const linkStyle =
  "flex min-h-11 items-center rounded-sm px-3 aria-[current]:bg-link aria-[current]:font-semibold aria-[current]:text-background focus-visible:outline-2 focus-visible:outline-ring";

export function NavbarDrawer() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
          {navbarItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={getNavbarLinkCurrent(pathname, href)}
              className={linkStyle}
              onNavigate={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
