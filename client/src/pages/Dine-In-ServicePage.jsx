import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScratchCard from "react-scratchcard"; // npm install react-scratchcard
import dineInImage from "../assets/dine-in.jpg";

const DineInPage = () => {
  const navigate = useNavigate();

  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [discount, setDiscount] = useState(0);
  const [scratched, setScratched] = useState(false);

  const pricePerGuest = 200; // Example pricing per guest
  const totalPrice = guests * pricePerGuest;
  const finalTotal = totalPrice - discount;

  const scratchOptions = { width: 280, height: 160, finishPercent: 50 };

  const handleScratchComplete = () => {
    const randomDiscount = Math.floor(Math.random() * 51); // ₹0 - ₹50
    setDiscount(randomDiscount);
    setScratched(true);
  };

  const handleIncrease = () => setGuests((prev) => prev + 1);
  const handleDecrease = () => { if (guests > 1) setGuests((prev) => prev - 1); };

  const handleReservation = () => {
    if (!date || !time) {
      alert("📅 Please select date and time before booking.");
      return;
    }
    navigate("/cart", { state: { type: "Dine-In", guests, date, time, totalPrice: finalTotal } });
    setDate("");
    setTime("");
    setGuests(2);
    setDiscount(0);
    setScratched(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white font-sans">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[65vh] overflow-hidden">
          <img
            src={dineInImage}
            alt="Dine In"
            className="absolute inset-0 w-full h-full object-cover brightness-75 transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Dine-In Experience
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-sm">
              Reserve a cozy table and enjoy your favorite coffee & meals in a warm, welcoming ambiance.
            </p>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-[#4a2600] mb-10 text-center">🍽 Why Choose Dine-In?</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-[#8a4b27] mb-3">🪑 Seating</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Cozy indoor seating</li>
                <li>Outdoor garden tables</li>
                <li>Family-friendly sections</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-[#8a4b27] mb-3">⏰ Timings</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Monday – Friday: 10 AM – 10 PM</li>
                <li>Saturday – Sunday: 9 AM – 11 PM</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Reservation Section */}
        <section className="bg-[#fdf6f0] py-20 px-6 border-t border-amber-200">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#4a2600] mb-6">📅 Reserve Your Table</h2>
            <p className="text-gray-700 mb-12 text-lg">
              Book your table online in just a few clicks. Select the date, time, and number of guests.
            </p>

            {/* Guest Selector */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={handleDecrease}
                className="w-10 h-10 rounded-full bg-amber-100 text-[#8a4b27] text-xl font-bold hover:bg-amber-200 transition-colors"
              >
                –
              </button>
              <span className="text-2xl font-bold">{guests}</span>
              <button
                onClick={handleIncrease}
                className="w-10 h-10 rounded-full bg-amber-100 text-[#8a4b27] text-xl font-bold hover:bg-amber-200 transition-colors"
              >
                +
              </button>
            </div>

            {/* Date & Time */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg"
              />
            </div>

            {/* Scratch Card */}
            <div className="relative max-w-sm mx-auto bg-gradient-to-br from-yellow-200 via-amber-100 to-yellow-300 p-[2px] rounded-xl shadow-xl mb-8">
              <div className="bg-white rounded-xl px-6 py-8 flex flex-col items-center text-center">
                <h3 className="text-2xl font-extrabold text-[#8a4b27] mb-3">Special Discount!</h3>
                {!scratched ? (
                  <ScratchCard
                    {...scratchOptions}
                    onComplete={handleScratchComplete}
                    className="rounded-xl shadow-lg cursor-pointer mb-3"
                  >
                    <div className="w-full h-36 flex items-center justify-center bg-yellow-200 rounded-xl">
                      <span className="text-lg font-bold text-[#8a4b27]">
                        Scratch to Reveal Discount!
                      </span>
                    </div>
                  </ScratchCard>
                ) : (
                  <p className="text-green-700 font-bold text-lg mb-2">
                    🎉 You got ₹{discount} off!
                  </p>
                )}
                <p className="text-xl font-extrabold text-[#6e3a1f]">Total: ₹{finalTotal}</p>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleReservation}
              className="bg-gradient-to-r from-amber-400 to-yellow-400 text-[#4a2600] px-12 py-4 rounded-full text-lg font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
            >
              Book Now
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DineInPage;
