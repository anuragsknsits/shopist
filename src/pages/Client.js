import React from 'react'

const Client = () => {
  return (
    <div>
        <section className="bg-white p-6 shadow rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Clients</h2>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Add New Client</button>
        </div>
        <input
          type="text"
          placeholder="Search by Name, GST Number, PAN, etc."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Client A</td>
              <td className="border px-4 py-2">Active</td>
              <td className="border px-4 py-2">
                <button className="text-blue-500 mr-2">View Profile</button>
                <button className="text-yellow-500 mr-2">Send Reminder</button>
                <button className="text-green-500">Edit Info</button>
              </td>
            </tr>
            {/* Additional client rows can be added here */}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Client