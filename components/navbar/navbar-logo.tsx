import Image from "next/image";
import Link from "next/link";

export function NavbarLogo() {
  const image = "";
  return (
    <Link
      href="/"
      aria-label="Anusri Collections home"
      className="flex shrink-0 items-center gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:gap-7"
    >
      {image && (
        <Image
          src={image}
          alt=""
          width={30}
          height={30}
          className="size-7.5 object-contain"
        />
      )}
      <span aria-hidden="true" className="flex flex-col">
        <span className="font-heading text-[23px] leading-none font-semibold text-link">
          ANUSRI
        </span>
        <span className="text-xs tracking-[0.22em] text-gold">COLLECTIONS</span>
      </span>
    </Link>
  );
}
