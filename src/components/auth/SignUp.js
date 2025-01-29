import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const SignUp = () => {
  const { role } = useParams();  // Get role from URL
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    firmName: '',  // Only for Admin/Employer
  });

  const handleChange = ({ target: { name, value } }) => {
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle API call for signup based on the role
    console.log({ ...user, role });  // For now, just log the data
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Sign Up as {role}</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              required
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Conditional fields for each role */}
          {(role === 'employer' || role === 'admin') && (
            <div className="flex flex-col">
              <label htmlFor="firmName" className="text-gray-700">Firm Name</label>
              <input
                type="text"
                name="firmName"
                value={user.firmName}
                onChange={handleChange}
                placeholder="Enter Firm Name"
                required
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Email and Password Fields */}
          <div className="flex flex-col">
            <label htmlFor="emailId" className="text-gray-700">Email ID</label>
            <input
              type="email"
              name="emailId"
              value={user.emailId}
              onChange={handleChange}
              placeholder="Enter Email ID"
              required
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
