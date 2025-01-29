import React, { useState } from 'react';

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle open/close
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="space-y-4">
        {[
          { header: "ACA Vinit Kumar & Associates", body: "An esteemed Chartered Accountant firm in Patna with a growing team of professionals. Established to create a benchmark in value-added and quality professional services in Direct and Indirect Taxation in India." },
          { header: "Quality Services", body: "Our firm has consistently provided top-notch services to clients over time." },
          { header: "Dedicated Team", body: "Our strength lies in our dedicated team that works tirelessly for clients. Combining expert knowledge, a learning attitude, and professional ethics, we deliver high-quality services in the most cost-effective manner, providing top-notch solutions to our clients’ business needs." },
          { header: "Geographic Reach", body: "Although based in Patna, we serve clients across India and internationally. We are fully devoted to meeting our clients' requirements, offering high-quality services with a blend of knowledge and expertise." },
          { header: "Reputation", body: "VKAD is a renowned CA firm in Patna, known for exceptional service and a growing professional team, setting a benchmark in value-added and quality professional services in Direct and Indirect Taxation in India." },
          { header: "GST Services", body: <ul><li>GST Registration and Compliance: Critical for any business’s finances.</li><li>Services include GST registration, GST returns filing, GST audit, and GST advisory.</li><li>Our experts stay updated with the latest GST guidelines to ensure client compliance.</li></ul> },
          { header: "Income Tax Services", body: <ul><li>Comprehensive support for income tax return filing.</li><li>Services include tax planning, tax return preparation, and compliance.</li><li>Aim to minimize tax liabilities and maximize tax savings.</li></ul> },
          { header: "Accounting and Bookkeeping", body: "ACA Vinit Kumar, and associates we also provide accounting and bookkeeping services to clients. Our team of experienced accountants assists clients in managing their financial records, ensuring that they are accurate and up to date. Our accounting and bookkeeping services help clients streamline their financial processes, enabling them to focus on their core business activities." },
          { header: "Professional Expertise", body: <ul><li>Highly trained and experienced team in tax and accounting services.</li><li>Services include tax planning and compliance, financial statement preparation, and auditing.</li><li>Develop comprehensive tax strategies to minimize liabilities.</li></ul> },
          { header: "Consultancy Services", body: <ul><li>Specializes in business advisory, financial planning, and risk management.</li><li>Services tailored for startups, SMEs, and multinational companies.</li><li>Provide practical solutions to complex business challenges.</li></ul> },
          { header: "Auditing Services", body: <ul><li>Focus on efficient and effective auditing.</li><li>Ensure accurate financial statements compliant with relevant accounting standards.</li><li>Provide insights and recommendations to improve financial performance.</li></ul> },
          { header: "Conclusion", body: "For reliable and professional Chartered Accountancy services, look no further than ACA Vinit Kumar & Associates. Our firm stands as a benchmark in providing value-added and quality professional services in Direct and Indirect Taxation in India." }
        ].map((item, index) => (
          <div key={index} className="border-b">
            <button
              onClick={() => handleToggle(index)}
              className="w-full text-left text-xl font-semibold py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none"
            >
              {item.header}
            </button>
            {activeIndex === index && (
              <div className="py-3 px-4 text-lg bg-gray-50">
                {typeof item.body === 'string' ? item.body : item.body}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
