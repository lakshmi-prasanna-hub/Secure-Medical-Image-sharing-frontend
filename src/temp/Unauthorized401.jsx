import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Unauthorized401 = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && typeof audio.play === "function") {
      audio.play().catch(() => {
        console.warn("Audio playback was blocked.");
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 to-black flex flex-col items-center justify-center text-white px-4">
      {/* ✅ Audio: works in all React setups */}
      <audio ref={audioRef} src="/assets/alert.mp3" preload="auto" />

      <motion.img
        src="/unauthorized.jpg"
        alt="Unauthorized"
        className="w-64 h-64 mb-6 animate-pulse"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      <motion.h1
        className="text-5xl font-black text-center mb-3 glitch"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        401 Unauthorized
      </motion.h1>

      <motion.p
        className="text-xl text-gray-300 text-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        You do not have access to this page.
      </motion.p>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <Link to="/" className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-semibold transition">
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Unauthorized401;
