import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useLocation,
} from "react-router-dom";
import { UserProvider } from "./Auth/UserContext";
import ProtectedRoute from "./Auth/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import AdminDashboard from "./pages/Admin/adminDashboard";
import DoctorDashboard from "./pages/Doctor/doctorDashboard";
import PatientDashboard from "./pages/Patient/patientDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ManageDoctors from "./pages/Admin/UserManagement";
import ManageSecrets from "./pages/Admin/ManageSecrets";
import ManageImages from "./pages/Admin/ManageImages";
import Profile from "./pages/Profile";
import PatientUploadImage from "./pages/Patient/PatientUploadImage";
import PatientViewHisImages from "./pages/Patient/PatientViewHisImages";
import DoctorImageAccess from "./pages/Doctor/DoctorImageAccess";
import Unauthorized401 from "./temp/Unauthorized401";

// Layout components for role-based routing
const AdminLayout = () => (
  <div className="admin-layout min-h-screen pt-16 md:pl-64">
    <div className="admin-content p-6">
      <Outlet />
    </div>
  </div>
);

const DoctorLayout = () => (
  <div className="doctor-layout min-h-screen pt-16 md:pl-64">
    <div className="doctor-content p-6">
      <Outlet />
    </div>
  </div>
);

const PatientLayout = () => (
  <div className="patient-layout min-h-screen pt-16 md:pl-64">
    <div className="patient-content p-6">
      <Outlet />
    </div>
  </div>
);

// Main content component to handle Navbar visibility
const AppContent = () => {
  const location = useLocation();
  const hideNavbarOn = ["/"];
  const showNavbar = !hideNavbarOn.includes(location.pathname);

  return (
    <div className="app-container">
      {showNavbar && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/unauthorize" element={<Unauthorized401 />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              index
              element={
                <ProtectedRoute requiredRole="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="users" element={<ManageDoctors />} />
            <Route path="secrets" element={<ManageSecrets />} />
            <Route path="images" element={<ManageImages />} />
          </Route>

          {/* Doctor routes */}
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route
              index
              element={
                <ProtectedRoute requiredRole="Doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="images" element={<DoctorImageAccess/>} />
          </Route>

          {/* Patient routes */}
          <Route path="/patient" element={<PatientLayout />}>
            <Route
              index
              element={
                <ProtectedRoute requiredRole="Patient">
                  <PatientDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="upload" element={<PatientUploadImage />} />
            <Route path="images" element={<PatientViewHisImages />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  );
};

// Wrap Router outside the component
const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
