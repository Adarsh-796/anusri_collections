import type { ComponentProps, ReactNode } from "react";
import { ArrowLink } from "@/components/arrow-link";
import { cn } from "@/lib/utils";
import SectionEyebrow from "@/features/home/components/section-eyebrow";

interface ProductShowcaseProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  viewAll: {
    href: ComponentProps<typeof ArrowLink>["href"];
    label: string;
  };
  className?: string;
  children: ReactNode;
}

export default function ProductShowcase({
  id,
  eyebrow,
  title,
  description,
  viewAll,
  className,
  children,
}: ProductShowcaseProps) {
  const headingId = `${id}-title`;
  const { href, label } = viewAll;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("px-gutter py-9 sm:py-12", className)}
    >
      <div className="mx-auto w-full max-w-md sm:max-w-none">
        <header className="mb-stack flex flex-col items-start gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <SectionEyebrow>{eyebrow}</SectionEyebrow>
            <h2 id={headingId} className="type-h2">
              {title}
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
              {description}
            </p>
          </div>
          <ArrowLink
            href={href}
            className="min-h-11 shrink-0 gap-2 text-sm sm:min-h-6"
          >
            {label}
          </ArrowLink>
        </header>

        {children}
      </div>
    </section>
  );
}
