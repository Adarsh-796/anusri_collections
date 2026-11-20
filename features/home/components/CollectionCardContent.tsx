import type { ReactNode } from "react";

interface CollectionCardContentProps {
  children: ReactNode;
}

export function CollectionCardContent({
  children,
}: CollectionCardContentProps) {
  return (
    <div className="flex min-w-0 flex-col items-start gap-2 p-5 sm:p-7.5">
      {children}
    </div>
  );
}
