import type { ReactNode } from "react";

function ProductCatalogRoot({ children }: { children: ReactNode }) {
  return (
    <main className="w-full px-gutter pt-8 pb-section sm:pt-12">
      {children}
    </main>
  );
}

function ProductCatalogTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-5 text-link sm:mb-7 text-4xl md:text-5xl">{children}</h1>
  );
}

function ProductCatalogContent({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[minmax(12rem,14rem)_minmax(0,1fr)] lg:gap-5">
      {children}
    </div>
  );
}

export {
  ProductCatalogRoot as Root,
  ProductCatalogTitle as Title,
  ProductCatalogContent as Content,
};
