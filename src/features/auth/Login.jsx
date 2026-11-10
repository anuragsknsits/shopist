import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiErrorMessage, useLoginMutation } from "../../api/shopApi";
import logo from "../../img/VKADLogo.jpg";

const Login = () => {
  const [credentials, setCredentials] = useState({ emailId: "", password: "" });
  const navigate = useNavigate();
  const { checkingSession, user } = useSelector((state) => state.auth);
  const [login, { isLoading: loading, error }] = useLoginMutation();

  useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  const handleChange = ({ target: { name, value } }) => {
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkingSession || loading) return;
    login(credentials);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-r from-blue-500 to-green-500">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center">
          <img src={logo} alt="VKAD Associates Logo" className="w-32 mb-4" />
        </div>
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Log In</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">

            <div className="w-full">
              <FormField label="Email" autoComplete="username"
                type="email"
                name="emailId"
                value={credentials.emailId}
                onChange={handleChange}
                placeholder="Enter email"
                required

               />
            </div>
          </div>

          <div className="flex flex-col">

            <div className="w-full">
              <FormField label="Password" autoComplete="current-password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter password"
                required

               />
            </div>
          </div>

          {error && <div role="alert" className="text-red-500 text-sm">{apiErrorMessage(error, "Login failed")}</div>}

          <Button
            type="submit"
            disabled={checkingSession || loading}
            className="w-full"
          >
            {checkingSession ? "Checking session..." : loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="text-center mt-4">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div >
    </div >
  );
};

export default Login;
