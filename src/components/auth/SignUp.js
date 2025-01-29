import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerRequest } from '../../redux/actions/signupAction';
import { fetchRolesRequest } from '../../redux/actions/roleActions';

const SignUp = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    role: '',
    firmName: '',  // Only for Admin/Employer
  });
  const [roleSelection, setRoleSelection] = useState(null);  // Track if the user has selected a role
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchRolesRequest());
  }, [dispatch]);

  const { roles, loading: rolesLoading, error: rolesError } = useSelector(state => state.role);
  const { loading, error } = useSelector(state => state.user);

  const handleChange = ({ target: { name, value } }) => {
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleRoleChange = (role) => {
    setRoleSelection(role);
    setUser(prevState => ({ ...prevState, role }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerRequest(user));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center mb-6">Sign Up</h1>

        {/* Role Selection */}
        {!roleSelection && (
          <div className="space-y-4">
            <p className="text-gray-700">Please select your role:</p>
            <div className="flex justify-around">
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => handleRoleChange('Employee')}
              >
                Employee
              </button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => handleRoleChange('Employer')}
              >
                Employer
              </button>
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => handleRoleChange('Admin')}
              >
                Admin
              </button>
            </div>
          </div>
        )}

        {/* Form for Employee, Employer, or Admin */}
        {roleSelection && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {/* Name */}
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

            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                required
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email and Password */}
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

            {/* Firm Name - Only for Admin/Employer */}
            {['Employer', 'Admin'].includes(roleSelection) && (
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

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
                  </svg>
                  Signing Up...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>

            {/* Display any errors */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
