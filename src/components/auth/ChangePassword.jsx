import React, { useState } from "react";
import { apiErrorMessage, useChangePasswordMutation } from "../../api/shopApi";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isLoading: loading, error, isSuccess, data }] = useChangePasswordMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    changePassword({ oldPassword, newPassword });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Change Password</h2>
      {error && <p role="alert" className="text-red-500">{apiErrorMessage(error, "Failed to change password")}</p>}
      {isSuccess && <p className="text-green-500">{typeof data === "string" ? data : "Password changed."}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Old Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700">Confirm New Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
