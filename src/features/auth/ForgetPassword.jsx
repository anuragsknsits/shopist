import FormCard from "../../components/ui/FormCard";
import FormField from "../../components/ui/FormField";
import Button from "../../components/ui/Button";
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
    <FormCard title="Forgot Password">
      {error && <p role="alert" className="text-red-500">{apiErrorMessage(error, "Failed to send reset link")}</p>}
      {isSuccess && (
        <p className="text-green-500">
          If your email is registered, you’ll receive a reset link.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>

          <FormField label="Email Address" autoComplete="email"
            id="email"
            type="email"

            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
           />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </FormCard>
  );
};

export default ForgetPassword;
