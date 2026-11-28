import { ReactNode } from "react";
import * as CollectionCard from "./collection-card";
const collections = [
  {
    title: "Sarees",
    eyebrow: "Traditional Weaves",
    description: "Pure Kanjeevarams, Banarasi, Chanderi & Organza drapings.",
    image: "/collections/sarees.png",
    objectPosition: "center 82%",
    href: "/sarees",
  },
  {
    title: "Dresses",
    eyebrow: "Modern Silhouettes",
    description:
      "Contemporary ethnic gowns, anarkalis, festive lehengas, and designer co-ords.",
    image: "/collections/dresses.png",
    href: "/dresses",
  },
  {
    title: "Fabrics",
    eyebrow: "Textile Atelier",
    description:
      "Raw silks, brocades, organza, and handloom textiles by the meter.",
    image: "/collections/fabrics.png",
    href: "/fabrics",
  },
];

export default function CollectionsGrid() {
  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-4 md:gap-5 xl:gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {collections.map((collection, index) => {
        const { title, eyebrow, description, image, objectPosition, href } =
          collection;

        return (
          <CollectionCard.Root key={href}>
            <CollectionCard.Image
              image={image}
              objectPosition={objectPosition}
            />
            <CollectionCard.Overlay />
            <CollectionCard.Content>
              <CollectionCard.Eyebrow>{eyebrow}</CollectionCard.Eyebrow>
              <CollectionCard.Title>{title}</CollectionCard.Title>
              <CollectionCard.Description>
                {description}
              </CollectionCard.Description>
              <CollectionCard.Link href={href}>
                Explore Collection
                <span className="sr-only"> for {title}</span>
              </CollectionCard.Link>
            </CollectionCard.Content>
          </CollectionCard.Root>
        );
      })}
    </div>
  );
}
