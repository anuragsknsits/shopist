import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => {
    console.log("auth " , state.auth);
    return state.auth;
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles exist, check if the user has the required role
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />; // Redirect unauthorized users
  }

  return <Outlet />;
};

export default ProtectedRoute;
