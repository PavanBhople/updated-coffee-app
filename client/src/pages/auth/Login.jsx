import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import coffeeBg from "../../assets/coffee-bg.jpg";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/login.json";
import TargetCursor from "../../components/TargetCursor";
import { motion } from "framer-motion";

// Floating Input Component
const FloatingInput = ({ id, label, type }) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        required
        className="peer w-full bg-white/10 border border-[#d4a76a] text-amber-100 px-4 py-3 pt-6 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a76a] transition-all cursor-target placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-2 text-sm text-[#d4a76a] pointer-events-none transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#d4a76a]"
      >
        {label}
      </label>
    </div>
  );
};

// Social Icon Component
const SocialIcon = ({ children, bg, hover }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`w-10 h-10 rounded-full ${bg} ${hover} text-white flex items-center justify-center transition-all cursor-target`}
    >
      {children}
    </motion.button>
  );
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (role) => {
    login({ name: "Test User", role }); // Store role in auth context
    navigate(role === "admin" ? "/admin" : "/user");
  };

  return (
    <div className="min-h-screen font-sans flex flex-col bg-[#0f0a06] text-amber-50 relative">
      <TargetCursor />
      <Header />

      <main className="flex-1 relative">
        {/* Enhanced Background with creative overlay (matches home page) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={coffeeBg}
            alt="Coffee background"
            className="w-full h-full object-cover object-center scale-100 lg:scale-110 transition-all duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a06]/90 via-[#0f0a06]/70 to-[#2c1c12]/60 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0f0a06/90)]"></div>
        </div>

        {/* Login Content */}
        <div className="relative z-10 pt-32 pb-16 px-4 sm:px-8 flex items-center justify-center min-h-[calc(100vh-140px)]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl w-full"
          >
            <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md bg-white/10 border border-white/10">
              
              {/* Animation Side */}
              <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-transparent p-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Lottie
                    animationData={loginAnimation}
                    loop
                    autoplay
                    className="w-full max-w-md h-[500px]"
                  />
                </motion.div>
              </div>

              {/* Login Form */}
              <div className="lg:w-1/2 w-full p-10 sm:p-12">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold text-center uppercase text-[#d4a76a] mb-10 tracking-wide"
                >
                  Welcome Back
                </motion.h2>

                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <FloatingInput id="username" label="Username" type="text" />
                  <FloatingInput id="password" label="Password" type="password" />

                  <div className="flex justify-end text-sm">
                    <a
                      href="#"
                      className="text-[#d4a76a] hover:text-amber-100 transition-all cursor-target"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Role-based Login Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => handleLogin("user")}
                      className="flex-1 bg-gradient-to-r from-[#8a4b27] to-[#d4a76a] text-black py-3 rounded-md font-bold uppercase tracking-wider shadow cursor-target"
                    >
                      Login as User
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => handleLogin("admin")}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-400 text-black py-3 rounded-md font-bold uppercase tracking-wider shadow cursor-target"
                    >
                      Login as Admin
                    </motion.button>
                  </div>
                </form>

                {/* Social Login */}
                <div className="mt-10 text-center">
                  <p className="text-amber-100 text-sm mb-4">Or login using</p>
                  <div className="flex justify-center gap-4">
                    <SocialIcon bg="bg-blue-500" hover="hover:bg-blue-600">
                      <FaFacebookF />
                    </SocialIcon>
                    <SocialIcon bg="bg-red-500" hover="hover:bg-red-600">
                      <FaGoogle />
                    </SocialIcon>
                    <SocialIcon bg="bg-blue-400" hover="hover:bg-blue-500">
                      <FaTwitter />
                    </SocialIcon>
                  </div>

                  {/* Register Link */}
                  <p className="mt-6 text-sm text-amber-100">
                    Don't have an account?{" "}
                    <a
                      href="/register"
                      className="font-medium text-[#d4a76a] hover:text-amber-100 transition-all cursor-target"
                    >
                      Sign up here
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}