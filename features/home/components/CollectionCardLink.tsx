import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CollectionCardLinkProps {
  href: ComponentProps<typeof Link>["href"];
  children: ReactNode;
}

export function CollectionCardLink({
  href,
  children,
}: CollectionCardLinkProps) {
  return (
    <Link
      href={href}
      className="group/cta mt-1 inline-flex items-center gap-3 rounded-sm font-body text-sm leading-5 tracking-wide text-gold uppercase transition-colors group-hover/collection:text-ivory hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold in-data-[slot=collection-card]:after:absolute in-data-[slot=collection-card]:after:inset-0 in-data-[slot=collection-card]:after:z-10"
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover/collection:translate-x-1 motion-safe:group-hover/cta:translate-x-1 motion-safe:group-focus-visible/cta:translate-x-1"
      />
    </Link>
  );
}
