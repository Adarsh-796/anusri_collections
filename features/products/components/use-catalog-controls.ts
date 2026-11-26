"use client";

import { useTransition } from "react";
import { useQueryStates } from "nuqs";
import { catalogParsers } from "../catalog-query";

export function useCatalogControls() {
  const [pending, startTransition] = useTransition();
  const [controls, setControls] = useQueryStates(catalogParsers, {
    history: "push",
    shallow: false,
    scroll: false,
    startTransition,
  });
  return { controls, setControls, pending };
}
