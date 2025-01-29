import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa"; // Dropdown arrow icon

const Header = ({ isAuthenticated, onLogout }) => {
  const [showRoles, setShowRoles] = useState(false);
  const dropdownRef = useRef(null); // Reference for tracking mouse movement

  const handleMouseEnter = () => {
    setShowRoles(true);
  };

  const handleMouseLeave = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setShowRoles(false);
    }
  };

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
              <Link
                to="/profile"
                className="text-gray-700 hover:text-gray-900"
              >
                My Profile
              </Link>
              <Link
                to="/settings"
                className="text-gray-700 hover:text-gray-900"
              >
                Settings
              </Link>
              <Link
                to="/"
                onClick={onLogout}
                className="text-gray-700 hover:text-gray-900 flex items-center"
              >
                <span className="ml-2">Logout</span>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>

              {/* Styled Sign Up Button with Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center bg-white-500 text-gray-700 px-4 py-2 rounded-full hover:bg-grey-600">
                  Sign Up <FaCaretDown className="ml-2" />
                </button>

                {/* Role Selection Dropdown */}
                {showRoles && (
                  <div
                    ref={dropdownRef}
                    className="absolute top-10 left-0 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
                  >
                    <ul className="space-y-2 p-2">
                      <li>
                        <Link
                          to="/signup/employee"
                          className="block text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          Employee
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/signup/employer"
                          className="block text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          Employer
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/signup/admin"
                          className="block text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                          Admin
                        </Link>
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
