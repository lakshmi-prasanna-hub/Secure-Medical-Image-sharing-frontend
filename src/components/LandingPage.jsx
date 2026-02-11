import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AuthModal from './AuthModal';

const LandingPage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const features = [
    {
      title: 'Advanced Encryption',
      description: 'Symmetric, asymmetric, and hybrid cryptography to protect patient data during transmission and storage.',
      icon: '🔒',
    },
    {
      title: 'Digital Watermarking',
      description: 'Invisible, robust watermarking for authenticity, traceability, and integrity of medical images.',
      icon: '🖼️',
    },
    {
      title: 'Blockchain & FL',
      description: 'Decentralized ledger and federated learning for privacy-preserving collaboration without sharing raw data.',
      icon: '⛓️',
    },
  ];

  const stats = [
    { value: '99.9%', label: 'Uptime' },
    { value: '256-bit', label: 'Encryption' },
    { value: 'Zero', label: 'Data Breaches' },
    { value: 'HIPAA', label: 'Compliant' },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans min-h-screen flex flex-col">
      {/* Auth Modal */}
      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />

      {/* Navigation */}
      <nav className="px-6 md:px-20 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-teal-400">MedSecure</div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="hover:text-teal-400 transition">Features</a>
          <a href="#about" className="hover:text-teal-400 transition">About</a>
          <a href="#contact" className="hover:text-teal-400 transition">Contact</a>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => openAuthModal('login')}
            className="px-4 py-2 text-sm font-medium hover:text-teal-400 transition"
            aria-label="Login"
          >
            Login
          </button>
          <button
            onClick={() => openAuthModal('register')}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-full transition transform hover:scale-105"
            aria-label="Register"
          >
            Register
          </button>
        </div>
        <button className="md:hidden" aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="px-6 md:px-20 py-16 text-center flex-grow flex flex-col justify-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Secure Medical Image Sharing
          </h1>
          <p className="text-lg md:text-xl mb-8 text-slate-300">
            Explore cutting-edge technologies like encryption, watermarking, blockchain, and federated learning for secure and robust medical data transmission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openAuthModal('register')}
              className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-full shadow-lg transition"
              aria-label="Get Started"
            >
              Get Started
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-teal-400 text-teal-400 hover:bg-teal-900/50 font-medium rounded-full shadow-lg transition"
              aria-label="Learn More"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 md:px-20 py-16 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl font-bold text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Core Technologies
          </motion.h2>
          <motion.p
            className="text-center text-slate-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our platform integrates multiple security layers to ensure complete protection of medical imaging data.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-slate-700/50 p-8 rounded-xl shadow-lg hover:scale-105 transition backdrop-blur-sm border border-slate-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4" aria-hidden="true">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-20 py-16 bg-slate-900/50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-teal-400 mb-2">{stat.value}</div>
              <div className="text-sm uppercase tracking-wider text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 md:px-20 py-16">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Why Secure Sharing Matters</h2>
          <p className="mb-8 text-slate-300">
            Medical imaging is critical for diagnosis and treatment. Unauthorized access or tampering can lead to misdiagnosis and loss of trust. Our research focuses on integrating robust technologies to protect image confidentiality, integrity, and accessibility across systems.
          </p>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-2xl mt-8">
            <div className="w-full h-64 bg-slate-700 flex items-center justify-center">
              <span className="text-2xl">Video/Image Demonstration</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-20 py-16 bg-teal-600/10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Medical Data?</h2>
          <p className="mb-8 text-slate-300 max-w-2xl mx-auto">
            Join hundreds of healthcare providers who trust our platform for secure medical image sharing.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openAuthModal('register')}
            className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-full shadow-lg transition"
            aria-label="Request Demo"
          >
            Request Demo
          </motion.button>
        </motion.div>
      </section>

      {/* Admin Access Button (floating) */}
      <motion.button
        onClick={() => openAuthModal('admin')}
        className="fixed bottom-6 right-6 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center transition"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        aria-label="Admin Access"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Admin Access
      </motion.button>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 text-center text-sm text-gray-400">
        <div className="max-w-6xl mx-auto px-6 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="text-2xl font-bold text-teal-400 mb-4 md:mb-0">MedSecure</div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-teal-400 transition">Privacy</a>
              <a href="#" className="hover:text-teal-400 transition">Terms</a>
              <a href="#" className="hover:text-teal-400 transition">Contact</a>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-800">
            © {new Date().getFullYear()} Secure Imaging Research Lab. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;