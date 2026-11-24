import type { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function getNavbarLinkCurrent(pathname: string, href: string) {
  if (pathname === href) return "page";
  if (href !== "/" && pathname.startsWith(`${href}/`)) return "location";
}

export function NavbarLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "flex min-h-11 text-[1rem] items-center whitespace-nowrap hover:text-link aria-[current=page]:text-link aria-[current=location]:text-link focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring motion-safe:transition-colors",
        className,
      )}
    >
      {children}
    </Link>
  );
}
