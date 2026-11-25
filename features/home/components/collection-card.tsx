import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CollectionCardProps {
  children: ReactNode;
  className?: string;
}

export function CollectionCard({ children, className }: CollectionCardProps) {
  return (
    <article
      data-slot="collection-card"
      className={cn(
        "group/collection @container relative isolate flex aspect-square min-w-0 flex-col justify-end overflow-hidden rounded-lg bg-espresso text-ivory sm:aspect-4/5 lg:aspect-3/4",
        className,
      )}
    >
      {children}
    </article>
  );
}
