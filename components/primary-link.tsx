import type { ComponentProps } from "react";
import Link from "next/link";
import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";

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
        "rounded-none hover:bg-primary-hover",
        className,
      )}
    >
      {children}
    </Link>
  );
}
