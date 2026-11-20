import type { ComponentProps } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function ArrowLink({
  children,
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "group/arrow-link inline-flex items-center gap-3.5 font-body text-lg leading-6 font-semibold text-link hover:text-gold focus-visible:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-safe:transition-colors",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 shrink-0 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover/arrow-link:translate-x-1 motion-safe:group-focus-visible/arrow-link:translate-x-1"
      />
    </Link>
  );
}
