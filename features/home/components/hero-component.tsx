import { PrimaryLink } from "@/components/primary-link";
import { SecondaryLink } from "@/components/secondary-link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function HeroComponent() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate flex items-center overflow-hidden bg-[#efd8bf] px-2 pt-(--hero-portrait-height) pb-7 [--hero-portrait-height:clamp(14.5rem,58vw,18rem)] sm:px-5 md:min-h-[clamp(24rem,31.4vw,27.5rem)] md:px-[8.8%] md:py-9"
    >
      <Image
        src="/homepage-banner.png"
        alt=""
        fill
        sizes="(width < 48rem) 48rem, (width < 1400px) 100vw, 1400px"
        loading="eager"
        fetchPriority="high"
        className="pointer-events-none object-cover object-[75%_top] md:object-[center_15%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 min-[1200px]:pointer-fine:bg-linear-[90deg,#f8e6d059,#f8e6d02e_43%,transparent_65%]"
      />
      <div className="relative z-1 w-full max-w-xl max-md:rounded-md max-md:bg-ivory/90 max-md:p-3 md:max-w-[57%]">
        <p className="mb-2 flex items-center gap-3 text-sm font-bold tracking-eyebrow text-[#794718] uppercase after:h-px after:w-10 after:shrink-0 after:bg-gold">
          Anusri Collections
        </p>
        <h1
          id="home-hero-title"
          className="font-heading text-[clamp(1.875rem,8.2vw,3.125rem)] leading-[1.06] font-bold tracking-tight text-burgundy md:text-[clamp(2.125rem,4.35vw,3.75rem)]"
        >
          Elegance Woven
          <br />
          Into Every Thread.
        </h1>
        <p className="mt-3 max-w-[38ch] text-base/6 font-medium text-espresso lg:text-lg/6">
          Discover timeless sarees, beautiful fabrics, and thoughtfully crafted
          designs that celebrate the beauty of tradition.
        </p>

        <div className="mt-5 w-fit max-w-full max-[456px]:w-full">
          <div className="flex flex-wrap gap-3 max-[456px]:flex-col md:max-[900px]:flex-col lg:gap-x-6">
            <PrimaryLink
              href="/sarees"
              className="min-h-11 h-auto gap-2 rounded-sm bg-burgundy px-5 py-2.5 text-center font-semibold whitespace-normal text-white hover:bg-primary-hover lg:min-h-12 lg:min-w-[clamp(12rem,16.5vw,14.5rem)]"
            >
              Explore Collections <ArrowRight aria-hidden="true" />
            </PrimaryLink>
            <SecondaryLink
              href="/services"
              className="min-h-11 h-auto rounded-sm border-burgundy bg-ivory/85 px-5 py-2.5 text-center font-semibold whitespace-normal text-burgundy hover:bg-ivory hover:text-burgundy lg:min-h-12 lg:min-w-[clamp(12rem,16.5vw,14.5rem)]"
            >
              Discover Our Services
            </SecondaryLink>
          </div>
        </div>
      </div>
    </section>
  );
}
