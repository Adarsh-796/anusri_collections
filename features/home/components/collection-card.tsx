import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

interface CollectionCardProps {
  children: ReactNode;
  className?: string;
}

function CollectionCardRoot({ children, className }: CollectionCardProps) {
  return (
    <article
      data-slot="collection-card"
      className={cn(
        "group/collection @container relative isolate flex min-w-0 flex-col justify-end overflow-hidden bg-espresso text-ivory sm:aspect-4/5 aspect-3/4",
        className,
      )}
    >
      {children}
    </article>
  );
}

interface CollectionTitleProps {
  children: ReactNode;
}

function CollectionTitle({ children }: CollectionTitleProps) {
  return (
    <h3 className="font-heading text-2xl @xs:text-3xl @md:text-4xl leading-tight font-semibold text-ivory">
      {children}
    </h3>
  );
}

interface CollectionCardContentProps {
  children: ReactNode;
}

function CollectionCardContent({ children }: CollectionCardContentProps) {
  return (
    <div className="flex min-w-0 flex-col items-start gap-1 p-4 @xs:gap-2 @xs:p-5 @md:p-7">
      {children}
    </div>
  );
}

interface CollectionCardImageProps {
  image: ImageProps["src"];
  alt?: string;
  sizes?: string;
  objectPosition?: string;
}

function CollectionCardImage({
  image,
  alt = "",
  sizes = "auto",
  objectPosition = "center",
}: CollectionCardImageProps) {
  return (
    <Image
      src={image}
      alt={alt}
      fill
      loading="lazy"
      sizes={sizes}
      style={{ objectPosition }}
      className="-z-20 object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/collection:scale-105"
    />
  );
}

interface CollectionCardLinkProps {
  href: ComponentProps<typeof Link>["href"];
  children: ReactNode;
}

function CollectionCardLink({ href, children }: CollectionCardLinkProps) {
  return (
    <Link
      href={href}
      className="group/cta mt-1 inline-flex font-medium items-center gap-2 rounded-sm font-body text-sm @md:text-md leading-normal tracking-wide text-[#ffffff] uppercase transition-colors group-hover/collection:text-ivory hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold in-data-[slot=collection-card]:after:absolute in-data-[slot=collection-card]:after:inset-0 in-data-[slot=collection-card]:after:z-10"
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-[1em] shrink-0 motion-safe:transition-transform motion-safe:group-hover/collection:translate-x-1 motion-safe:group-hover/cta:translate-x-1 motion-safe:group-focus-visible/cta:translate-x-1"
      />
    </Link>
  );
}

function CollectionCardOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-espresso/95 via-espresso/40 to-transparent"
    />
  );
}

interface CollectionDescriptionProps {
  children: ReactNode;
}

export function CollectionDescription({
  children,
}: CollectionDescriptionProps) {
  return (
    <p className="max-w-sm font-body text-sm @xs:text-base @md:text-lg leading-normal text-ivory/90">
      {children}
    </p>
  );
}

interface CollectionEyebrowProps {
  children: ReactNode;
}

export function CollectionEyebrow({ children }: CollectionEyebrowProps) {
  return (
    <p className="font-body text-xs @md:text-sm leading-normal tracking-wider text-[#ffd092] uppercase">
      {children}
    </p>
  );
}

export {
  CollectionCardRoot as Root,
  CollectionCardImage as Image,
  CollectionCardOverlay as Overlay,
  CollectionCardContent as Content,
  CollectionEyebrow as Eyebrow,
  CollectionTitle as Title,
  CollectionDescription as Description,
  CollectionCardLink as Link,
};
