export const collectionLinks = [
  { label: "Sarees", href: "/sarees" },
  { label: "Dresses", href: "/dresses" },
  { label: "Fabrics", href: "/fabrics" },
] as const;

export const navbarItems = [
  { label: "Home", href: "/" },
  ...collectionLinks,
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;
