import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AdminLoginForm from './AdminLoginForm';

const AuthModal = ({ show, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: '-100vh', opacity: 0 },
    visible: {
      y: '0',
      opacity: 1,
      transition: { type: 'spring', damping: 25, stiffness: 500 },
    },
    exit: { y: '100vh', opacity: 0 },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="relative bg-slate-800 rounded-xl shadow-2xl p-8 w-full max-w-md mx-4"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex justify-center mb-6">
              {mode !== 'admin' && (
                <div className="flex space-x-1 bg-slate-700 rounded-full p-1">
                  <button
                    onClick={() => setMode('login')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${mode === 'login' ? 'bg-teal-500 text-white' : 'text-slate-300 hover:text-white'}`}
                    aria-label="Switch to Login"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setMode('register')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${mode === 'register' ? 'bg-teal-500 text-white' : 'text-slate-300 hover:text-white'}`}
                    aria-label="Switch to Register"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            <div className="mt-6">
              {mode === 'login' && <LoginForm onSuccess={onClose} />}
              {mode === 'register' && <RegisterForm onSuccess={onClose} />}
              {mode === 'admin' && <AdminLoginForm onSuccess={onClose} />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;