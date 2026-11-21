"use client";

import { useLayoutEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type NavbarLinkGroupProps = ComponentPropsWithoutRef<"nav"> & { pathname: string };

export function NavbarLinkGroup({
  pathname,
  className,
  children,
  ...props
}: NavbarLinkGroupProps) {
  const navRef = useRef<HTMLElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const underline = underlineRef.current;
    if (!nav || !underline) return;

    if (underline.style.width) underline.dataset.animate = "";

    const activeItem = nav.querySelector<HTMLElement>(
      '[aria-current="page"], [aria-current="location"]',
    );
    if (!activeItem) {
      underline.style.opacity = "0";
      return;
    }

    const positionUnderline = () => {
      const { left, width } = activeItem.getBoundingClientRect();
      if (width === 0) return;

      underline.style.transform = `translateX(${left - nav.getBoundingClientRect().left}px)`;
      underline.style.width = `${width}px`;
      underline.style.opacity = "1";
    };

    positionUnderline();
    const resizeObserver = new ResizeObserver(positionUnderline);
    resizeObserver.observe(nav);
    for (const item of nav.children) {
      if (item !== underline) resizeObserver.observe(item);
    }

    return () => resizeObserver.disconnect();
  }, [pathname]);

  return (
    <nav {...props} ref={navRef} className={cn("relative", className)}>
      {children}
      <span
        ref={underlineRef}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-gold opacity-0 motion-safe:data-animate:transition-[transform,width,opacity] motion-safe:data-animate:duration-300 motion-safe:data-animate:ease-in-out"
      />
    </nav>
  );
}
