import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function AnusriBadge({ children }: { children: ReactNode }) {
  return (
    <Badge
      variant={"outline"}
      className="text-gold uppercase tracking-[2px] rounded-none px-2 py-4 flex gap-3 bg-gold/20"
    >
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full bg-gold"
      />
      {children}
    </Badge>
  );
}
