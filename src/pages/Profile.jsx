import FormField from "../components/ui/FormField";
import Button from "../components/ui/Button";
import React, { useEffect, useState } from "react";
import { apiErrorMessage, useProfileQuery, useUpdateProfileMutation } from "../api/shopApi";

const Profile = () => {
  const { data: user, isFetching, error: profileError } = useProfileQuery();
  const [updateProfile, { isLoading: saving, error: updateError }] = useUpdateProfileMutation();
  const error = updateError || profileError;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    panCard: "",
    address: "",
  });

  // Populate form when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        panCard: user.panCard || "",
        address: user.address || "",
      });
    }
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!saving && !isFetching) updateProfile(formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      {isFetching && <p role="status">Loading...</p>}
      {error && <p role="alert" className="text-red-500">{apiErrorMessage(error, "Could not load or update your profile")}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="First Name" autoComplete="given-name"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"

            required
           />
          <FormField label="Last Name" autoComplete="family-name"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"

            required
           />
        </div>

        <FormField label="Phone Number" autoComplete="tel"
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"

          required
         />

        <FormField label="PAN Card" autoComplete="off"
          type="text"
          name="panCard"
          value={formData.panCard}
          onChange={handleChange}
          placeholder="PAN Card"

          required
         />

        <FormField label="Address" autoComplete="street-address" as="textarea"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"

          required
         />

        <Button type="submit" disabled={saving || isFetching} className="bg-blue-500 text-white py-2 px-4 rounded">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
};

export default Profile;
