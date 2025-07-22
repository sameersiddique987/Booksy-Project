'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51QarspP9DXcr8WfKlzEFIRiy58vELHNKXtMmd2Il0dyfRiG1ftHz7f6Kwjl1ecwLs8evwTntGprfHFTZkXOzfYzq00ujS5MHYl'
);

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
    window.dispatchEvent(new Event('cart-updated'));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleCheckout = async (product) => {
    const stripe = await stripePromise;

    const response = await fetch('https://booksy-backend.vercel.app/api/v1/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: [
          {
            id: product.id || product._id || 'unknown',
            title: product.title,
            price: product.price,
            quantity: product.quantity || 1,
            description: product.description || '',
            image: product.image || '',
          },
        ],
      }),
    });

    const session = await response.json();

    if (session.id) {
      await stripe.redirectToCheckout({ sessionId: session.id });
    } else {
      alert('Checkout failed.');
      console.error(session.error || session);
    }
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
              className="flex flex-col gap-2 mb-6 border rounded-lg p-3 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="mt-1 font-bold text-gray-600">
                    Rs. {item.price}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 hover:text-red-700 text-xl font-bold"
                  title="Remove item"
                >
                  ×
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-600 text-white w-full py-2 rounded hover:bg-yellow-700"
                onClick={() => handleCheckout(item)}
              >
                Checkout 
              </motion.button>
            </div>
          ))
        )}
      </div>

      {/* Subtotal (Optional) */}
      {cartItems.length > 0 && (
        <div className="border-t p-4 sticky bottom-0 bg-white">
          <div className="flex justify-between mb-3">
            <span className="font-medium text-gray-600">Subtotal:</span>
            <span className="font-semibold text-gray-800">
              Rs. {calculateSubtotal()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

