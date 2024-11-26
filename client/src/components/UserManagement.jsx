import React, { useState, useEffect } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => setUsers(res.data));
    axios.get("http://localhost:5000/roles").then((res) => setRoles(res.data));
  }, []);

  const handleSubmit = () => {
    if (form.id) {
      axios.put(`http://localhost:5000/users/${form.id}`, form).then((res) => {
        setUsers(users.map((u) => (u.id === res.data.id ? res.data : u)));
      });
    } else {
      axios.post("http://localhost:5000/users", form).then((res) => {
        setUsers([...users, res.data]);
      });
    }
    setForm({ name: "", email: "", role: "", status: "Active" });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`).then(() => {
      setUsers(users.filter((u) => u.id !== id));
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">
        User Management
      </h2>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="" disabled>
              Select Role
            </option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </select>
          <select
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition"
          >
            {form.id ? "Update User" : "Add User"}
          </button>
        </form>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-blue-100 text-blue-800">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t hover:bg-blue-50 transition"
            >
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-white ${
                    user.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="p-4 flex justify-center gap-4">
                <button
                  className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
                  onClick={() => setForm(user)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
