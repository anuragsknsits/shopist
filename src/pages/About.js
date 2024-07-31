import React from 'react';
import { Accordion } from 'react-bootstrap';
import '../styles/Layout.css';

const AboutUs = () => {
  return (

    <Accordion className='aboutus' defaultActiveKey={['0']} alwaysOpen>
      <Accordion.Item eventKey="0" id="0">
        <Accordion.Header>ACA Vinit Kumar & Associates</Accordion.Header>
        <Accordion.Body>
          An esteemed Chartered Accountant firm in Patna with a growing team of professionals. Established to create a benchmark in value-added and quality professional services in Direct and Indirect Taxation in India.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" id="1">
        <Accordion.Header>Quality Services</Accordion.Header>
        <Accordion.Body>
          Our firm has consistently provided top-notch services to clients over time.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" id="2">
        <Accordion.Header>Dedicated Team</Accordion.Header>
        <Accordion.Body>
          Our strength lies in our dedicated team that works tirelessly for clients. Combining expert knowledge, a learning attitude, and professional ethics, we deliver high-quality services in the most cost-effective manner, providing top-notch solutions to our clients’ business needs.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" id="3">
        <Accordion.Header>Geographic Reach</Accordion.Header>
        <Accordion.Body>
          Although based in Patna, we serve clients across India and internationally. We are fully devoted to meeting our clients' requirements, offering high-quality services with a blend of knowledge and expertise.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4" id="4">
        <Accordion.Header>Reputation</Accordion.Header>
        <Accordion.Body>
          VKAD is a renowned CA firm in Patna, known for exceptional service and a growing professional team, setting a benchmark in value-added and quality professional services in Direct and Indirect Taxation in India.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5" id="5">
        <Accordion.Header>GST Services</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>GST Registration and Compliance: Critical for any business’s finances.</li>
            <li>Services include GST registration, GST returns filing, GST audit, and GST advisory.</li>
            <li>Our experts stay updated with the latest GST guidelines to ensure client compliance.</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6" id="6">
        <Accordion.Header>Income Tax Services</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>Comprehensive support for income tax return filing.</li>
            <li>Services include tax planning, tax return preparation, and compliance.</li>
            <li>Aim to minimize tax liabilities and maximize tax savings.</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7" id="7">
        <Accordion.Header>Accounting and Bookkeeping</Accordion.Header>
        <Accordion.Body>
          ACA Vinit Kumar, and associates we also provide accounting and bookkeeping services to clients. Our team of experienced accountants assists clients in managing their financial records, ensuring that they are accurate and up to date. Our accounting and bookkeeping services help clients streamline their financial processes, enabling them to focus on their core business activities.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="8" id="8">
        <Accordion.Header>Professional Expertise</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>Highly trained and experienced team in tax and accounting services.</li>
            <li>Services include tax planning and compliance, financial statement preparation, and auditing.</li>
            <li>Develop comprehensive tax strategies to minimize liabilities.</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="9" id="9">
        <Accordion.Header>Consultancy Services</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>Specializes in business advisory, financial planning, and risk management.</li>
            <li>Services tailored for startups, SMEs, and multinational companies.</li>
            <li>Provide practical solutions to complex business challenges.</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="10" id="10">
        <Accordion.Header>Auditing Services</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>Focus on efficient and effective auditing.</li>
            <li>Ensure accurate financial statements compliant with relevant accounting standards.</li>
            <li>Provide insights and recommendations to improve financial performance.</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="11" id="11">
        <Accordion.Header>Conclusion</Accordion.Header>
        <Accordion.Body>
          For reliable and professional Chartered Accountancy services, look no further than ACA Vinit Kumar & Associates. Our firm stands as a benchmark in providing value-added and quality professional services in Direct and Indirect Taxation in India.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

  );
};

export default AboutUs;
