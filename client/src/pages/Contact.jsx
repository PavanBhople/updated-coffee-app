import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import coffeeBg from "../assets/coffee-bg.jpg";
import Lottie from "lottie-react";
import contactAnimation from "../assets/contact.json";
import TargetCursor from "../components/TargetCursor";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    const { name, email, phone, subject, message } = formData;
    if (!name || !email || !phone || !subject || !message) {
      setError("Please fill out all fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return false;
    }
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Placeholder: Replace with API/email service integration
    console.log("Form Submitted:", formData);

    setSuccess("✅ Your message has been sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen font-sans flex flex-col bg-[#0f0a06] text-amber-50 relative">
      <TargetCursor />
      <Header />

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

        {/* Content */}
        <div className="relative z-10 pt-32 pb-20 px-4 sm:px-8 md:px-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-5xl sm:text-6xl font-bold text-[#d4a76a] text-center uppercase tracking-wider mb-16 drop-shadow-lg">
              Let's Talk Coffee
            </h1>

            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Animation */}
              <div className="lg:w-1/2 flex justify-center">
                <div className="w-full max-w-lg">
                  <Lottie animationData={contactAnimation} loop autoplay />
                </div>
              </div>

              {/* Form */}
              <div className="lg:w-1/2 w-full bg-white/10 border border-white/10 backdrop-blur-md shadow-2xl rounded-2xl p-10">
                {error && (
                  <div className="bg-red-200/80 text-red-900 p-3 mb-4 rounded-lg shadow-md text-center">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-200/80 text-green-900 p-3 mb-4 rounded-lg shadow-md text-center">
                    {success}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloatingInput
                      label="Name"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                    />
                    <FloatingInput
                      label="Email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FloatingInput
                      label="Phone"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                    />
                    <FloatingInput
                      label="Subject"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      type="text"
                    />
                  </div>

                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      className="w-full bg-white/10 border border-[#d4a76a] text-amber-100 px-4 py-3 pt-6 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#d4a76a] transition-all cursor-target"
                      required
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-4 top-2 text-sm text-[#d4a76a] pointer-events-none transition-all"
                    >
                      Your Message
                    </label>
                  </div>

                  <div className="text-center">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(212,167,106,0.8)" }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-3 bg-gradient-to-r from-[#8a4b27] to-[#d4a76a] text-black font-bold uppercase rounded-md tracking-wider transition-transform shadow-md cursor-target"
                    >
                      Send Message
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-20 bg-gradient-to-r from-[#2e1800] via-[#3b1f00] to-[#2e1800] bg-opacity-90 text-white p-8 sm:p-12 rounded-xl shadow-inner">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                <div>
                  <h3 className="text-lg font-bold text-[#d4a76a] mb-2">Phone</h3>
                  <p className="text-amber-100/90">+91 1234567890</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#d4a76a] mb-2">Email</h3>
                  <p className="text-amber-100/90">contact@coffeehouse.com</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#d4a76a] mb-2">Address</h3>
                  <p className="text-amber-100/90">
                    123 Coffee Street, Pune, Maharashtra 411048
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Floating Input Field Component
const FloatingInput = ({ label, id, name, type, value, onChange }) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder={label}
        className="w-full bg-white/10 border border-[#d4a76a] text-amber-100 px-4 py-3 pt-6 rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#d4a76a] transition-all cursor-target"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-sm text-[#d4a76a] pointer-events-none transition-all"
      >
        {label}
      </label>
    </div>
  );
};

export default Contact;
