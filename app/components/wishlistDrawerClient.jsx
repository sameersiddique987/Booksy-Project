"use client";
import { useState, useEffect } from "react";
import WishlistDrawer from "./wishlistDrawer";

export default function WishlistDrawerClient () {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("favorites")) || [];
    setCartItems(storedCart);
  }, [isOpen]);

  return (
    <WishlistDrawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      cartItems={cartItems}
    />
  );
}
