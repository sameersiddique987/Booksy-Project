"use client";
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";

export default function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, [isOpen]);

  const removeFromCart = (indexToRemove) => {
    const updated = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-lg transform transition-transform duration-300 flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Shopping Cart</h2>
        <button
          onClick={onClose}
          className="text-2xl text-gray-500 hover:text-gray-800 transition"
        >
          ×
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mb-6 border rounded-lg p-3 hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                <p className="mt-1 font-bold text-gray-600">Rs. {item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 hover:text-red-700 text-xl font-bold"
                title="Remove item"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* Subtotal + Checkout */}
      {cartItems.length > 0 && (
        <div className="border-t p-4 sticky bottom-0 bg-white">
          <div className="flex justify-between mb-3">
            <span className="font-medium text-gray-600">Subtotal:</span>
            <span className="font-semibold text-gray-800">Rs. {calculateSubtotal()}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-yellow-600 text-white px-4 py-3 rounded-lg hover:bg-yellow-700 transition"
          >
            Proceed to Checkout
          </motion.button>
        </div>
      )}
    </div>
  );
}


