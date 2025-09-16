import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#4a2600] to-[#2c1500] text-white py-10 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-4 tracking-wide text-amber-300">
            COFFEE HOUSE
          </h3>
          <p className="text-sm mb-4 leading-relaxed text-amber-100">
            Brewing happiness since 2010. From freshly roasted beans to your cup — the ultimate coffee experience in town.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/profile"
              className="text-amber-200 hover:text-white transition-colors duration-200"
            >
              My Profile
            </Link>
            <Link
              to="/menu"
              className="text-amber-200 hover:text-white transition-colors duration-200"
            >
              Order Online
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-5">
            <a href="#" className="p-2 bg-[#6e3a1f] rounded-full hover:bg-amber-500 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 bg-[#6e3a1f] rounded-full hover:bg-amber-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 bg-[#6e3a1f] rounded-full hover:bg-amber-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 bg-[#6e3a1f] rounded-full hover:bg-amber-500 transition">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-amber-300">OPENING HOURS</h3>
          <p className="text-sm">Monday - Friday: 7am - 9pm</p>
          <p className="text-sm">Saturday - Sunday: 8am - 10pm</p>
        </div>

        {/* Contact + Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-amber-300">CONTACT</h3>
          <p className="text-sm">123 Coffee Street</p>
          <p className="text-sm">Brew City, BC 12345</p>
          <p className="text-sm">info@coffeehouse.com</p>
          <p className="text-sm">(123) 456-7890</p>

          {/* Newsletter */}
          <div className="mt-5">
            <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 w-full text-black rounded-l-lg outline-none"
              />
              <button className="bg-amber-500 px-4 py-2 rounded-r-lg hover:bg-amber-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-[#6e3a1f] mt-8 pt-6 text-center text-sm text-amber-100">
        <p>© {new Date().getFullYear()} Coffee House. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link
            to="/privacy"
            className="hover:text-amber-300 transition-colors duration-200"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="hover:text-amber-300 transition-colors duration-200"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
