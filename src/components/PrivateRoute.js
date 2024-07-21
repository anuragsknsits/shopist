import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated }) => {
  console.log('PrivateRoute isAuthenticated:', isAuthenticated);
  console.log('children:', children);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

