import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import liveMusicImage from "../assets/live-music.jpg";
import artist1 from "../assets/artist1.jpg";
import artist2 from "../assets/artist2.jpg";
import artist3 from "../assets/artist3.jpg";
import ScratchCard from "react-scratchcard"; // npm install react-scratchcard

const LiveMusicPage = () => {
  const navigate = useNavigate();

  // Ticket state
  const [tickets, setTickets] = useState(1);
  const [ticketType, setTicketType] = useState("standard");

  // Prices
  const ticketPrices = { standard: 299, vip: 499 };
  const ticketPrice = ticketPrices[ticketType];
  const totalPrice = tickets * ticketPrice;

  // Countdown
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateNextEvent = () => {
    const now = new Date();
    const day = now.getDay();
    let nextEventDate = new Date(now);
    if (day <= 5) nextEventDate.setDate(now.getDate() + (5 - day));
    else nextEventDate.setDate(now.getDate() + (12 - day));
    nextEventDate.setHours(19, 0, 0, 0);
    return nextEventDate;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const eventTime = calculateNextEvent().getTime();
      const now = new Date().getTime();
      const distance = eventTime - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleIncrease = () => setTickets((prev) => prev + 1);
  const handleDecrease = () => { if (tickets > 1) setTickets((prev) => prev - 1); };
  const handlePurchase = () => {
    navigate("/cart", { state: { tickets, ticketType, ticketPrice, totalPrice: finalTotal } });
  };

  // Scratch Card
  const [discount, setDiscount] = useState(0);
  const [scratched, setScratched] = useState(false);
  const finalTotal = totalPrice - discount;

  const scratchOptions = { width: 280, height: 160, finishPercent: 50 };

  const handleScratchComplete = () => {
    const randomDiscount = Math.floor(Math.random() * 51);
    setDiscount(randomDiscount);
    setScratched(true);
  };

  // Artists
  const artists = [
    { name: "Acoustic Band", image: artist1, genre: "Acoustic" },
    { name: "Open Mic Stars", image: artist2, genre: "Open Mic" },
    { name: "Special Guest", image: artist3, genre: "Live Performance" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white font-sans">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[65vh] md:h-[70vh] overflow-hidden">
          <img
            src={liveMusicImage}
            alt="Live Music"
            className="absolute inset-0 w-full h-full object-cover brightness-75 transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
              Live Music Nights
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-sm">
              Soulful evenings every Friday & Saturday at your favorite coffee house.
            </p>
          </div>
        </section>

        {/* Event Highlights */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-[#4a2600] mb-10 text-center">Event Highlights</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-[#8a4b27] mb-3">📅 When</h3>
              <ul className="space-y-2 text-gray-700 text-lg">
                <li>Friday: 7:00 PM – 9:00 PM</li>
                <li>Saturday: 7:00 PM – 9:00 PM</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-[#8a4b27] mb-3">🎤 Performances</h3>
              <p className="text-gray-700 text-lg">Local artists bringing soulful live performances.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-[#8a4b27] mb-3">📍 Location</h3>
              <p className="text-gray-700 text-lg">Coffee House, Main Street, Pune</p>
            </div>
          </div>
        </section>

        {/* Countdown */}
        <section className="max-w-3xl mx-auto px-6 mb-12 text-center">
          <p className="text-xl md:text-2xl text-[#8a4b27] font-semibold">Next Event Starts In:</p>
          <div className="flex justify-center gap-6 mt-4 text-3xl md:text-4xl font-extrabold text-[#4a2600]">
            <span>{timeLeft.days}d</span>
            <span>{timeLeft.hours}h</span>
            <span>{timeLeft.minutes}m</span>
            <span>{timeLeft.seconds}s</span>
          </div>
        </section>

        {/* Artist Spotlight */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-[#4a2600] mb-10 text-center">🎶 Meet Our Artists</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {artists.map((artist, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-[#8a4b27]">{artist.name}</h3>
                  <p className="text-gray-600 text-lg">{artist.genre}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tickets */}
        <section className="bg-[#fdf6f0] py-20 px-6 border-t border-amber-200">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#4a2600] mb-6">🎟️ Reserve Your Spot</h2>
            <p className="text-gray-700 mb-12 text-lg">
              Select your ticket type, quantity, and enjoy exclusive discounts.
            </p>

            {/* Ticket Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {["standard", "vip"].map((type) => {
                const price = ticketPrices[type];
                return (
                  <div
                    key={type}
                    className={`relative bg-white rounded-3xl shadow-xl p-8 transition-transform duration-300 hover:scale-105 border-2 ${
                      ticketType === type ? "border-amber-400" : "border-transparent"
                    }`}
                  >
                    {type === "vip" && (
                      <span className="absolute top-4 right-4 bg-amber-400 text-white font-bold px-4 py-1 rounded-full text-sm uppercase">
                        VIP
                      </span>
                    )}

                    <h3 className="text-2xl font-extrabold text-[#8a4b27] mb-4">
                      {type === "standard" ? "Standard" : "VIP"} Ticket
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {type === "vip"
                        ? "Entry + Coffee + Priority Seating"
                        : "Entry + 1 Complimentary Coffee"}
                    </p>
                    <p className="text-2xl font-bold text-[#4a2600] mb-4">₹{price}</p>

                    {/* Quantity Selector */}
                    {ticketType === type && (
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <button
                          onClick={handleDecrease}
                          className="w-10 h-10 rounded-full bg-amber-100 text-[#8a4b27] text-xl font-bold hover:bg-amber-200 transition-colors"
                        >
                          –
                        </button>
                        <span className="text-2xl font-bold">{tickets}</span>
                        <button
                          onClick={handleIncrease}
                          className="w-10 h-10 rounded-full bg-amber-100 text-[#8a4b27] text-xl font-bold hover:bg-amber-200 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    )}

                    {/* Discount & Total */}
                    {ticketType === type && (
                      <div className="mt-4">
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
                        <p className="text-xl font-extrabold text-[#6e3a1f]">
                          Total: ₹{finalTotal}
                        </p>
                      </div>
                    )}

                    {/* Select Ticket Button */}
                    <button
                      onClick={() => setTicketType(type)}
                      className={`mt-6 w-full py-3 rounded-full text-white font-semibold uppercase tracking-wide transition-colors duration-300 ${
                        ticketType === type
                          ? "bg-amber-400 hover:bg-amber-500"
                          : "bg-[#8a4b27] hover:bg-[#6e3a1f]"
                      }`}
                    >
                      {ticketType === type ? "Selected" : "Select Ticket"}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Checkout Button */}
            <div className="mt-12">
              <button
                onClick={handlePurchase}
                className="bg-gradient-to-r from-amber-400 to-yellow-400 text-[#4a2600] px-12 py-4 rounded-full text-lg font-bold uppercase tracking-wider shadow-lg hover:scale-105 transition-transform"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LiveMusicPage;
