'use client';
import React, { useState } from 'react';

function Navbar({searchText, onSearchChange, onCartClick, onWishlistClick, cartCount = 0, wishlistCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? 'https://booksy-backend.vercel.app/api/v1/login'
      : 'https://booksy-backend.vercel.app/api/v1/register';

    const payload = isLogin
      ? { email, password }
      : { firstname, lastname, email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        if (isLogin) {
          alert('Login successful!');
          setShowModal(false);
        } else {
          alert('Signup successful! Please login now.');
          setIsLogin(true);
        }

        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      alert('Server error');
    }
  };

  return (
    <>
      {/* ===== Transparent Navbar ===== */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-md transition duration-300 fixed px-5 top-0 left-0 w-full z-50">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <a href="/" className="text-2xl font-bold text-gray-800 tracking-wide">Booksy</a>

          {/* Hamburger Icon */}
          <button
            className="inline-flex items-center p-2 text-black rounded md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4 md:order-2">
            <div
              onClick={() => setShowModal(true)}
              className="relative cursor-pointer"
              aria-label="Open login modal"
            >
              <span className="material-symbols-outlined text-3xl text-gray-600">
                person
              </span>
            </div>

            <div className="relative cursor-pointer" onClick={onWishlistClick}>
              <span className="material-symbols-outlined text-3xl text-gray-600">
                favorite
              </span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>

            <div className="relative cursor-pointer" onClick={onCartClick}>
              <span className="material-symbols-outlined text-3xl text-gray-600">
                shopping_cart
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          </div>

          {/* Menu Section */}
          <div className={`w-full md:flex md:w-auto md:order-1 transition-all duration-500 ease-in-out ${menuOpen ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden md:opacity-100 md:max-h-fit'}`}>
            <form className="flex items-center w-full mt-4 md:mt-0 px-4 md:px-0 justify-center md:justify-start">
              <div className="relative w-full md:w-[400px]">
                <input
                  type="text"
                  value={searchText}
                  placeholder="Search products..."
                  className="w-full px-4 py-3 pl-10 text-gray-600 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              
                <span className="material-symbols-outlined absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-600">
                  search
                </span>
              </div>
            </form>

            {/* Mobile Icons */}
            <div className="md:hidden flex justify-center gap-6 mt-6">
              <div
                onClick={() => {
                  setShowModal(true);
                  setMenuOpen(false);
                }}
                className="relative cursor-pointer"
              >
                <span className="material-symbols-outlined text-3xl text-gray-700">
                  person
                </span>
              </div>

              <div className="relative cursor-pointer" onClick={() => {
                onWishlistClick();
                setMenuOpen(false);
              }}>
                <span className="material-symbols-outlined text-3xl text-gray-700">
                  favorite
                </span>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </div>

              <div className="relative cursor-pointer" onClick={() => {
                onCartClick();
                setMenuOpen(false);
              }}>
                <span className="material-symbols-outlined text-3xl text-gray-700">
                  shopping_cart
                </span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Modal ===== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-white/70">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-sm shadow-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-600 text-xl"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>

            <div className="flex mb-4 border-b border-gray-200">
              <button
                onClick={() => setIsLogin(true)}
                className={`w-1/2 py-2 text-center font-semibold ${isLogin ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`w-1/2 py-2 text-center font-semibold ${!isLogin ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </>
              )}

              <input
                type="email"
                placeholder="Email"
                className="w-full mb-3 px-4 py-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="submit"
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;















