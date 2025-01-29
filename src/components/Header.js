import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = ({ isAuthenticated, onLogout }) => {
  const [showRoles, setShowRoles] = useState(false);  // State to control the role dropdown visibility

  const handleRoleSelection = (role) => {
    setShowRoles(false);  // Hide the role list after selection
    window.location.href = `/signup/${role}`;  // Navigate to the role-specific signup page
  };

  const handleMouseEnter = () => {
    setShowRoles(true); // Show the dropdown when hovering over the button
  };

  const handleMouseLeave = (e) => {
    // Hide the dropdown only when the mouse leaves both the button and the dropdown
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowRoles(false);
    }
  };

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
              <Link to="/" onClick={onLogout} className="text-gray-700 hover:text-gray-900 flex items-center">
                <FaSignOutAlt size={24} />
                <span className="ml-2">Logout</span> {/* Optional text to add next to the icon */}
              </Link>̥
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-gray-900">Login</Link>

              {/* Sign Up Link with Hover Effect */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="text-blue-500 hover:text-blue-700">
                  Sign Up
                </button>

                {/* Role Selection Dropdown */}
                {showRoles && (
                  <div className="absolute top-8 left-0 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <ul className="space-y-2 p-2">
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                          onClick={() => handleRoleSelection('employee')}
                        >
                          Employee
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                          onClick={() => handleRoleSelection('employer')}
                        >
                          Employer
                        </button>
                      </li>
                      <li>
                        <button
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                          onClick={() => handleRoleSelection('admin')}
                        >
                          Admin
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
