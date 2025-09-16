import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import coffeeBg from "../assets/coffee-bg.jpg";

const TOTAL_TABLES = 10;

const BookTable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    tableNumber: "",
    guests: 2,
    notes: "",
  });

  const [error, setError] = useState("");
  const [availableTables, setAvailableTables] = useState([]);
  const [bookedTables, setBookedTables] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Helper to get bookings from localStorage
  const getBookings = () => JSON.parse(localStorage.getItem("bookings") || "[]");
  const saveBookings = (bookings) => localStorage.setItem("bookings", JSON.stringify(bookings));

  // Check available tables whenever date or time changes
  useEffect(() => {
    if (formData.date && formData.time) checkAvailableTables();
  }, [formData.date, formData.time]);

  const checkAvailableTables = () => {
    let allBookings = getBookings();
    const now = new Date();

    // Remove expired bookings
    allBookings = allBookings.filter(
      (b) => new Date(`${b.date}T${b.endTime}`) > now
    );
    saveBookings(allBookings);

    // Check which tables are booked for selected date & time
    const booked = allBookings
      .filter((b) => b.date === formData.date && isTimeOverlap(b.time, b.endTime, formData.time))
      .map((b) => ({ tableNumber: b.tableNumber, endTime: b.endTime, date: b.date }));

    const bookedNumbers = booked.map((b) => b.tableNumber);
    const available = Array.from({ length: TOTAL_TABLES }, (_, i) => i + 1).filter(
      (t) => !bookedNumbers.includes(t)
    );

    setBookedTables(booked);
    setAvailableTables(available);
  };

  const isTimeOverlap = (start, end, newStart) => {
    const newStartTime = new Date(`1970-01-01T${newStart}`);
    const newEndTime = new Date(newStartTime.getTime() + 2 * 60 * 60 * 1000);

    const bookingStart = new Date(`1970-01-01T${start}`);
    const bookingEnd = new Date(`1970-01-01T${end}`);

    return newStartTime < bookingEnd && newEndTime > bookingStart;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleTableClick = (tableNumber) => {
    if (!bookedTables.some((t) => t.tableNumber === tableNumber)) {
      setFormData({ ...formData, tableNumber });
    }
  };

  const handleGuestIncrease = () => setFormData((prev) => ({ ...prev, guests: Math.min(prev.guests + 1, 10) }));
  const handleGuestDecrease = () => setFormData((prev) => ({ ...prev, guests: Math.max(prev.guests - 1, 1) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.tableNumber) {
      setError("Please select a table before booking.");
      return;
    }
    setShowModal(true);
  };

  const confirmBooking = () => {
    const allBookings = getBookings();
    const startTime = new Date(`${formData.date}T${formData.time}`);
    const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000);
    const endTimeStr = endTime.toTimeString().slice(0, 5);

    const newBooking = { ...formData, endTime: endTimeStr };
    allBookings.push(newBooking);
    saveBookings(allBookings);

    alert(
      `✅ Thank you, ${formData.name}! Table ${formData.tableNumber} is booked for ${formData.time} on ${formData.date}.`
    );
    navigate("/");
  };

  const getTimeRemaining = (endTime, date) => {
    const now = new Date();
    const end = new Date(`${date}T${endTime}`);
    const diff = end - now;
    if (diff <= 0) return "Available soon";
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-1 relative">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={coffeeBg}
            alt="Coffee background"
            className="w-full h-full object-cover brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>
        </div>

        {/* Booking Form */}
        <div className="relative z-10 mt-20 py-10 px-4 sm:px-8">
          <div className="max-w-3xl mx-auto bg-white/80 p-10 rounded-3xl shadow-2xl backdrop-blur-lg border border-amber-200 transition-transform hover:scale-[1.01]">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-400 mb-4 text-center uppercase tracking-wide">
              Book Your Table
            </h1>
            <div className="w-28 h-1 bg-gradient-to-r from-amber-500 to-yellow-400 mx-auto mb-10 rounded-full shadow"></div>

            {error && (
              <div className="bg-red-200/80 text-red-900 p-3 mb-4 rounded-lg shadow-md text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name, Email, Phone */}
              {["name", "email", "phone"].map((field) => (
                <div key={field}>
                  <label className="block text-amber-900 font-semibold mb-2 capitalize">{field}</label>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    name={field}
                    required
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full p-3 border border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-400 outline-none transition"
                  />
                </div>
              ))}

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["date", "time"].map((field) => (
                  <div key={field}>
                    <label className="block text-amber-900 font-semibold mb-2 capitalize">{field}</label>
                    <input
                      type={field}
                      name={field}
                      required
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full p-3 border border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-400 outline-none transition"
                    />
                  </div>
                ))}
              </div>

              {/* Table Selection */}
              {formData.date && formData.time && (
                <div>
                  <label className="block text-amber-900 font-semibold mb-3">Select Your Table</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {Array.from({ length: TOTAL_TABLES }, (_, i) => {
                      const tableNum = i + 1;
                      const bookedInfo = bookedTables.find((t) => t.tableNumber === tableNum);
                      const isBooked = !!bookedInfo;
                      const isSelected = formData.tableNumber === tableNum;
                      return (
                        <button
                          type="button"
                          key={tableNum}
                          onClick={() => handleTableClick(tableNum)}
                          disabled={isBooked}
                          className={`p-5 flex flex-col items-center justify-center rounded-xl text-white font-bold shadow-lg transition transform hover:scale-110 active:scale-95 ${
                            isBooked
                              ? "bg-red-500/80 cursor-not-allowed"
                              : isSelected
                              ? "bg-green-700"
                              : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          <span className="text-xl">{tableNum}</span>
                          {isBooked && (
                            <span className="text-xs mt-1 px-2 py-0.5 rounded bg-black/50 text-yellow-300 font-medium">
                              {getTimeRemaining(bookedInfo.endTime, bookedInfo.date)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Guests */}
              <div>
                <label className="block text-amber-900 font-semibold mb-2">Number of Guests</label>
                <div className="flex items-center gap-4 w-max mx-auto">
                  <button
                    type="button"
                    onClick={handleGuestDecrease}
                    className="w-10 h-10 rounded-full bg-amber-100 text-[#8a4b27] font-bold text-xl hover:bg-amber-200"
                  >
                    –
                  </button>
                  <span className="text-2xl font-bold">{formData.guests}</span>
                  <button
                    type="button"
                    onClick={handleGuestIncrease}
                    className="w-10 h-10 rounded-full bg-amber-100 text-[#8a4b27] font-bold text-xl hover:bg-amber-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-amber-900 font-semibold mb-2">Special Requests</label>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full p-3 border border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-400 outline-none transition"
                ></textarea>
              </div>

              {/* Submit */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-500 text-white px-10 py-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-auto text-center shadow-2xl">
              <h2 className="text-2xl font-bold text-amber-700 mb-4">Confirm Your Booking</h2>
              <p className="mb-6 text-gray-700">
                Table <span className="font-bold">{formData.tableNumber}</span> on{" "}
                <span className="font-bold">{formData.date}</span> at{" "}
                <span className="font-bold">{formData.time}</span> for{" "}
                <span className="font-bold">{formData.guests}</span> guests.
              </p>
              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 rounded-lg border border-amber-400 text-amber-700 font-semibold hover:bg-amber-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-amber-700 via-amber-600 to-yellow-500 text-white font-semibold hover:shadow-lg transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BookTable;
