import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("climax_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("climax_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ===== ADD TO CART =====
  const addToCart = (note, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === note._id);
      if (existing) {
        return prev.map((item) =>
          item._id === note._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...note, quantity }];
    });
  };

  // ===== UPDATE QUANTITY =====
  const updateQuantity = (noteId, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === noteId ? { ...item, quantity } : item
      )
    );
  };

  // ===== REMOVE FROM CART =====
  const removeFromCart = (noteId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== noteId));
  };

  // ===== CLEAR CART =====
  const clearCart = () => {
    setCartItems([]);
  };

  // ===== GET TOTAL =====
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price =
        item.discountPrice && item.discountPrice < item.price
          ? item.discountPrice
          : item.price;
      return total + price * item.quantity;
    }, 0);
  };

  // ===== GET TOTAL ITEM COUNT =====
  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};