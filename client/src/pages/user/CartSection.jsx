import React from "react";

export default function CartSection({ cartItems }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
      ) : (
        <>
          <ul className="mb-6 overflow-y-auto max-h-64">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-gray-200 py-3 text-gray-800"
              >
                <span className="truncate max-w-xs">{item.name}</span>
                <span className="font-semibold">₹{item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between text-lg font-semibold border-t border-gray-300 pt-4 text-gray-900">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>

          <button
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            aria-label="Proceed to checkout"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}
