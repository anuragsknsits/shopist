import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-gray-700">VKAD Associates</span>
        </Link>

        {/* Navigation & Auth Links */}
        <div className="flex items-center space-x-6">
          {/* Show these links only if the user is authenticated */}
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-gray-900">My Profile</Link>
              <Link to="/settings" className="text-gray-700 hover:text-gray-900">Settings</Link>
              <button onClick={onLogout} className="text-gray-700 hover:text-gray-900">
                <FaSignOutAlt size={24} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>
              <Link to="/signup" className="text-gray-700 hover:text-gray-900">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
