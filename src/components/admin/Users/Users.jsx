import axios from "axios";
import { useEffect, useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";

export default function Users() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await axios.get(`http://localhost:3000/users`);
    setUsers(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">User List</h1>

        {/* Responsive table wrapper */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full text-left table-auto">
            <thead className="bg-indigo-600 text-white">
              <tr className="text-center">
                <th className="py-3 px-6">#</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Email</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-100 text-center">
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6">{user.displayName}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6">
                    <span
                      className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        user.role === "Admin"
                          ? "bg-green-200 text-green-800"
                          : "bg-blue-200 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 px-6 flex justify-center items-center gap-x-3">
                    <button className="p-3 bg-blue-600 text-white rounded-lg">
                      <MdAdminPanelSettings />
                    </button>
                    <button className="p-3 bg-red-600 text-white rounded-lg">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fallback for very small screens with fancy cards */}
        <div className="block lg:hidden mt-6 space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4 overflow-y-auto"
            >
              {/* Avatar + Name + Role */}
              <div className="flex items-center justify-between">
                <div className="bg-blue-200 p-2 rounded-lg">
                  <img
                    src={user.photoURL}
                    alt={user.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>
                <div>
                  <p className="text-lg font-bold">{user.displayName}</p>
                  <p className="text-gray-500 mb-2">{user.email}</p>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      user.role === "admin"
                        ? "bg-green-200 text-green-800"
                        : "bg-blue-200 text-blue-800"
                    }`}
                  >
                    Admin
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  <MdAdminPanelSettings />
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
