import { PrimaryLink } from "@/components/primary-link";
import { SecondaryLink } from "@/components/secondary-link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function HeroComponent() {
  return (
    <HeroComponentSection>
      <Image
        src="/anya-boutique.png"
        alt=""
        fill
        priority
        sizes="100vw"
        loading="eager"
        className="object-cover object-[20%_center] md:object-left"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
      <HeroComponentContent>
        <HeroComponentHeading>
          Elegance Woven Into Every Thread.
        </HeroComponentHeading>
        <HeroComponentButtons />
      </HeroComponentContent>
    </HeroComponentSection>
  );
}

function HeroComponentSection({ children }: { children: React.ReactNode }) {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative w-full overflow-hidden aspect-4/5 sm:aspect-4/3 md:aspect-video lg:aspect-1919/852 max-h-[90vh]"
    >
      {children}
    </section>
  );
}

function HeroComponentContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-end px-4 pb-[6%] text-center">
      {children}
    </div>
  );
}

function HeroComponentHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1
      id="home-hero-title"
      className="font-heading text-h1 leading-[1.06] font-light tracking-[0.1rem] text-white"
    >
      {children}
    </h1>
  );
}

function HeroComponentButtons() {
  return (
    <div className="flex flex-wrap gap-3 justify-center mt-6">
      <PrimaryLink href="/sarees" className="group/explore">
        Explore Collections
        <ArrowRight
          aria-hidden="true"
          className="motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out motion-safe:group-hover/explore:translate-x-1.25"
        />
      </PrimaryLink>
      <SecondaryLink href="/services" className="">
        Discover Our Services
      </SecondaryLink>
    </div>
  );
}
