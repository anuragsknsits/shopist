import { Link } from "react-router-dom";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import React, { useState } from 'react';
import logo from '../../img/VKADLogo.jpg';
import { apiErrorMessage, useRegisterMutation } from '../../api/shopApi';

const SignUp = () => {
  const [user, setUser] = useState({
    emailId: '',
    password: '',
    confirmPassword: ''
  });
  const [register, { isLoading, isSuccess, error }] = useRegisterMutation();

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

  const [validationError, setValidationError] = useState("");
  const handleSubmit = (e) => {
    setValidationError("");
    e.preventDefault();
    if (isLoading) return;
    const validationMessage = validateForm();

    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    register(user);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-r from-blue-500 to-green-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="VKAD Associates" className="w-40 object-contain" />
        </div>
        <h1 className="text-3xl font-semibold text-center text-gray-700">Sign Up</h1>
        {error && <p role="alert" className="text-red-500">{apiErrorMessage(error, "Registration failed")}</p>}
        {isSuccess && <p role="status" className="text-green-500">Registration successful. You can now sign in.</p>}
        {validationError && <p role="alert" className="text-red-700">{validationError}</p>}<form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="flex flex-col">

            <div className="w-full">
              <FormField label="Email" autoComplete="username"
                type="email"
                name="emailId"
                value={user.emailId}
                onChange={handleChange}
                required
                placeholder="Enter your email"

               />
            </div>
          </div>
          <div className="flex flex-col">

            <div className="w-full">
              <FormField label="Password" autoComplete="new-password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"

               />
            </div>
          </div>
          <div className="flex flex-col">

            <div className="w-full">
              <FormField label="Confirm Password" autoComplete="new-password"
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"

               />
            </div>
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full"
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
