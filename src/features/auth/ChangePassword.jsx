import FormCard from "../../components/ui/FormCard";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
import React, { useState } from "react";
import { apiErrorMessage, useChangePasswordMutation } from "../../api/shopApi";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isLoading: loading, error, isSuccess, data }] = useChangePasswordMutation();

  const [validationError, setValidationError] = useState("");
  const handleSubmit = (e) => {
    setValidationError("");
    e.preventDefault();
    if (loading) return;
    if (newPassword !== confirmPassword) {
      setValidationError("New password and confirm password do not match!");
      return;
    }

    changePassword({ oldPassword, newPassword });
  };

  return (
    <FormCard title="Change Password">
      {error && <p role="alert" className="text-red-500">{apiErrorMessage(error, "Failed to change password")}</p>}
      {isSuccess && <p className="text-green-500">{typeof data === "string" ? data : "Password changed."}</p>}

      {validationError && <p role="alert" className="text-red-700">{validationError}</p>}<form onSubmit={handleSubmit} className="space-y-4">
        <div>

          <FormField label="Old Password" autoComplete="current-password"
            type="password"

            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
           />
        </div>

        <div>

          <FormField label="New Password" autoComplete="new-password"
            type="password"

            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
           />
        </div>

        <div>

          <FormField label="Confirm Password" autoComplete="new-password"
            type="password"

            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
           />
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Change Password"}
        </Button>
      </form>
    </FormCard>
  );
};

export default ChangePassword;
