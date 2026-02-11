import React from "react";
import { useUser } from "../Auth/UserContext";

const Dashboard = () => {
  const { user, logout } = useUser();
  return (
    <div className="p-6 max-w-2xl mx-auto mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.name || "User"}!
      </h1>
      <p>Email: {user?.email}</p>
      <button onClick={logout} className="btn mt-4">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
