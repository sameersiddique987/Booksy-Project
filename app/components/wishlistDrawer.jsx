"use client";
import { useEffect, useState } from 'react';

export default function WishlistDrawer({ isOpen, onClose }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('favorites')) || [];
    setWishlistItems(storedWishlist);
  }, [isOpen]);

  const removeFromWishlist = (idToRemove) => {
    const updated = wishlistItems.filter(item => String(item._id) !== String(idToRemove));
    localStorage.setItem('favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event("wishlist-updated"));
    setWishlistItems(updated);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-lg transform transition-transform duration-300 flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Your Wishlist</h2>
        <button
          onClick={onClose}
          className="text-2xl text-gray-500 hover:text-gray-800 transition"
        >
          ×
        </button>
      </div>

      {/* Wishlist Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {wishlistItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item) => (
            <div
              key={item._id}
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
                onClick={() => removeFromWishlist(item._id)}
                className="text-red-500 hover:text-red-700 text-xl font-bold"
                title="Remove item"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}



