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
        "group/collection @container relative isolate flex aspect-square min-w-0 flex-col justify-end overflow-hidden rounded-lg bg-espresso text-ivory sm:aspect-4/5 lg:aspect-3/4",
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
    <h3 className="font-heading text-[clamp(1.5rem,8.4cqw,2.25rem)] leading-tight font-semibold text-ivory">
      {children}
    </h3>
  );
}

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

interface CollectionCardImageProps {
  image: ImageProps["src"];
  alt?: string;
  sizes: string;
  objectPosition?: string;
}

function CollectionCardImage({
  image,
  alt = "",
  sizes,
  objectPosition = "center",
}: CollectionCardImageProps) {
  return (
    <Image
      src={image}
      alt={alt}
      fill
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
      className="group/cta mt-1 inline-flex items-center gap-2 rounded-sm font-body text-[clamp(0.6875rem,3.4cqw,0.875rem)] leading-normal tracking-wide text-[#e6b578] uppercase transition-colors group-hover/collection:text-ivory hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold in-data-[slot=collection-card]:after:absolute in-data-[slot=collection-card]:after:inset-0 in-data-[slot=collection-card]:after:z-10"
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
    <p className="max-w-[42ch] font-body text-[clamp(0.875rem,4.2cqw,1.125rem)] leading-normal text-ivory/90">
      {children}
    </p>
  );
}

interface CollectionEyebrowProps {
  children: ReactNode;
}

export function CollectionEyebrow({ children }: CollectionEyebrowProps) {
  return (
    <p className="font-body text-[clamp(0.6875rem,3.5cqw,0.875rem)] leading-normal tracking-[0.08em] text-[#ffd092] uppercase">
      {children}
    </p>
  );
}

export const CollectionCard = Object.assign(CollectionCardRoot, {
  Root: CollectionCardRoot,
  Image: CollectionCardImage,
  Overlay: CollectionCardOverlay,
  Content: CollectionCardContent,
  Eyebrow: CollectionEyebrow,
  Title: CollectionTitle,
  Description: CollectionDescription,
  Link: CollectionCardLink,
});
