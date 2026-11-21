import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "My Wishlist", href: "/wishlist" },
];

const shopLinks = [
  { label: "Heritage Sarees", href: "/sarees" },
  { label: "Bespoke Dresses", href: "/dresses" },
  { label: "Handcrafted Fabrics", href: "/fabrics" },
  { label: "Custom Stitching", href: "/services/custom-stitching" },
  { label: "Maggam & Zardozi Work", href: "/services/maggam-work" },
  { label: "Bead Work & Customization", href: "/services/bead-work" },
];

const address =
  "12-2-826/A/40, LIC Colony, Mehedipatnam, Hyderabad, Telangana - 500028";
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const email = "concierge@anusricollections.com";
const linkClassName =
  "rounded-sm hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";
const iconLinkClassName = `${linkClassName} inline-flex size-8 items-center justify-center rounded-lg bg-black/10 text-[#d0a568]`;
const headingClassName =
  "mb-2 text-sm font-semibold tracking-wider text-[#d0a568] uppercase";

interface FooterLinksProps {
  title: string;
  links: { label: string; href: string }[];
}

function FooterLinks({ title, links }: FooterLinksProps) {
  return (
    <nav aria-label={title}>
      <h2 className={headingClassName}>{title}</h2>
      <ul className="space-y-1">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className={linkClassName}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto bg-espresso font-body text-ivory/90">
      <div className="mx-auto max-w-[101rem] px-gutter pt-6 pb-5 sm:pt-9 lg:pt-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-7 text-sm leading-snug sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.25fr]">
          <div>
            <Link
              href="/"
              className={`${linkClassName} inline-flex flex-wrap items-center gap-x-2`}
            >
              <span className="font-heading text-xl leading-none font-semibold text-ivory">
                ANUSRI
              </span>
              <span className="text-[10px] tracking-[0.24em] text-[#d0a568]">
                COLLECTIONS
              </span>
            </Link>
            <p className="mt-2 max-w-[36ch]">
              ANUSRI Collections celebrates the timeless beauty of Indian
              fashion with curated sarees, handcrafted fabrics, and bespoke
              boutique couture.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="https://www.instagram.com/_anusricollection/"
                className={linkClassName}
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/people/Anusri-Collection/61596424963024/"
                className={linkClassName}
              >
                Facebook
              </a>
              <a
                href={mapsHref}
                aria-label="Find the atelier on Google Maps"
                className={iconLinkClassName}
              >
                <MapPin size={15} aria-hidden="true" />
              </a>
              <Link
                href="/contact"
                aria-label="Contact the atelier"
                className={iconLinkClassName}
              >
                <MessageSquare size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <FooterLinks title="Quick Links" links={quickLinks} />
          <FooterLinks title="Shop & Couture" links={shopLinks} />

          <section>
            <h2 className={headingClassName}>Atelier Concierge</h2>
            <address className="not-italic">
              <ul className="space-y-1 [&_svg]:mt-0.5 [&_svg]:shrink-0 [&_svg]:text-[#d0a568]">
                <li className="flex items-start gap-2">
                  <MapPin size={14} aria-hidden="true" />
                  <a href={mapsHref} className={linkClassName}>
                    {address}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone size={14} aria-hidden="true" />
                  <a href="tel:+918019167233" className={linkClassName}>
                    +91 80191 67233
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Mail size={14} aria-hidden="true" />
                  <a
                    href={`mailto:${email}`}
                    className={`${linkClassName} wrap-anywhere`}
                  >
                    {email}
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Clock size={14} aria-hidden="true" />
                  <span>Mon - Sat: 10:30 AM - 8:30 PM IST</span>
                </li>
              </ul>
            </address>
          </section>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-2 text-center text-xs sm:flex-row sm:text-left">
          <p>Copyright © 2024 ANUSRI Collections. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
