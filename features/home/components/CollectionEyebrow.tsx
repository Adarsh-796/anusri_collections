import type { ReactNode } from "react";

interface CollectionEyebrowProps {
  children: ReactNode;
}

export function CollectionEyebrow({ children }: CollectionEyebrowProps) {
  return (
    <p className="font-body text-sm leading-5 tracking-[0.08em] text-gold uppercase">
      {children}
    </p>
  );
}
