import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServiceGrid({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "grid grid-cols-1 gap-7 sm:grid-cols-4 lg:grid-cols-3",
        "sm:max-lg:*:col-span-2 sm:max-lg:[&>:last-child:nth-child(odd)]:col-start-2",
        className,
      )}
    />
  );
}

export function ServiceCard({
  className,
  ...props
}: ComponentProps<"article">) {
  return (
    <article
      {...props}
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg bg-surface font-body text-card-foreground shadow-product has-[[data-slot=service-action]:hover]:shadow-lg motion-safe:transition-shadow motion-safe:duration-200",
        className,
      )}
    />
  );
}

type ServiceCardImageProps = Omit<
  ComponentProps<typeof Image>,
  "fill" | "width" | "height"
>;

export function ServiceCardImage({
  alt,
  className,
  ...props
}: ServiceCardImageProps) {
  return (
    <div className="relative aspect-8/5 overflow-hidden bg-muted">
      <Image
        {...props}
        alt={alt}
        fill
        className={cn(
          "object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-105",
          className,
        )}
      />
    </div>
  );
}

export function ServiceCardContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn("flex flex-1 flex-col gap-3 p-5 sm:p-7.5", className)}
    />
  );
}

export function ServiceCardIcon({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      {...props}
      aria-hidden="true"
      className={cn(
        "mb-1 grid size-12 shrink-0 place-items-center rounded-xl bg-muted text-gold [&>svg]:size-6",
        className,
      )}
    />
  );
}

export function ServiceCardTitle({
  as: Heading = "h3",
  className,
  ...props
}: ComponentProps<"h3"> & { as?: "h2" | "h3" }) {
  return (
    <Heading
      {...props}
      className={cn(
        "font-heading text-2xl leading-tight font-semibold sm:text-[28px]",
        className,
      )}
    />
  );
}

export function ServiceCardDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      {...props}
      className={cn(
        "text-base leading-normal text-text-secondary sm:text-lg",
        className,
      )}
    />
  );
}

export function ServiceCardAction({
  children,
  className,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      data-slot="service-action"
      className={cn(
        "mt-auto flex min-h-12 w-full items-center justify-between gap-4 rounded-button bg-button-secondary-hover px-5 py-2.5 text-lg font-semibold text-button-secondary-foreground hover:bg-burgundy hover:text-white focus-visible:bg-burgundy focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-safe:transition-colors motion-safe:duration-200",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="size-5 shrink-0" />
    </Link>
  );
}
