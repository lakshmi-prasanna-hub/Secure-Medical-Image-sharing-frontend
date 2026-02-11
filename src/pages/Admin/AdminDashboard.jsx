import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../Auth/UserContext';

const AdminDashboard = () => {
  const { user, logout } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 flex flex-col items-center">
      <motion.div
        className="max-w-2xl md:max-w-4xl w-full mx-auto mt-10 bg-slate-800/50 rounded-xl shadow-lg p-8 border border-slate-600 align-items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-center mb-6">
          <svg
            className="h-12 w-auto"
            viewBox="0 0 200 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="MedSecure Logo"
          >
            <path
              d="M20 35V20a10 10 0 0 1 10-10h10a10 10 0 0 1 10 10v15a10 10 0 0 1-10 10H30a10 10 0 0 1-10-10z"
              fill="#14b8a6"
            />
            <path
              d="M35 35V25a5 5 0 0 1 5-5h5a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5h-5a5 5 0 0 1-5-5z"
              fill="#ffffff"
            />
            <text
              x="60"
              y="35"
              fontFamily="Arial, sans-serif"
              fontSize="24"
              fontWeight="bold"
              fill="#14b8a6"
            >
              MedSecure
            </text>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-center mb-4 text-teal-400">
          Welcome, {user?.name || 'Admin'}!
        </h1>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
