// src/pages/user/CartSection.jsx (minimal)
import React, { useState, useEffect } from "react";
import { getCart, removeFromCart, clearCart } from "../../utils";

const CartSection = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id) => {
    removeFromCart(id);
    setCart(getCart());
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((it) => (
            <div key={it.id} className="p-4 border rounded flex justify-between">
              <div>
                <div className="font-medium">{it.title} — {it.ticketName}</div>
                <div className="text-sm text-gray-600">Qty: {it.quantity}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold">₹{it.total}</div>
                <button onClick={() => handleRemove(it.id)} className="text-sm text-red-500 mt-2">Remove</button>
              </div>
            </div>
          ))}
          <button onClick={() => { clearCart(); setCart([]); }} className="px-4 py-2 bg-red-500 text-white rounded">Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default CartSection;
