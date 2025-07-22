
"use client";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import CartDrawer from "./cartDrawer";
import WishlistDrawer from "./wishlistDrawer";

export default function NavbarClient({ onSearch }) {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("favorites")) || [];
    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCounts();

    const handleCartUpdate = () => updateCounts();
    const handleWishlistUpdate = () => updateCounts();

    window.addEventListener("cart-updated", handleCartUpdate);
    window.addEventListener("wishlist-updated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
    };
  }, []);

  const handleSearchChange = (value) => {
    setSearchText(value);
    if (onSearch) {
      onSearch(value); // send search term to Home
    }
  };

  return (
    <>
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        searchText={searchText}
        onSearchChange={handleSearchChange}
      />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistDrawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
}



