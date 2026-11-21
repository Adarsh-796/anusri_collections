import Image, { type ImageProps } from "next/image";

interface CollectionCardImageProps {
  image: ImageProps["src"];
  alt?: string;
  sizes: string;
  objectPosition?: string;
}

export function CollectionCardImage({
  image,
  alt = "",
  sizes,
  objectPosition = "center",
}: CollectionCardImageProps) {
  return (
    <Image
      src={image}
      alt={alt}
      fill
      sizes={sizes}
      style={{ objectPosition }}
      className="-z-20 object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover/collection:scale-105"
    />
  );
}
