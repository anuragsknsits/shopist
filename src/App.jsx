// src/App.js
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiErrorMessage, shopApi, useLogoutMutation } from "./api/shopApi";
import { selectIsAuthenticated } from "./components/selectors/authSelectors";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Client from "./pages/Client";
import ChangePassword from "./components/auth/ChangePassword";
import AboutUs from "./pages/About";
import Contact from "./pages/Contact";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgetPassword from "./components/auth/ForgetPassword";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [logout, { isLoading: loggingOut, error: logoutError }] = useLogoutMutation();

  const handleLogout = async () => {
    if (loggingOut) return;
    const result = await logout();
    if ('data' in result) {
      dispatch(shopApi.util.resetApiState());
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="flex">
      {/* Sidebar - Visible only for authenticated users */}
      {isAuthenticated && <Sidebar />}

      {/* Main Content */}
      <div className="flex-1 p-5">
        <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} loggingOut={loggingOut} />
        {logoutError && <p role="alert">{apiErrorMessage(logoutError, "Logout failed. Try again.")}</p>}

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />

          {/* Protected Routes (Only for Authenticated Users) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>

          {/* Employee-Specific Routes (Only for Admin or Employees) */}
          <Route element={<ProtectedRoute allowedRoles={["ADMIN", "EMPLOYEE"]} />} />

          {/* Client Routes (Only for Clients) */}
          <Route element={<ProtectedRoute allowedRoles={["CLIENT"]} />}>
            <Route path="/clients" element={<Client />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
