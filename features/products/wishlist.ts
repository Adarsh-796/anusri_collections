"use client";

import { useSyncExternalStore } from "react";

const legacyStorageKey = "anusri:wishlist:v1";
const itemKeyPrefix = "anusri:wishlist:v2:";
let snapshot: ReadonlySet<string> | undefined;
const pendingChanges = new Map<string, boolean>();
const listeners = new Set<() => void>();

function readStorage() {
  let ids: Set<string>;
  try {
    const storage = window.localStorage;
    const stored = storage.getItem(legacyStorageKey);
    ids = new Set(stored?.split(",").filter(Boolean));
    for (let index = 0; index < storage.length; index++) {
      const key = storage.key(index);
      if (!key?.startsWith(itemKeyPrefix)) continue;

      const id = key.slice(itemKeyPrefix.length);
      const value = storage.getItem(key);
      if (value === "1") ids.add(id);
      // Keep removals of items saved in the previous format.
      if (value === "0") ids.delete(id);
    }
  } catch {
    ids = new Set(snapshot);
  }

  for (const [id, saved] of pendingChanges) {
    if (saved) ids.add(id);
    else ids.delete(id);
  }
  return ids;
}

function getSnapshot() {
  return (snapshot ??= readStorage());
}

function getServerSnapshot() {
  return undefined;
}

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function handleStorage(event: StorageEvent) {
  const { key } = event;
  if (key !== null && key !== legacyStorageKey && !key.startsWith(itemKeyPrefix)) return;
  snapshot = readStorage();
  notifyListeners();
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

export function useWishlist() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useWishlistCount() {
  return useSyncExternalStore(subscribe, () => getSnapshot().size, () => 0);
}

export function useIsWishlisted(id: string | undefined) {
  return useSyncExternalStore(
    subscribe,
    () => id !== undefined && getSnapshot().has(id),
    () => false,
  );
}

export function setWishlisted(id: string, saved: boolean) {
  const ids = new Set(getSnapshot());
  if (saved) ids.add(id);
  else ids.delete(id);

  snapshot = ids;
  try {
    window.localStorage.setItem(itemKeyPrefix + id, saved ? "1" : "0");
    pendingChanges.delete(id);
  } catch {
    pendingChanges.set(id, saved);
  }
  notifyListeners();
}
