import React, { useState } from "react";
import { motion } from "framer-motion";
import { login } from "../Auth/AuthService";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Auth/UserContext";

const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useUser();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔄 Form submission started");
    setLoading(true);
    setError("");

    if (!validateEmail(email)) {
      console.warn("⚠️ Invalid email format:", email);
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await login(email, password);

      const { accessToken, user, success, msg } = response;

      if (success && accessToken) {
        localStorage.setItem("accessToken", accessToken);
        setUser(user);
        if (onSuccess) {
          onSuccess(user);
        }

        const userRole = user.role?.toUpperCase();

        const currentPath = window.location.pathname;

        switch (userRole) {
          case "ADMIN":
            if (currentPath !== "/admin") {
              navigate("/admin", { replace: true });
            } else {
              // 🔁 Force refresh if already on the page to re-trigger context and component load
              window.location.reload();
            }
            break;

          case "DOCTOR":
            if (currentPath !== "/doctor") {
              navigate("/doctor", { replace: true });
            } else {
              window.location.reload();
            }
            break;

          case "PATIENT":
          default:
            if (currentPath !== "/patient") {
              navigate("/patient", { replace: true });
            } else {
              window.location.reload();
            }
            break;
        }
      } else {
        console.error("❌ Login failed:", msg);
        setError(msg || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("🔥 Error during login:", err);

      if (err.response) {
        console.error(
          "🌐 Server responded with error:",
          err.response.status,
          err.response.data
        );

        if (err.response.status === 401) {
          setError("Invalid credentials. Please try again.");
        } else if (err.response.status === 429) {
          setError("Too many login attempts. Please try again later.");
        } else {
          setError(err.response.data?.msg || "Login failed. Please try again.");
        }
      } else {
        console.error("📡 Network or unknown error");
        setError("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
      console.log("✅ Finished login process");
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
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-slate-300 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          required
          disabled={loading}
          aria-describedby={error ? "email-error" : undefined}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-300 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
          required
          disabled={loading}
          aria-describedby={error ? "password-error" : undefined}
        />
      </div>

      {error && (
        <div id="error" className="text-red-400 text-sm py-2" role="alert">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-lg font-medium text-white ${
          loading
            ? "bg-teal-600 cursor-not-allowed"
            : "bg-teal-500 hover:bg-teal-600"
        } transition flex justify-center items-center`}
        aria-label={loading ? "Logging in" : "Login"}
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
          "Login"
        )}
      </button>
    </motion.form>
  );
};

export default LoginForm;
