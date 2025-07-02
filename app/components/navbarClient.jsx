// "use client";
// import { useEffect, useState } from "react";
// import Navbar from "./navbar";
// import CartDrawer from "./cartDrawer";
// import WishlistDrawer from "./wishlistDrawer";

// export default function NavbarClient() {
//   const [cartCount, setCartCount] = useState(0);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isWishlistOpen, setIsWishlistOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);
//   const [wishlistItems, setWishlistItems] = useState([]);

//   useEffect(() => {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const wishlist = JSON.parse(localStorage.getItem("favorites")) || [];
//     setCartItems(cart);
//     setWishlistItems(wishlist);
//     setCartCount(cart.length);
//     setWishlistCount(wishlist.length);
//   }, [isCartOpen, isWishlistOpen]);

//   return (
//     <>
//       <Navbar
//         onCartClick={() => setIsCartOpen(true)}
//         onWishlistClick={() => setIsWishlistOpen(true)}
//         cartCount={cartCount}
//         wishlistCount={wishlistCount}
//       />

//       <CartDrawer
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//         cartItems={cartItems}
//       />

//       <WishlistDrawer
//         isOpen={isWishlistOpen}
//         onClose={() => setIsWishlistOpen(false)}
//         cartItems={wishlistItems}
//       />
//     </>
//   );
// }








"use client";
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import CartDrawer from "./cartDrawer";
import WishlistDrawer from "./wishlistDrawer";

export default function NavbarClient() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const updateCounts = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("favorites")) || [];
    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCounts();

    // Listen to custom events
    const handleCartUpdate = () => updateCounts();
    const handleWishlistUpdate = () => updateCounts();

    window.addEventListener("cart-updated", handleCartUpdate);
    window.addEventListener("wishlist-updated", handleWishlistUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
      window.removeEventListener("wishlist-updated", handleWishlistUpdate);
    };
  }, []);

  return (
    <>
      <Navbar
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
      />
    </>
  );
}


