"use client";
import { useState, useEffect } from "react";
import CartDrawer from "./cartDrawer";


export default function CartDrawerClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, [isOpen]);

  return (
    <CartDrawer
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      cartItems={cartItems}
    />
  );
}
