import type { ReactNode } from "react";

interface CollectionTitleProps {
  children: ReactNode;
}

export function CollectionTitle({ children }: CollectionTitleProps) {
  return (
    <h3 className="font-heading text-[clamp(1.5rem,8.4cqw,2.25rem)] leading-tight font-semibold text-ivory">
      {children}
    </h3>
  );
}
