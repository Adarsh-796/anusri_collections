import type { ReactNode } from "react";

interface CollectionTitleProps {
  children: ReactNode;
}

export function CollectionTitle({ children }: CollectionTitleProps) {
  return (
    <h3 className="font-heading text-3xl leading-tight font-semibold text-ivory sm:text-4xl">
      {children}
    </h3>
  );
}
