"use client";

import React, { createContext, useContext, useCallback, useSyncExternalStore } from "react";

interface WishlistContextValue {
  wishlistIds: string[];
  isWishlisted: (id: string) => boolean;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "rezan_wishlist_v1";

let memoryWishlist: string[] = [];

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): string[] {
  return memoryWishlist;
}

function getServerSnapshot(): string[] {
  return [];
}

// Client-side initialization
if (typeof window !== "undefined") {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      memoryWishlist = JSON.parse(stored);
    }
  } catch {
    // Ignore fallback
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const wishlistIds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isWishlisted = useCallback(
    (id: string) => wishlistIds.includes(id),
    [wishlistIds]
  );

  const toggleWishlist = useCallback((id: string) => {
    if (memoryWishlist.includes(id)) {
      memoryWishlist = memoryWishlist.filter((item) => item !== id);
    } else {
      memoryWishlist = [...memoryWishlist, id];
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryWishlist));
    } catch {
      // Ignore storage errors
    }
    notify();
  }, []);

  const clearWishlist = useCallback(() => {
    memoryWishlist = [];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memoryWishlist));
    } catch {
      // Ignore storage errors
    }
    notify();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        isWishlisted,
        isInWishlist: isWishlisted,
        toggleWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
