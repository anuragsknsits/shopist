import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-gray-700">
            VKAD Associates
          </span>
        </Link>

        {/* Navigation & Auth Links */}
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-gray-900">
                My Profile
              </Link>
              <Link to="/settings" className="text-gray-700 hover:text-gray-900">
                Settings
              </Link>
              <Link to="/" onClick={onLogout} className="text-gray-700 hover:text-gray-900 flex items-center">
                <span className="ml-2">Logout</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link to="/signup" className="text-gray-700 hover:text-gray-900">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
