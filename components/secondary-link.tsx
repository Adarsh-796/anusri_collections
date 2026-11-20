import type { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";

export function SecondaryLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      data-slot="button"
      className={cn(
        buttonVariants({ variant: "secondary" }),
        "rounded-none text-button-secondary-foreground border-button-secondary-foreground/70",
        className,
      )}
    >
      {children}
    </Link>
  );
}
