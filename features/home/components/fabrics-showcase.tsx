import { BoutiqueProductGrid } from "@/features/products/components/boutique-product-grid";
import ProductShowcase from "@/features/products/components/product-showcase";
import { fabricProducts } from "@/features/products/products";

const ID = "textile-atelier";

export default function FabricsShowcase() {
  return (
    <ProductShowcase id={ID} className="bg-[#fcf9f4]">
      <ProductShowcase.Header>
        <ProductShowcase.Heading>
          <ProductShowcase.Eyebrow>Textile Atelier</ProductShowcase.Eyebrow>
          <ProductShowcase.Title id={ID}>
            The Beauty Begins With the Fabric.
          </ProductShowcase.Title>
          <ProductShowcase.Description>
            Discover beautiful fabrics and materials that inspire unique styles
            and personalized creations.
          </ProductShowcase.Description>
        </ProductShowcase.Heading>
        <ProductShowcase.ViewAll href="/fabrics">
          View All Fabrics
        </ProductShowcase.ViewAll>
      </ProductShowcase.Header>

      <BoutiqueProductGrid
        products={fabricProducts}
        cardVariant="fabric"
        productLinkPrefetch={false}
        className="gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4 xl:gap-7"
      />
    </ProductShowcase>
  );
}
