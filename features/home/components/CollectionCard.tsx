import type { ReactNode } from "react";

interface CollectionCardProps {
  children: ReactNode;
}

/* 
        <CollectionCard>
          <CollectionCardImage
            image="/collections/sarees.png"
            sizes="100vw"
          />
          <CollectionCardOverlay />
          <CollectionCardContent>
            <CollectionEyebrow>Traditional Weaves</CollectionEyebrow>
            <CollectionTitle>Sarees</CollectionTitle>
            <CollectionDescription>
              Pure Kanjeevarams, Banarasi, Chanderi &amp; Organza drapings.
            </CollectionDescription>
            <CollectionCardLink href="/sarees">
              Explore Collection
            </CollectionCardLink>
          </CollectionCardContent>
        </CollectionCard> 
*/

export function CollectionCard({ children }: CollectionCardProps) {
  return (
    <article
      data-slot="collection-card"
      className="group/collection relative isolate grid aspect-3/4 w-full items-end overflow-hidden rounded-[10px] bg-espresso text-ivory"
    >
      {children}
    </article>
  );
}
