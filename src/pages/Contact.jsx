import FormField from "../components/ui/FormField";
import Button from "../components/ui/Button";
import React, { useState } from "react";

const ContactDetails = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {submitted && <p role="status">Online enquiries are not connected yet. Please use the contact details below.</p>}<form className="space-y-4" onSubmit={handleSubmit}>
          <FormField label="Your Name" autoComplete="off"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}

            required
           />
          <FormField label="Email Address" autoComplete="email"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}

            required
           />
          <FormField label="Subject" autoComplete="off"
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}

            required
           />
          <FormField label="Message" autoComplete="off" as="textarea"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}

            required
           />
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Send Message
          </Button>
        </form>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Our Contact Details</h3>
          <p><strong>Email:</strong> vinit@gmail.com</p>
          <p><strong>Phone:</strong> +91 8882530645</p>
          <p><strong>Address:</strong> Gola Road, Main Street, Patna, India</p>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
