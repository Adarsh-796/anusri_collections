export const collectionLinks = [
  { label: "Sarees", href: "/saris" },
  { label: "Dresses", href: "/dresses" },
  { label: "Fabrics", href: "/fabrics" },
] as const;

export const navbarItems = [
  { label: "Home", href: "/" },
  ...collectionLinks,
  {
    label: "Services",
    items: [
      { label: "Custom Stitching", href: "/services/custom-stitching" },
      { label: "Maggam Work", href: "/services/maggam-work" },
      { label: "Bead Work & Customization", href: "/services/bead-work" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
] as const;
