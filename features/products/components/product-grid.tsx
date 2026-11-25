import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function ProductGrid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4 xl:gap-7", className)}
    />
  );
}
