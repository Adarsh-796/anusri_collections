import type { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button-variants";

export function PrimaryLink({
  className,
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      data-slot="button"
      className={cn(
        buttonVariants(),
        "rounded-none hover:bg-primary-hover px-6 py-5 min-h-11",
        className,
      )}
    >
      {children}
    </Link>
  );
}
