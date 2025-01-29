import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, FileText, Phone, Users } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white text-center py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Your Trusted Chartered Accountants</h1>
          <p className="mt-4 text-lg">Providing expert financial, taxation, and audit services.</p>
          <Link to="/contact" className="mt-6 inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-200">
            Get a Consultation
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <ServiceCard icon={FileText} title="Tax Consulting" description="Expert guidance on income tax, GST, and compliance." />
          <ServiceCard icon={Briefcase} title="Business Advisory" description="Strategic financial planning for businesses." />
          <ServiceCard icon={Users} title="Auditing Services" description="Ensure financial accuracy and compliance." />
          <ServiceCard icon={Phone} title="Financial Planning" description="Investment & tax-saving strategies for individuals." />
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Why Choose Us?</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            With years of experience in taxation, auditing, and financial advisory, we offer professional services with a client-centric approach.
          </p>
          <Link to="/aboutus" className="mt-6 inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700">
            Learn More
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <p className="mt-4 text-lg text-gray-700">We’re here to help. Contact us for expert advice.</p>
        <Link to="/contact" className="mt-6 inline-block bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700">
          Contact Us
        </Link>
      </section>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white shadow-md rounded-lg p-6 text-center">
    <Icon className="w-12 h-12 text-blue-600 mx-auto" />
    <h3 className="text-xl font-semibold mt-4">{title}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
  </div>
);

export default Home;
