import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function ProductGrid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4", className)}
    />
  );
}
