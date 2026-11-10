import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { checkingSession, isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (checkingSession) {
    return <p role="status">Checking your session…</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }}  replace />;
  }

  // If allowedRoles exist, check if the user has the required role
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />; // Redirect unauthorized users
  }

  return <Outlet />;
};

export default ProtectedRoute;
