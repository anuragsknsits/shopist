import React, { useState } from 'react';
import logo from '../../img/VKADLogo.jpg';
import { HiOutlineMail, HiLockClosed } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { registerRequest } from '../../redux/actions/signupAction';

const SignUp = () => {
  const [user, setUser] = useState({
    emailId: '',
    password: '',
    confirmPassword: ''
  });
  const dispatch = useDispatch();

  const handleChange = ({ target: { name, value } }) => {
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const { emailId, password, confirmPassword } = user;
    
    // Check if any field is empty
    if (!emailId || !password || !confirmPassword) {
      return "Please fill all the fields";
    }

    // Check if email is valid
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(emailId)) {
      return "Invalid email address";
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
      return "Password should be at least 6 characters long";
    }

    // Check password strength (lowercase, uppercase, number, special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      return "Password should contain at least one uppercase, one lowercase, one number, and one special character";
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationMessage = validateForm();
    
    if (validationMessage) {
      alert(validationMessage);
      return;
    }

    // Proceed with signup (e.g., call API or log the user object)
    console.log(user);
    dispatch(registerRequest(user));
    //navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="VKAD Associates" className="w-40 object-contain" />
        </div>
        <h1 className="text-3xl font-semibold text-center text-gray-700">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="flex flex-col">
            <label htmlFor="emailId" className="text-gray-700">Email ID</label>
            <div className="flex items-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <HiOutlineMail className="text-gray-400 ml-3" />
              <input 
                type="email" 
                name="emailId" 
                value={user.emailId} 
                onChange={handleChange} 
                required 
                placeholder="Enter your email"
                className="mt-2 p-3 w-full border-0 focus:ring-0"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <HiLockClosed className="text-gray-400 ml-3" />
              <input 
                type="password" 
                name="password" 
                value={user.password} 
                onChange={handleChange} 
                required 
                placeholder="Enter your password"
                className="mt-2 p-3 w-full border-0 focus:ring-0"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</label>
            <div className="flex items-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <HiLockClosed className="text-gray-400 ml-3" />
              <input 
                type="password" 
                name="confirmPassword" 
                value={user.confirmPassword} 
                onChange={handleChange} 
                required 
                placeholder="Confirm your password"
                className="mt-2 p-3 w-full border-0 focus:ring-0"
              />
            </div>
          </div>
          <button 
            type="submit" 
            className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
