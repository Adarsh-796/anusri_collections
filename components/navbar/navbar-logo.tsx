import Image, { type ImageProps } from "next/image";
import Link from "next/link";

interface NavbarLogoProps {
  image?: ImageProps["src"];
}

export function NavbarLogo({ image }: NavbarLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Anusri Collections home"
      className="inline-flex w-fit shrink-0 items-center gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:gap-7"
    >
      {image && (
        <Image src={image} alt="" width={30} height={30} className="size-[30px] object-contain" />
      )}
      <span aria-hidden="true" className="flex flex-col">
        <span className="font-heading text-[23px] leading-none font-semibold text-link">
          ANUSRI
        </span>
        <span className="text-xs leading-4 tracking-[0.22em] text-gold">
          COLLECTIONS
        </span>
      </span>
    </Link>
  );
}
