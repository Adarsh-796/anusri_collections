// features/products/components/product-showcase.tsx
import type { ComponentProps, ReactNode } from "react";
import { ArrowLink } from "@/components/arrow-link";
import SectionEyebrow from "@/features/home/components/section-eyebrow";
import { cn } from "@/lib/utils";

const headingIdFor = (id: string) => `${id}-title`;

function Root({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={headingIdFor(id)}
      className={cn("px-gutter py-9 sm:py-12", className)}
    >
      {children}
    </section>
  );
}

function Header({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="mx-auto w-full max-w-md sm:max-w-none">
      <header
        className={cn(
          "mb-stack flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6",
          className,
        )}
      >
        {children}
      </header>
    </div>
  );
}

function Heading({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <SectionEyebrow>{children}</SectionEyebrow>;
}

function Title({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 id={headingIdFor(id)} className={cn("type-h2", className)}>
      {children}
    </h2>
  );
}

function Description({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-2 max-w-lg text-sm leading-relaxed text-text-secondary",
        className,
      )}
    >
      {children}
    </p>
  );
}

function ViewAll({ className, ...props }: ComponentProps<typeof ArrowLink>) {
  return (
    <ArrowLink
      className={cn("min-h-11 shrink-0 gap-2 text-sm sm:min-h-6", className)}
      {...props}
    />
  );
}

const ProductShowcase = Object.assign(Root, {
  Header,
  Heading,
  Eyebrow,
  Title,
  Description,
  ViewAll,
});

export default ProductShowcase;
