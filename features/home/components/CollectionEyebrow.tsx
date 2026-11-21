import type { ReactNode } from "react";

interface CollectionEyebrowProps {
  children: ReactNode;
}

export function CollectionEyebrow({ children }: CollectionEyebrowProps) {
  return (
    <p className="font-body text-[clamp(0.6875rem,3.5cqw,0.875rem)] leading-normal tracking-[0.08em] text-[#ffd092] uppercase">
      {children}
    </p>
  );
}
