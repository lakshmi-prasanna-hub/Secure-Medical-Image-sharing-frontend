import React, { useState } from "react";
import {
  FaImage,
  FaLock,
  FaUpload,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { useUser } from "../Auth/UserContext";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useUser();
  const [isMobileOpen, setIsMobileOpen,isLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    await logout(); 
    navigate("/");
  } finally {
    localStorage.removeItem('accessToken');
  }
};

  const getHomePath = () => {
    switch (user?.role) {
      case "Admin":
        return "/admin";
      case "Doctor":
        return "/doctor";
      case "Patient":
        return "/patient";
      default:
        return "/";
    }
  };

  const roleLinks = {
    Admin: [
      {
        name: "Manage Users",
        path: "/admin/users",
        icon: <FaUsers />,
      },
      { name: "Manage Images", path: "/admin/images", icon: <FaImage /> },
      { name: "Manage Secrets", path: "/admin/secrets", icon: <FaLock /> },
    ],
    Doctor: [
      {
        name: "View Patient Images",
        path: "/doctor/images",
        icon: <FaImage />,
      },
    ],
    Patient: [
      { name: "Upload Image", path: "/patient/upload", icon: <FaUpload /> },
      { name: "View My Images", path: "/patient/images", icon: <FaImage /> },
    ],
  };

  const commonLinks = [
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    {
      name: "Logout",
      path: "/login",
      icon: <FaSignOutAlt />,
      onClick: handleLogout,
    },
  ];

  const renderNavLinks = (links) =>
    links.map(({ name, path, icon, onClick }) => (
      <NavLink
        key={path}
        to={path}
        onClick={() => {
          setIsMobileOpen(false);
          if (onClick) onClick();
        }}
        className={({ isActive }) =>
          `flex items-center p-3 rounded-lg transition-all duration-150 ${
            isActive
              ? "bg-white text-teal-700 font-semibold"
              : "hover:bg-teal-600 text-white"
          }`
        }
      >
        {icon}
        <span className="ml-3">{name}</span>
      </NavLink>
    ));

  return (
    <>
      {/* Top Navbar for all users */}
      <nav className="bg-teal-600 shadow-md fixed w-full z-50 left-0 top-0">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <img
              src="https://img.freepik.com/free-vector/healthcare-medical-protection-shield-neon-style-background_1017-24669.jpg"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-lg font-bold text-white">MedSecure</span>
          </div>
          <div className="flex items-center gap-4 text-white">
            <NavLink
              to={getHomePath()}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? "bg-teal-700" : "hover:bg-teal-500"
                }`
              }
            >
              <FaHome className="mr-2" />
              Home
            </NavLink>

            <NavLink
              to="/profile"
              className="flex items-center px-3 py-2 rounded-md hover:bg-teal-500"
            >
              <FaUser className="mr-2" />
              Profile
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-md text-red-200 hover:bg-red-100 hover:text-red-600"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar for all users */}
      {user?.role && roleLinks[user.role] && (
        <aside className="hidden md:block fixed top-16 left-0 h-full w-64 bg-teal-700 text-white z-40">
          <div className="p-4 space-y-2">
            {renderNavLinks(roleLinks[user.role])}
          </div>
        </aside>
      )}
    </>
  );
};

export default Navbar;
