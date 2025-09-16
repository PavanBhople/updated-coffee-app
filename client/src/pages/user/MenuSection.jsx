import React, { useState } from "react";
import Header from "../../components/Header";
import Cart from "../../components/Cart";
import TargetCursor from "../../components/TargetCursor";
import Menu from "../Menu";
import coffeeBg from "../../assets/coffee-bg.jpg";

const MenuSection = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  return (
    <TargetCursor>
      <div className="min-h-screen font-sans flex flex-col relative">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <img
            src={coffeeBg}
            alt="Coffee background"
            className="w-full h-full object-cover brightness-[0.7] scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center py-16">
          <h1 className="text-4xl font-extrabold text-white mb-8 text-center drop-shadow-lg">
            Explore Our Menu
          </h1>
          <a
            href="/menu"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#ffcf8b] via-[#d4a76a] to-[#8a4b27] text-black font-semibold rounded shadow-md hover:brightness-110 transition animate-shimmer cursor-pointer"
            aria-label="Go to full menu page"
          >
            View Menu
          </a>
        </main>

        {/* Cart */}
        <Cart
          cartItems={cartItems}
          showCart={showCart}
          setShowCart={setShowCart}
          removeFromCart={() => {}}
          updateQuantity={() => {}}
          calculateTotal={() => "0.00"}
          theme="coffee"
        />

        {/* Full Menu */}
        <Menu />

        {/* shimmer animation style */}
        <style>{`
          @keyframes shimmer {
            0% { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
          .animate-shimmer {
            background: linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 75%);
            background-size: 800px 100%;
            animation: shimmer 2.5s infinite;
          }
        `}</style>
      </div>
    </TargetCursor>
  );
};

export default MenuSection;
