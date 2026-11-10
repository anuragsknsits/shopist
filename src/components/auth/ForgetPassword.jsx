import React, { useState } from "react";
import { apiErrorMessage, useForgotPasswordMutation } from "../../api/shopApi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [requestReset, { isLoading: loading, error, isSuccess }] = useForgotPasswordMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) requestReset(email);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Forgot Password
      </h2>
      {error && <p role="alert" className="text-red-500">{apiErrorMessage(error, "Failed to send reset link")}</p>}
      {isSuccess && (
        <p className="text-green-500">
          If your email is registered, you’ll receive a reset link.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-gray-700"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
