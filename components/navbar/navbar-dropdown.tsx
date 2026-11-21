import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarDropdownProps {
  children: ReactNode;
  activeHref?: string;
  items: ReadonlyArray<{
    href: ComponentProps<typeof Link>["href"];
    label: string;
  }>;
}

export function NavbarDropdown({
  children,
  items,
  activeHref,
}: NavbarDropdownProps) {
  const active = items.some(({ href }) => href === activeHref);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        openOnHover
        delay={80}
        closeDelay={120}
        data-active-section={active ? "" : undefined}
        className={cn(
          "group/nav-menu flex min-h-11 cursor-pointer items-center gap-1 rounded-sm whitespace-nowrap hover:text-link focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring aria-expanded:text-link motion-safe:transition-colors lg:min-h-[76px]",
          active && "text-link",
        )}
      >
        {children}
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 group-hover/nav-menu:rotate-180 group-aria-expanded/nav-menu:rotate-180 motion-safe:transition-transform motion-safe:duration-200"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={0}
        className="w-max min-w-70 max-w-(--available-width) rounded-md bg-surface px-4 py-3 text-text-secondary shadow-product ring-0 motion-reduce:animate-none"
      >
        {items.map(({ href, label }) => (
          <DropdownMenuItem
            key={label}
            nativeButton={false}
            render={
              <Link
                href={href}
                aria-current={href === activeHref ? "page" : undefined}
              />
            }
            className="cursor-pointer px-1 py-1.5 text-base leading-6 text-text-secondary data-highlighted:bg-muted data-highlighted:text-link lg:text-lg"
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
