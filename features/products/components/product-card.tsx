import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { Scissors } from "lucide-react";

import { cn } from "@/lib/utils";

export function ProductCard({
  className,
  ...props
}: ComponentProps<"article">) {
  return (
    <article
      {...props}
      className={cn(
        "group/product flex h-full flex-col overflow-hidden rounded-lg bg-surface font-body text-card-foreground shadow-product",
        className,
      )}
    />
  );
}

export function ProductCardMedia({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "relative isolate aspect-3/4 overflow-hidden bg-muted",
        className,
      )}
    />
  );
}

type ProductCardImageProps = Omit<
  ComponentProps<typeof Image>,
  "fill" | "width" | "height"
>;

export function ProductCardImage({
  alt,
  className,
  ...props
}: ProductCardImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      fill
      className={cn("object-cover", className)}
    />
  );
}

const badgeColors = {
  new: "bg-burgundy",
  heirloom: "bg-gold",
  bridal: "bg-burgundy",
  festive: "bg-ivory text-espresso",
  trending: "bg-burgundy",
};

type ProductCardBadgeProps = ComponentProps<"span"> & {
  variant?: keyof typeof badgeColors;
};

export function ProductCardBadge({
  children,
  className,
  variant = "new",
  ...props
}: ProductCardBadgeProps) {
  if (children == null || children === false || children === "") return null;

  return (
    <span
      {...props}
      className={cn(
        "absolute inset-s-4 top-4 rounded-button px-3 py-1.5 text-sm leading-tight font-semibold tracking-wide text-white uppercase shadow-product",
        badgeColors[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function ProductCardAction({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "absolute inset-x-2.5 bottom-2.5 flex min-h-button items-center justify-center bg-surface px-4 py-2 text-center text-sm tracking-wide text-card-foreground uppercase",
        "hover:bg-burgundy hover:text-white focus-visible:bg-burgundy focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        "motion-safe:transition-[opacity,translate,background-color,color] motion-safe:duration-200",
        "[@media(hover:hover)_and_(pointer:fine)]:group-not-[&:hover]/product:not-focus-visible:pointer-events-none",
        "[@media(hover:hover)_and_(pointer:fine)]:group-not-[&:hover]/product:not-focus-visible:opacity-0",
        "motion-safe:[@media(hover:hover)_and_(pointer:fine)]:group-not-[&:hover]/product:not-focus-visible:translate-y-2",
        className,
      )}
    />
  );
}

export function ProductCardFabricLink({
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        "-me-2 grid size-11 shrink-0 place-items-center rounded-full text-[#8a6236] hover:text-primary focus-visible:outline-2 focus-visible:outline-ring after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring dark:text-gold",
        className,
      )}
    >
      <Scissors aria-hidden="true" className="size-4" />
    </Link>
  );
}

export function ProductCardContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("flex flex-1 flex-col gap-2 px-5 pt-6 pb-3.5", className)}
    />
  );
}

export function ProductCardCategory({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn(
        "text-body-sm tracking-wide text-text-secondary uppercase",
        className,
      )}
    />
  );
}

export function ProductCardTitle({
  className,
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      className={cn(
        "font-body text-xl leading-7 font-semibold wrap-break-word",
        className,
      )}
    />
  );
}

export function ProductCardFooter({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "mt-auto flex items-center justify-between gap-2 pt-1",
        className,
      )}
    />
  );
}

const rupees = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

type ProductCardPriceProps = Omit<ComponentProps<"p">, "children"> & {
  children: number | string;
  unit?: string;
};

export function ProductCardPrice({
  className,
  children,
  unit,
  ...props
}: ProductCardPriceProps) {
  return (
    <p
      {...props}
      className={cn(
        "text-2xl leading-tight font-semibold text-primary tabular-nums",
        className,
      )}
    >
      {typeof children === "number" ? rupees.format(children) : children}
      {unit ? (
        <span className="ms-1 text-[0.65em] font-normal text-text-secondary">
          <span aria-hidden="true">/ </span>
          <span className="sr-only">per </span>
          {unit}
        </span>
      ) : null}
    </p>
  );
}
