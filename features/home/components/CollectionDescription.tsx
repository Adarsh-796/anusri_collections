import type { ReactNode } from "react";

interface CollectionDescriptionProps {
  children: ReactNode;
}

export function CollectionDescription({ children }: CollectionDescriptionProps) {
  return (
    <p className="max-w-[42ch] font-body text-[clamp(0.875rem,4.2cqw,1.125rem)] leading-normal text-ivory/90">
      {children}
    </p>
  );
}
