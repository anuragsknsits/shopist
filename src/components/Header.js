import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaCaretDown, FaArrowRight } from "react-icons/fa";

const Header = ({ isAuthenticated, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  let timeoutId = useRef(null); // To store timeout ID

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const handleMouseEnter = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current); // Cancel hide timeout if mouse enters again
    }
    setShowMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      setShowMenu(false);
    }, 300); // Delay hiding by 300ms (0.3s)
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
        <div className="flex items-center space-x-6 relative">
          {isAuthenticated ? (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Profile Button */}
              <button className="text-gray-700 hover:text-gray-900 flex items-center space-x-2 px-4 py-2 bg-orange-500 text-white rounded-md">
                <FaUser className="text-white" />
                <span>My Profile</span>
                <FaCaretDown className="ml-2" />
              </button>

              {/* Styled Dropdown Menu */}
              {showMenu && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-lg z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="px-4 py-2 bg-gray-100 font-semibold">
                    My Profile
                  </div>
                  <ul className="space-y-1 p-2">
                    <li className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <Link to="/profile" className="w-full">Profile</Link>
                      <FaArrowRight className="text-gray-500" />
                    </li>
                    <li className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <Link to="/settings" className="w-full">Settings</Link>
                      <FaArrowRight className="text-gray-500" />
                    </li>
                    <li className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <Link to="/change-password" className="w-full">Change Password</Link>
                      <FaArrowRight className="text-gray-500" />
                    </li>
                    <li className="flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      <button onClick={handleLogout} className="w-full text-left">Logout</button>
                      <FaArrowRight className="text-gray-500" />
                    </li>
                  </ul>
                </div>
              )}
            </div>
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
