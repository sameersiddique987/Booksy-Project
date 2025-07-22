
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const FeaturedBooks = ({ searchTerm = "" }) => {
  const [books, setBooks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 400, easing: 'ease-out', once: true, offset: 100 });
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('https://booksy-backend.vercel.app/books');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setCart(storedCart);
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (book) => {
    const exists = favorites.find(item => item._id === book._id);
    let updatedFavorites;

    if (exists) {
      updatedFavorites = favorites.filter(item => item._id !== book._id);
      toast.success('Removed from Wishlist');
    } else {
      updatedFavorites = [...favorites, book];
      toast.success('Added to Wishlist');
    }

    setFavorites(updatedFavorites);
    window.dispatchEvent(new Event("wishlist-updated"));
  };

  const addToCart = (book) => {
    const exists = cart.find(item => item.id === book._id);

    if (!exists) {
      const cartItem = {
        id: book._id,
        image: book.image,
        title: book.title,
        description: book.description,
        price: Number(book.price),
        quantity: 1
      };

      setCart([...cart, cartItem]);
      toast.success('Added to Cart');
      window.dispatchEvent(new Event("cart-updated"));
    } else {
      toast.info('Already in Cart');
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSkeletons = () => (
    Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="bg-white border border-gray-300 rounded-2xl shadow-md p-4 animate-pulse">
        <div className="h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
    ))
  );

  return (
    <section className="mb-5 py-10 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80')" }}>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      <div className="bg-white bg-opacity-80 rounded-xl max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📚 Featured Books</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {isLoading ? (
            renderSkeletons()
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => {
              const isFavorited = favorites.some(item => item._id === book._id);
              return (
                <motion.div
                  key={book._id}
                  data-aos="fade-up"
                  data-aos-delay={index < 8 ? index * 50 : 0}
                  className="flex flex-col justify-between bg-white border border-gray-300 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 relative overflow-hidden"
                >
                  <div>
                    <div className="relative w-full h-72">
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-contain transition-all duration-500 hover:scale-110"
                      />
                    </div>

                    <button
                      onClick={() => toggleFavorite(book)}
                      className={`absolute top-4 right-4 text-2xl bg-black/40 rounded-full p-2 transition duration-300 ${
                        isFavorited ? 'text-red-500' : 'text-white'
                      }`}
                    >
                      <FontAwesomeIcon icon={isFavorited ? solidHeart : regularHeart} />
                    </button>

                    <button
                      onClick={() => addToCart(book)}
                      className="absolute top-16 right-4 text-2xl text-white bg-black/40 rounded-full p-2 hover:text-yellow-500 transition duration-300"
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                    </button>

                    <div className="p-4">
                      <p className="font-semibold text-gray-800">{book.title}</p>
                      <p className="text-gray-600">Author: {book.author}</p>
                      <p className="font-bold text-gray-600">Rs: {book.price}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <p className="col-span-full text-center text-gray-600 text-lg">
              No books found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;















