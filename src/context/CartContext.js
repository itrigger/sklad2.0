import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const cartFromLocalStorage =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("cart")) !== null
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

  const [cartItems, setCartItem] = useState(cartFromLocalStorage);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
    console.warn(cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider value={[cartItems, setCartItem]}>
      {children}
    </CartContext.Provider>
  );
};
