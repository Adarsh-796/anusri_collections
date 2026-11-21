import { Paintbrush, Scissors, Sparkles } from "lucide-react";
import {
  ServiceCard,
  ServiceCardAction,
  ServiceCardContent,
  ServiceCardDescription,
  ServiceCardIcon,
  ServiceCardImage,
  ServiceCardTitle,
  ServiceGrid,
} from "@/features/services/components/service-card";

const services = [
  {
    title: "Custom Stitching",
    description: "Personalized stitching and tailoring for a fit and finish made for you.",
    image: "/services/custom-stitching.png",
    alt: "Tailor measuring fabric on a worktable",
    Icon: Scissors,
  },
  {
    title: "Maggam Work",
    description: "Traditional hand embroidery and embellishments crafted by zardozi artisans.",
    image: "/services/maggam-work.png",
    alt: "Artisan hand-embroidering gold thread on fabric",
    Icon: Paintbrush,
  },
  {
    title: "Bead Work & Customization",
    description: "Hand-applied beadwork and personalized details for your outfit.",
    image: "/services/beadwork-customization.png",
    alt: "Pearl and bead embroidery on blush fabric",
    Icon: Sparkles,
  },
];

export default function ServicesPage() {
  return (
    <main className="px-gutter py-section">
      <h1 className="mb-8">Services</h1>
      <ServiceGrid>
        {services.map(({ title, description, image, alt, Icon }) => (
          <ServiceCard key={title}>
            <ServiceCardImage
              src={image}
              alt={alt}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
            <ServiceCardContent>
              <ServiceCardIcon>
                <Icon />
              </ServiceCardIcon>
              <ServiceCardTitle as="h2">{title}</ServiceCardTitle>
              <ServiceCardDescription>{description}</ServiceCardDescription>
              <ServiceCardAction href="/contact">Enquire Now</ServiceCardAction>
            </ServiceCardContent>
          </ServiceCard>
        ))}
      </ServiceGrid>
    </main>
  );
}
