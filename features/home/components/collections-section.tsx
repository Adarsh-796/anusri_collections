import { CollectionCard } from "./CollectionCard";
import { CollectionCardContent } from "./CollectionCardContent";
import { CollectionCardImage } from "./CollectionCardImage";
import { CollectionCardLink } from "./CollectionCardLink";
import { CollectionCardOverlay } from "./CollectionCardOverlay";
import { CollectionDescription } from "./CollectionDescription";
import { CollectionEyebrow } from "./CollectionEyebrow";
import { CollectionTitle } from "./CollectionTitle";

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
    description: "Raw silks, brocades, organza, and handloom textiles by the meter.",
    image: "/collections/fabrics.png",
    href: "/fabrics",
  },
];

const imageSizes =
  "(width < 30rem) calc(100vw - 2rem), (width < 40rem) 28rem, (width < 64rem) 46vw, (width < 87.5rem) 30vw, 418px";
const featuredImageSizes =
  "(width < 30rem) calc(100vw - 2rem), (width < 40rem) 28rem, (width < 64rem) 93vw, (width < 87.5rem) 30vw, 418px";

export function CollectionsSection() {
  return (
    <section
      aria-labelledby="home-collections-title"
      className="bg-[#fcf6f4] px-[clamp(1rem,3.6vw,3rem)] py-9 text-espresso sm:py-12 lg:py-section"
    >
      <header className="mx-auto mb-[clamp(1.5rem,3.4vw,3rem)] max-w-2xl text-center">
        <p className="mb-1.5 text-[clamp(0.6875rem,1vw,0.75rem)] font-medium tracking-[0.24em] text-[#8a6236] uppercase">
          Curated Selections
        </p>
        <h2
          id="home-collections-title"
          className="font-heading text-[clamp(1.75rem,3.2vw,2.75rem)] leading-tight font-semibold after:mx-auto after:mt-1 after:block after:h-px after:w-11 after:bg-gold"
        >
          Explore Our Collections
        </h2>
        <p className="mx-auto mt-2 max-w-[50ch] text-[clamp(0.875rem,1.3vw,1rem)] leading-relaxed text-[#6d5b55]">
          Discover pieces that bring together tradition, elegance, and timeless
          beauty.
        </p>
      </header>

      <div className="mx-auto grid w-full max-w-md grid-cols-1 gap-[clamp(1rem,1.85vw,1.875rem)] sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection, index) => {
          const { title, eyebrow, description, image, objectPosition, href } =
            collection;
          const featured = index === 0;

          return (
            <CollectionCard
              key={href}
              className={
                featured ? "sm:max-lg:col-span-2 sm:max-lg:aspect-2/1" : undefined
              }
            >
              <CollectionCardImage
                image={image}
                objectPosition={objectPosition}
                sizes={featured ? featuredImageSizes : imageSizes}
              />
              <CollectionCardOverlay />
              <CollectionCardContent>
                <CollectionEyebrow>{eyebrow}</CollectionEyebrow>
                <CollectionTitle>{title}</CollectionTitle>
                <CollectionDescription>{description}</CollectionDescription>
                <CollectionCardLink href={href}>
                  Explore Collection<span className="sr-only"> for {title}</span>
                </CollectionCardLink>
              </CollectionCardContent>
            </CollectionCard>
          );
        })}
      </div>
    </section>
  );
}
