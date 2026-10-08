"use client";

import React, { createContext, useContext, useReducer, useCallback } from "react";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD"; product: Product; sizeMl: number; price: number }
  | { type: "REMOVE"; productId: string; sizeMl: number }
  | { type: "INCREMENT"; productId: string; sizeMl: number }
  | { type: "DECREMENT"; productId: string; sizeMl: number }
  | { type: "CLEAR" }
  | { type: "TOGGLE_OPEN" }
  | { type: "SET_OPEN"; open: boolean };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id && i.sizeMl === action.sizeMl
      );
      if (existing) {
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            i.product.id === action.product.id && i.sizeMl === action.sizeMl
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        isOpen: true,
        items: [...state.items, { product: action.product, sizeMl: action.sizeMl, quantity: 1, price: action.price }],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => !(i.product.id === action.productId && i.sizeMl === action.sizeMl)) };
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId && i.sizeMl === action.sizeMl
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.productId && i.sizeMl === action.sizeMl
              ? { ...i, quantity: i.quantity - 1 }
              : i
          )
          .filter((i) => i.quantity > 0),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "TOGGLE_OPEN":
      return { ...state, isOpen: !state.isOpen };
    case "SET_OPEN":
      return { ...state, isOpen: action.open };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  subtotal: number;
  addItem: (product: Product, sizeMl: number, price: number) => void;
  removeItem: (productId: string, sizeMl: number) => void;
  increment: (productId: string, sizeMl: number) => void;
  decrement: (productId: string, sizeMl: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  const addItem = useCallback((product: Product, sizeMl: number, price: number) => {
    dispatch({ type: "ADD", product, sizeMl, price });
  }, []);

  const removeItem = useCallback((productId: string, sizeMl: number) => {
    dispatch({ type: "REMOVE", productId, sizeMl });
  }, []);

  const increment = useCallback((productId: string, sizeMl: number) => {
    dispatch({ type: "INCREMENT", productId, sizeMl });
  }, []);

  const decrement = useCallback((productId: string, sizeMl: number) => {
    dispatch({ type: "DECREMENT", productId, sizeMl });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);
  const openCart = useCallback(() => dispatch({ type: "SET_OPEN", open: true }), []);
  const closeCart = useCallback(() => dispatch({ type: "SET_OPEN", open: false }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_OPEN" }), []);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, isOpen: state.isOpen, totalItems, subtotal, addItem, removeItem, increment, decrement, clearCart, openCart, closeCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
