'use client';
import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

const FeaturedBooks = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const books = [
    {
      title: "Atomic Habits",
      image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
      description: "A guide to building good habits and breaking bad ones.",
      price: "$14.99"
    },
    {
      title: "The Alchemist",
      image: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
      description: "A journey of self-discovery and destiny.",
      price: "$12.49"
    },
    {
      title: "Harry Potter",
      image: "https://images-na.ssl-images-amazon.com/images/I/81YOuOGFCJL.jpg",
      description: "The magical tale of a young wizard and his adventures.",
      price: "$18.99"
    },
    {
      title: "The Subtle Art of Not Giving a F*ck",
      image: "https://images-na.ssl-images-amazon.com/images/I/71QKQ9mwV7L.jpg",
      description: "A brutally honest guide to living a better life.",
      price: "$15.75"
    },
    {
      title: "The Psychology of Money",
      image: "https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg",
      description: "Timeless lessons on wealth and happiness.",
      price: "$16.20"
    },
    {
      title: "The Great Gatsby",
      image: "https://m.media-amazon.com/images/M/MV5BMTkxNTk1ODcxNl5BMl5BanBnXkFtZTcwMDI1OTMzOQ@@._V1_.jpg",
      description: "A classic tale of love and ambition in the 1920s.",
      price: "$11.99"
    },
    {
      title: "1984",
      image: "https://t4.ftcdn.net/jpg/05/02/08/27/360_F_502082774_UenZg3MKBnlpiyZIXB0k2uEXdfaxgZ1k.jpg",
      description: "A dystopian novel about surveillance and control.",
      price: "$13.49"
    },
    {
      title: "Sapiens: A Brief History of Humankind",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGDUCiFvkntv-qxwZeeDGCilWlIrkLlerhtQ&s",
      description: "Explores the evolution of human civilization.",
      price: "$19.95"
    },
    {
      title: "Becoming",
      image: "https://www.shutterstock.com/image-photo/ideas-money-making-mixed-media-600nw-1233133540.jpg",
      description: "The memoir of former First Lady Michelle Obama.",
      price: "$17.99"
    },
    {
      title: "The Four Agreements",
      image: "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/bem-the-four-agreements-poster-art-gift-george-marley.jpg",
      description: "A practical guide to personal freedom.",
      price: "$10.50"
    },
    {
      title: "The Power of Habit",
      image: "https://images-na.ssl-images-amazon.com/images/I/71wm29Etl4L._AC_UL210_SR210,210_.jpg",
      description: "Why we do what we do in life and business.",
      price: "$13.99"
    },
    {
      title: "Educated",
      image: "https://www.shutterstock.com/image-photo/stack-educational-books-apple-on-260nw-1665813628.jpg",
      description: "A memoir about growing up and self-education.",
      price: "$14.25"
    }
  ];

  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (title) => {
    if (favorites.includes(title)) {
      setFavorites(favorites.filter((item) => item !== title));
    } else {
      setFavorites([...favorites, title]);
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📚 Featured Books</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <div
              key={index}
              data-aos="fade-up"
              className="bg-white border border-gray-300 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 relative overflow-hidden"
            >
              <img
                src={book.image}
                alt={book.title}
                className="h-72 w-full object-cover transition-all duration-500 hover:scale-110"
              />
              <div className="p-4">
                <p className="text-center font-semibold text-gray-800">{book.title}</p>
                <button
                  onClick={() => toggleFavorite(book.title)}
                  className={`cursor-pointer absolute top-4 right-4 text-3xl transition-colors duration-300 ${favorites.includes(book.title) ? 'text-red-500' : 'text-gray-400'}`}
                >
                  <FontAwesomeIcon icon={favorites.includes(book.title) ? solidHeart : regularHeart} />
                </button>
              </div>
              <div className="my-10">
                <button className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-50 to-yellow-200 text-black px-6 py-2 rounded-full shadow-md hover:bg-yellow-300 transition">
                  Checkout
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
