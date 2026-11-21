"use client";

import { Popover } from "@base-ui/react/popover";
import { Search } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { collectionLinks } from "@/lib/consts";

export function NavbarSearch({ className }: { className: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const searchTerm = query.trim().toLowerCase();
  const matches = collectionLinks.filter(({ label, href }) =>
    label.toLowerCase().includes(searchTerm) || href.slice(1).includes(searchTerm),
  );

  return (
    <Popover.Root onOpenChange={(open) => { if (!open) setQuery(""); }}>
      <Popover.Trigger aria-label="Search collections" className={className}>
        <Search aria-hidden="true" className="size-5" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner align="end" sideOffset={8} className="z-50">
          <Popover.Popup initialFocus={inputRef} className="w-64 max-w-(--available-width) rounded-md border border-border bg-surface p-3 text-sm shadow-product">
            <Popover.Title className="sr-only">Search collections</Popover.Title>
            <input
              ref={inputRef}
              type="search"
              aria-label="Search collections"
              placeholder="Search collections"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-sm border border-border bg-background px-3 py-2 focus-visible:outline-2 focus-visible:outline-ring"
            />
            <ul className="mt-2">
              {matches.map(({ label, href }) => (
                <li key={href}>
                  <Popover.Close nativeButton={false} render={<Link href={href} />} className="block rounded-sm px-3 py-2 hover:bg-muted hover:text-link focus-visible:outline-2 focus-visible:outline-ring">
                    {label}
                  </Popover.Close>
                </li>
              ))}
            </ul>
            {matches.length === 0 && <p role="status" className="px-3 py-2">No collections found.</p>}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
