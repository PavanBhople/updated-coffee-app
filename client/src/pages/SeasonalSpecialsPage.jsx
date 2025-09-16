import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScratchCard from "react-scratchcard"; // npm install react-scratchcard
import diwaliImage from "../assets/diwali.jpg";
import christmasImage from "../assets/christmas.jpg";

const events = [
  {
    id: 1,
    title: "Diwali Celebration",
    image: diwaliImage,
    date: "12th November 2025",
    time: "6:00 PM – 10:00 PM",
    location: "Coffee House, Main Street, Pune",
    description:
      "Celebrate the festival of lights with live music, festive drinks, and delicious sweets. Enjoy our special Diwali-themed menu and fun activities for the whole family.",
    activities: [
      "Live Music Performance",
      "Diya Lighting Ceremony",
      "Special Diwali Menu",
      "Games & Activities",
    ],
    tickets: {
      standard: 299,
      vip: 499,
    },
  },
  {
    id: 2,
    title: "Christmas Special Night",
    image: christmasImage,
    date: "24th December 2025",
    time: "7:00 PM – 11:00 PM",
    location: "Coffee House, Main Street, Pune",
    description:
      "Join us for a magical Christmas evening with festive decorations, live carols, Christmas treats, and warm holiday drinks.",
    activities: [
      "Live Carol Singing",
      "Christmas Cookie Workshop",
      "Special Drinks & Desserts",
      "Gift Exchange Fun",
    ],
    tickets: {
      standard: 349,
      vip: 599,
    },
  },
];

const EventPage = () => {
  const navigate = useNavigate();

  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [ticketType, setTicketType] = useState("standard");
  const [tickets, setTickets] = useState(1);

  const [discount, setDiscount] = useState(0);
  const [scratched, setScratched] = useState(false);

  const ticketPrice = selectedEvent.tickets[ticketType];
  const totalPrice = tickets * ticketPrice;
  const finalTotal = totalPrice - discount;

  const scratchOptions = { width: 280, height: 160, finishPercent: 50 };

  const handleScratchComplete = () => {
    const randomDiscount = Math.floor(Math.random() * 51); // ₹0 - ₹50
    setDiscount(randomDiscount);
    setScratched(true);
  };

  const handleIncrease = () => setTickets((prev) => prev + 1);
  const handleDecrease = () => { if (tickets > 1) setTickets((prev) => prev - 1); };

  const handlePurchase = () => {
    navigate("/cart", { state: { event: selectedEvent, tickets, ticketType, ticketPrice, totalPrice: finalTotal } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50 to-white font-sans">
      <Header />

      <main className="flex-1">
        {/* Event Selector Tabs */}
        <section className="max-w-5xl mx-auto px-6 py-8 flex justify-center gap-4 flex-wrap">
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => {
                setSelectedEvent(event);
                setTicketType("standard");
                setTickets(1);
                setDiscount(0);
                setScratched(false);
              }}
              className={`px-6 py-2 rounded-lg border-2 font-medium ${
                selectedEvent.id === event.id
                  ? "bg-[#8a4b27] text-white border-[#8a4b27]"
                  : "border-[#8a4b27] text-[#8a4b27] hover:bg-amber-100"
              }`}
            >
              {event.title}
            </button>
          ))}
        </section>

        {/* Hero Section */}
        <section className="relative w-full h-[60vh] md:h-[65vh] overflow-hidden">
          <img
            src={selectedEvent.image}
            alt={selectedEvent.title}
            className="absolute inset-0 w-full h-full object-cover brightness-75 transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {selectedEvent.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-sm">
              {selectedEvent.description}
            </p>
          </div>
        </section>

        {/* Event Highlights */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-bold text-[#4a2600] mb-10 text-center">Event Highlights</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-[#8a4b27] mb-3">📅 Date & Time</h3>
              <p className="text-gray-700">{selectedEvent.date}</p>
              <p className="text-gray-700">{selectedEvent.time}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-[#8a4b27] mb-3">📍 Location</h3>
              <p className="text-gray-700">{selectedEvent.location}</p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold text-[#8a4b27] mb-3">🎉 Activities</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                {selectedEvent.activities.map((activity, idx) => (
                  <li key={idx}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tickets Section */}
        <section className="bg-[#fdf6f0] py-20 px-6 border-t border-amber-200">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#4a2600] mb-6">🎟️ Reserve Your Spot</h2>
            <p className="text-gray-700 mb-12 text-lg">
              Select your ticket type, quantity, and enjoy exclusive discounts.
            </p>

            {/* Ticket Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {["standard", "vip"].map((type) => {
                const price = selectedEvent.tickets[type];
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

                    {/* Scratch Card & Total */}
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

export default EventPage;
