import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiClock, FiCoffee, FiShoppingBag, FiX } from "react-icons/fi";


const Profile = ({ onClose }) => {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    joinDate: "January 2024",
    favoriteDrink: "Masala Chai",
    orders: 15,
    avatar: require("../../assets/tea-cup.jpg"), // better for webpack/react
  };

  return (
    <>
      {/* Overlay background */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>

      {/* Modal container */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-lg w-full relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#4a2600] hover:text-amber-400 transition"
            aria-label="Close profile modal"
          >
            <FiX className="w-6 h-6" />
          </button>

          {/* Profile header */}
          <div className="bg-[#4a2600] p-6 text-white rounded-t-lg flex items-center gap-4">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-amber-200"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-amber-200">{user.email}</p>
            </div>
            <Link
              to="/profile/edit"
              className="ml-auto flex items-center gap-2 text-amber-200 hover:text-white transition-colors"
            >
              <FiEdit className="h-5 w-5" />
              <span>Edit Profile</span>
            </Link>
          </div>

          {/* Profile details */}
          <div className="p-6 text-[#4a2600]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-gray-700">
                <FiClock className="h-5 w-5 text-[#8a4b27]" />
                <span>Member since {user.joinDate}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FiCoffee className="h-5 w-5 text-[#8a4b27]" />
                <span>Favorite: {user.favoriteDrink}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FiShoppingBag className="h-5 w-5 text-[#8a4b27]" />
                <span>{user.orders} orders</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2 border-b pb-1 border-amber-200">
                Saved Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#f9f9f9] p-4 rounded-lg">
                  <h4 className="font-medium text-[#4a2600] mb-1">
                    Delivery Address
                  </h4>
                  <p className="text-gray-600">123 Coffee Street, Brew City</p>
                </div>
                <div className="bg-[#f9f9f9] p-4 rounded-lg">
                  <h4 className="font-medium text-[#4a2600] mb-1">Payment Method</h4>
                  <p className="text-gray-600">Credit Card ending in 4242</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2 border-b pb-1 border-amber-200">
                Order History
              </h3>
              <div className="bg-[#f9f9f9] p-4 rounded-lg text-gray-700">
                {user.orders > 0 ? (
                  <p>Your recent orders will appear here.</p>
                ) : (
                  <div className="text-center py-8">
                    <p className="mb-4">You haven't placed any orders yet.</p>
                    <Link
                      to="/menu"
                      className="inline-block bg-[#8a4b27] hover:bg-[#6e3a1f] text-white px-6 py-2 rounded-full transition-colors"
                    >
                      Browse Menu
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
