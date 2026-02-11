import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { login } from '../Auth/AuthService';

const AdminLoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await login(email, password);
      const { accessToken, user, success, msg } = response;

      if (success && accessToken && user.role?.toUpperCase() === 'ADMIN') {
        localStorage.setItem('accessToken', accessToken);
        if (onSuccess) onSuccess();
        navigate('/admin');
      } else {
        setError('Admin access denied. Please use admin credentials.');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid admin credentials. Please try again.');
        } else if (err.response.status === 429) {
          setError('Too many login attempts. Please try again later.');
        } else {
          setError(err.response.data?.msg || 'Admin login failed. Please try again.');
        }
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <h3 className="text-xl font-semibold text-white mb-4">Admin Login</h3>
      <div>
        <label htmlFor="admin-email" className="block text-sm font-medium text-slate-300 mb-1">
          Admin Email
        </label>
        <input
          type="email"
          id="admin-email"
          name="email"
          value={email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          required
          disabled={loading}
          aria-describedby={error ? 'admin-email-error' : undefined}
        />
      </div>

      <div>
        <label htmlFor="admin-password" className="block text-sm font-medium text-slate-300 mb-1">
          Admin Password
        </label>
        <input
          type="password"
          id="admin-password"
          name="password"
          value={password}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          required
          disabled={loading}
          aria-describedby={error ? 'admin-password-error' : undefined}
        />
      </div>

      {error && (
        <div id="admin-error" className="text-red-400 text-sm py-2" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-lg font-medium text-white ${loading ? 'bg-teal-600 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'} transition flex justify-center items-center`}
        aria-label={loading ? 'Logging in as Admin' : 'Admin Login'}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Logging in...
          </>
        ) : (
          'Admin Login'
        )}
      </button>
    </motion.form>
  );
};

export default AdminLoginForm;