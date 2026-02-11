import React,{ useState } from 'react';
import { motion } from 'framer-motion';
import { signup } from '../Auth/AuthService';

const RegisterForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    mobileNumber: '',
    role: 'Patient',
    address: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const validateMobileNumber = (mobile) => /^\+?\d{10,15}$/.test(mobile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image file size must be less than 5MB.');
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.fullName || !formData.email || !formData.password || !formData.mobileNumber || !formData.address || !formData.role) {
      setError('Please fill out all required fields.');
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.');
      setLoading(false);
      return;
    }

    if (!validateMobileNumber(formData.mobileNumber)) {
      setError('Please enter a valid mobile number.');
      setLoading(false);
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await signup(data);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setError(response.data.msg || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError(
        err.response?.data?.msg ||
        err.response?.data?.err ||
        'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Registration Successful!
        </h3>
        <p className="text-slate-300">
          You can now log in with your credentials.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          required
          aria-label="Full name"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          required
          aria-label="Email address"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          required
          aria-label="Password"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1">
          Role
        </label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          required
          aria-label="Role"
          disabled={loading}
        >
          <option value="Patient">Patient</option>
          <option value="Doctor">Doctor</option>
        </select>
      </div>


      <div>
        <label htmlFor="mobileNumber" className="block text-sm font-medium text-slate-300 mb-1">
          Mobile Number
        </label>
        <input
          type="tel"
          id="mobileNumber"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          required
          aria-label="Mobile number"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-slate-300 mb-1">
          Address
        </label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          required
          aria-label="Address"
          disabled={loading}
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-slate-300 mb-1">
          Profile Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600 transition"
          accept="image/*"
          aria-describedby="image-help"
          disabled={loading}
        />
        <p id="image-help" className="text-xs text-slate-400 mt-1">
          Upload a profile image (optional, max 5MB).
        </p>
      </div>

      {error && (
        <div className="text-red-400 text-sm py-2" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-lg font-medium text-white ${loading ? 'bg-teal-600 cursor-not-allowed' : 'bg-teal-500 hover:bg-teal-600'} transition flex justify-center items-center`}
        aria-label={loading ? 'Registering' : 'Register'}
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
            Registering...
          </>
        ) : (
          'Register'
        )}
      </button>
    </motion.form>
  );
};

export default RegisterForm;