import { useId, type ReactNode } from "react";
import Image from "next/image";

import { ArrowLink } from "@/components/arrow-link";

const collectionPreviews = {
  sarees: {
    title: "Sarees",
    description: "Timeless weaves for every celebration.",
    href: "/sarees",
    image: "/sarees/saree-1.png",
    objectPosition: "center 25%",
  },
  dresses: {
    title: "Dresses",
    description: "Beautiful styles for every occasion.",
    href: "/dresses",
    image: "/dresses/dress-2.png",
    objectPosition: "center 25%",
  },
  fabrics: {
    title: "Fabrics",
    description: "Beautiful materials for your unique creations.",
    href: "/fabrics",
    image: "/collections/fabrics.png",
    objectPosition: "center 68%",
  },
} as const;

type Collection = keyof typeof collectionPreviews;

const recommendations = {
  sarees: ["dresses", "fabrics"],
  dresses: ["sarees", "fabrics"],
  fabrics: ["sarees", "dresses"],
} as const satisfies Record<Collection, readonly [Collection, Collection]>;

export function DiscoverMoreCollections({
  children: [first, second],
}: {
  children: readonly [ReactNode, ReactNode];
}) {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className="mx-auto mt-10 max-w-4xl rounded-xl bg-surface/60 px-3 py-5 sm:mt-12 sm:px-5"
    >
      <div className="mx-auto mb-3 flex max-w-xl items-center justify-center gap-3 sm:mb-4">
        <span aria-hidden="true" className="hidden h-px max-w-16 flex-1 bg-gold/70 min-[30rem]:block" />
        <h2
          id={titleId}
          className="font-heading text-center text-xl leading-tight font-semibold text-link sm:text-2xl"
        >
          Discover More Collections
        </h2>
        <span aria-hidden="true" className="hidden h-px max-w-16 flex-1 bg-gold/70 min-[30rem]:block" />
      </div>
      <div className="grid grid-cols-1 gap-3 min-[30rem]:grid-cols-2 sm:gap-4">
        {first}
        {second}
      </div>
    </section>
  );
}

export function CollectionPreviewCard({ collection }: { collection: Collection }) {
  const { title, description, href, image, objectPosition } = collectionPreviews[collection];

  return (
    <article className="relative flex min-w-0 overflow-hidden rounded-lg border border-border/75 bg-background/65">
      <div className="relative w-[clamp(4.75rem,17vw,9rem)] shrink-0 self-stretch overflow-hidden bg-muted">
        <Image
          src={image}
          alt=""
          width={192}
          height={192}
          className="absolute inset-0 size-full scale-125 object-cover"
          style={{ objectPosition }}
        />
      </div>
      <div className="flex min-w-0 flex-col items-start gap-1 px-2.5 py-2.5 sm:px-4 sm:py-3">
        <h3 className="font-heading text-base leading-tight font-semibold text-link sm:text-lg">{title}</h3>
        <p className="text-xs leading-snug text-text-secondary sm:text-sm">{description}</p>
        <ArrowLink
          href={href}
          className="mt-auto gap-1 pt-1 text-[0.6875rem] leading-snug after:absolute after:inset-0 focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring sm:gap-1.5 sm:text-sm [&>svg]:size-3 sm:[&>svg]:size-3.5"
        >
          Explore {title}
        </ArrowLink>
      </div>
    </article>
  );
}

export function RelatedCollections({ current }: { current: Collection }) {
  const [first, second] = recommendations[current];

  return (
    <DiscoverMoreCollections>
      <CollectionPreviewCard collection={first} />
      <CollectionPreviewCard collection={second} />
    </DiscoverMoreCollections>
  );
}
