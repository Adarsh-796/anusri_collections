"use client";

import { useSyncExternalStore } from "react";

const itemKeyPrefix = "anusri:cart:v1:";
const listeners = new Set<() => void>();
const pendingChanges = new Map<string, number>();
let snapshot: ReadonlyMap<string, number> | undefined;

function updateQuantity(items: Map<string, number>, id: string, quantity: number) {
  if (quantity > 0) items.set(id, quantity);
  else items.delete(id);
}

function readQuantity(value: string | null) {
  const quantity = Number(value);
  return Number.isSafeInteger(quantity) && quantity > 0 ? quantity : 0;
}

function readStorage() {
  let items = new Map<string, number>();
  try {
    const storage = window.localStorage;
    for (let index = 0; index < storage.length; index++) {
      const key = storage.key(index);
      if (key?.startsWith(itemKeyPrefix)) {
        updateQuantity(items, key.slice(itemKeyPrefix.length), readQuantity(storage.getItem(key)));
      }
    }
  } catch {
    items = new Map(snapshot);
  }

  for (const [id, quantity] of pendingChanges) updateQuantity(items, id, quantity);
  return items;
}

function getSnapshot() {
  return (snapshot ??= readStorage());
}

function handleStorage(event: StorageEvent) {
  if (event.key !== null && !event.key.startsWith(itemKeyPrefix)) return;

  snapshot = readStorage();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", handleStorage);
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", handleStorage);
      snapshot = undefined;
    }
  };
}

function getServerQuantity() {
  return 0;
}

function getItemCount() {
  let count = 0;
  for (const quantity of getSnapshot().values()) count += quantity;
  return count;
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, () => undefined);
}

export function useCartCount() {
  return useSyncExternalStore(subscribe, getItemCount, getServerQuantity);
}

export function useCartQuantity(id: string) {
  return useSyncExternalStore(subscribe, () => getSnapshot().get(id) ?? 0, getServerQuantity);
}

export function changeCartQuantity(id: string, change: 1 | -1 | "remove") {
  const items = new Map(getSnapshot());
  const key = itemKeyPrefix + id;
  let current = items.get(id) ?? 0;

  if (change !== "remove" && !pendingChanges.has(id)) {
    try {
      current = readQuantity(window.localStorage.getItem(key));
    } catch {
      // Use the last in-memory quantity when storage is unavailable.
    }
  }

  const quantity = change === "remove"
    ? 0
    : Math.max(0, Math.min(Number.MAX_SAFE_INTEGER, current + change));
  try {
    if (quantity === 0) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, String(quantity));
    pendingChanges.delete(id);
  } catch {
    pendingChanges.set(id, quantity);
  }

  updateQuantity(items, id, quantity);
  snapshot = items;
  listeners.forEach((listener) => listener());
}
