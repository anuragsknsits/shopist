import React, { useState } from "react";

const ContactDetails = () => {
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
    console.log("Form submitted:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Send Message
          </button>
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
