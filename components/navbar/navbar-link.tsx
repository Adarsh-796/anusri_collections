import type { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NavbarLinkProps = ComponentProps<typeof Link> & { active?: boolean };

export function NavbarLink({
  active,
  className,
  children,
  ...props
}: NavbarLinkProps) {
  return (
    <Link
      {...props}
      aria-current={active ? "page" : props["aria-current"]}
      className={cn(
        "flex min-h-11 items-center whitespace-nowrap hover:text-link focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring motion-safe:transition-colors",
        active && "text-link",
        className,
      )}
    >
      {children}
    </Link>
  );
}
