import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import Cart from "../components/Cart";
import TargetCursor from "../components/TargetCursor";
import coffeeBg from "../assets/coffee-bg.jpg";

// Menu Images
import coldCoffeeImg from "../assets/cold-coffee.jpg";
import chocolateImg from "../assets/chocolate.jpg";
import americanoImg from "../assets/americano.jpg";
import masalaChaiImg from "../assets/masala-chai.jpg";
import cappuccinoImg from "../assets/cappuccino.jpg";
import latteImg from "../assets/latte.jpg";
import espressoImg from "../assets/espresso.jpg";
import mochaImg from "../assets/mocha.jpg";

// Menu data
const menuItems = [
  { id: 1, name: "Cold Coffee", image: coldCoffeeImg, price: 4.0, description: "Refreshing iced coffee with creamy texture" },
  { id: 2, name: "Chocolate", image: chocolateImg, price: 4.5, description: "Rich and creamy hot chocolate" },
  { id: 3, name: "Americano", image: americanoImg, price: 3.5, description: "Classic espresso with hot water" },
  { id: 4, name: "Masala Chai", image: masalaChaiImg, price: 3.0, description: "Traditional Indian spiced tea" },
  { id: 5, name: "Cappuccino", image: cappuccinoImg, price: 4.25, description: "Espresso with steamed milk foam" },
  { id: 6, name: "Latte", image: latteImg, price: 4.5, description: "Smooth espresso with steamed milk" },
  { id: 7, name: "Espresso", image: espressoImg, price: 3.0, description: "Strong concentrated coffee shot" },
  { id: 8, name: "Mocha", image: mochaImg, price: 4.75, description: "Chocolate-flavored coffee delight" },
];

// MenuCard component
const MenuCard = ({ item, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-[#4a2600] group-hover:text-[#6e3a1f] transition-colors duration-300">
            {item.name}
          </h2>
          <span className="text-[#8a4b27] font-bold group-hover:text-[#6e3a1f] transition-colors duration-300">
            ${item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-gray-700 text-sm mb-4 group-hover:text-gray-900 transition-colors duration-300">
          {item.description}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mb-3">
          <button
            aria-label={`Decrease quantity of ${item.name}`}
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="px-3 py-1 rounded-lg bg-amber-100 text-[#8a4b27] font-bold hover:bg-amber-200 transition"
          >
            –
          </button>
          <span className="font-bold">{quantity}</span>
          <button
            aria-label={`Increase quantity of ${item.name}`}
            onClick={() => setQuantity(q => q + 1)}
            className="px-3 py-1 rounded-lg bg-amber-100 text-[#8a4b27] font-bold hover:bg-amber-200 transition"
          >
            +
          </button>
        </div>

        <motion.button
          onClick={() => onAdd({ ...item, quantity })}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 0px 12px rgba(255, 207, 139, 0.7)",
          }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 font-bold uppercase tracking-wider rounded-lg
                      bg-gradient-to-r from-[#ffcf8b] via-[#d4a76a] to-[#8a4b27] text-[#4a2600]
                      hover:from-[#ffe0a8] hover:via-[#e0b87a] hover:to-[#a35c2f]
                      transition-all duration-300 shadow-md"
          aria-label={`Add ${item.name} to cart`}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

const Menu = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find(ci => ci.id === item.id);
      return exists
        ? prev.map(ci =>
            ci.id === item.id
              ? { ...ci, quantity: ci.quantity + item.quantity }
              : ci
          )
        : [...prev, { ...item }];
    });
    setShowCart(true);
  };

  const removeFromCart = id =>
    setCartItems(prev => prev.filter(item => item.id !== id));

  const updateQuantity = (id, quantity) =>
    setCartItems(prev =>
      quantity < 1
        ? prev.filter(item => item.id !== id)
        : prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  return (
    <div className="min-h-screen font-sans flex flex-col bg-[#0f0a06] text-amber-50 relative">
      <TargetCursor spinDuration={2} hideDefaultCursor />

      <Header cartItemCount={cartItemCount} onCartClick={() => setShowCart(!showCart)} />

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cartItemCount > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => setShowCart(true)}
            className="fixed bottom-8 right-8 z-50 bg-amber-600 text-[#0f0a06] px-5 py-3 rounded-full font-bold shadow-lg hover:bg-amber-500 transition"
          >
            🛒 {cartItemCount}
          </motion.button>
        )}
      </AnimatePresence>

      <main className="flex-1 relative">
        {/* Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={coffeeBg}
            alt="Coffee background"
            className="w-full h-full object-cover object-center scale-100 lg:scale-110 transition-all duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a06]/90 via-[#0f0a06]/70 to-[#2c1c12]/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0f0a06/90)]" />
        </div>

        <div className="relative z-10 pt-32 pb-20 px-6 sm:px-10 max-w-6xl mx-auto">
          {/* Animated Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-widest text-center 
              bg-gradient-to-r from-[#ffcf8b] via-[#d4a76a] to-[#8a4b27] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(255,207,139,0.7)]
              animate-gradient-x"
          >
            Our Menu
          </motion.h1>

          {/* Cart */}
          <Cart
            cartItems={cartItems}
            showCart={showCart}
            setShowCart={setShowCart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            calculateTotal={calculateTotal}
            theme="coffee"
          />

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            {menuItems.map(item => (
              <MenuCard key={item.id} item={item} onAdd={handleAddToCart} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Menu;
