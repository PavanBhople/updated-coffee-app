import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiUser } from "react-icons/fi";

const Header = ({ cartItemCount, onCartClick, isAuthenticated = false }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-[#4a2600] text-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="group">
            <img 
              src={logo} 
              alt="Coffee House Logo" 
              className="w-30 sm:w-34 h-2 sm:h-20 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 sm:gap-8 text-sm sm:text-base font-medium">
            <li>
              <Link to="/" className="hover:text-amber-200 transition-colors duration-200 px-2 py-1 rounded">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-amber-200 transition-colors duration-200 px-2 py-1 rounded">
                ABOUT
              </Link>
            </li>
            <li>
              <Link to="/menu" className="hover:text-amber-200 transition-colors duration-200 px-2 py-1 rounded">
                MENU
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-amber-200 transition-colors duration-200 px-2 py-1 rounded">
                SERVICES
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-amber-200 transition-colors duration-200 px-2 py-1 rounded">
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>

        {/* Cart and User Buttons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <button
            onClick={onCartClick}
            className="relative p-2 rounded-full hover:bg-[#6e3a1f] transition-colors duration-300"
          >
            <FiShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* User Profile Icon - Only shown when authenticated */}
          {isAuthenticated && (
            <Link
              to="/profile"
              className="p-2 rounded-full hover:bg-[#6e3a1f] transition-colors duration-300"
              title="My Profile"
            >
              <FiUser className="h-5 w-5" />
            </Link>
          )}

          {/* Login/Logout Button */}
          {isAuthenticated ? (
            <Link
              to="/logout"
              className="bg-[#8a4b27] px-4 sm:px-6 py-2 rounded-full shadow-md font-medium hover:bg-[#6e3a1f] transition-colors duration-300 text-sm sm:text-base flex items-center gap-2"
            >
              <span>LOGOUT</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-[#8a4b27] px-4 sm:px-6 py-2 rounded-full shadow-md font-medium hover:bg-[#6e3a1f] transition-colors duration-300 text-sm sm:text-base flex items-center gap-2"
            >
              <span>LOGIN</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl">
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;