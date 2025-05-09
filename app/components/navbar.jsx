
// 'use client';
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// function Navbar() {
//   return (
//     <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         {/* Logo */}
//         <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
//           <img
//             src="https://noirenailandlashbar.com/uploads/fnail0zpqm2is/webp/png/filemanager/logo/Booksy.webp"
//             className="h-20"
//             alt="Booksy Logo"
//           />
//         </a>

//        {/* Icons */}
// <div className="flex items-center gap-6 md:order-2">
//   <a href="/wishlist" className="text-gray-700 dark:text-white hover:text-red-500 text-3xl">
//     <FontAwesomeIcon icon={faHeart} />
//   </a>
//   <a href="/cart" className="text-gray-700 dark:text-white hover:text-green-500 text-3xl">
//     <FontAwesomeIcon icon={faShoppingCart} />
//   </a>
// </div>


//         {/* Nav Links */}
//         <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
//           <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700"
//               >
//                 About
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#"
//                 className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700"
//               >
//                 Services
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-300 shadow-md transition duration-300">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3">
          <img
            src="https://noirenailandlashbar.com/uploads/fnail0zpqm2is/webp/png/filemanager/logo/Booksy.webp"
            className="h-20"
            alt="Booksy Logo"
          />
        </a>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="inline-flex items-center p-2 text-gray-700 rounded md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="lg" />
        </button>

        {/* Icons (Right Side) */}
        <div className="flex items-center gap-6 md:order-2">
          <a href="/wishlist" className="text-gray-700 hover:text-red-500 text-2xl md:text-3xl">
            <FontAwesomeIcon icon={faHeart} />
          </a>
          <a href="/cart" className="text-gray-700 hover:text-green-500 text-2xl md:text-3xl">
            <FontAwesomeIcon icon={faShoppingCart} />
          </a>
        </div>

        {/* Navigation Links with Animation */}
        <div
          className={`w-full md:flex md:w-auto md:order-1 transition-all duration-500 ease-in-out ${
            menuOpen ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden md:opacity-100 md:max-h-fit'
          }`}
        >
          <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-200 rounded-lg bg-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-blue-700 rounded md:bg-transparent md:p-0"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Services
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
