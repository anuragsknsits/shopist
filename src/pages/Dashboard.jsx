import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* 1. Overview & Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Total Clients</h2>
          <p className="mt-2 text-gray-600">Active: 50</p>
          <p className="text-gray-600">Inactive: 10</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Pending Filings & Approvals</h2>
          <p className="mt-2 text-gray-600">5 Pending</p>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Upcoming Deadlines</h2>
          <ul className="mt-2 text-gray-600">
            <li>GST: 15th Feb</li>
            <li>Income Tax: 31st Mar</li>
            <li>TDS: 7th Apr</li>
          </ul>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Recent Transactions</h2>
          <ul className="mt-2 text-gray-600">
            <li>Invoice #1234 - ₹10,000</li>
            <li>Payment from Client A - ₹5,000</li>
          </ul>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold">Revenue Summary</h2>
          <p className="mt-2 text-gray-600">This Month: ₹50,000</p>
          <p className="text-gray-600">Last Month: ₹45,000</p>
        </div>
      </section>

      {/* 2. Client Management */}
      

      {/* 3. Tax & Compliance */}
      <section className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Tax & Compliance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold">GST Returns</h3>
            <ul className="mt-2 text-gray-600">
              <li>Filed: 20</li>
              <li>Due: 5</li>
              <li>Pending: 2</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Income Tax Filings</h3>
            <ul className="mt-2 text-gray-600">
              <li>Filed: 15</li>
              <li>Due: 3</li>
              <li>Pending: 1</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">TDS/TCS Filings</h3>
            <ul className="mt-2 text-gray-600">
              <li>Filed: 10</li>
              <li>Due: 2</li>
              <li>Pending: 1</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold">ROC Filings</h3>
            <ul className="mt-2 text-gray-600">
              <li>Filed: 8</li>
              <li>Due: 1</li>
              <li>Pending: 0</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Billing & Invoices */}
      <section className="bg-white p-6 shadow rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Billing & Invoices</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Generate Invoice</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-semibold">Total Revenue</h3>
            <p className="mt-2 text-gray-600">₹1,00,000</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Outstanding Payments</h3>
            <p className="mt-2 text-gray-600">₹20,000</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Payment Status</h3>
            <ul className="mt-2 text-gray-600">
              <li>Paid: 80%</li>
              <li>Due: 15%</li>
              <li>Overdue: 5%</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Calendar & Reminders */}
      <section className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Calendar & Reminders</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>GST Filing due on Feb 15</li>
          <li>Client Meeting with ABC Corp on Feb 20</li>
          <li>Payment Reminder: Invoice #1234 on Feb 25</li>
        </ul>
      </section>

      {/* 6. Document Management */}
      <section className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Document Management</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Upload & Manage Financial Statements</li>
          <li>Client Reports & Work Papers</li>
          <li>Secure Document Sharing with Clients</li>
        </ul>
      </section>

      {/* 7. User Access & Roles */}
      <section className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">User Access & Roles</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Admin Dashboard for CAs</li>
          <li>Client Portal for Document Upload & Viewing</li>
          <li>Team Member Access (Junior CAs, Assistants)</li>
        </ul>
      </section>

      {/* 8. Reports & Analytics */}
      <section className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Reports & Analytics</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Revenue Trends (Monthly, Quarterly, Yearly)</li>
          <li>Tax Savings Analysis</li>
          <li>Client-wise Revenue Reports</li>
          <li>Audit Logs & Compliance Reports</li>
        </ul>
      </section>

      {/* 9. Notifications & Alerts */}
      <section className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Notifications & Alerts</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Due Date Reminders for Tax Filing</li>
          <li>Client Message Notifications</li>
          <li>System Alerts for Payment Failures & Expiring Documents</li>
        </ul>
      </section>

      {/* 10. Integrations */}
      <section className="bg-white p-6 shadow rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Integrations</h2>
        <ul className="list-disc pl-5 text-gray-600">
          <li>Accounting Software (Tally, Zoho Books, QuickBooks)</li>
          <li>Banking APIs for Payment Tracking</li>
          <li>Government Portals (GST, IT Portal)</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
