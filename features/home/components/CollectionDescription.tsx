import type { ReactNode } from "react";

interface CollectionDescriptionProps {
  children: ReactNode;
}

export function CollectionDescription({ children }: CollectionDescriptionProps) {
  return (
    <p className="font-body text-base leading-relaxed text-ivory/90 lg:text-lg lg:leading-normal">
      {children}
    </p>
  );
}
