import {
  ProductCard,
  ProductCardAction,
  ProductCardBadge,
  ProductCardCategory,
  ProductCardContent,
  ProductCardFooter,
  ProductCardImage,
  ProductCardMedia,
  ProductCardPrice,
  ProductCardTitle,
} from "./product-card";
import { ProductCardWishlist } from "./product-card-wishlist";
import { ProductGrid } from "./product-grid";
import { boutiqueProducts } from "../products";

export function BoutiqueProductGrid() {
  return (
    <ProductGrid className="mx-auto max-w-[100rem] px-gutter">
      {boutiqueProducts.map(({ id, image, title, badge, href, category, price }, index) => (
        <ProductCard key={id}>
          <ProductCardMedia>
            <ProductCardImage
              src={image}
              alt={title}
              loading={index === 0 ? "eager" : undefined}
              sizes="(min-width: 100rem) 23rem, (min-width: 80rem) 25vw, (min-width: 48rem) 50vw, 100vw"
            />
            {badge && <ProductCardBadge variant={badge.variant}>{badge.label}</ProductCardBadge>}
            <ProductCardAction href={href} aria-label={`View product: ${title}`}>
              View Product
            </ProductCardAction>
          </ProductCardMedia>
          <ProductCardContent>
            <ProductCardCategory>{category}</ProductCardCategory>
            <ProductCardTitle>{title}</ProductCardTitle>
            <ProductCardFooter>
              <ProductCardPrice>{price}</ProductCardPrice>
              <ProductCardWishlist productId={id} aria-label={`Wishlist: ${title}`} />
            </ProductCardFooter>
          </ProductCardContent>
        </ProductCard>
      ))}
    </ProductGrid>
  );
}
