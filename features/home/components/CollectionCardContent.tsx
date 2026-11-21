import type { ReactNode } from "react";

interface CollectionCardContentProps {
  children: ReactNode;
}

export function CollectionCardContent({
  children,
}: CollectionCardContentProps) {
  return (
    <div className="flex min-w-0 flex-col items-start gap-[clamp(0.25rem,1.6cqw,0.5rem)] p-[clamp(1rem,6cqw,1.875rem)]">
      {children}
    </div>
  );
}
