import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpLink = () => {
  const [showRoles, setShowRoles] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    setShowRoles(false);  // Hide the role list after selection
    navigate(`/signup/${role}`);  // Navigate to the role-specific signup page
  };

  return (
    <div className="relative">
      {/* Sign Up Link */}
      <button
        className="text-blue-500 hover:text-blue-700"
        onMouseEnter={() => setShowRoles(true)}  // Show roles on hover
        onMouseLeave={() => setShowRoles(false)} // Hide roles on mouse leave
      >
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
  );
};

export default SignUpLink;
