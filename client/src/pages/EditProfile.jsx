import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "(123) 456-7890",
    favoriteDrink: "Masala Chai",
    address: "123 Coffee Street, Brew City"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f9f4f0] to-[#f2e6da]">
      <Header cartItemCount={0} isAuthenticated={true} />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-10">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-[#8a4b27] hover:text-[#6e3a1f] mb-8 transition-colors"
          >
            <FiArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back to Profile</span>
          </Link>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#e5d3c6]">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4a2600] to-[#6e3a1f] p-6 text-white">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">Edit Profile</h1>
              <p className="text-sm opacity-80 mt-1">Keep your details fresh like your morning coffee</p>
            </div>

            {/* Form */}
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8a4b27] focus:border-[#8a4b27] transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8a4b27] focus:border-[#8a4b27] transition-all"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8a4b27] focus:border-[#8a4b27] transition-all"
                  />
                </div>

                {/* Favorite Drink */}
                <div>
                  <label
                    htmlFor="favoriteDrink"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Favorite Drink
                  </label>
                  <select
                    id="favoriteDrink"
                    name="favoriteDrink"
                    value={user.favoriteDrink}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8a4b27] focus:border-[#8a4b27] transition-all"
                  >
                    <option value="Masala Chai">Masala Chai</option>
                    <option value="Mocha">Mocha</option>
                    <option value="Espresso">Espresso</option>
                    <option value="Cappuccino">Cappuccino</option>
                    <option value="Latte">Latte</option>
                    <option value="Americano">Americano</option>
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Delivery Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8a4b27] focus:border-[#8a4b27] transition-all"
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-6">
                  <Link
                    to="/profile"
                    className="px-6 py-2.5 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-[#8a4b27] hover:bg-[#6e3a1f] text-white px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg"
                  >
                    <FiSave className="h-5 w-5" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditProfile;
