import { ReactNode } from "react";

export default function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1.5 text-caption font-medium tracking-widest text-[#8a6236] uppercase">
      {children}
    </p>
  );
}
